<script setup>
fetch("http://localhost:3000/coupons",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {"productId": "0024096150000"}
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // results.push(...data)
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
</script>


<template>
<div class="container">
    <h1>Your Coupon Collection</h1>
</div>

</template>


<style scoped>
.container{
    background-color: #fadde1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
}
</style>