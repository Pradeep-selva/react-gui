<script lang="ts">
  import { EVENTS } from "../../configs";
  import validate from "./Validate";
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
  let componentType: "rfc" | "rcc" = "rfc";
  let fileName = "";
  let componentName = "";
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

  const onFileTypeSelect = (event: any) =>
    (fileType = event.target.defaultValue);
  const onComponentTypeSelect = (event: any) =>
    (componentType = event.target.defaultValue);
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
      componentName,
      fileType,
      location,
      componentType,
      props: !!_props[0] ? _props : [],
      states: !!_states[0] ? _states : []
    };
    const validatedResult = validate(payload);

    if (!validatedResult) {
      tsvscode.postMessage({
        type: EVENTS.submit,
        value: payload
      });
    } else {
      tsvscode.postMessage({
        type: EVENTS.error,
        value: validatedResult
      });
    }
  };
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
  <h3 style="margin:1rem 0 5px 0;">Component Name</h3>
  <input
    bind:value={componentName}
    type="text"
    class="form-field"
    style="margin-bottom:2rem;"
    id={`componentName`}
    placeholder="Enter the component's name'"
  />
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
    onSelect={onFileTypeSelect}
    defaultValue="js"
  />
  <h3>Component Type</h3>
  <RadioFields
    items={[
      {
        value: "rfc",
        label: "Functional"
      },
      {
        value: "rcc",
        label: "Class"
      }
    ]}
    onSelect={onComponentTypeSelect}
    defaultValue="rfc"
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
</style>
