<script lang="ts">
    import type { FileType } from "../../types";
    import RadioFields from "./subComponents/RadioFields.svelte"

    let fileType: FileType = "js"

    const onFileTypeSelect = (event: any) =>
        fileType = event.target.defaultValue
</script>

<div class="container">
    <h1 class="heading">Redux Setup</h1>

    <div class="space">
        <h4><u>File Type: </u> ({fileType}) </h4>
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