<script lang="ts">
  export let direction: "x" | "y" | "" = "";

  
  
</script>

<div class="container {$$props.class || ""}"
     class:flex-col={direction === "y"}
     class:flex-row={direction === "x"}
>
  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
</style>