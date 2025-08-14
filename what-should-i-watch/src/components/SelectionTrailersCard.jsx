const DetailTrailers = ({ trailers }) => {
  return (
    <div className="trailer-container">
      {trailers.map((trailer, index) => (
        <div key={`trailer-${index}`} className="trailer-window">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow="encrypted-media;"
            allowFullScreen
            className="trailer"
          />
        </div>
      ))}
    </div>
  );
};

export default DetailTrailers;
