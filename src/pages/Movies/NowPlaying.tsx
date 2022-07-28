// Components
import MoviesHeader from "../../components/Movies/MoviesHeader";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

function NowPlaying() {
  const handleFetch = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=a760d55ebf6c78254a6035fdd7d1e535&language=en-US&page=1",
        {
          method: "GET",
        },
      );
      const res = await response.json();

      if (!response.ok) {
        throw Error(res.message);
      }
      console.log(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container">
        <div className="breadcrumbs">Home</div>
        <MoviesHeader title="Now Playing" />

        <button onClick={handleFetch}>AAAA</button>
      </div>
    </>
  );
}
export default NowPlaying;
