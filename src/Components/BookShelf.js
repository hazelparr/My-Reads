import React from 'react'
import BookDetails from './BookDetails'



class BookShelf extends React.Component {



  render() {


  const { books, shelf, onShelfChange } = this.props;




    return (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">{ shelf }</h2>
                  <div className="bookshelf-books">
                    
                    <BookDetails 
                      books={ books }
                      onShelfChange={ onShelfChange }
                    />

                  </div>
                </div>



    )
  }
}

export default BookShelf
