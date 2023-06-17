import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from 'components/Modal/Modal';
import { ImageItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isModalOpen } = this.state;

    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <>
        <ImageItem src={webformatURL} alt={tags} onClick={this.openModal} />
        {isModalOpen && (
          <ModalWindow
            isOpen={isModalOpen}
            largeImageURL={largeImageURL}
            tags={tags}
            onRequestClose={this.closeModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
