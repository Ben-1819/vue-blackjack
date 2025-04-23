<template>
  <main>
    <h1>Vue Blackjack</h1>
    <p v-show="!playing">Click the button below to play</p>
    <button v-show="!playing" @click="startGame">Start</button>
    <Player v-if="playerTurn"
      :deck="this.deck"
      @playerDone="swapTurn"/>
    <Dealer v-if="dealerTurn" 
      :deck="this.deck"
      @dealerDone="showResults"/>
      <Results v-if="gameOver" 
        :player-score="this.playerScore"
        :dealer-score="this.dealerScore"
        :player-cards="this.playerCards"
        :dealer-cards="this.dealerCards"
        @gameFinished="resetGame"/>
  </main>
</template>

<script>
export default{
  data() {
    return {
      // Create the suits array
      suits: ["Hearts", "Spades", "Clubs", "Diamonds"],
      // Create the values array
      values: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
      // Create the deck array
      deck: [],
      // Create the playerTurn variable and set it to false
      playerTurn: false,
      // Create the dealerTurn variable and set it to false
      dealerTurn: false,
      // Create the gameOver variable and set it to false
      gameOver: false,
      // Create the playerCards variable and set it to null
      playerCards: null,
      // Create the playerScore variable and set it to null
      playerScore: null,
      // Create the dealerCards variable and set it to null
      dealerCards: null,
      // Create the dealerScore variable and set it to null
      dealerScore: null,
    }
  },
  mounted () {
    // Call the setupDeck method when the component is mounted
    this.setupDeck();
    console.log(this.deck);
  },
  computed: {
    playing() {
      if(this.playerTurn == true || this.dealerTurn == true || this.gameOver == true){
        return true;
      }else{
        return false;
      }
    }
  },
  methods: {
    setupDeck() {
      // Loop through the suits array
      this.suits.forEach((suit) => {
        // Loop through the values array
        this.values.forEach((value) => {
          // Create the card variable
          const card = ""+value+" of "+suit+""
          // Push the card variable to the deck
          this.deck.push(card);
        });
      });
      //Use the Fisher-Yates algorithim to shuffle the deck
      // Create variables for the index value, the random number and the temporary value
      let i = this.deck.length, j, temp;
      while(--i > 0){
        // Create a random number and store it in a variable
        j = Math.floor(Math.random() * (i + 1));
        // Create a temporary position for the item of the random number
        temp = this.deck[j];
        // Swap the temp item with the position of the last item in the array
        this.deck[j] = this.deck[i];
        // Swap the last item with the position of the temp item
        this.deck[i] = temp;
      }
    },
    resetGame(){
      // Set the deck array back to empty
      this.deck = [];
      // Set playerTurn to false
      this.playerTurn = false;
      // Set dealerTurn to false
      this.dealerTurn = false;
      // Set gameOver to false
      this.gameOver = false;
      // Call the setupDeck method
      this.setupDeck()
    },
    startGame(){
      // Set playerTurn to true to show the player component
      this.playerTurn = true
    },
    swapTurn(deck, playerData){
      // Set deck to the deck passed back by Player.vue
      this.deck = deck;
      // Set playerScore to the first index of playerData
      this.playerScore = playerData[0];
      // Set playerCards to the second index of playerData
      this.playerCards = playerData[1];
      console.log("Player score in App.vue:"+this.playerScore);
      console.log("Player cards in App.vue:"+this.playerCards);
      // Set dealerTurn to true
      this.dealerTurn = true;
    },
    showResults(dealerData){
      // Set dealerScore to be the first index of dealerData
      this.dealerScore = dealerData[0];
      // set dealerCards to be the second index of dealerData
      this.dealerCards = dealerData[1];
      console.log("Dealer score in App.vue:"+this.dealerScore);
      console.log("Dealer cards in App.vue:"+this.dealerCards);
      setTimeout(() => {
        // Set playerTurn to false
        this.playerTurn = false;
        // Set dealerTurn to false
        this.dealerTurn = false;
        // set gameOver to true
        this.gameOver = true;
      }, 5000)
      
    },
  },
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
