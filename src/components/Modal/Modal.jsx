import Modal from 'react-modal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 100,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none',
  },
};

Modal.setAppElement('#root');

export const ModalWindow = ({
  isOpen,
  largeImageURL,
  tags,
  onRequestClose,
}) => {
  console.log(largeImageURL);
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={() => disableBodyScroll(document)}
      onAfterClose={() => enableBodyScroll(document)}
    >
      <img src={largeImageURL} alt={tags} />
    </Modal>
  );
};

ModalWindow.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
