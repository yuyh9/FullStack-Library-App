import React from "react";
import BookModel from "../../../models/BookModel";
export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-5 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.book.img ? (
              <img src={props.book.img} width="130" height="190" alt="book" />
            ) : (
              <img
                src={require("../../../Images/BooksImages/new-book-2.jpg")}
                width="120"
                height="180"
                alt="book"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.book.img ? (
              <img src={props.book.img} width="130" height="190" alt="book" />
            ) : (
              <img
                src={require("../../../Images/BooksImages/new-book-2.jpg")}
                width="120"
                height="180"
                alt="book"
              />
            )}
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
          <a className="btn btn-primary text-white" href="#">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};
