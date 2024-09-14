import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsService";
import { toast } from "react-toastify";

function DeleteCard() {
  const navigate = useNavigate();
  const { _id } = useParams();
  useEffect(() => {
    const deleteCard = async () => {
      await cardsService.deleteCard(_id).catch(() => {});
      navigate("/my-cards");
      toast.success("Card Deleted");
    };

    deleteCard();
  }, [_id, navigate]);

  return null;
}

export default DeleteCard;
