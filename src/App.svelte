<script>
  import GalleryItem from "./GalleryItem.svelte";
  import BrewSchedule from "./BrewSchedule.svelte";

  import { recipes as teaRecipes } from "./defaultRecipes.js";
  import { recipeBg, recipeFg } from "./dynStyles.js";

  export let title;

  let currentRecipe = loadCurrentRecipe(teaRecipes);
  $: bgStyle = recipeBg(currentRecipe);

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
    font-size: 1.8rem;
    color: white;
    text-align: center;
    padding: 0;
    margin: 1rem 0;
  }
  h2 {
    font-size: 1.4rem;
    color: #c4a312;
    padding: 0;
    margin: 0.8em 0;
  }
  div.gallery {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.8rem;
  }

  @media (min-width: 640px) {
    div.gallery {
      grid-template-columns: 1fr 1fr;
    }
  }

  button.back {
    color: rgb(201, 185, 168);
    position: absolute;
  }
</style>

{#if currentRecipe !== null}
  <button on:click={listRecipes} class="back" {...bgStyle}>back</button>
{/if}
<h1>{title}</h1>
{#if currentRecipe === null}
  <h2>DEFAULT ITEMS</h2>
  <div class="gallery">
    {#each teaRecipes as recipe}
      <GalleryItem {recipe} on:clickRecipe={enterRecipe} />
    {/each}
  </div>
  <h2>CUSTOM ITEMS</h2>
{:else}
  <BrewSchedule recipe={currentRecipe} />
{/if}
