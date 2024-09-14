import { useLocation } from "react-router-dom";
import cardsService from "../services/cardsService";
import { useState, useEffect } from "react";

function CardPage() {
  const location = useLocation();
  const { id } = location.state;
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await cardsService.getCard(id);
        setCardData(data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  if (!id) {
    return <div>Data not available</div>;
  }

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center">
      <h1 className="text-capitalize">{cardData.title}</h1>
      <div className="card mb-3" style={{ maxWidth: "400px" }}>
        <div>
          <img
            src={cardData.image?.url}
            className="card-img-top"
            alt={cardData.image?.alt}
            style={{ width: "100%", height: 280 }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{cardData.subtitle}</h5>
          <p className="card-text text-wrap px-3" style={{ maxWidth: "100%" }}>
            {cardData.description}
          </p>
          <p className="card-text text-wrap px-3">
            Phone: {cardData.phone} <i className="bi bi-telephone-fill"></i>
          </p>
          <p className="card-text text-wrap px-3">
            Email: {cardData.email} <i className="bi bi-envelope"></i>
          </p>
          <iframe
            src={`https://www.google.com/maps?q=${
              cardData?.address?.houseNumber
            }+${encodeURIComponent(
              cardData?.address?.street
            )},+${encodeURIComponent(
              cardData?.address?.city
            )},+${encodeURIComponent(
              cardData?.address?.state
            )},+${encodeURIComponent(cardData?.address?.country)}&output=embed`}
            className="w-100"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default CardPage;
