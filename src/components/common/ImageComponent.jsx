const ImageComponent = ({movie, className = ""}) => {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className={className || "w-full h-[300px] object-cover"}
    />
  );
};

export default ImageComponent;
