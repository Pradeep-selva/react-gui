<script lang="ts">
  import { EVENTS } from "../../configs";
  import InputFields from "./subComponents/InputFields.svelte";

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
    if (props[props.length - 1].name !== "") {
      props = [
        ...props,
        {
          ...defaultEntity
        }
      ];
    } else {
      tsvscode.postMessage({
        type: EVENTS.error,
        value: "Complete adding the previous prop to add a new one"
      });
    }
  };

  const onAddState = () => {
    if (states[states.length - 1].name !== "") {
      states = [
        ...states,
        {
          ...defaultEntity
        }
      ];
    } else {
      tsvscode.postMessage({
        type: EVENTS.error,
        value: "Complete adding the previous state to add a new one"
      });
    }
  };

  const onSubmit = () => console.log(props, states);
</script>

<div>
  <h1 class="heading">New Component</h1>
  <InputFields
    items={props}
    onAddItem={onAddProp}
    title={"Props"}
    type={"props"}
  />
  <InputFields
    items={states}
    onAddItem={onAddState}
    title={"State"}
    type={"state"}
  />
  <button class="create" on:click={onSubmit}>Create</button>
</div>

<style>
  .heading {
    margin-bottom: 3rem;
  }

  .create {
    margin-top: 3rem;
  }
</style>
