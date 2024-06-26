import React from 'react'


const Card = ({movie}) => {
  return (
    
        <div className="movie-row ">
          <div className="movie-col-8">
            <div className="movie-card-body ">
              <h5 className="movie-title">{movie.title}</h5>
              <p className="movie-text" id="year"><span>Release Year : </span> <span className='text'>{movie.releaseYear}</span></p>
              <p className="movie-text" id="plot"><span className='desc'>Description :</span> <span className='text'>{movie.description}</span></p>
    
              <p className="movie-text">
                <span>Genre :</span>
                <span className="text">{movie.genre}</span>
              </p>
            </div>
          </div>
        </div>
     


  )
}

export default Card
