import { useAuth } from "../../contexts/auth.context";
import { Link } from "react-router-dom";
import cardsService from "../../services/cardsService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Card({ data, fetchLikedCards }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLiked(data.likes.includes(user._id));
    }
  }, [data.likes, user]);

  const handleLikeCard = async () => {
    try {
      await cardsService.likeCard(data._id);
      setIsLiked((prev) => !prev);

      if (!isLiked) {
        toast.success("Added to Favorites");
      }
      if (isLiked) {
        toast.success("Removed From Favorites");
      }
      await fetchLikedCards();
    } catch (err) {
      () => {};
    }
  };

  return (
    <div
      className="card app dark-list-item card-shadow bg-secondary-subtle"
      style={{ width: "18rem" }}
    >
      <Link to={`/cardPage/${data._id}`} state={{ id: data._id }}>
        <img
          src={data.image.url}
          className="card-img-top"
          alt={data.image.alt}
          style={{ height: "150px" }}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title text-capitalize">{data.title}</h5>
        <p className="card-text">{data.description}</p>
      </div>
      <div className="card-body d-flex justify-content-between">
        <div
          className="card-link d-flex justify-content-between"
          style={{ width: "50px" }}
        >
          {user && (user._id === data.user_id || user?.isAdmin) ? (
            <Link to={`/cards/${data._id}`}>
              <i className="bi bi-trash-fill" style={{ cursor: "pointer" }}></i>
            </Link>
          ) : null}
          {user !== null && user._id === data.user_id && (
            <Link to={`/edit-card/${data._id}`}>
              <i
                className="bi bi-pencil-square"
                style={{ cursor: "pointer" }}
              ></i>
            </Link>
          )}
        </div>
        <div
          className={`card-link d-flex border p-1 rounded bg-dark-subtle align-items-center ${
            user === null
              ? "justify-content-end"
              : "justify-content-between w-25"
          }`}
        >
          <a href={`tel:${data.phone}`}>
            <i className="bi bi-telephone-fill"></i>
          </a>
          {user !== null && (
            <i
              className={
                isLiked
                  ? "bi bi-suit-heart-fill text-danger"
                  : "bi bi-suit-heart-fill"
              }
              style={{ cursor: "pointer" }}
              onClick={handleLikeCard}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
