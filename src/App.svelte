<script lang="ts">
    import type { ChatCompletionRequestMessage } from "openai";
  import TextInput from "./lib/elements/TextInput.svelte";
  import View from "./lib/elements/View.svelte";
    import { MessageStreamGen, SYS_CLASSIFY_1, SYS_TROUBLESHOOT_1 } from "./lib/util";


  let messages: ChatCompletionRequestMessage[] = [];
  let test = false;
  if (test) {
    messages = [{content: "Hello!", role: "user"}, {content: "Why hello there!", role: "assistant"},]
  }

  async function sendMessage(input: string){
    let oldMessages = [...messages];
    let prompt: ChatCompletionRequestMessage = {
      content: input,
      role: "user",
    }
    const stream = MessageStreamGen({
      messages: [
        SYS_TROUBLESHOOT_1,
        ...oldMessages,
        prompt,
      ],
      model: "gpt-3.5-turbo"
    })
    let answer: ChatCompletionRequestMessage = {
      content: "",
      role: "assistant",
    }
    messages = [...oldMessages, prompt, answer];
    for await ( let chunk of stream) {
      answer.content += chunk;
      messages = [...oldMessages, prompt, answer];
    }
  }

</script>

<main>
  <View class="flex flex-col h-screen items-center bg-secondary" >
    <View class="h-[100%] w-md overflow-y-auto overflow-x-hidden mt-2
                 flex flex-col items-center space-y-2">
      {#each messages as message}
        <View class="p-2 bg-primary">
          {message.content}
        </View>
      {/each}
    </View>
    <TextInput class="py-4 w-md" onSubmit={sendMessage} placeholder="Describe your problem.." />
  </View>
</main>


