import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import MyReads from './Components/MyReads'
import SearchBooks from './Components/SearchBooks'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {


  state = {

    books: [],
    
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });

    });
  }
  
  shelfChange(updatedBook, newShelf) {
    updatedBook.shelf = newShelf
    console.log(updatedBook)

    const { books } = this.state

    let bookInList = false

    let updatedBooks = books.map((book) => {
      if (book.id === updatedBook.id) {
        bookInList = true
        return updatedBook
      } else {
        return book
      }
    })

    if (!bookInList) {
      updatedBooks.push(updatedBook)
    }

    BooksAPI.update(updatedBook, updatedBook.shelf).then(
      this.setState( {books: updatedBooks} )
    )
  }

  render() {

    const { books } = this.state; 




    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyReads 
            books={ books }
            onShelfChange={this.shelfChange.bind(this)}

          />
        )}/>
        
        <Route path="/search" render={() => (
          <SearchBooks 
            booksInShelf={ books }
            onShelfChange={this.shelfChange.bind(this)}
          />
        )}/>

        


      </div>
    )
  }
}

export default BooksApp
