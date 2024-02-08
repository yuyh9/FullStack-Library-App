import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";

export const UpdateQuantityOfBook: React.FC<{book: BookModel; deleteBook: any;
}> = (props, key) => {

  const { authState } = useOktaAuth();
  const [quantity, setQuantity] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const fetchBookInState = () => {
      props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
      props.book.copiesAvailable
        ? setRemaining(props.book.copiesAvailable)
        : setRemaining(0);
    };
    fetchBookInState();
  }, []);

  async function increaseQuantity() {
    const url = `${process.env.REACT_APP_API_BASE}/admin/secure/increase/book/quantity?bookId=${props.book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const quantityUpdateResponse = await fetch(url, requestOptions);
    if (!quantityUpdateResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setQuantity(quantity + 1);
    setRemaining(remaining + 1);
  }

  async function decreaseQuantity() {
    const url = `${process.env.REACT_APP_API_BASE}/admin/secure/decrease/book/quantity?bookId=${props.book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const quantityUpdateResponse = await fetch(url, requestOptions);
    if (!quantityUpdateResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setQuantity(quantity - 1);
    setRemaining(remaining - 1);
  }

  async function deleteBook() {
    const url = `http://localhost:8080/api/admin/secure/delete/book?bookId=${props.book?.id}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const updateResponse = await fetch(url, requestOptions);
    if (!updateResponse.ok) {
      throw new Error("Something went wrong!");
    }
    props.deleteBook();
  }
  const defaultImage = require("../../../Images/BooksImages/default-book-cover.jpeg");
  window.scrollTo(0, 0);

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            <img
              src={props.book.img || defaultImage}
              width="120"
              height="200"
              alt="book"
            />
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            <img
              src={props.book.img || defaultImage}
              width="120"
              height="200"
              alt="book"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-title">{props.book.author}</h6>
            <p>{props.book.title}</p>
            <small className="card-text"> {props.book.description} </small>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center algin-items-center">
            <p>
              Total Quantity: <b>{quantity}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Books Remaining: <b>{remaining}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button className="m-1 btn btn-md btn-danger" onClick={deleteBook}>
              Delete
            </button>
          </div>
        </div>
        <div className="mt-3 col-md-1">
        </div>
        <div>
          <button
            className="m1 btn btn-md btn-primary text-white w-50 mt-2"
            onClick={increaseQuantity}
          >
            Add Quantity
          </button>
          <button
            className="m1 btn btn-md btn-warning mt-2 w-50 justify-content-center align-items-center mt-2"
            onClick={decreaseQuantity}
          >
            Decrease Quantity
          </button>
        </div>
      </div>
    </div>
  );
};
