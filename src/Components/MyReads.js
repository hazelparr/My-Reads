import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'


const shelf = [
    {current: "currentlyReading", header: "Currently Reading"},
    {want: "wantToRead", header: "Want To Read"},
    {read: "read", header: "Read"}  
]


class MyReads extends React.Component {


  
  booksToShelf(books, bookshelf) {
    return books.filter((book) => book.shelf === bookshelf);
  }

  render() {


    const books = this.props.books;
    const onShelfChange = this.props.onShelfChange;


    return (


          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                <BookShelf 
                  books={this.booksToShelf(books, shelf[0].current)}
                  shelf={shelf[0].header}
                  onShelfChange={onShelfChange}
                />

                <BookShelf 
                  books={this.booksToShelf(books, shelf[1].want)}
                  shelf={shelf[1].header}
                  onShelfChange={onShelfChange}
                /> 

                <BookShelf 
                  books={this.booksToShelf(books, shelf[2].read)}
                  shelf={shelf[2].header}
                  onShelfChange={onShelfChange}
                />




              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>


    )
  }
}

export default MyReads
