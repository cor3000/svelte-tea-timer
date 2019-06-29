<script>
  import GalleryItemBox from "./GalleryItemBox.svelte";
  import RoundButton from "./RoundButton.svelte";

  export let recipe;

  function formatTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return minutes + ":" + seconds.toString().padStart(2, "0");
  }
</script>

<style>
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
  .button-pos {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
  }
</style>

<GalleryItemBox
  on:click
  color={recipe.color}
  extraProps={{ style: 'cursor:pointer' }}>
  <div class="label1">{recipe.label}</div>
  <div class="label2">{recipe.name}</div>
  <div class="times">
    {#each recipe.brewTimes as duration}
      <span> {formatTime(duration)} </span>
    {/each}
  </div>
  <div class="button-pos">
    <RoundButton icon="arrow-right" />
  </div>
</GalleryItemBox>
