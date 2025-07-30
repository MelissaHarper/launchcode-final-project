import FilterContainer from "./FilterContainer";

function Home({ movieList, setMovieList }) {
  return (
    <div className="home">
      <div>
        <h1> What Should I Watch? </h1>
      </div>

      <FilterContainer movieList={movieList} setMovieList={setMovieList} />
    </div>
  );
}

export default Home;
