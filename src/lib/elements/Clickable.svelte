<script lang="ts">
  export let title: string;
  export let capitalized: boolean = true;
  export let onClick: (e: MouseEvent) => void | null = null;

</script>


<button on:click={onClick}>
  {capitalized ? title.toUpperCase() : title}
</button>


<style>
  button:hover {
    background: white;
  }
</style>