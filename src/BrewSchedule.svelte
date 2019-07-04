<script>
  import GalleryItemBox from "./GalleryItemBox.svelte";
  import { createTimer } from "./timer.js";
  import { formatTime } from "./format.js";
  import { onDestroy } from "svelte";

  export let recipe;
  export let config;

  let currentIndex = 0;
  let currentOffset = 0;
  let remainingTime = 0;
  let running = false;
  $: progressGradient = calculateProgressGradient(
    recipe.brewTimes[currentIndex] + currentOffset,
    remainingTime,
    recipe.color
  );

  const timer = createTimer(recipe.brewTimes[currentIndex].time, tick, finish);

  function calculateProgressGradient(total, remaining, color) {
    let progress =
      total <= 0 ? 0 : Math.floor((1 - remainingTime / total) * 100 * 5) / 5;

    let colorStops = `${color}, ${color} ${progress * 1.05 - 5}%, #000 ${progress * 1.05}%`;
    return `background-image: linear-gradient(${colorStops});` + `background-image: conic-gradient(${colorStops});`;
  }

  function tick(remaining) {
    updateTimerVars(timer);
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
    updateTimerVars(timer);
  }

  function updateTimerVars(timer) {
    remainingTime = timer.remaining();
    running = timer.isRunning();
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
  button {
    font-weight: lighter;
    font-size: 1.4rem;
    color: white;
    border: none;
    border-radius: 50%;
    background-color: #4a4a4a;
  }
  button:focus,
  button:active {
    outline: none;
  }
  button:active {
    background-color: #666;
  }
  nav.times {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav.times ul {
    font-size: 1.4rem;
    list-style: none;
    padding: 0;
    margin: 0;
    color: #979797;
    text-align: center;
  }
  nav.times li {
    display: inline-block;
    margin: 0.3rem 0.5rem;
  }
  nav.times li.current {
    font-weight: bold;
    color: white;
  }
  nav.times button {
    font-weight: normal;
    font-size: 1.8rem;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  section > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  section button {
    width: 4.5rem;
    height: 4.5rem;
    text-align: center;
    padding: 0;
    margin: 1rem 0;
  }
  section > div.timer {
    width: 17rem;
    height: 17rem;
    background-color: black;
    border-radius: 50%;
    padding: 0.5rem;
    font-weight: lighter;
  }
  section > div.timer > div {
    position: relative;
    width: 16rem;
    height: 16rem;
    background-color: #333333;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span.time {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 6rem;
  }
  span.time-offset {
    position: absolute;
    background-color: #4a4a4a;
    top: 11.5rem;
    font-size: 1.4rem;
    padding: 0.4rem 1.5rem;
    border-radius: 1.1rem;
  }
  button.toggle {
    width: 10rem;
    height: 10rem;
    text-align: center;
    font-size: 2rem;
    font-weight: normal;
  }
  footer {
    margin-top: 1rem;
    text-align: center;
  }
</style>

<GalleryItemBox color={recipe.color}>
  <div class="label1">{recipe.label}</div>
  <div class="label2">{recipe.name}</div>
</GalleryItemBox>
<audio src="Bing.mp3" id="bing" />
<nav class="times">
  <button on:click={prev}>Prev</button>
  <ul>
    {#each recipe.brewTimes as duration, i}
      <li class:current={currentIndex === i}> {formatTime(duration)} </li>
    {/each}
  </ul>
  <button on:click={next}>Next</button>
</nav>

<section>
  <div>
    <button style="margin-left: 2rem;" on:click={() => offset(-5)}>-5s</button>
    <button on:click={() => offset(-10)}>-10s</button>
    <button style="margin-left: 2rem;" on:click={() => offset(-60)}>
      -1min
    </button>
  </div>
  <div class="timer" on:click={toggleTimer} style={progressGradient}>
    <div>
      <span class="time">{formatTime(remainingTime)}</span>
      {#if currentOffset !== 0}
        <span class="time-offset">
           {currentOffset > 0 ? '+' : '-'}{formatTime(currentOffset)}
        </span>
      {/if}
    </div>
  </div>
  <div>
    <button on:click={() => offset(5)}>+5s</button>
    <button style="margin-left: 2rem;" on:click={() => offset(10)}>+10s</button>
    <button on:click={() => offset(60)}>+1min</button>
  </div>
</section>
<footer>
  <button class="toggle" on:click={toggleTimer}>
     {running ? 'RESET' : 'GO'}
  </button>
</footer>
