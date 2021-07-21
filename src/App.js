import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BooksShelf from './BooksShelf'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    Books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState(() => ({
        Books
      }))
    })
  }

  changingShelf = (Book, shelf) => {
    BooksAPI.update(Book, shelf).then(() => {
      Book.shelf = shelf
      let changed = this.state.Books.filter((B) => B.id !== Book.id)
      changed.push(Book)

      this.setState(() => ({
        Books: changed
      }))
    })
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div className="app">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <BooksShelf
                      Books={this.state.Books.filter((Book) => Book.shelf === 'currentlyReading')}
                      changingShelf={this.changingShelf}
                    />
                  </div>

                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <BooksShelf
                      Books={this.state.Books.filter((Book) => Book.shelf === 'wantToRead')}
                      changingShelf={this.changingShelf}
                    />
                  </div>

                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <BooksShelf
                      Books={this.state.Books.filter((Book) => Book.shelf === 'read')}
                      changingShelf={this.changingShelf}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        <Route path="/search" render={({ history }) => 
          <BookSearch changingShelf={this.changingShelf} Books ={this.state.Books}/>} 
        />
      </div>
    )
  }
}

export default BooksApp
