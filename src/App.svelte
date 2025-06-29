<script>
  import { tick } from "svelte";

  import GalleryItem from "./GalleryItem.svelte";
  import BrewSchedule from "./BrewSchedule.svelte";
  import NavIcon from "./NavIcon.svelte";

  import { recipes as defaultRecipes } from "./defaultRecipes.js";
  import { swipe, gesture } from "./swipe.js";
  import { fly } from "./transitions.js";

  let { title } = $props();

  let teaRecipes = $state(loadRecipes(defaultRecipes));

  let currentRecipeId = $state(localStorage.getItem("currentRecipeId"));
  let currentRecipe = $derived(teaRecipes.find(r => r.id == currentRecipeId) || null);

  let config = $state({
    menu: false,
    sound: true,
    showExportImport: false,
    notifications:
      window.Notification && window.Notification.permission === "granted"
  });

  function toggleMenu() {
    config.menu = !config.menu;
  }

  function toggleNotifications() {
    if (config.notifications) {
      setTimeout(function() {
        if (window.Notification && window.Notification.requestPermission) {
          window.Notification.requestPermission().then(result => {
            console.log(result);
            if (result !== "granted") {
              config.notifications = false;
            }
          });
        }
      }, 0);
    }
  }

  function loadRecipes(defaultRecipes) {
    const storedRecipes = localStorage.getItem("teaRecipes");
    return JSON.parse(storedRecipes || JSON.stringify(defaultRecipes));
  }
  function resetRecipes(teaRecipes) {
    saveRecipes(null);
  }
  function saveRecipes(teaRecipes) {
    if (teaRecipes === null) {
      localStorage.removeItem("teaRecipes");
    } else {
      localStorage.setItem("teaRecipes", JSON.stringify(teaRecipes));
    }
  }
  function importRecipes(event) {
    const blob = event.target.files[0].slice(0);
    const fr = new FileReader();
    fr.addEventListener("loadend", event => {
      const json = event.srcElement.result;
      const importedRecipes = JSON.parse(json);
      teaRecipes = importedRecipes;
      saveRecipes(teaRecipes);
    });
    fr.readAsText(blob);
  }
  function exportRecipes() {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(teaRecipes, name, 2));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "teaTimeRecipes.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  function switchRecipe(event) {
    const index = teaRecipes.indexOf(currentRecipe);
    const len = teaRecipes.length;
    listRecipes();
    tick().then(() => {
      enterRecipe(teaRecipes[(index + event.detail + len) % len]);
    });
  }

  function enterRecipe(recipe) {
    currentRecipeId = recipe.id;
    localStorage.setItem("currentRecipeId", recipe.id);
  }

  function listRecipes() {
    currentRecipeId = null;
    localStorage.removeItem("currentRecipeId");
  }
</script>

<style>
  
  h1 {
    font-size: 1.8rem;
    color: white;
    text-align: center;
    padding: 0;
    margin: 1rem 2rem 1.5rem 2rem;
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

  @media (orientation: landscape) {
    div.gallery {
      grid-template-columns: 1fr 1fr;
    }
  }

  nav {
    position: absolute;
    top: 2.3rem;
  }
  nav.back {
    left: 1.5rem;
  }
  nav.menu {
    right: 1.3rem;
  }
  .config-menu {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 1rem;
    background-color: #222222;
  }
  .config-menu > div {
    display: block;
    font-size: 2rem;
    color: #979797;
    margin: 1em 2rem;
    display: flex;
    justify-content: space-between;
  }
  .config-menu > div > label {
    flex: 1;
  }

  .config-menu input[type="checkbox"] {
    height: 2rem;
    width: 2rem;
  }
  .config-menu button {
    background-color: #4a4a4a;
    border: none;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .import {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .import input[type="file"] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  hr {
    border: none;
    border-top: 1px solid #333333;
  }
</style>

<svelte:window
  use:swipe
  onswipe={e => e.detail[gesture.RIGHT] && listRecipes()} />
<nav class="back">
  {#if currentRecipe !== null}
    <NavIcon onclick={listRecipes} icon="arrow left" label="Back" />
  {/if}
</nav>
<h1>{title}</h1>
{#if currentRecipe === null}
  <h2>PRESETS</h2>
  <div class="gallery">
    {#each teaRecipes as recipe}
      <GalleryItem {recipe} onclick={() => enterRecipe(recipe)} />
    {/each}
  </div>
  <!-- <h2>CUSTOM ITEMS</h2> -->
{:else}
  <BrewSchedule
    recipe={currentRecipe}
    {config}
    onSwitchRecipe={switchRecipe}
    onCloseRecipe={listRecipes} />
{/if}

<nav class="menu">
  <NavIcon onclick={toggleMenu} icon="menu" label="Menu" />
</nav>
{#if config.menu}
  <div
    class="config-menu"
    transition:fly={{ from: 'top', duration: 150 }}
    use:swipe={{ lockScroll: true }}
    onswipe={e => e.detail[gesture.UP] && toggleMenu()}>
    <nav class="menu">
      <NavIcon onclick={toggleMenu} icon="arrow up" label="Close" />
    </nav>
    <h1>Configuration</h1>
    <div>
      <label for="sound">Sound</label>
      <input id="sound" type="checkbox" bind:checked={config.sound} />
    </div>
    {#if window.Notification}
      <div>
        <label for="notifications">Notifications</label>
        <input
          id="notifications"
          type="checkbox"
          bind:checked={config.notifications}
          onchange={toggleNotifications} />
      </div>
    {/if}
    <hr />
    <div>
      <label for="advanced">Advanced</label>
      <input
        id="advanced"
        type="checkbox"
        bind:checked={config.showExportImport} />
    </div>
    {#if config.showExportImport}
      <div>
        <button onclick={exportRecipes}>Export</button>
        <span class="import">
          <button>Import</button>
          <input type="file" onchange={importRecipes} />
        </span>
        <button onclick={resetRecipes}>Reset</button>
      </div>
    {/if}
  </div>
{/if}
