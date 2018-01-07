import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends React.Component {


    state = {
        searchResult: []
    }

    bookSearch(query) {
        const searchQuery = query.trim()
        const { booksInShelf } = this.props



        if (searchQuery === "" || searchQuery === undefined ) {
            this.setState({ searchResult: [] });
            return
        }

        BooksAPI.search(searchQuery).then((books) => {
            if (books && books.length) {
              let updatedSearch = books.map((book) => {
                
                let inShelf = booksInShelf.filter(bookInShelf => 
                  book.id === bookInShelf.id)
                

              
                inShelf = inShelf[0]
                book.shelf = inShelf ? inShelf.shelf : 'none'

                return book  
              })
              this.setState({ searchResult: updatedSearch });
              
            }
            
        })
    }

    render () {

        const books = this.state.searchResult
        const onShelfChange = this.props.onShelfChange


        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            onChange={(event) => this.bookSearch(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                  
                    <ol className="books-grid">
                      { books.map((book) => (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">                            
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                              <div className="book-shelf-changer">
                                <select value={ book.shelf } onChange={(event) => onShelfChange(book, event.target.value)}>
                                  <option value="moveTo" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{ book.title }</div>
                            { book.authors.map((author) => (
                              <div className="book-authors" key={author}>
                                { author }
                              </div>
                            ))}

                          </div>
                        </li>
                      )) } 
                    </ol>

                </div>
            </div>
        )
    }
}

export default SearchBooks