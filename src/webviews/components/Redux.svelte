<script lang="ts">
  import type { FileType, ReducersType } from '../../types';
  import RadioFields from './subComponents/RadioFields.svelte';
  import InputFields from './subComponents/InputFields.svelte';

  let defaultEntity = {
    name: '',
    type: ''
  };

  let fileType: FileType = 'js';
  let reducerData: ReducersType = {};
  let curReducerName = '';

  const onFileTypeSelect = (event: any) =>
    (fileType = event.target.defaultValue);

  const onAddReducer = () => {
    reducerData = {
      ...reducerData,
      [curReducerName]: [defaultEntity]
    };
  };

  const onAddReducerState = (reducerName: string) => {
    console.log(JSON.stringify(reducerData[reducerName]));
    reducerData = {
      ...reducerData,
      [reducerName]: [...reducerData[reducerName], defaultEntity]
    };
  };

  $: {
    console.log(reducerData);
  }
</script>

<div class="container">
  <h1 class="heading">Redux Setup</h1>

  <div class="space">
    <h4><u>File Type: </u> ({fileType})</h4>
    <RadioFields
      styles="justify-content:flex-start;"
      items={[
        {
          value: 'js',
          label: 'Javascript'
        },
        {
          value: 'ts',
          label: 'Typescript'
        }
      ]}
      onSelect={onFileTypeSelect}
      defaultValue="js"
    />
  </div>

  <div class="space">
    <div class="space">
      <input
        bind:value={curReducerName}
        type="text"
        class="form-field"
        id={`add-reducer`}
        placeholder="new reducer name"
      />
      <button on:click={onAddReducer}>Add a new reducer</button>
    </div>
    {#each Object.values(reducerData) as states, id}
      <h4><b>{'reducer'}</b></h4>
      <InputFields
        items={states}
        onAddItem={() => onAddReducerState('abc')}
        title={'State'}
        type={'state'}
        helperText={fileType === 'ts' &&
          'enter valid typescript types. Default: any'}
        isTypeChecked={fileType === 'ts'}
      />
    {/each}
  </div>
</div>

<style>
  .heading {
    display: grid;
    justify-content: center;
  }

  .container {
    margin: 4vh 10vw 0 10vw;
  }

  .space {
    margin: 1vh;
  }
</style>
