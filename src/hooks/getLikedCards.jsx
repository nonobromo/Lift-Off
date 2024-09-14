import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

export function useFavoriteCards(userId) {
  const [cards, setCards] = useState([]);

  const fetchLikedCards = async () => {
    if (!userId) return;

    try {
      const { data } = await cardsService.getAllCards();
      const likedCards = data.filter((card) => card.likes.includes(userId));
      setCards(likedCards);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  return { cards, fetchLikedCards };
}

export default useFavoriteCards;
