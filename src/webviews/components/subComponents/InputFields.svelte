<script lang="ts">
  export let onAddItem: () => void;
  export let type: "props" | "state";
  export let title: string;
  export let items: Array<any>;
  export let fileType: "js" | "ts";
</script>

<div>
  <h3>{title}</h3>
  {#if fileType === "js" && type === "props"}
    <h6 class="helperText">(enter valid react prop types. Default: any)</h6>
  {/if}
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
        {#if fileType === "ts" || type === "props"}
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

  .helperText {
    padding: 0.5rem 0;
  }
</style>
