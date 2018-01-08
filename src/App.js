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
  

  shelfChange(book, shelf) {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat(book)
        }))
      })
    }
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
