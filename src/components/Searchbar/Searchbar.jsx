import { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import {
  SearchHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    const prevValue = this.state.query;
    const nextValue = event.target.value;

    if (prevValue !== nextValue) {
      this.setState({ query: nextValue.toLowerCase() });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      console.log('first');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SearchHeader onSubmit={this.handleSubmit}>
        <SearchForm>
          <SearchFormBtn type="submit">
            <FiSearch size="16px" />
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            name="search"
            value={query}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
