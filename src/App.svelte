<script>
  import TeaRecipe from "./TeaRecipe.svelte";
  import BrewSchedule from "./BrewSchedule.svelte";

  export let title;
  let teaRecipes = [
    {
      name: "oolong",
      label: "烏龍茶",
      brewTimes: [80, 40, 50, 60, 80, 100]
    },
    {
      name: "baozhong",
      label: "包種茶",
      brewTimes: [30, 20, 25, 30, 40]
    },
    {
      name: "blacktea",
      label: "紅茶",
      brewTimes: [30, 35, 40, 60]
    }
  ];
  let currentRecipe = null;

  function showRecipe(event) {
    console.log(this, event);
    currentRecipe = event.detail;
  }

  function showRecipes() {
    currentRecipe = null;
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
  <button on:click={showRecipes} style="position: absolute;">back</button>
{/if}
<h1>{title}</h1>
<div>
  {#if currentRecipe === null}
    <ul>
      {#each teaRecipes as recipe}
        <TeaRecipe {recipe} on:clickRecipe={showRecipe} />
      {/each}
    </ul>
  {:else}
    <BrewSchedule recipe={currentRecipe} />
  {/if}
</div>
