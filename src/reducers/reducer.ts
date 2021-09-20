import { SEND_CARDS, GO_FISH, MY_TURN, SET_PLAYER_BEING_ASKED, SET_OPTION_ASKED, SET_WHOSE_TURN } from "../actions/actions";
import _ from "lodash";

let initialState = new Map();
initialState.set("P_1", [""]);
initialState.set("AI_1", []);
initialState.set("AI_2", []);
initialState.set("AI_3", []);

initialState.set("remainingDeck", [""]);

initialState.set("P_1_tally", {});
initialState.set("AI_1_tally", {});
initialState.set("AI_2_tally", {});
initialState.set("AI_3_tally", {});

initialState.set("P_1_sets", [""]);
initialState.set("AI_1_sets", []);
initialState.set("AI_2_sets", []);
initialState.set("AI_3_sets", []);

initialState.set("playerBeingAsked", "")
initialState.set("optionAsked", "")
initialState.set("whoseTurn", "P_1")

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
  let AI_1_tally = {};
  let AI_2_tally = {};
  let AI_3_tally = {};

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
    if (AI_1_tally[cardSymbol]) {
      AI_1_tally[cardSymbol]++;
      if (AI_1_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "AI_1");
      }
    } else {
      AI_1_tally[cardSymbol] = 1;
    }

    remaining = remaining.filter((card: Card) => card != randomCard);

    //AI 2
    randomCard = getRandomCard(remaining);
    AI2cards.push(randomCard);
    cardSymbol = randomCard.symbol;
    if (AI_2_tally[cardSymbol]) {
      AI_2_tally[cardSymbol]++;
      if (AI_2_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "AI_2");
      }
    } else {
      AI_2_tally[cardSymbol] = 1;
    }
    remaining = remaining.filter((card: Card) => card != randomCard);

    //AI 3
    randomCard = getRandomCard(remaining);
    AI3cards.push(randomCard);
    cardSymbol = randomCard.symbol;
    if (AI_3_tally[cardSymbol]) {
      AI_3_tally[cardSymbol]++;
      if (AI_3_tally[cardSymbol] == 4) {
        addFullSet(cardSymbol, "AI_3");
      }
    } else {
      AI_3_tally[cardSymbol] = 1;
    }
    remaining = remaining.filter((card: Card) => card != randomCard);
  }

  initialState.set("P_1", P1cards);
  initialState.set("AI_1", AI1cards);
  initialState.set("AI_2", AI2cards);
  initialState.set("AI_3", AI3cards);
  initialState.set("remainingDeck", remaining);

  initialState.set("P_1_tally", P1_tally);
  initialState.set("AI_1_tally", AI_1_tally);
  initialState.set("AI_2_tally", AI_2_tally);
  initialState.set("AI_3_tally", AI_3_tally);

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

  // console.log("A player has a full set!");
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
  console.log("Length of new rem Deck is ", newRemainingDeck.length)

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

    case SET_OPTION_ASKED: 
      let newState = _.cloneDeep(state)
      newState.set("optionAsked", action.option)

      return newState

    default:
      return state;
  }
};

export default cardReducer;
