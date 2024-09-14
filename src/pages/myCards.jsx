import { useEffect, useState } from "react";
import { getMyCards } from "../services/cardsService";
import Card from "../components/common/card";
function MyCards({ search }) {
  const [cards, setMyCarrds] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const { data } = await getMyCards();
      setMyCarrds(data);
    };

    getCards();
  }, []);

  return (
    <div className="container">
      <h1>Your Business Cards</h1>
      <div className="container d-flex flex-wrap gap-5 justify-content-center">
        {cards.length < 1
          ? "No Cards Created"
          : cards.map((card) => {
              return <Card data={card} key={card._id} />;
            })}
      </div>
    </div>
  );
}

export default MyCards;
