import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

export function useCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getSomeCards = async () => {
      try {
        const { data } = await cardsService.getAllCards();

        setCards(data);
      } catch (err) {
        console.error(err);
      }
    };

    getSomeCards();
  }, []);

  return { cards };
}

export default useCards;
