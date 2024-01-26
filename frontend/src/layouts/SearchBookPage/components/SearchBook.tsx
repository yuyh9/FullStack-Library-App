import React from "react";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";
export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  const defaultImage = require("../../../Images/BooksImages/default-book-cover.jpeg");

  return (
    <div className="card mt-3 shadow p-3 mb-5 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
          <img
              src={props.book.img || defaultImage}
              width="130"
              height="190"
              alt="book"
            />
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
          <img
              src={props.book.img || defaultImage}
              width="130"
              height="190"
              alt="book"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.book.title}</h5>
            <h6>By {props.book.author}</h6>
            <small className="card-text">{props.book.description}</small>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link className="btn btn-primary text-white" to={`/checkout/${props.book.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
