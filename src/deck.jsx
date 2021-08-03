import React from "react";
import deck from "./img/deck.jpg";
import { connect } from "react-redux";
import styles from "./css/deck.module.css";

const mapStateToProps = (state) => ({
  remDeck: state.get("remainingDeck").length,
});

const Deck = (props) => {
  return (
    <div className={styles.deckImgContainer}>
      <img src={deck} className={styles.deckImg} />
      <p>{`${props.remDeck} cards remaining in the deck`}</p>
    </div>
  );
};


export default connect(mapStateToProps)(Deck);
