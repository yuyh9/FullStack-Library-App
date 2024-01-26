import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBookPage/SearchBooksPage";
import { BookCheckoutPage } from "./layouts/BookCheckOutPage/BookCheckoutPage";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaConfig } from "./lib/oktaConfig";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";


const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {
  const navigate = useNavigate();

  const authHandler = () => {
    navigate("/login");
  };
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={authHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchBooksPage />} />
            <Route path="/checkout/:bookId" element={<BookCheckoutPage />} />
            <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
            <Route path="/login/callback" element={<LoginCallback />} />
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
};
