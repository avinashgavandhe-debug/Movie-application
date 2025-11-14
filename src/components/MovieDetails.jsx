import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, Star, Calendar, Film, ArrowLeft } from "lucide-react";
import ImageComponent from "./common/ImageComponent";
import ButtonComponent from "./common/ButtonComponent";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=ee3db977b437a93da1f4178398df3952&language=en-US`
      );
      const data = await response.json();
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* <button>
          <Link
            to="/"
            className="mb-6 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Movies
          </Link>
            </button> */}

          <ButtonComponent
            to="/"
            text="Back to Movies"
            icon={ArrowLeft}
            className="mb-6 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2"
          />

          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div className="md:w-1/3">
              <ImageComponent
                movie={movie}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded-full">
                  <Star size={16} fill="currentColor" />
                  <span className="font-semibold">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={16} />
                  <span>{movie.release_date}</span>
                </div>
                {movie.runtime && (
                  <span className="text-gray-400">{movie.runtime} min</span>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {movie.budget > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400">Budget</h4>
                    <p className="text-lg">${movie.budget.toLocaleString()}</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-400">Revenue</h4>
                    <p className="text-lg">${movie.revenue.toLocaleString()}</p>
                  </div>
                )}
                {movie.status && (
                  <div>
                    <h4 className="text-sm text-gray-400">Status</h4>
                    <p className="text-lg">{movie.status}</p>
                  </div>
                )}
                {movie.original_language && (
                  <div>
                    <h4 className="text-sm text-gray-400">Language</h4>
                    <p className="text-lg uppercase">
                      {movie.original_language}
                    </p>
                  </div>
                )}
              </div>

              {movie.homepage && (
                <div className="mt-6">
                  <ButtonComponent
                    text="Visit Official Website"
                    href={movie.homepage}
                    className ="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition inline-block"

                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
