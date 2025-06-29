<script>
  let { icon, label } = $props();
</script>

<style>
  button {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    position: relative;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
  }
  button::after,
  button::before {
    box-sizing: border-box;
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-color: #979797;
    border-style: solid;
  }

  button.menu::after {
    border-width: 1px 0;
    width: 1.6rem;
    height: 1.5rem;
  }

  button.menu::before {
    border-width: 1px 0 0 0;
    width: 1.6rem;
  }

  button.arrow::before {
    border-width: 1px 0 0 0;
    width: 2rem;
  }

  button.arrow::after {
    width: 1rem;
    height: 1rem;
    border: 1px solid #979797;
    border-left: none;
    border-bottom: none;
    transform: translate(-11%, -50%) rotate(45deg);
  }

  button.left {
    transform: rotate(180deg);
  }
  button.up {
    transform: rotate(-90deg);
  }
  button.down {
    transform: rotate(90deg);
  }
</style>

<button class={icon} on:click aria-label={label}></button>
