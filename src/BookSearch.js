import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksShelf from './BooksShelf'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

  state = {
    query: '',
    Books: this.props.Books,
    searchResult: []
  }

  booksearch(query, Books) {
    if(query != ''){
    BooksAPI.search(query).then((searchResult) => {
      if(!('error'in searchResult)){
      searchResult.map(res=> {

        /*if (res.id in this.state.Books){
          res.shelf = Books[res.id].shelf
        }
        else {
          res.shelf = 'none'
        }*/ 

        if(!('shelf' in res)){
          res.shelf = 'none'
        }
        else {
          res.shelf = Books[res.id].shelf
        }
      })
      this.setState(() => ({
        searchResult
      }))
    }
    else {
      this.setState(() => ({
        searchResult : []
      }))
    }
  })
    }
    else {
    this.setState(() => ({
      searchResult : []
    }))
  }
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
    this.booksearch(query, this.props.Books)
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
            {this.state.searchResult.length !== 0 &&
              <BooksShelf Books={this.state.searchResult}
              changingShelf= {this.props.changingShelf}
              />
            }

          </ol>
        </div>
      </div>
    )
  }
}
export default BookSearch
