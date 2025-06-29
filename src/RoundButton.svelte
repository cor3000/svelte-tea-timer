<script>
  let { icon, label, onclick } = $props();
</script>

<style>
  button {
    position: relative;
    height: 3.4rem;
    width: 3.4rem;
    min-width: 3.4rem;
    min-height: 3.4rem;
    border: 1px solid #979797;
    border-radius: 50%;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
  button::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1rem;
    width: 1rem;
  }

  button.arrow-right::after,
  button.arrow-left::after {
    border: 1px solid #979797;
    border-left: none;
    border-bottom: none;
    transform: translate(-71%, -50%) rotate(45deg);
  }

  button.arrow-left::after {
    transform: translate(-29%, -50%) rotate(-135deg);
  }
</style>

<button class={icon} {onclick} type="button" aria-label={label} ></button>
