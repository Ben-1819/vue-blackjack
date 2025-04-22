<template>
    <div>
        <h1>Dealers Score</h1>
        <ol>
            <li></li>
        </ol>
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
                }// If the dealers score is 17 or more then stand
                else{
                    this.stand();
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
                
            },
            aces(){

            },
            stand(){

            },
        },
    }
</script>

<style scoped>

</style>