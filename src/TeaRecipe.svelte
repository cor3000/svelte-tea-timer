<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let recipe;

  const clickRecipe = event => {
    dispatch("clickRecipe", recipe);
  };
</script>

<style>
  li {
    background-color: DarkGreen;
    color: white;
    font-size: 3rem;
    list-style: none;
    line-height: 1.5em;
    vertical-align: middle;
    border-radius: 0.25em;
    text-align: center;
    margin: 0.5rem;
    padding: 0;
  }
</style>

<li on:click={clickRecipe}>{recipe.label}</li>
