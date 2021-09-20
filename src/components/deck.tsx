import React, {useEffect} from "react";
import { connect } from "react-redux";
import styles from "../css/deck.module.css";

import deck2 from "../img/deck2.jpg";


const mapStateToProps = (state) => ({
  remDeck: state.get("remainingDeck").length,
});

const Deck = (props) => {

  return (
    <div className={styles.deckImgContainer}>
      <img src={deck2} className={styles.deckImg} />
      <p>{`${props.remDeck} cards remaining in the deck`}</p>
    </div>
  );
};


export default connect(mapStateToProps)(Deck);
