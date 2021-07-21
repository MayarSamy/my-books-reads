import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksShelf extends Component {
  static propTypes = {
    Books: PropTypes.array.isRequired,
    changingShelf: PropTypes.func.isRequired
  }

  render() {
    const { Books, changingShelf } = this.props
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Books.map((Book) => (
            <li key={Book.id}>
              <div className="book">
                <div className="book-top">
                  {'imageLinks' in Book && (
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${Book.imageLinks.thumbnail})`
                      }}
                    ></div>
                  )}

                  <div className="book-shelf-changer">
                    <select
                      onChange={(e) => changingShelf(Book, e.target.value)}
                      defaultValue={Book.shelf}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{Book.title}</div>
                {'authors' in Book &&
                  Book.authors.map((author) => (
                    <div className="book-authors" key={Book.id.concat(author)}>
                      {author}
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ol>
        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>
    )
  }
}

export default BooksShelf
