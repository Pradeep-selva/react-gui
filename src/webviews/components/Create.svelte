<script lang="ts">
  import type {
    IEntities,
    FileType,
    ComponentType,
    LocationType,
    TypeCheckType
  } from "../../types";
  import { EVENTS } from "../../configs";
  import validate from "./Validate";
  import InputFields from "./subComponents/InputFields.svelte";
  import RadioFields from "./subComponents/RadioFields.svelte";

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
  let fileType: FileType = "js";
  let componentType: ComponentType = "rfc";
  let location: LocationType = "here";
  let typeChecking: TypeCheckType = "none";
  let fileName = "";
  let componentName = "";

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
  const onTypeCheckSelect = (event: any) =>
    (typeChecking = event.target.defaultValue);

  const onSubmit = () => {
    const _props = props.map(({ name, type }) =>
      !!name
        ? {
            name,
            type: !!type ? type : "any"
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
      props: (!!_props[0] ? _props : []) as IEntities,
      states: (!!_states[0] ? _states : []) as IEntities,
      initPropTypes: typeChecking === "propTypes",
      initDefFile: typeChecking === "definition"
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
  <h2 class="heading">New Component</h2>
  {#if location === "new"}
    <h3 style="margin-bottom:5px;">File Name</h3>
    <h6 class="helperText">
      (file will be created in same dir as active file.)
    </h6>
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
        value: "here",
        label: "Create here"
      },
      {
        value: "new",
        label: "Create in a new file"
      }
    ]}
    onSelect={onLocationSelect}
    defaultValue="here"
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
  {#if fileType === "js"}
    <h3>Type Checking</h3>
    <RadioFields
      items={[
        {
          value: "none",
          label: "None"
        },
        {
          value: "propTypes",
          label: "PropTypes"
        },
        {
          value: "definition",
          label: ".d.ts file"
        }
      ]}
      onSelect={onTypeCheckSelect}
      defaultValue="none"
    />
  {/if}
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
    isTypeChecked={(fileType === "js" && typeChecking !== "none") ||
      fileType === "ts"}
  />
  <InputFields
    items={states}
    onAddItem={onAddState}
    title={"State"}
    type={"state"}
    isTypeChecked={fileType === "ts"}
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

  .helperText {
    padding: 0.5rem 0;
  }
</style>
