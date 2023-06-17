import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </Gallery>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
