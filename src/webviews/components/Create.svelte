<script lang="ts">
  type IEntities = Array<{ name: string; type: string }>;

  const defaultEntity = {
    name: "",
    type: ""
  };

  let props: IEntities = [
    {
      ...defaultEntity
    }
  ];
  let states: IEntities = [
    {
      ...defaultEntity
    }
  ];

  const onAddProp = () => {
    props = [
      ...props,
      {
        ...defaultEntity
      }
    ];
    console.log(props);
  };

  const onAddState = () => {
    states = [
      ...states,
      {
        ...defaultEntity
      }
    ];
  };

  const onSubmit = () => console.log(props, states);
</script>

<div>
  <h1 class="heading">New Component</h1>
  <h3>Props</h3>
  <form>
    {#each props as prop, id}
      <div class="form-container">
        <input
          bind:value={prop.name}
          type="text"
          class="form-field"
          id={`prop-name-${id}`}
          style="margin-right:5px;"
        />
        <input
          bind:value={prop.type}
          type="text"
          class="form-field"
          id={`prop-type-${id}`}
        />
      </div>
    {/each}
    <button on:click={onAddProp}> add prop </button>
  </form>
  <h3 style="margin-top:3rem;">State</h3>
  <form>
    {#each states as state, id}
      <div class="form-container">
        <input
          bind:value={state.name}
          type="text"
          class="form-field"
          id={`state-name-${id}`}
          style="margin-right:5px;"
        />
        <input
          bind:value={state.type}
          type="text"
          class="form-field"
          id={`state-type-${id}`}
        />
      </div>
    {/each}
    <button on:click={onAddState}> add state </button>
  </form>
  <button class="create" on:click={onSubmit}>Create</button>
</div>

<style>
  .heading {
    margin-bottom: 3rem;
  }

  .form-container {
    display: flex;
    justify-content: space-between;
  }

  .form-field {
    flex: 1;
  }

  .create {
    margin-top: 3rem;
  }
</style>
