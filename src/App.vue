<template>
  <main>
    <h1>Vue Blackjack</h1>
    <p v-if="!playing">Click the button below to play</p>
    <button @click="startGame">Start</button>
    <Player v-if="playerTurn"
      :deck="this.deck"/>
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
    }
  },
  mounted () {
    // Call the setupDeck method when the component is mounted
    this.setupDeck();
    console.log(this.deck);
  },
  computed: {
    playing() {
      if(this.playerTurn == true || this.dealerTurn == true){
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
      this.deck = []
      // Set playerTurn to false
      this.playerTurn = false
      // Set dealerTurn to false
      this.dealerTurn = false
      // Call the setupDeck method
      this.setupDeck()
    },
    startGame(){
      // Set playerTurn to true to show the player component
      this.playerTurn = true
    }
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
