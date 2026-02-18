import { SuitHeartFill } from "react-bootstrap-icons";

function MovieStats({ favoritesCount }) {
  return (
    <div className="alert alert-info mt-3">
        <SuitHeartFill /> Favorite Movies: {favoritesCount}
    </div>
  );
}

export default MovieStats;
