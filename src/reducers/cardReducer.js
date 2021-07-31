import { SEND_CARDS, GO_FISH } from '../actions/actions'
import _ from 'lodash'


let initialState = new Map() 
initialState.set('P_1', [])
initialState.set('AI_1', [])
initialState.set('AI_2', [])
initialState.set('AI_3', [])
initialState.set('remainingDeck', [])
initialState.set('P1_tally',{})
initialState.set('AI_1_tally',{})
initialState.set('AI_2_tally',{})
initialState.set('AI_3_tally',{})
initialState.set('P_1_sets',{})
initialState.set('AI_1_sets',{})
initialState.set('AI_2_sets',{})
initialState.set('AI_3_sets',{})

const suites = ['Hearts','Clubs', 'Diamonds', 'Spades']
const symbols = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']

var fullDeck = []

initialState.set('remainingDeck',fullDeck)

const dealCards = () => {
    let remaining = initialState.get('remainingDeck')
    let P1cards = []
    let AI1cards = []
    let AI2cards = []
    let AI3cards = []

    let P1_tally = {}
    let AI_1_tally = {}
    let AI_2_tally = {}
    let AI_3_tally = {}

    for ( let i = 0; i < 5 ; i++ ){
        //P1
        let randomCard = getRandomCard(remaining)
        P1cards.push(randomCard)
        let cardSymbol = randomCard.symbol
        if(P1_tally[cardSymbol]){
            P1_tally[cardSymbol]++
            if (P1_tally[cardSymbol]==4){
                addFullSet(cardSymbol,'P_1_sets')
            }
        } else { P1_tally[cardSymbol] = 1 }

        remaining = remaining.filter((card) => card != randomCard)

        //AI 1
        randomCard = getRandomCard(remaining)
        AI1cards.push(randomCard)
        cardSymbol = randomCard.symbol
        if(AI_1_tally[cardSymbol]){
            AI_1_tally[cardSymbol]++
            if (AI_1_tally[cardSymbol]==4){
                addFullSet(cardSymbol,'AI_1_sets')
            }
        } else { AI_1_tally[cardSymbol] = 1 }

        remaining = remaining.filter((card) => card != randomCard)

        //AI 2
        randomCard = getRandomCard(remaining)
        AI2cards.push(randomCard)
        cardSymbol = randomCard.symbol
        if(AI_2_tally[cardSymbol]){
            AI_2_tally[cardSymbol]++
            if (AI_2_tally[cardSymbol]==4){
                addFullSet(cardSymbol,'AI_2_sets')
            }
        } else { AI_2_tally[cardSymbol] = 1 }
        remaining = remaining.filter((card) => card != randomCard)

        //AI 3
        randomCard = getRandomCard(remaining)
        AI3cards.push(randomCard)
        cardSymbol = randomCard.symbol
        if(AI_3_tally[cardSymbol]){
            AI_3_tally[cardSymbol]++
            if (AI_3_tally[cardSymbol]==4){
                addFullSet(cardSymbol,'AI_3_sets')
            }
        } else { AI_3_tally[cardSymbol] = 1 }
        remaining = remaining.filter((card) => card != randomCard)
    }

    initialState.set('P_1',P1cards)
    initialState.set('AI_1',AI1cards)
    initialState.set('AI_2',AI2cards)
    initialState.set('AI_3', AI3cards)
    initialState.set('remainingDeck',remaining)

    initialState.set('P1_tally',P1_tally)
    initialState.set('AI_1_tally',AI_1_tally)
    initialState.set('AI_2_tally',AI_2_tally)
    initialState.set('AI_3_tally',AI_3_tally)

    return initialState
}

const createFullDeck = () => {
    
    suites.forEach((suite) => {
        symbols.forEach((symbol) => {
            let card = {
                suite,
                symbol
            }
            fullDeck.push(card)
        })
        
    })
}

const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomCard = (deck) => {
    return deck[getRandomInteger(0,deck.length-1)]
}

const addFullSet = (cardSymbol,playerSet) => {
    let set = initialState.get(playerSet)
    set.push(cardSymbol)
    initialState.set(playerSet,set)

    console.log("A player has a full set!")
}

const sendCards = (state, asker, beingAsked, matchingCards) => {
    let newState = _.cloneDeep(state)
    let askerCards = newState.get(asker)
    let beingAskedCards = newState.get(beingAsked)

    matchingCards.forEach((card) => {
        askerCards.push(card)
    })
    
    let matchingSymbol = matchingCards[0].symbol
    beingAskedCards = beingAskedCards.filter((card) => card.symbol != matchingSymbol)

    newState.set(asker, askerCards)
    newState.set(beingAsked, beingAskedCards)

    return newState

}

const goFish = (state, asker) => {
    let newState = _.cloneDeep(state)
    let askerCards = newState.get(asker)
    let remainingDeck = newState.get('remainingDeck')

    let randomCard = getRandomCard(remainingDeck)
    console.log("New card from deck is ", randomCard)
    askerCards.push(randomCard)

    remainingDeck = remainingDeck.filter((card) => card != randomCard)
    // console.log(`New deck for ${asker}  is` , askerCards)

    newState.set('remainingDeck', remainingDeck)
    newState.set(asker, askerCards)

    return newState
}

createFullDeck()

dealCards()

const cardReducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_CARDS: {
            let asker = action.asker
            let beingAsked = action.beingAsked
            let matchingCards = action.matchingCards
            let newState = sendCards(state, asker, beingAsked, matchingCards)
            return newState
        }
            
        case GO_FISH: {
            let asker = action.asker
            let newState = goFish(state, asker)
            return newState
        }

        default:
            return state
    }
}

export default cardReducer