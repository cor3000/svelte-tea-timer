<script>
  export let icon;
</script>

<style>
  i {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    position: relative;
    cursor: pointer;
  }
  i::after,
  i::before {
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

  i.menu::after {
    border-width: 1px 0;
    width: 1.6rem;
    height: 1.5rem;
  }

  i.menu::before {
    border-width: 1px 0 0 0;
    width: 1.6rem;
  }

  i.arrow::before {
    border-width: 1px 0 0 0;
    width: 2rem;
  }

  i.arrow::after {
    width: 1rem;
    height: 1rem;
    border: 1px solid #979797;
    border-left: none;
    border-bottom: none;
    transform: translate(-11%, -50%) rotate(45deg);
  }

  i.left {
    transform: rotate(180deg);
  }
  i.up {
    transform: rotate(-90deg);
  }
  i.down {
    transform: rotate(90deg);
  }
</style>

<i class={icon} on:click></i>
