initialState = new Map() 
initialState.set('P_1', [])
initialState.set('AI_1', [])
initialState.set('AI_2', [])
initialState.set('AI_3', [])
initialState.set('remainingDeck', [])

const suites = ['Hearts','Clubs', 'Diamonds', 'Spades']
const symbols = ['1','2','3','4','5','6','7','8','9','10','J','Q','K','A']

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

initialState.set('remainingDeck',fullDeck)

dealCards = () => {
    var remaining = initialState.get('remainingDeck')
    var P1 = []
    var AI1 = []
    var AI2 = []
    var AI3 = []
    for ( let i = 0; i < 5 ; i++ ){
        let randomCard = getRandomCard(remaining)
        P1.push(randomCard)
        remaining = remaining.filter((card) => card != randomCard)

        randomCard = getRandomCard(remaining)
        AI1.push(randomCard)
        remaining = remaining.filter((card) => card != randomCard)

        randomCard = getRandomCard(remaining)
        AI2.push(randomCard)
        remaining = remaining.filter((card) => card != randomCard)

        randomCard = getRandomCard(remaining)
        AI3.push(randomCard)
        remaining = remaining.filter((card) => card != randomCard)
    }

    initialState.set('P_1',P1)
    initialState.set('AI_1',AI1)
    initialState.set('AI_2',AI2)
    initialState.set('AI_3', AI3)
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
