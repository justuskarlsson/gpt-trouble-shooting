<script lang="ts">
  export let direction: "x" | "y" | "" = "";

  
  
</script>

<div class="container {$$props.class || ""}"
>
  <slot />
</div>

<style>
</style>