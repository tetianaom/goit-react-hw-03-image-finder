import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import * as API from 'service/api';

export class App extends Component {
  abortCtrl;

  state = {
    images: [],
    query: '',
    page: 1,
    per_page: 12,
    isLoading: false,
    isShownButton: false,
    error: null,
  };

  handleFormSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query,
      page: 1,
      images: [],
      error: null,
      isShownButton: false,
    });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.loadImages(query, page);
    }

    console.log(this.state);
  }

  loadImages = async (query, page) => {
    if (this.abortCtrl) {
      this.abortCtrl.abort();
    }

    this.abortCtrl = new AbortController();

    try {
      this.setState({ isLoading: true, error: null });

      const data = await API.getImages(query, page, this.abortCtrl.signal);

      if (!data.hits.length) {
        return 'Sorry. There are no images for your ...';
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isShownButton: page < Math.ceil(data.totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: 'Something wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, isShownButton, error } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {!isLoading && images.length > 0 && isShownButton && (
          <Button onClick={this.loadMore} />
        )}
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
      </div>
    );
  }
}
