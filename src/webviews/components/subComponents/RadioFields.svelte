<script lang="ts">
  export let items: Array<{
    value: string;
    label: string;
  }>;
  export let onTypeSelect: (event: any) => void;
</script>

<div>
  <form class="container">
    {#each items as item}
      <div class="radio-container">
        <input
          class="radio-item"
          type="radio"
          name="fileType"
          value={item.value}
          on:click={onTypeSelect}
        />
        <span class="radio-label">{item.label}</span>
      </div>
    {/each}
  </form>
</div>

<style>
  .radio-container {
    display: flex;
    justify-content: left;
  }

  .container {
    margin-bottom: 3rem;
  }

  .radio-item {
    flex: 0.3;
  }

  .radio-label {
    flex: 1;
  }
</style>
