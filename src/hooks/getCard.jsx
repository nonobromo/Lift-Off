import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

export function useCard(id) {
  const [card, setCard] = useState([]);

  useEffect(() => {
    const getCard = async () => {
      try {
        const { data } = await cardsService.getCard(id);

        setCard(data);
      } catch (err) {
        console.error(err);
      }
    };

    getCard();
  }, [id]);

  return { card };
}

export default useCard;
