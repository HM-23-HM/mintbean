export const SEND_CARDS = 'SEND_CARDS'
export const GO_FISH = 'GO_FISH'

export function sendCards(asker, beingAsked, matchingCards){
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