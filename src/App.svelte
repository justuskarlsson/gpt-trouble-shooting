<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import {Route as OrgRoute} from 'tinro'; 
    import ChatView from './lib/components/ChatView.svelte';
  const Route2 = OrgRoute as unknown;
  const Route = Route2 as typeof SvelteComponent;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/portfolio">Portfolio</a>
  <a href="/contacts">Contacts</a>
</nav>

<Route path="/"><ChatView /></Route>
<Route path="/portfolio/*">
  <Route path="/">
      <h1>Portfolio introduction</h1>
      <nav>
          <a href="/portfolio/sites">Sites</a> 
          <a href="/portfolio/photos">Photos</a>
      </nav>
  </Route>
  <Route path="/sites"><h1>Portfolio: Sites</h1></Route>
  <Route path="/photos"><h1>Portfolio: Photos</h1></Route>
</Route>

