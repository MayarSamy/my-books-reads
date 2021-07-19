import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksShelf from './BooksShelf'

class BookSearch extends Component {
  static propTypes = {
    Books: PropTypes.array.isRequired
  }
  state = {
    query: '',
    searchResult: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
      searchResult: this.props.Books.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase())
      )
    }))
  }

  render() {
    const { query, searchResult } = this.state
    const { Books, changingShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BooksShelf Books={this.state.searchResult} changingShelf={this.changingShelf} />
          </ol>
        </div>
      </div>
    )
  }
}
export default BookSearch
