<script lang="ts">

  export let value: string = "";
  export let onSubmit: (value: string) => any | null = null;

  function onKeyDown(e: KeyboardEvent){
    if (e.key === "Enter" && onSubmit) {
      onSubmit(value);
      value = "";
      e.preventDefault();
    }
  }

</script>


<div class="flex flex-row justify-center
            {$$props.class || ""}">

  <input class="min-w-[800px] w-full"
        bind:value={value}
        on:keydown={onKeyDown}
  />
</div>


<style lang="postcss">
  input {
    @apply p-2 rounded-xl border-2 border-gray-300;
  }
</style>