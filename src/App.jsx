import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import About from "./pages/about";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import { useState } from "react";
import CreateCard from "./pages/createCard";

import Signout from "./pages/signout";
import MyCards from "./pages/myCards";
import FavoriteCards from "./pages/favoriteCards";
import CardPage from "./pages/cardPage";
import DeleteCard from "./pages/deleteCard";
import EditCard from "./pages/editCard";
import UserInfo from "./pages/userInfo";
import EditUserInfo from "./pages/editUsersInfo";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminPage from "./pages/adminPage";
import AdminProtectedRoute from "./components/common/adminProtectedRoute";
function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className={`min-vh-100 d-flex flex-column gap-2`}>
        <Header search={search} setSearch={setSearch} />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-out" element={<Signout />} />
            <Route
              path="/createCard"
              element={
                <ProtectedRoute onlyBusiness>
                  <CreateCard />
                </ProtectedRoute>
              }
            />
            <Route path="/my-cards" element={<MyCards search={search} />} />
            <Route
              path="/favoriteCards"
              element={
                <ProtectedRoute>
                  <FavoriteCards search={search} />
                </ProtectedRoute>
              }
            />
            <Route path="/cardPage/:id" element={<CardPage />} />
            <Route
              path="/cards/:_id"
              element={
                <ProtectedRoute onlyBusiness>
                  <DeleteCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-card/:_id"
              element={
                <ProtectedRoute onlyBusiness>
                  <EditCard />
                </ProtectedRoute>
              }
            />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/edit-info/:_id" element={<EditUserInfo />} />
            <Route
              path="/control-panel"
              element={
                <AdminProtectedRoute onlyBusiness>
                  <AdminPage search={search} />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
