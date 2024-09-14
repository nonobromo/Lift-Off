import httpService from "./httpService";

const getAllCards = () => {
  return httpService.get("/cards");
};

const getCard = (id) => {
  return httpService.get(`/cards/${id}`);
};

export const createCard = (cards) => {
  return httpService.post("/cards", cards);
};

export const getMyCards = () => {
  return httpService.get("/cards/my-cards");
};

export const likeCard = (id) => {
  return httpService.patch(`/cards/${id}`);
};

export function updateCard(id, card) {
  return httpService.put(`/cards/${id}`, card);
}

export const deleteCard = (id) => {
  return httpService.delete(`/cards/${id}`);
};
const cardsService = {
  getAllCards,
  getCard,
  createCard,
  likeCard,
  deleteCard,
  updateCard,
};

export default cardsService;
