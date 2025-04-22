<template>
    <div>

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
        mounted () {
            // Call the hit method twice to give the user two starting cards
            this.hit();
            this.hit();
        },
        methods: {
            hit() {
                // Get the card at the end of the deck array
                const card = deck.pop();
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
                        case ["K", "Q", "J"].includes(rank):
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
            },
            aces(){
                // If playerScore is too high and they have aces remove them
                while(this.playerScore > 21 && playerAces > 0){
                    // Remove 10 from playerScore
                    this.playerScore -= 10;
                    // Remove 1 from playerAces
                    this.playerAces--;
                }
                return this.playerScore
            }
        },
    }
</script>

<style scoped>

</style>