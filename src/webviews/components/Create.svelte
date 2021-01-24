<script lang="ts">
  import { EVENTS } from "../../configs";
  import InputFields from "./subComponents/InputFields.svelte";
  import RadioFields from "./subComponents/RadioFields.svelte";

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
  let fileType: "js" | "ts" = "js";
  let fileName = "";
  let location: "here" | "new" = "new";

  const onAddProp = () => {
    if (props[props.length - 1].name !== "") {
      props = [...props, { ...defaultEntity }];
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

  const onTypeSelect = (event: any) => (fileType = event.target.defaultValue);
  const onLocationSelect = (event: any) =>
    (location = event.target.defaultValue);

  const onSubmit = () => console.log(props, states, fileType);
</script>

<div>
  <h1 class="heading">New Component</h1>
  {#if location === "new"}
    <h3 style="margin-bottom:5px;">File Name</h3>
    <input
      bind:value={fileName}
      type="text"
      class="form-field"
      id={`fileName`}
      placeholder="Enter the file name"
    />
  {/if}
  <h3>Location</h3>
  <RadioFields
    items={[
      {
        value: "new",
        label: "Create in a new file"
      },
      {
        value: "here",
        label: "Create here"
      }
    ]}
    onSelect={onLocationSelect}
    defaultValue="new"
  />
  <h3>File Type</h3>
  <RadioFields
    items={[
      {
        value: "js",
        label: "Javascript"
      },
      {
        value: "ts",
        label: "Typescript"
      }
    ]}
    onSelect={onTypeSelect}
    defaultValue="js"
  />
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

  .form-field {
    margin-bottom: 1rem;
  }
</style>
