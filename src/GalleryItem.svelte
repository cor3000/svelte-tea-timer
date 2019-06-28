<script>
  import { createEventDispatcher } from "svelte";
  import { recipeBg } from "./dynStyles.js";

  const dispatch = createEventDispatcher();

  export let recipe;

  const colorStyle = recipeBg(recipe);

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
    padding: 0.9rem 6rem 0.9rem 3.4rem;
    overflow: hidden;
    line-height: 1.5;
  }
  /*
  div.gallery-item-bg {
    position: absolute;
    font-size: 10rem;
    font-weight: 800;
    opacity: 0.06;
    top: -0.5em;
    left: 0;
    transform: rotate(-10deg);
  }
  */

  .color {
    height: 100%;
    width: 0.6rem;
    position: absolute;
    top: 0;
    left: 0;
  }
  .label1 {
    font-size: 1.4rem;
    white-space: nowrap;
  }
  .label2 {
    font-size: 1.6rem;
    white-space: nowrap;
  }
  .times {
    font-size: 1.4rem;
    white-space: nowrap;
  }
  .times::after {
    position: absolute;
    display: block;
    content: "";
    width: 12rem;
    height: 100%;
    right: 0;
    top: 0;
    background-image: linear-gradient(
      to right,
      rgba(51, 51, 51, 0),
      rgba(51, 51, 51, 1),
      rgba(51, 51, 51, 1)
    );
  }
  span {
    margin-right: 0.3rem;
  }
  .round-next {
    position: absolute;
    top: 50%;
    margin-top: -1.7rem;
    right: 2rem;
    height: 3.4rem;
    width: 3.4rem;
    border: 1px solid #979797;
    border-radius: 50%;
  }
  .round-next::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1rem;
    width: 1rem;
    border: 1px solid #979797;
    border-left: none;
    border-bottom: none;
    transform: translate(-71%, -50%) rotate(45deg);
  }
</style>

<div class="gallery-item" on:click={clickRecipe}>
  <!-- <div class="gallery-item-bg" style="color: {recipe.color}">
     {recipe.label}
  </div> -->
  <div class="color" {...colorStyle} />
  <div class="label1">{recipe.label}</div>
  <div class="label2">{recipe.name}</div>
  <div class="times">
    {#each recipe.brewTimes as duration}
      <span> {formatTime(duration)} </span>
    {/each}
  </div>
  <div class="round-next" />
</div>
