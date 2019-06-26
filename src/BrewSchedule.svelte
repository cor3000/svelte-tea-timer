<script>
  export let recipe;

  const formatTime = duration => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return minutes + ":" + seconds.toString().padStart(2, "0");
  };

  let currentIndex = 0;
  let running = false;
  let timerId = null;

  function stop() {
    running = false;
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = null;
  }
  function prev() {
    stop();
    currentIndex = Math.max(currentIndex - 1, 0);
  }
  function next() {
    stop();
    currentIndex = Math.min(currentIndex + 1, recipe.brewTimes.length - 1);
  }
  function finish() {
    console.log("DONE");
    next();
  }
  function start() {
    stop();
    running = true;
    timerId = setTimeout(finish, recipe.brewTimes[currentIndex] * 100);
  }
</script>

<style>
  .teaLabel {
    background-color: DarkGreen;
    color: white;
    font-size: 3rem;
    line-height: 1.5em;
    vertical-align: middle;
    border-radius: 0.25em;
    text-align: center;
    margin: 0.5rem;
    padding: 0;
  }
  .current {
    color: red;
  }
</style>

<div class="teaLabel">{recipe.label}</div>
<ul>
  {#each recipe.brewTimes as duration, i}
    <li class={currentIndex === i ? 'current' : ''}>
       {formatTime(duration)}
    </li>
  {/each}
</ul>
<button on:click={prev}>prev</button>
{#if !running}
  <button on:click={start}>start</button>
{/if}
<button on:click={next}>next</button>
