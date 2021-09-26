import { SEND_CARDS, GO_FISH, SET_PLAYER_BEING_ASKED, SET_OPTION_ASKED, SET_WHOSE_TURN, SET_RESPONSE } from "../actions/actions";
import _ from "lodash";

let initialState = new Map();

initialState.set("P_1", [""]);
initialState.set("Spongebob", []);
initialState.set("Squidward", []);
initialState.set("Patrick", []);

initialState.set("remainingDeck", [""]);

initialState.set("P_1_tally", {});
initialState.set("Spongebob_tally", {});
initialState.set("Squidward_tally", {});
initialState.set("Patrick_tally", {});

initialState.set("P_1_sets", []);
initialState.set("Spongebob_sets", []);
initialState.set("Squidward_sets", []);
initialState.set("Patrick_sets", []);

initialState.set("playerBeingAsked", "P_1")
initialState.set("optionAsked", "")
initialState.set("whoseTurn", "P_1")
initialState.set("response", "")


const suites = ["Hearts", "Clubs", "Diamonds", "Spades"];
const symbols = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

type Card = {
  suite: string,
  symbol: string,
}

var fullDeck = [];

initialState.set("remainingDeck", fullDeck);

const dealCards = () => {
  let remaining = initialState.get("remainingDeck");
  let P1cards: Card[] = [];
  let AI1cards: Card[] = [];
  let AI2cards: Card[] = [];
  let AI3cards: Card[] = [];

  let P1_tally = {};
  let Spongebob_tally = {};
  let Squidward_tally = {};
  let Patrick_tally = {};

  for (let i = 0; i < 5; i++) {
    //P1
    let randomCard: Card = getRandomCard(remaining);
    P1cards.push(randomCard);
    let cardSymbol = randomCard.symbol;
    if (P1_tally[cardSymbol]) {
      P1_tally[cardSymbol]++;
      if (P1_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "P_1");
      }
    } else {
      P1_tally[cardSymbol] = 1;
    }

    remaining = remaining.filter((card: Card) => card != randomCard);

    //AI 1
    randomCard = getRandomCard(remaining);
    AI1cards.push(randomCard);
    cardSymbol = randomCard.symbol;
    if (Spongebob_tally[cardSymbol]) {
      Spongebob_tally[cardSymbol]++;
      if (Spongebob_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "Spongebob");
      }
    } else {
      Spongebob_tally[cardSymbol] = 1;
    }

    remaining = remaining.filter((card: Card) => card != randomCard);

    //AI 2
    randomCard = getRandomCard(remaining);
    AI2cards.push(randomCard);
    cardSymbol = randomCard.symbol;
    if (Squidward_tally[cardSymbol]) {
      Squidward_tally[cardSymbol]++;
      if (Squidward_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "Squidward");
      }
    } else {
      Squidward_tally[cardSymbol] = 1;
    }
    remaining = remaining.filter((card: Card) => card != randomCard);

    //AI 3
    randomCard = getRandomCard(remaining);
    AI3cards.push(randomCard);
    cardSymbol = randomCard.symbol;
    if (Patrick_tally[cardSymbol]) {
      Patrick_tally[cardSymbol]++;
      if (Patrick_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "Patrick");
      }
    } else {
      Patrick_tally[cardSymbol] = 1;
    }
    remaining = remaining.filter((card: Card) => card != randomCard);
  }

  initialState.set("P_1", P1cards);
  initialState.set("Spongebob", AI1cards);
  initialState.set("Squidward", AI2cards);
  initialState.set("Patrick", AI3cards);
  initialState.set("remainingDeck", remaining);

  initialState.set("P_1_tally", P1_tally);
  initialState.set("Spongebob_tally", Spongebob_tally);
  initialState.set("Squidward_tally", Squidward_tally);
  initialState.set("Patrick_tally", Patrick_tally);

  return initialState;
};

const createFullDeck = () => {
  suites.forEach((suite) => {
    symbols.forEach((symbol) => {
      let card = {
        suite,
        symbol,
      };
      fullDeck.push(card);
    });
  });
};

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomCard = (deck: Card[]): Card => {
  return deck[getRandomInteger(0, deck.length - 1)];
};

const addFullSet = (setSymbol: string, asker: string, state?) => {
  let set = state.get(`${asker}_sets`);
  set.push(setSymbol);
  state.set(`${asker}_sets`, set);

  let playerCards: Card[] = state.get(asker);
  playerCards = playerCards.filter((card) => card.symbol != setSymbol);

  state.set(asker, playerCards);

};

const sendCards = (asker: string, beingAsked: string, matchingCards: Card[], state?) => {
  let newState = _.cloneDeep(state);

  let askerCards: Card[] = newState.get(asker);
  let beingAskedCards: Card[] = newState.get(beingAsked);

  matchingCards.forEach((card) => {
    askerCards.push(card);
  });

  let matchingSymbol = matchingCards[0].symbol;
  beingAskedCards = beingAskedCards.filter(
    (card) => card.symbol != matchingSymbol
  );

  newState.set(asker, askerCards);
  newState.set(beingAsked, beingAskedCards);

  return newState;
};

const goFish = (state, asker: string) => {
  let newState = _.cloneDeep(state);

  let askerCards: Card[] = newState.get(asker);
  let remainingDeck: Card[] = newState.get("remainingDeck");

  let randomCard: Card = getRandomCard(remainingDeck);
  askerCards.push(randomCard);

  remainingDeck = remainingDeck.filter((card) => card != randomCard);
  let newRemainingDeck = _.cloneDeep(remainingDeck)

  newState.set("remainingDeck", newRemainingDeck);
  newState.set(asker, askerCards);

  return { newState, randomCard };
};

createFullDeck();

dealCards();

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CARDS: {
      let asker: string = action.asker;
      let beingAsked: string = action.beingAsked;

      let matchingCards: Card[] = action.matchingCards;

      let newState = sendCards(asker, beingAsked, matchingCards, state);

      let askerTally = newState.get(`${asker}_tally`);
      let beingAskedTally = newState.get(`${beingAsked}_tally`);

      matchingCards.forEach((card) => {
        if (askerTally[card.symbol]) {
          askerTally[card.symbol]++;
          if (askerTally[card.symbol] == 4) {
            addFullSet(card.symbol, asker, newState);
          }
        } else {
          askerTally[card.symbol] = 1;
        }

        beingAskedTally[card.symbol]--;
      });

      return newState;
    }

    case GO_FISH: {
      let asker = action.asker;
      let { newState, randomCard } = goFish(state, asker);

      let askerTally = newState.get(`${asker}_tally`);

      if (askerTally[randomCard.symbol]) {
        askerTally[randomCard.symbol]++;
        if (askerTally[randomCard.symbol] == 4) {
          addFullSet(randomCard.symbol, asker, newState);
        }
      } else {
        askerTally[randomCard.symbol] = 1;
      }

      return newState;
    }

    case SET_WHOSE_TURN: {
      let newState = _.cloneDeep(state);
      newState.set("whoseTurn", action.player)

      return newState

    }


    case SET_PLAYER_BEING_ASKED: {
      let newState = _.cloneDeep(state);
      newState.set("playerBeingAsked", action.beingAsked)

      return newState
    }

    case SET_OPTION_ASKED: {
      let newState = _.cloneDeep(state)
      newState.set("optionAsked", action.option)

      return newState
    }

    case SET_RESPONSE: {
      let newState = _.cloneDeep(state)
      newState.set("response", action.response)

      return newState
    }

    default:
      return state;
  }
};

export default cardReducer;
