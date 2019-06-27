<script>
  export let recipe;

  const formatTime = duration => {
    const minutes = Math.floor(duration / 1000 / 60);
    const seconds = Math.floor((duration / 1000) % 60);
    const cents = Math.floor((duration / 10) % 100);
    return (
      minutes +
      ":" +
      seconds.toString().padStart(2, "0") +
      "." +
      cents.toString().padStart(2, "0")
    );
  };

  let currentIndex = 0;
  let running = false;
  let startTime = null;
  let timerId = null;
  let remainingTime = 0;
  resetTimer();

  function prev() {
    currentIndex = Math.max(currentIndex - 1, 0);
    resetTimer();
  }
  function next() {
    currentIndex = Math.min(currentIndex + 1, recipe.brewTimes.length - 1);
    resetTimer();
  }
  function finish() {
    document.getElementById("bing").play();
    next();
  }

  function resetTimer() {
    startTime = null;
    running = false;
    if (timerId !== null) {
      clearInterval(timerId);
    }
    remainingTime = recipe.brewTimes[currentIndex] * 1000;
    timerId = null;
  }
  function updateTimer() {
    remainingTime =
      recipe.brewTimes[currentIndex] * 1000 - (Date.now() - startTime);
    if (remainingTime < 0) {
      finish();
    }
  }

  function toggleTimer() {
    if (running) {
      resetTimer();
      console.log("toggle reset");
      return;
    }
    console.log("toggle start");
    resetTimer();
    running = true;
    startTime = Date.now();
    timerId = setInterval(updateTimer, recipe.brewTimes[currentIndex], 100);
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
  div.times,
  div.nav {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div.times button {
    font-size: 3em;
    margin: 0;
  }

  ul {
    display: inline-block;
    margin: 0;
    padding: 1em;
  }
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  button {
    font-size: 2em;
  }
</style>

<div class="teaLabel">{recipe.label}</div>
<audio src="Bing.mp3" id="bing" />
<div class="times">
  <ul>
    {#each recipe.brewTimes as duration, i}
      <li class={currentIndex === i ? 'current' : ''}>
         {formatTime(duration * 1000)}
      </li>
    {/each}
  </ul>
  <button on:click={toggleTimer}>{formatTime(remainingTime)}</button>
</div>
<div class="nav">
  <button on:click={prev}>prev</button>
  <button on:click={next}>next</button>
</div>
