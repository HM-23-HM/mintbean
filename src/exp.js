initialState = new Map() 
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

createFullDeck = () => {
    
    suites.forEach((suite) => {
        symbols.forEach((symbol) => {
            card = {
                suite,
                symbol
            }
            fullDeck.push(card)
        })
        
    })
}

getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomCard = (deck) => {
    return deck[getRandomInteger(0,deck.length-1)]
}

addFullSet = (cardSymbol,playerSet) => {
    let set = initialState.get(playerSet)
    set.push(cardSymbol)
    initialState.set(playerSet,set)

    console.log("A player has a full set!")
}

initialState.set('remainingDeck',fullDeck)

dealCards = () => {
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

    return initialState
}

AI_ask = (asker, beingAsked) => {
    let options = presentOptions(asker)
    randomOption = options[getRandomInteger(0,options.length-1)]

    let beingAskedCards = initialState.get(beingAsked)
    let matchingCards = beingAskedCards.filter((card) => card.symbol == randomOption)
    console.log("Matching cards ", matchingCards)

    if (matchingCards.length > 0){
        console.log("A matching card was found!")
        sendCards(asker, beingAsked, matchingCards)
    } else {
        console.log("No matching card. Go Fish!")
        goFish(asker)
    }
}

sendCards = (asker, beingAsked, matchingCards) => {
    askerCards = initialState.get(asker)
    beingAskedCards = initialState.get(beingAsked)

    matchingCards.forEach((card) => {
        askerCards.push(card)
    })
    
    let matchingSymbol = matchingCards[0].symbol
    beingAskedCards = beingAskedCards.filter((card) => card.symbol != matchingSymbol)

    console.log("New asker cards ", askerCards)
    console.log("New being asked cards ", beingAskedCards)

}

P1_ask = () => {}

presentOptions = (asker) => {
    let options = []
    askersCards = initialState.get(asker)
    askersCards.forEach((card) => {
        let option = card.symbol
        if (!options.includes(option)){
            options.push(option)
        }
    })
    return options
}

goFish = (asker) => {
    let askerCards = initialState.get(asker)
    let remainingDeck = initialState.get('remainingDeck')

    let randomCard = getRandomCard(remainingDeck)
    console.log("New card from deck is ", randomCard)
    askerCards.push(randomCard)

    remainingDeck = remainingDeck.filter((card) => card != randomCard)
    console.log(`New deck for ${asker}  is` , askerCards)

    initialState.set('remainingDeck', remainingDeck)
}

createFullDeck()

dealCards()

AI_ask(asking = "AI_1", beingAsked = "AI_2")
