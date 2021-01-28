<script lang="ts">
  export let onAddItem: () => void;
  export let type: "props" | "state";
  export let title: string;
  export let items: Array<any>;
  export let fileType: "js" | "ts";
</script>

<div>
  <h3>{title}</h3>
  <form>
    {#each items as item, id}
      <div class="form-container">
        <input
          bind:value={item.name}
          type="text"
          class="form-field"
          id={`${type}-name-${id}`}
          style="margin-right:5px;"
          placeholder="name"
        />
        {#if fileType === "ts"}
          <input
            bind:value={item.type}
            type="text"
            class="form-field"
            id={`${type}-type-${id}`}
            placeholder="type"
          />
        {/if}
      </div>
    {/each}
    <button on:click={onAddItem}> add {type}</button>
  </form>
</div>

<style>
  .form-container {
    display: flex;
    justify-content: space-between;
  }

  .form-field {
    flex: 1;
  }
</style>
