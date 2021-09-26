import React,{ useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from '../css/modal.module.css'

import { makeStyles } from '@material-ui/core/styles';

import options from '../img/options.png'
import highlighted from '../img/highlightedPlayer.png'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      <button className={styles.help} type="button" onClick={handleOpen}>
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
            <h2 className={styles.modalHeader} id="transition-modal-title">How do I get started?</h2>
            <p className={styles.modalText} id="transition-modal-description">First, you click on the player that you want to ask for a card.</p>
            <img src={highlighted}/>
            <p className={styles.modalText}>Then you choose one of the available symbols in your deck to ask for.</p>
            <img src={options}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}