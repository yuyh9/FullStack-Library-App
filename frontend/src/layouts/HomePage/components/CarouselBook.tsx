import React from "react";

export const CarouselBook = () => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src={require("../../Images/BooksImages/new-book-1.jpeg")}
          width="151"
          height="233"
          alt="book"
        />
        <h6 className="mt-2">Book</h6>
        <a className="btn main-color text-white" href="#">
          Reserve
        </a>
      </div>
    </div>
  );
};