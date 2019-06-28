<script>
  import { createEventDispatcher } from "svelte";
  import { recipeBg } from "./dynStyles.js";

  const dispatch = createEventDispatcher();

  export let recipe;

  const bgStyle = recipeBg(recipe);

  function clickRecipe(event) {
    dispatch("clickRecipe", recipe);
  }

  function formatTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return minutes + ":" + seconds.toString().padStart(2, "0");
  }
</script>

<style>
  div.gallery-item {
    position: relative;
    border: 1px solid #979797;
    color: white;
    border-radius: 6px;
    height: 81px;
    margin: 8px 0;
    padding: 9px 50px 9px 34px;
    overflow: hidden;
  }
  .color {
    height: 100%;
    width: 6px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .label2 {
    font-size: 1.6rem;
  }
  .times {
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
  }
  .times::after {
    content: "";
    width: 40%;
    height: 1.4em;
    position: absolute;
    background-image: linear-gradient(to right, transparent, #333333);
    right: 50px;
    bottom: 9px;
  }
  span {
    margin-right: 0.5rem;
  }
  .round-next {
    position: absolute;
    top: 24px;
    right: 24px;
    height: 32px;
    width: 32px;
    border: 1px solid #979797;
    border-radius: 50%;
  }
  .round-next::after {
    content: '';
    display: block;
    position: absolute;
    top: 9px;
    left: 7px;
    height: 10px;
    width: 10px;
    border: 1px solid #979797;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg);
  }
</style>

<div class="gallery-item" on:click={clickRecipe}>
  <div class="color" {...bgStyle} />
  <div class="label1">{recipe.label}</div>
  <div class="label2">{recipe.name}</div>
  <div class="times">
    {#each recipe.brewTimes as duration}
      <span> {formatTime(duration)} </span>
    {/each}
  </div>
  <div class="round-next" />
</div>
