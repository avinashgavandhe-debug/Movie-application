import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import Navbar from "./common/Navbar";

const MovieListing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const location = useLocation();
  const { category } = useParams(); 

  // const API_KEY = "ee3db977b437a93da1f4178398df3952";
  // const BASE_URL = "https://api.themoviedb.org/3";

  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL

  const getCategory = () => {
    if (category) return category;
    
    if (location.pathname === '/popular') return 'popular';
    if (location.pathname === '/top-rated') return 'top_rated';
    
    return 'popular';
  };

  const movieCategory = getCategory();

  useEffect(() => {
    fetchMovies(movieCategory, currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, movieCategory]);

  const fetchMovies = async (category, page) => {
    setLoading(true);  
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results || []);
      
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); 
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageTitle = () => {
    if (movieCategory === 'popular') return 'Popular Movies';
    if (movieCategory === 'top_rated') return 'Top Rated Movies';
    return 'IMDB Movie Explorer';
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="col-span-full flex justify-center items-center py-12">
              {loading && (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default MovieListing;