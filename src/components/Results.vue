<template>
    <div>
        <h1>Results</h1>
        <p>Player Score: {{ playerScore }}</p>
        <p>Dealer Score: {{ dealerScore }}</p>
        <p v-show="this.winner != null">The winner is: {{ winner }}<br>{{ winner }} won because: {{ reason }}</p>
        <button v-show="this.showHome" @click="gameEnd">Back to home</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Create the winner variable and set it to null
                winner: null,
                // Create the reason variable and set it to null
                reason: null,
                // Create showHome variable and set it to false
                showHome: false,
            }
        },
        mounted () {
            this.getWinner();
            setTimeout(() => {
                this.showHome = true
            }, 2000)
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
        methods: {
            getWinner() {
                // Check if playerScore is above 21 and dealerScore is above 21
                if(this.playerScore > 21 && this.dealerScore > 21){
                    // Set the winner variable to Dealer
                    this.winner = "Dealer";
                    // Set the reason variable to an explanation of why the dealer won
                    this.reason = "Both the dealer and player are bust, the dealer wins.";
                }// Check if playerScore is greater than 21 and dealerScore is 21 or less
                else if(this.playerScore > 21 && this.dealerScore <= 21){
                    // Set the winner variable to Dealer
                    this.winner = "Dealer";
                    // Set the reason variable to an explanation of why the dealer won
                    this.reason = "The player is bust, the dealer wins";
                }// Check if playerScore is 21 or less and dealerScore is greater than 21
                else if(this.playerScore <= 21 && this.dealerScore > 21){
                    // Set the winner variable to Player
                    this.winner = "Player";
                    // Set the reason variable to an explanation of why the player won
                    this.reason = "The dealer is bust, the player wins";
                }// Check if playerScore and dealerScore are equal
                else if(this.playerScore === this.dealerScore){
                    // Set the winner variable to Dealer
                    this.winner = "Dealer";
                    // Set the reason variable to an explanation of why the dealer won
                    this.reason = "The player and dealer have the same score, the dealer wins";
                }// Check if playerScore is lower than dealerScore
                else if(this.playerScore < this.dealerScore){
                    // Set the winner variable to Dealer
                    this.winner = "Dealer";
                    // Set the reason variable to an explanation of why the dealer won
                    this.reason = "Both the player and dealer scored below 21 and the dealer scored higher than the player, dealer wins";
                }// Check if playerScore is higher than dealerScore
                else if(this.playerScore > this.dealerScore){
                    // Set the winner variable to Player
                    this.winner = "Player";
                    // Set the reason variable to an explanation of why the player won
                    this.reason = "Both the player and the dealer scored below 21 and the player scored higher than the dealer, player wins";
                }
            },
            gameEnd(){
                // Emit the custom event gameFinished back to App.vue
                this.$emit("gameFinished");
            },
        },
    }
</script>

<style scoped>

</style>