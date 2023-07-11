import type { ChatCompletionRequestMessage, CreateChatCompletionRequest } from "openai"

const PROD = false;

export function apiFetch(
  path: string,
  init?: RequestInit
):
 Promise<Response> {
  const BASE = PROD ? "/api" : "http://localhost:3000/api"; 
  console.log(init);
  return fetch(BASE + path, init);
}


export function stylesString(styles: Record<string, any>){
  let res = "";
  for (let [key, val] of Object.entries(styles)) {
    res += `${key}: ${val}`;
  }
}


/**
 * Used like ```
 * let stream = MessageStreamGen(...);
 * for await (let chunk of stream){
 *     curAnswer.content += chunk;
 * }
 * ```
 */
export async function* MessageStreamGen(body: CreateChatCompletionRequest, endpoint: string = "/chat"){
  const response = await apiFetch(endpoint, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
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

// https://platform.openai.com/docs/guides/gpt-best-practices/strategy-split-complex-tasks-into-simpler-subtasks
export const SYS_CLASSIFY_1: ChatCompletionRequestMessage = {role: "system", content: `
You will be provided with customer service queries. Classify each query into a primary category and a secondary category. Provide your output in json format with the keys: primary and secondary.

Primary categories: Billing, Technical Support, Account Management, or General Inquiry.

Billing secondary categories:
- Unsubscribe or upgrade
- Add a payment method
- Explanation for charge
- Dispute a charge

Technical Support secondary categories:
- Troubleshooting
- Device compatibility
- Software updates

Account Management secondary categories:
- Password reset
- Update personal information
- Close account
- Account security

General Inquiry secondary categories:
- Product information
- Pricing
- Feedback
- Speak to a human
`};


export const SYS_TROUBLESHOOT_1: ChatCompletionRequestMessage = {role: "system", content: `
You will be provided with customer service inquiries that require troubleshooting in a technical support context. Help the user by:

- Ask them to check that all cables to/from the router are connected. Note that it is common for cables to come loose over time.
- If all cables are connected and the issue persists, ask them which router model they are using
- Now you will advise them how to restart their device:
-- If the model number is MTD-327J, advise them to push the red button and hold it for 5 seconds, then wait 5 minutes before testing the connection.
-- If the model number is MTD-327S, advise them to unplug and replug it, then wait 5 minutes before testing the connection.
- If the customer's issue persists after restarting the device and waiting 5 minutes, connect them to IT support by outputting {"IT support requested"}.
`};

