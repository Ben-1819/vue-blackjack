<template>
    <div>
        <h1>Dealers Hand</h1>
        <ol>
            <li v-for="card in dealerCards">{{ card }}</li>
        </ol>
        <p>Dealers Score: {{ dealerScore }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dealerScore: 0,
                dealerCards: [],
                dealerAces: 0,
            }
        },
        watch: {
            dealerScore() {
                // If dealers score is less than 17 then hit
                if(this.dealerScore < 17){
                    this.hit()
                }
                // If the dealers score is between 17 and 21 then stand
                else if(this.dealerScore >= 17 && this.dealerScore <= 21){
                    this.stand();
                }
                // If the dealers score is greater than 21 call the aces method
                else if(this.dealerScore > 21){
                    this.aces();
                    // If dealerScore is still greater than 21 then stand
                    if(this.dealerScore > 21){
                        this.stand();
                    }
                }
            }
        },
        mounted () {
            // Call the hit method twice to get the dealers starting cards
            this.hit();
            this.hit();
        },
        props: {
            deck: {
                type: Array,
            },
        },
        methods: {
            hit() {
                // Get the card at the end of the deck array
                const card = this.deck.pop();
                // Push the removed card into the dealerCards array
                this.dealerCards.push(card);
                // Calculate the dealers score 
                this.calculateScore();
            },
            calculateScore(){
                // Set the dealers score to 0
                this.dealerScore = 0;
                // Set dealerAces to 0
                this.dealerAces = 0;
                // loop through each index of the dealerCards array
                this.dealerCards.forEach((card)=>{
                    // Use split to get the rank of the card
                    const rank = card.split(" ")[0]
                    console.log(rank);
                    // Check the rank of the card
                    switch(rank){
                        // If the card is an ace
                        case "A":
                            // Add 11 to dealerScore
                            this.dealerScore += 11;
                            // Increase dealerAces
                            this.dealerAces++;
                            // Break out of the switch statement
                            break;
                        // If the card is a king
                        case "K":
                            // Fallthrough to if the card is a queen
                        // If the card is a queen
                        case "Q":
                            // Fallthrough to if the card is a jack
                        // If the card is a jack
                        case "J":
                            // Add 10 to dealerScore
                            this.dealerScore += 10;
                            // Break out of the switch statement
                            break;
                        // If the card is a normal card
                        default:
                            // Use Number() to convert the rank of the card to an integer
                            // And add it to dealerScore
                            this.dealerScore += Number(rank);
                    }
                });
                // Call the aces method
                this.aces()
            },
            aces(){
                // If dealerScore is too high and they have aces remove them
                while(this.dealerScore > 21 && this.dealerAces > 0){
                    // Remove 10 from dealerScore
                    this.dealerScore -= 10;
                    // Remove 1 from dealerAces
                    this.dealerAces--;
                }
                // Return dealerScore
                return this.dealerScore
            },
            stand(){
                // Create the variable dealerData
                const dealerData = [this.dealerScore, this.dealerCards];
                // Emits the custom event dealerDone
                this.$emit("dealerDone", dealerData);
            },
        },
    }
</script>

<style scoped>

</style>