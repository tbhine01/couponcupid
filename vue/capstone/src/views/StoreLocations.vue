<script setup>


</script>


<template>
<div class="container">
    <input type="text" name="search" id="search" placeholder="Enter your zipcode to find stores near you">
    <button>Submit</button>

    <div class="list">
        Return list of stores
    </div>
</div>

</template>


<style scoped>
.container{
    background-color: #ff4d6d;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 2rem;
}

#search{
    width: 25rem;
    border-radius: 1rem;
    text-align: center;
}

.list{
    padding: 2rem;
}

</style>