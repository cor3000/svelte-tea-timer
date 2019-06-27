<script>
  import { createEventDispatcher } from "svelte";
  import { recipeBg } from "./dynStyles.js";

  const dispatch = createEventDispatcher();

  export let recipe;

  const bgStyle = recipeBg(recipe);

  const clickRecipe = event => {
    dispatch("clickRecipe", recipe);
  };
</script>

<style>
  li {
    color: rgb(201, 185, 168);
    font-size: 3rem;
    list-style: none;
    line-height: 1.5em;
    vertical-align: middle;
    border-radius: 0.25em;
    text-align: center;
    margin: 0.5rem;
    padding: 0;
    cursor: pointer;
  }
</style>

<li {...bgStyle} on:click={clickRecipe}> {recipe.label} </li>
