<script lang="ts">
    import type { ChatCompletionRequestMessage } from "openai";
  import TextInput from "./lib/elements/TextInput.svelte";
  import View from "./lib/elements/View.svelte";


  let messages: ChatCompletionRequestMessage[] = [];
  let test = true;
  if (test) {
    messages = [{content: "Hello!", role: "user"}, {content: "Why hello there!", role: "assistant"},]
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
    <TextInput class="py-4 w-md" />
  </View>
</main>


