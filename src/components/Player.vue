<template>
    <div>
        <h1>Players cards</h1>
        <ol>
            <li v-for="card in playerCards">{{ card }}</li>
            <p>{{ playerScore }}</p>
            <button v-if="lowEnough" @click="hit">Hit</button><button v-if="lowEnough" @click="stand">Stand</button>
        </ol>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // Create playerCards array, it is empty at the start
                playerCards: [],
                // Create the playerScore variable, it begins at 0
                playerScore: 0,
                // Create the playerAces variable, it begins at 0
                playerAces: 0,
            }
        },
        props: {
            deck: {
                type: Array,
            },
        },
        watch: {
            playerScore() {
                // Check if players score is greater than 21
                if(this.playerScore > 21){
                    // If players score is greater than 21 call the aces function
                    this.aces()
                    // Check if players score is still greater than 21
                    if(this.playerScore > 21){
                        // If players score is still greater than 21 stand
                        this.stand()
                    }
                }
            }
        },
        computed: {
            lowEnough() {
                if(this.playerScore <= 21){
                    return true;
                }else{
                    return false;
                }
            }
        },
        mounted () {
            // Call the hit method twice to give the user two starting cards
            this.hit();
            this.hit();
            console.log("Player.vue mounted")
            this.calculateScore();
        },
        methods: {
            hit() {
                // Get the card at the end of the deck array
                const card = this.deck.pop();
                // Push the removed card into the playerCards array
                this.playerCards.push(card);
                // Call the calculateScore method
                this.calculateScore()
            },
            calculateScore(){
                // Set playerScore to 0
                this.playerScore = 0
                // Set playerAces to 0
                this.playerAces = 0
                // Loop through each index of the playerCards array
                this.playerCards.forEach((card) => {
                    // Use split to get the rank of the card
                    const rank = card.split(" ")[0]
                    console.log(rank);
                    // Check the rank of the card
                    switch(rank){
                        // If the card is an ace
                        case "A":
                            // Add 11 to playerScore
                            this.playerScore += 11;
                            // Add 1 to playerAces
                            this.playerAces++;
                            // Break out of the switch statement
                            break;
                        // If the card is a face card
                        case "K":
                        case "Q":
                        case "J":
                            // Add 10 to playerScore
                            this.playerScore += 10;
                            // Break out of the switch statement
                            break;
                        // If the card is a regular card
                        default:
                            // Add the equivalent of the cards rank to playerScore
                            this.playerScore += Number(rank);
                    }
                });
                this.aces();
            },
            aces(){
                // If playerScore is too high and they have aces remove them
                while(this.playerScore > 21 && this.playerAces > 0){
                    // Remove 10 from playerScore
                    this.playerScore -= 10;
                    // Remove 1 from playerAces
                    this.playerAces--;
                }
                return this.playerScore
            },
            stand(){
                // Emits the custom event playerDone and sends the variable deck back
                // To App.vue
                this.$emit("playerDone", this.deck);
                this.lowEnough = false;
            },
        },
    }
</script>

<style scoped>

</style>