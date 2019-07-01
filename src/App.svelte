<script>
  import GalleryItem from "./GalleryItem.svelte";
  import BrewSchedule from "./BrewSchedule.svelte";
  import RoundButton from "./RoundButton.svelte";

  import { recipes } from "./defaultRecipes.js";
  import { recipeBg, recipeFg } from "./dynStyles.js";

  export let title;

  let teaRecipes = JSON.parse(JSON.stringify(recipes));

  let currentRecipe = loadCurrentRecipe(teaRecipes);
  let config = {
    menu: false,
    sound: true,
    notifications: Notification && Notification.permission === "granted"
  };

  function toggleMenu() {
    config.menu = !config.menu;
  }

  function toggleNotifications() {
    if (config.notifications) {
      setTimeout(function() {
        if (Notification && Notification.requestPermission) {
          Notification.requestPermission()
            .then(result => {
                console.log(result);
                if(result !== "granted") {
                    config.notifications = false;
                }
            });
        }
      }, 0);
    }
  }

  function loadRecipes() {}
  function saveRecipes() {}
  function importRecipes(event) {
    const blob = event.target.files[0].slice(0);
    const fr = new FileReader();
    fr.addEventListener("loadend", event => {
      const json = event.srcElement.result;
      const importedRecipes = JSON.parse(json);
      teaRecipes = importedRecipes;
    });
    fr.readAsText(blob);
  }
  function exportRecipes() {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(teaRecipes));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "teaTimeRecipes.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

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

  function enterRecipe(recipe) {
    currentRecipe = recipe;
    saveCurrentRecipe(recipe);
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

  nav {
    position: absolute;
  }
  .config-menu {
    margin-top: 5rem;
  }
  .config-menu > * {
    display: block;
    font-size: 1.4rem;
    color: #979797;
    margin: 1em 0;
  }
</style>

<nav class="top-left-nav">
  {#if currentRecipe === null}
    <RoundButton on:click={toggleMenu} icon="menu" />
  {:else}
    <RoundButton on:click={listRecipes} icon="arrow-left" />
  {/if}
</nav>
{#if config.menu}
  <h1>Tea Time - Configuration</h1>
  <div class="config-menu">
    <label>
      <input type="checkbox" bind:checked={config.sound} />
      Sound
    </label>
    <label>
      <input type="checkbox" bind:checked={config.notifications} on:change={toggleNotifications}/>
      Notifications
    </label>
    <button on:click={exportRecipes}>Export Recipes</button>
    <div>
      Import Recipes
      <input type="file" on:change={importRecipes} />
    </div>
  </div>
{:else}
  <h1>{title}</h1>
  {#if currentRecipe === null}
    <h2>DEFAULT ITEMS</h2>
    <div class="gallery">
      {#each teaRecipes as recipe}
        <GalleryItem {recipe} on:click={() => enterRecipe(recipe)} />
      {/each}
    </div>
    <h2>CUSTOM ITEMS</h2>
  {:else}
    <BrewSchedule recipe={currentRecipe} {config} />
  {/if}
{/if}
