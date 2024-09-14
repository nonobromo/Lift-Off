import { useAuth } from "../contexts/auth.context";
import Card from "../components/common/card";
import useCards from "../hooks/getCards";
import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

function FavoriteCards({ search }) {
  const { user } = useAuth();
  const [likedCards, setLikedCards] = useState([]);

  const fetchLikedCards = async () => {
    const { data } = await cardsService.getAllCards();
    setLikedCards(data.filter((card) => card.likes.includes(user._id)));
  };
  useEffect(() => {
    fetchLikedCards();
  }, []);

  return (
    <div className="container">
      <h1>Favorite Cards</h1>
      <div className="container d-flex flex-wrap justify-content-center gap-3 mt-5">
        {likedCards.length < 1 && <span>No Liked Cards</span>}
        {likedCards
          .filter((item) =>
            search.toLowerCase() === ""
              ? true
              : item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((card) => (
            <Card
              data={card}
              key={card._id}
              fetchLikedCards={fetchLikedCards}
            />
          ))}
      </div>
    </div>
  );
}

export default FavoriteCards;
