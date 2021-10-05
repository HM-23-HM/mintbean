import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../css/modal.css'

import { makeStyles } from '@material-ui/core/styles';

import options from '../img/options.png'
import highlighted from '../img/highlightedPlayer.png'
import fourKings from '../img/fourKings.jpg'

const scale = 0.3

const x = 517 * scale
const y = 480 * scale


const useStyles = makeStyles((theme) => ({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '75ch',
    overflow: 'scroll'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Help() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className='help' type="button" onClick={handleOpen}>
        How to play?
      </button>
      <Modal
        aria-labelledby="What's going on?"
        aria-describedby="What's going on?"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div id='modalBody'>
            <h1 className='modalHeader' id="transition-modal-title">Go Fish</h1>
            
            <h3>How do I win?</h3>
            <p>The goal is to win the most "books" of cards. A book is any four(4) of a kind, such as four kings, four aces, and so on.</p>
            <img src={fourKings} className='image' alt='Four kings of each kind in a deck. The kinds are spades, diamonds, clubs and hearts.'/>

            <p>Every player gets a chance to <i>fish</i>. <i>Fishing</i> is when a player asks another player if they have any cards of a certain kind.</p>
            <p>The player who is <i>fishing</i> must have at least one card of the kind that they are asking for in their hand.</p>
            <p>If the player who is addressed has any cards of the kind requested in their hand, they must hand over all the matching cards to the person who is <i>fishing</i>.</p>
            <p> If the player has none, they say, "Go fish!" and the player who made the request draws a card from the remaining deck and places it in their hand.</p>
            
            <h3>What do I do?</h3>
            <p>
              You are <b>"P_1"</b>. Everytime it is your turn to <i>fish</i>, your options will light up. These options represent the 'kinds' that you can ask other players for.</p>
            <img src={options} alt='Four squares with numbers in the centre of each.' />

            <p> Everytime it is your turn, you must <u>first</u> click on the player that you wish to ask for a certain kind. The chosen player will be highlighted. </p>
            <img src={highlighted} alt='A picture of Patrick from Spongebob Squarepants with a neon green square surrounding his face.' />

            <p>After you select a player, then you choose an option to ask for.</p>
            <p>The game lasts until the deck runs out.</p>

            <button onClick={() => handleClose()}>Let's play!</button>
            
            <h4>Sources</h4>
            <a href="https://bicyclecards.com/how-to-play/go-fish/" target="_blank" rel="noreferrer">Bicyclecards.com</a>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}