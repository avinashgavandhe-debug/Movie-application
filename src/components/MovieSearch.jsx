import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, X } from 'lucide-react';

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const API_KEY = 'ee3db977b437a93da1f4178398df3952';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Debounce effect for search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
        setIsOpen(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search API call
  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
      setIsOpen(true);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle movie click
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setSearchQuery('');
    setSearchResults([]);
    setIsOpen(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length > 0 && setIsOpen(true)}
          className="w-full pl-12 pr-12 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
        />
        
        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-2xl max-h-96 overflow-y-auto border border-gray-700">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="flex items-center gap-4 p-3 hover:bg-gray-700 cursor-pointer transition border-b border-gray-700 last:border-b-0"
            >
              {/* Movie Poster */}
              <div className="flex-shrink-0 w-12 h-18">
                {movie.poster_path ? (
                  <img
                    src={`${IMG_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                </p>
              </div>

              {/* Rating */}
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && searchQuery.length >= 2 && searchResults.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-2xl p-4 text-center text-gray-400 border border-gray-700">
          No movies found for "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default MovieSearch;