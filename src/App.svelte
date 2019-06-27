<script>
  import TeaRecipe from "./TeaRecipe.svelte";
  import BrewSchedule from "./BrewSchedule.svelte";

  export let title;

  const teaRecipes = [
    {
      id: "000",
      name: "gaoshan",
      label: "高山茶",
      brewTimes: [80, 40, 50, 60, 80]
    },
    {
      id: "001",
      name: "jinxuan",
      label: "金萱茶",
      brewTimes: [75, 35, 55, 70]
    },
    {
      id: "002",
      name: "baozhong",
      label: "包種茶",
      brewTimes: [30, 20, 25, 30, 40]
    },
    {
      id: "003",
      name: "oolong",
      label: "烏龍茶",
      brewTimes: [50, 35, 40, 50]
    },
    {
      id: "004",
      name: "blacktea",
      label: "紅茶",
      brewTimes: [30, 35, 40, 60]
    },
    {
      id: "005",
      name: "orientalbeauty",
      label: "東方美人茶",
      brewTimes: [40, 45, 50, 70]
    },
    {
      id: "006",
      name: "puer",
      label: "普洱茶",
      brewTimes: [80, 10, 15, 15, 20, 30, 40, 60]
    }
  ];

  let currentRecipe = loadCurrentRecipe(teaRecipes);

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
  }

  function listRecipes() {
    currentRecipe = null;
    saveCurrentRecipe(currentRecipe);
  }
</script>

<style>
  h1 {
    color: darkgreen;
    font-size: 5em;
    text-align: center;
  }
  ul {
    margin: 0;
    padding: 0;
  }
</style>

{#if currentRecipe !== null}
  <button on:click={listRecipes} style="position: absolute;">back</button>
{/if}
<h1>{title}</h1>
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
