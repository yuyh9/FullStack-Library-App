import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import { UpdateQuantityOfBooks } from "./components/UpdateQuantityOfBooks";

export const ManageLibraryPage = () => {
  const { authState } = useOktaAuth();
  const navigate = useNavigate();
  const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] =
    useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  function handleAddBook() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(false);
  }

  function handleUpdateQuantity() {
    setChangeQuantityOfBooksClick(true);
    setMessagesClick(false);
  }

  function handleMessages() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(true);
  }
  if (authState?.accessToken?.claims.userType === undefined) {
    navigate("/home");
  }
  return (
    <div className="container">
      <div className="mt-5">
        <h3>Mange Library</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tab">
            <button
              className="nav-link active"
              id="nav-add-book-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-add-book"
              type="button"
              role="tab"
              aria-controls="nav-add-book"
              aria-selected="false"
              onClick={handleAddBook}
            >
              Add new book
            </button>

            <button
              className="nav-link"
              id="nav-quantity-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-quantity"
              type="button"
              role="tab"
              aria-controls="nav-quantity"
              aria-selected="true"
              onClick={handleUpdateQuantity}
            >
              Update quantity
            </button>

            <button
              className="nav-link"
              id="nav-messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-messages"
              type="button"
              role="tab"
              aria-controls="nav-messages"
              aria-selected="false"
              onClick={handleMessages}
            >
              Messages
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-add-book"
            role="tabpanel"
            aria-labelledby="nav-add-book-tab"
          ><AddNewBook/></div>
          <div
            className="tab-pane fade"
            id="nav-quantity"
            role="tabpanel"
            aria-labelledby="nav-quantity-tab"
          >{changeQuantityOfBooksClick ? <UpdateQuantityOfBooks /> : <></>}
          </div>
          <div
            className="tab-pane fade"
            id="nav-messages"
            role="tabpanel"
            aria-labelledby="nav-messages-tab"
          >{messagesClick ? <AdminMessages /> : <></>}</div>
        </div>
      </div>
    </div>
  );
};
