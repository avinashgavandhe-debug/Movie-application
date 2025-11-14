const ImageComponent = ({movie, className = ""}) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMG_BASE_URL
  return (
    <img
      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
      alt={movie.title}
      className={className || "w-full h-[300px] object-cover"}
    />
  );
};

export default ImageComponent;
