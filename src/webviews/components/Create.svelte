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

  const onSubmit = () => {
    const _props = props.map(({ name, type }) =>
      !!name
        ? {
            name,
            type
          }
        : null
    );

    const _states = states.map(({ name, type }) =>
      !!name
        ? {
            name,
            type
          }
        : null
    );

    const payload = {
      fileName,
      fileType,
      location,
      props: _props,
      states: _states
    };

    console.log(payload);
    tsvscode.postMessage({
      type: EVENTS.submit,
      value: payload
    });
  };
</script>

<div>
  <h1 class="heading">New Component</h1>
  {#if location === "new"}
    <h3 style="margin-bottom:5px;">File Path</h3>
    <input
      bind:value={fileName}
      type="text"
      class="form-field"
      id={`fileName`}
      placeholder="Enter the file path"
    />
    <h6 class="helper">(Enter relative file path wrt current file)</h6>
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
    margin-bottom: 5px;
  }

  .helper {
    margin-bottom: 1rem;
  }
</style>
