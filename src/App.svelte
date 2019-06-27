<script>
  import TeaRecipe from "./TeaRecipe.svelte";
  import BrewSchedule from "./BrewSchedule.svelte";

  import { recipes as teaRecipes } from "./defaultRecipes.js";
  import { recipeBg, recipeFg } from "./dynStyles.js";

  export let title;

  let currentRecipe = loadCurrentRecipe(teaRecipes);
  $: bgStyle = recipeBg(currentRecipe);
  $: fgStyle = recipeFg(currentRecipe);

  function loadCurrentRecipe(recipes) {
    const recipeId = localStorage.getItem("currentRecipeId");
    return recipes.find(recipe => recipe.id == recipeId) || null;
  }

  function saveCurrentRecipe(recipe) {
    if (recipe == null) {
      localStorage.removeItem("currentRecipeId");
    } else {
      localStorage.setItem("currentRecipeId", recipe.id);
    }
  }

  function enterRecipe(event) {
    currentRecipe = event.detail;
    saveCurrentRecipe(currentRecipe);

    setTimeout(function() {
      if (Notification && Notification.requestPermission) {
        Notification.requestPermission();
      }
    }, 0);
  }

  function listRecipes() {
    currentRecipe = null;
    saveCurrentRecipe(currentRecipe);
  }
</script>

<style>
  h1 {
    font-size: 5em;
    text-align: center;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  button.back {
    color: rgb(201, 185, 168);
    position: absolute;
  }
</style>

{#if currentRecipe !== null}
  <button on:click={listRecipes} class="back" {...bgStyle}>back</button>
{/if}
<h1 {...fgStyle}>{title}</h1>
<div>
  {#if currentRecipe === null}
    <ul>
      {#each teaRecipes as recipe}
        <TeaRecipe {recipe} on:clickRecipe={enterRecipe} />
      {/each}
    </ul>
  {:else}
    <BrewSchedule recipe={currentRecipe} />
  {/if}
</div>
