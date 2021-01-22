<script lang="ts">
    let numProps = 1;
    let numState = 1;

    const onAddProp = () => numProps+=1;
    const onAddState = () => numState+=1;
</script>

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

<div>
    <h1 class="heading">New Component</h1>
    <h3>Props</h3>
    <form>
        {#each Array(numProps) as _, id}
            <div class="form-container">
                <input type="text" class="form-field" id={`prop-name-${id}`} style="margin-right:5px;"/>
                <input type="text" class="form-field" id={`prop-type-${id}`}/>
            </div>
        {/each}
        <button on:click={onAddProp}>
            add prop
        </button>
    </form>
    <h3 style="margin-top:3rem;">State</h3>
    <form>
        {#each Array(numState) as _, id}
            <div class="form-container">
                <input type="text" class="form-field" id={`state-name-${id}`} style="margin-right:5px;"/>
                <input type="text" class="form-field" id={`state-type-${id}`}/>
            </div>
        {/each}
        <button on:click={onAddState}>
            add state
        </button>
    </form>
    <button type="submit" class="create">Create</button>
</div>