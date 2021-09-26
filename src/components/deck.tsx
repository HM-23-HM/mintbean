import React, {useEffect} from "react";
import { connect } from "react-redux";
import styles from "../css/deck.module.css";


const mapStateToProps = (state) => ({
  remDeck: state.get("remainingDeck").length,
});

const Deck = (props) => {

  return (
    <div className={styles.deckImgContainer}>
      <p className={styles.deckText}>{`${props.remDeck} cards remaining in the deck`}</p>
    </div>
  );
};


export default connect(mapStateToProps)(Deck);
