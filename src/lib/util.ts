import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai"

const PROD = false;

export function apiFetch(
  path: string,
  init?: RequestInit
):
 Promise<Response> {
  const BASE = PROD ? "/api" : "http://localhost:3000/api"; 
  return fetch(BASE + path, init);
}


export function stylesString(styles: Record<string, any>){
  let res = "";
  for (let [key, val] of Object.entries(styles)) {
    res += `${key}: ${val}`;
  }
}


export async function* MessageStreamGen(body: CreateChatCompletionRequest, endpoint: string = "/chat"){
  const response = await apiFetch(endpoint, {
    method: "POST",
    headers: {
    'Content-Type': 'text/event-stream'
    },
    body: JSON.stringify(body)
  });

  const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const {value, done} = await reader.read();
    if (done) break;
    const chunks = value.split("data: ");
    for (let i = 1; i < chunks.length; i++) {
      if (chunks[i].startsWith("[DONE]")) {
        break;
      }
      const data = JSON.parse(chunks[i]);
      const delta = data.choices[0].delta;
      if ("content" in delta) {
        yield delta.content as string;
      }
    }
  }
}