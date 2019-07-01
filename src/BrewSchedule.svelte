<script>
  import GalleryItemBox from "./GalleryItemBox.svelte";
  import { createTimer } from "./timer.js";
  import { onDestroy } from "svelte";

  export let recipe;
  export let config;

  const formatTime = duration => {
    duration = Math.abs(duration);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");
    return minutes + ":" + seconds;
  };
  const formatDecis = duration => {
    duration = Math.abs(duration);
    const decis = Math.floor(duration * 10) % 10;
    return "." + decis;
  };

  let currentIndex = 0;
  let currentOffset = 0;
  let remainingTime = 0;

  function tick(remaining) {
    remainingTime = remaining;
  }

  function finish() {
    next();
    if (config.sound === true) {
      document.getElementById("bing").play();
    }
    if (config.notifications === true) {
      if (Notification && Notification.permission === "granted") {
        const notification = new Notification("Tea Ready!!");
        setTimeout(notification.close.bind(notification), 4000);
      }
    }
  }

  const timer = createTimer(recipe.brewTimes[currentIndex].time, tick, finish);

  resetTimer();

  function prev() {
    currentIndex = Math.max(currentIndex - 1, 0);
    resetTimer();
  }
  function next() {
    currentIndex = Math.min(currentIndex + 1, recipe.brewTimes.length - 1);
    resetTimer();
  }

  function offset(seconds) {
    currentOffset += seconds;
    timer.offset(seconds);
    remainingTime = timer.remaining();
  }

  function resetTimer() {
    timer.reset(recipe.brewTimes[currentIndex]);
    timer.offset(currentOffset);
    remainingTime = timer.remaining();
  }

  function toggleTimer() {
    if (timer.isRunning()) {
      resetTimer();
    } else {
      timer.start();
    }
  }

  onDestroy(resetTimer);
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
  .current {
    color: rgb(170, 100, 78);
  }
  nav {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  button {
    background-color: #444;
    border: 1px solid #979797;
    height: 4rem;
    width: 4rem;
    color: white;
    border-radius: 50%;
    margin: 0.5rem 0;
    padding: 0;
  }
  button:focus,
  button:active {
    outline: none;
  }
  button:active {
    background-color: #666;
  }
  button.toggle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    height: 20rem;
    width: 20rem;
  }
  button.toggle > span {
    display: flex;
    align-items: baseline;
  }
  button.toggle span.decis {
    font-size: 0.75em;
  }
  button.toggle span.time-offset {
    position: absolute;
    display: block;
    width: 100%;
    text-align: center;
    top: 3rem;
    font-size: 2rem;
    color: #666;
  }
</style>

<GalleryItemBox color={recipe.color}>
  <div class="label1">{recipe.label}</div>
  <div class="label2">{recipe.name}</div>
</GalleryItemBox>
<audio src="Bing.mp3" id="bing" />
<nav>
  <button on:click={prev}>prev</button>
  <div style="font-size: 1.5rem">
    {#each recipe.brewTimes as duration, i}
      <div class={currentIndex === i ? 'current' : ''}>
         {formatTime(duration)}
      </div>
    {/each}
  </div>
  <button on:click={next}>next</button>
</nav>

<nav>
  <div>
    <button style="margin-left: 1rem;" on:click={() => offset(-5)}>-5s</button>
    <button on:click={() => offset(-10)}>-10s</button>
    <button style="margin-left: 1rem;" on:click={() => offset(-60)}>-1min</button>
  </div>
  <button class="toggle" on:click={toggleTimer}>
    <span>
      <span>{formatTime(remainingTime)}</span>
      <span class="decis">{formatDecis(remainingTime)}</span>
    </span>
    {#if currentOffset !== 0}
      <span class="time-offset">
        ({currentOffset > 0 ? '+' : '-'}{formatTime(currentOffset)})
      </span>
    {/if}
  </button>
  <div>
    <button on:click={() => offset(5)}>+5s</button>
    <button style="margin-left: 1rem;" on:click={() => offset(10)}>+10s</button>
    <button on:click={() => offset(60)}>+1min</button>
  </div>
</nav>
