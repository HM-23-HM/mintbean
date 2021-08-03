import { SEND_CARDS, GO_FISH, MY_TURN } from '../actions/actions'
import _ from 'lodash'


let initialState = new Map() 
initialState.set('P_1', ['init'])
initialState.set('AI_1', [])
initialState.set('AI_2', [])
initialState.set('AI_3', [])
initialState.set('remainingDeck', [''])
initialState.set('P_1_tally',{})
initialState.set('AI_1_tally',{})
initialState.set('AI_2_tally',{})
initialState.set('AI_3_tally',{})
initialState.set('P_1_sets',[''])
initialState.set('AI_1_sets',[])
initialState.set('AI_2_sets',[])
initialState.set('AI_3_sets',[])
initialState.set('P_1_turn',true)
initialState.set('AI_1_turn',false)
initialState.set('AI_2_turn',false)
initialState.set('AI_3_turn',false)

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

    initialState.set('P_1_tally',P1_tally)
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

const addFullSet = (state, setSymbol, asker) => {
    let set = state.get(`${asker}_sets`)
    set.push(setSymbol)
    state.set(`${asker}_sets`,set)

    let playerCards = state.get(asker)
    playerCards = playerCards.filter((card) => card.symbol != setSymbol)

    state.set(asker, playerCards)

    console.log("A player has a full set!")
}

const sendCards = (state, asker, beingAsked, matchingCards) => {
    let newState = _.cloneDeep(state)

    // console.log("newState ", newState)
    let askerCards = newState.get(asker)
    let beingAskedCards = newState.get(beingAsked)

    matchingCards.forEach((card) => {
        askerCards.push(card)
    })
    
    let matchingSymbol = matchingCards[0].symbol
    beingAskedCards = beingAskedCards.filter((card) => card.symbol != matchingSymbol)

    newState.set(asker, askerCards)
    newState.set(beingAsked, beingAskedCards)

    if(beingAsked == 'P_1') console.warn("beingAsked -- P1 -- cards are ", beingAskedCards)

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

    newState.set('remainingDeck', remainingDeck)
    newState.set(asker, askerCards)

    return {newState, randomCard}
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


            let askerTally = newState.get(`${asker}_tally`)
            let beingAskedTally = newState.get(`${beingAsked}_tally`)


            matchingCards.forEach((card) => {
                if(askerTally[card.symbol]){
                    askerTally[card.symbol]++
                    if (askerTally[card.symbol]==4){
                        addFullSet(newState, card.symbol, asker)
                    }
                } else { askerTally[card.symbol] = 1 }

                beingAskedTally[card.symbol]--
                
            })


            return newState
        }
            
        case GO_FISH: {
            let asker = action.asker
            let { newState, randomCard } = goFish(state, asker)

            let askerTally = newState.get(`${asker}_tally`)
            

                if(askerTally[randomCard.symbol]){
                    askerTally[randomCard.symbol]++
                    if (askerTally[randomCard.symbol]==4){
                        addFullSet(newState,randomCard.symbol, asker)
                    }
                } else { askerTally[randomCard.symbol] = 1 }
                
            // newState.set(`${asker}_tally`, askerTally)


            return newState
        }

        case MY_TURN: {
            let myTurn = action.thisPlayersTurn
            let not1 = action.not1
            let not2 = action.not2
            let not3 = action.not3
            let newState = _.cloneDeep(state)

            newState.set(myTurn, true)
            newState.set(not1, false)
            newState.set(not2, false)
            newState.set(not3, false)

            return newState
        }

        default:
            return state
    }
}

export default cardReducer