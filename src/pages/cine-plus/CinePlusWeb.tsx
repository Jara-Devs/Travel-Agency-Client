import ShowMovieShop from "./ShowMovieShop";

const CinePlusWeb = () => {
  const seats = [];

  for (let i = 0; i < 100; i++) {
    seats.push({ number: i, price: 200.01, showMovieId: 1, available: true });
  }
  return <ShowMovieShop seats={seats} open={false} />;
};

export default CinePlusWeb;
