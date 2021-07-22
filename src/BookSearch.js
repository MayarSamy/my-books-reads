import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksShelf from './BooksShelf'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
  state = {
    query: '',
    searchResult: []
  }

  booksearch(query) {
    if (query != '') {
      BooksAPI.search(query).then((searchResult) => {
        if (!('error' in searchResult)) {
          const search = searchResult.map((res) => {
            const b = this.props.Books.find((B) => B.id == res.id)
            //const b = this.props.Books.filter((B) => B.id == res.id)
            if (b) {
              res.shelf = b.shelf
            } else {
              res.shelf = 'none'
            }
            return res
          })
          this.setState(() => ({
            searchResult
          }))
        } else {
          this.setState(() => ({
            searchResult: []
          }))
        }
      })
    } else {
      this.setState(() => ({
        searchResult: []
      }))
    }
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    this.booksearch(query)
  }

  render() {
    const { query, searchResult } = this.state
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
            {this.state.searchResult.length !== 0 && (
              <BooksShelf
                Books={this.state.searchResult}
                changingShelf={this.props.changingShelf}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}
export default BookSearch
