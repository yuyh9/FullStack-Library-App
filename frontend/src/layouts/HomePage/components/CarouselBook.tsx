import React from "react";
import BooKModel from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const CarouselBook: React.FC<{ book: BooKModel }> = (props) => {
  const defaultImage = require("../../../Images/BooksImages/default-book-cover.jpeg");

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src={props.book.img || defaultImage}
          width="150"
          height="230"
          alt="book"
        />
        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <Link className="btn main-color text-white" to={`checkout/${props.book.id}`}>
          Reserve
        </Link>
      </div>
    </div>
  );
};
