import Logo from "../components/logo";
import PageHeader from "../components/common/pageHeader";
import Card from "../components/common/card";
import useCards from "../hooks/getCards";
import { useState } from "react";
import Pagination from "../components/common/pagination";

function Home({ search }) {
  const { cards } = useCards();
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 6;

  const filteredCards = search
    ? cards.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : cards;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredCards.slice(firstPostIndex, lastPostIndex);

  const pagesToDisplay = Math.ceil(filteredCards.length / postPerPage);

  return (
    <div className="container">
      <PageHeader title={<Logo />} description="Search for Business Cards" />
      <div className="container d-flex flex-wrap gap-5 justify-content-center">
        {(search ? filteredCards : currentPosts).map((card) => (
          <Card data={card} key={card._id} />
        ))}
      </div>
      {search === "" && (
        <div className="container d-flex justify-content-center align-items-center mt-3">
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pagesToDisplay={pagesToDisplay}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
