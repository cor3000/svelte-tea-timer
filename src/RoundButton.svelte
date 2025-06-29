<script>
  export let icon;
</script>

<style>
  div {
    position: relative;
    height: 3.4rem;
    width: 3.4rem;
    min-width: 3.4rem;
    min-height: 3.4rem;
    border: 1px solid #979797;
    border-radius: 50%;
  }
  div::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1rem;
    width: 1rem;
  }

  div.arrow-right::after,
  div.arrow-left::after {
    border: 1px solid #979797;
    border-left: none;
    border-bottom: none;
    transform: translate(-71%, -50%) rotate(45deg);
  }

  div.arrow-left::after {
    transform: translate(-29%, -50%) rotate(-135deg);
  }
</style>

<div class={icon} on:click></div>
