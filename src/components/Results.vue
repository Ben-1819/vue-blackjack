<template>
    <div>
        <h1>Results</h1>
        <p>Player Score: {{ playerScore }}</p>
        <p>Dealer Score: {{ dealerScore }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Create the winner variable and set it to null
                winner: null,
            }
        },
        props: {
            // playerScore prop, contains the playerScore variable
            playerScore: {
                type: Number,
            },
            // dealerScore prop, contains the dealerScore variable
            dealerScore: {
                type: Number,
            },
            // playerCards prop, contains the playerCards variable
            playerCards:{
                type: Array,
            },
            // dealerCards prop, contains the dealerCards variable
            dealerCards:{
                type: Array,
            },
        },
    }
</script>

<style scoped>

</style>