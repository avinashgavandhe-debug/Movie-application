import React from 'react'
import { useNavigate } from 'react-router-dom'
import ImageComponent from './common/ImageComponent';

const MovieCard = ({movie}) => {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movie/${movie.id}`);
    };

  return (
    <>
         <div
                key={movie.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                onClick={handleMovieClick}
              >
                <ImageComponent movie={movie} className="w-full h-[300px] object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-600 font-medium">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
    </>
  )
}

export default MovieCard