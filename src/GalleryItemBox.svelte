<script>
  let { color, onclick, extraProps = {}, children } = $props();
</script>

<style>
  div {
    position: relative;
    border: 1px solid #979797;
    color: white;
    border-radius: 0.5rem;
    padding: 0.9rem 0.9em 0.9rem 3.4rem;
    overflow: hidden;
    line-height: 1.5;
  }
  i {
    position: absolute;
    height: 100%;
    width: 0.6rem;
    top: 0;
    left: 0;
  }
</style>

<div {...extraProps} {onclick}>
  <i style="background-color: {color}"></i>
  {@render children()}
</div>
