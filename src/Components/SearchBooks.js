import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookDetails from './BookDetails'

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
                    
                    <BookDetails 
                      books={ books }
                      onShelfChange={ onShelfChange }
                    />


                </div>
            </div>
        )
    }
}

export default SearchBooks