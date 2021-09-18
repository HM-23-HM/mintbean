export const SEND_CARDS = 'SEND_CARDS'
export const GO_FISH = 'GO_FISH'
export const MY_TURN = 'MY_TURN'

type Card = {
    suite: string,
    symbol: string,
}

export function sendCards(asker: string, beingAsked: string, matchingCards: Card[]){
    return {
        type: SEND_CARDS,
        asker,
        beingAsked,
        matchingCards
    }
}

export function goFish(asker){
    return {
        type: GO_FISH,
        asker
    }
}

export function myTurn(thisPlayersTurn, not1, not2, not3){
    return {
        type: MY_TURN,
        thisPlayersTurn,
        not1,
        not2,
        not3
    }
}
