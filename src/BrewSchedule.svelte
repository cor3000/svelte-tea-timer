<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import GalleryItemBox from "./GalleryItemBox.svelte";
  import { createTimer } from "./timer.js";
  import { formatTime, formatDecis } from "./format.js";
  import { hsl2hex, hex2hsl } from "./colors.js";
  import { swipe, gesture } from "./swipe.js";

  const dispatch = createEventDispatcher();

  export let recipe;
  export let config;

  let currentIndex = 0;
  let currentOffset = 0;
  let remainingTime = 0;
  let running = false;

  const timer = createTimer(recipe.brewTimes[currentIndex].time, tick, finish);
  let progressGradientElement;

  onMount(resetTimer);
  onDestroy(resetTimer);

  function swipeRecipe(event) {
    switch (event.detail.gesture) {
      case gesture.LEFT:
        switchRecipe(+1);
        break;
      case gesture.RIGHT:
        switchRecipe(-1);
        break;
    }
  }

  function switchRecipe(offset) {
    dispatch("switchRecipe", offset);
  }

  let lastProgress = -1;
  function updateProgressGradient() {
    let total = recipe.brewTimes[currentIndex] + currentOffset;
    let remaining = remainingTime;
    let color = recipe.color;

    let progress =
      total <= 0 ? 0 : Math.floor((remainingTime / total) * 100 * 5) / 5;

    if (progress === lastProgress) {
      return;
    }
    lastProgress = progress;

    if (running) {
      const hsl = hex2hsl(color);
      hsl[2] += Math.abs((Math.round(total * progress * 0.1) % 20) - 10);
      color = hsl2hex(hsl);
    }

    let colorStops = `${color}, ${color} ${progress * 1.005 -
      0.5}%, #000 ${progress * 1.005}%`;

    progressGradientElement.style.setProperty(
      "background-image",
      `linear-gradient(${colorStops}`
    );

    progressGradientElement.style.setProperty(
      "background-image",
      `conic-gradient(${colorStops}`
    );
  }

  function tick(remaining) {
    updateTimerVars(timer);
    updateProgressGradient();
  }

  function finish() {
    next();
    updateProgressGradient();
    if (config.sound === true) {
      document.getElementById("bing").play();
    }
    if (config.notifications === true) {
      if (Notification && Notification.permission === "granted") {
        const notification = new Notification("Tea Time", {
          body: "Your tea is ready.",
          vibrate: [300, 100, 100, 100, 100],
          image: "/img/teatime_4.png",
          icon: "/img/teatime_4.png",
          badge: "/img/teatime_4.png"
        });
        setTimeout(notification.close.bind(notification), 4000);
      }
    }
  }

  function prev() {
    currentIndex = Math.max(currentIndex - 1, 0);
    resetTimer();
  }
  function next() {
    currentIndex = Math.min(currentIndex + 1, recipe.brewTimes.length - 1);
    resetTimer();
  }

  function offset(seconds) {
    updateOffset(currentOffset + seconds);
  }

  function updateOffset(offset) {
    const delta = offset - currentOffset;
    currentOffset = offset;
    timer.offset(delta);
    remainingTime = timer.remaining();
  }

  function resetTimer() {
    timer.reset(recipe.brewTimes[currentIndex]);
    timer.offset(currentOffset);
    updateTimerVars(timer);
    updateProgressGradient();
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

  const keyMappings = {
    " ": toggleTimer,
    ArrowRight: next,
    ArrowLeft: prev,
    PageUp: () => switchRecipe(-1),
    PageDown: () => switchRecipe(+1),
    Backspace: () => dispatch("closeRecipe"),
    "+": () => offset(60),
    "-": () => offset(-60),
    ArrowUp: () => offset(10),
    ArrowDown: () => offset(-10)
  };

  function handleKey(event) {
    const action = keyMappings[event.key];
    if (action) {
      action();
      event.preventDefault;
    }
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
  button {
    font-weight: lighter;
    font-size: 1.4rem;
    color: white;
    border: none;
    border-radius: 50%;
    background-color: #4a4a4a;
    cursor: pointer;
  }
  button:focus,
  button:active {
    outline: none;
  }
  button:active {
    background-color: #666;
  }
  nav.times {
    margin: 2rem;
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
  div.timer-control button {
    background-color: #3e3e3e;
  }
  div.timer-control button:active {
    background-color: #555555;
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
  section div.timer {
    width: 17rem;
    height: 17rem;
    background-color: black;
    border-radius: 50%;
    padding: 0.5rem;
    font-weight: lighter;
  }
  section div.timer > div {
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
    font-size: 5.2rem;
  }
  span.time > span {
    display: flex;
    align-items: baseline;
  }
  span.time .decis {
    font-size: 4.2rem;
  }

  span.timer-offset {
    position: absolute;
    background-color: #3e3e3e;
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
  button.toggle.reset {
    color: #979797;
    font-weight: lighter;
  }
  footer {
    margin-top: 1rem;
    text-align: center;
  }
  @media (orientation: landscape) {
    nav.times,
    div.timer-control {
      max-width: 50rem;
      margin-left: auto;
      margin-right: auto;
    }

    div.timer-control {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    div.timer-control section {
      flex: 1;
    }
    section .timer-wrapper {
      order: 3;
      flex: 1;
      align-items: center;
    }
    section button {
      margin: 1rem !important;
    }
  }
</style>

<svelte:window on:keydown={handleKey} />

<div use:swipe on:swipe={swipeRecipe}>
  <GalleryItemBox color={recipe.color}>
    <div class="label1">{recipe.label}</div>
    <div class="label2">{recipe.name}</div>
  </GalleryItemBox>
</div>
<audio src="Bing.mp3" id="bing" />
<nav class="times">
  <button on:click={prev}>Prev</button>
  <ul>
    {#each recipe.brewTimes as duration, i}
      <li class:current={currentIndex === i}>{formatTime(duration)}</li>
    {/each}
  </ul>
  <button on:click={next}>Next</button>
</nav>
<div class="timer-control">
  <section>
    <div>
      <button style="margin-left: 2rem;" on:click={() => offset(-5)}>
        -5s
      </button>
      <button on:click={() => offset(-10)}>-10s</button>
      <button style="margin-left: 2rem;" on:click={() => offset(-60)}>
        -1min
      </button>
    </div>
    <div class="timer-wrapper">
      <div
        bind:this={progressGradientElement}
        class="timer"
        on:click={toggleTimer}>
        <div>
          <span class="time">
            <span>
              <span>{formatTime(remainingTime)}</span>
              <span class="decis">{formatDecis(remainingTime)}</span>
            </span>
          </span>
          {#if currentOffset !== 0}
            <span class="timer-offset">
              {currentOffset > 0 ? '+' : '-'}{formatTime(currentOffset)}
            </span>
          {/if}
        </div>
      </div>
    </div>
    <div>
      <button on:click={() => offset(5)}>+5s</button>
      <button style="margin-left: 2rem;" on:click={() => offset(10)}>
        +10s
      </button>
      <button on:click={() => offset(60)}>+1min</button>
    </div>
  </section>
  <footer>
    <button class="toggle" class:reset={running} on:click={toggleTimer}>
      {running ? 'RESET' : 'GO'}
    </button>
  </footer>
</div>
