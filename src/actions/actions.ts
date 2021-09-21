export const SEND_CARDS = 'SEND_CARDS'
export const GO_FISH = 'GO_FISH'
export const MY_TURN = 'MY_TURN'
export const SET_PLAYER_BEING_ASKED = 'SET_PLAYER_BEING_ASKED'
export const SET_OPTION_ASKED = 'SET_OPTION_ASKED'
export const SET_WHOSE_TURN = 'SET_WHOSE_TURN'
export const SET_RESPONSE = 'SET_RESPONSE'

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

export function goFish(asker: string){
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

export function setPlayerBeingAsked(beingAsked: string){
    return {
        type: SET_PLAYER_BEING_ASKED,
        beingAsked
    }
}

export function setOptionAsked(option: string){
    return {
        type: SET_OPTION_ASKED,
        option
    }
}

export function setWhoseTurn(player: string){
    return {
        type: SET_WHOSE_TURN,
        player
    }
}

export function setResponse(response: string){
    return {
        type: SET_RESPONSE,
        response
    }
}