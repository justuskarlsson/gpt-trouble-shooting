<script lang="ts">
  export let direction: "x" | "y" = "y";

  
  
</script>

<div class="container" style='
  flex-direction: {direction === "y" ? "column" : "row"};
'>
  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
</style>