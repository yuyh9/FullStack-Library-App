import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatesReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
  const { authState } = useOktaAuth();

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  const [currentBookCount, setCurrentBookCount] = useState(0);
  const [isLoadingBookCount, setIsLoadingBookCount] = useState(true);

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(true);

  // payment
  const [displayError, setDisplayError] = useState(false);

  const bookId = window.location.pathname.split("/")[2];
  const API_BASE = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `${API_BASE}/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedBooks: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBooks);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [isCheckOut]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewUrl: string = `${API_BASE}/reviews/search/findByBookId?bookId=${bookId}`;
      const response = await fetch(reviewUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];
      let startReview: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].book_id,
          reviewDescription: responseData[key].reviewDescription,
        });
        startReview += responseData[key].rating;
      }

      if (loadedReviews) {
        const roundedStarReview = (
          Math.round((startReview / loadedReviews.length) * 2) / 2
        ).toFixed(1);

        setTotalStars(Number(roundedStarReview));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setError(error.message);
    });
  }, [isReviewLeft]);
  useEffect(() => {
    const fetchUserReviewBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${API_BASE}/reviews/secure/user/book?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const userReview = await fetch(url, requestOptions);
        if (!userReview.ok) {
          throw new Error("Something went wrong");
        }
        const userReviewResponseJson = await userReview.json();
        setIsReviewLeft(userReviewResponseJson);
      }
      setIsLoadingUserReview(false);
    };
    fetchUserReviewBook().catch((error: any) => {
      setIsLoadingUserReview(false);
      setError(error.message);
    });
  }, [authState]);

  useEffect(() => {
    const fetchUserCurrentCheckoutCount = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${API_BASE}/books/secure/checkoutcount`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();
        setCurrentBookCount(currentLoansCountResponseJson);
      }
      setIsLoadingBookCount(false);
    };
    fetchUserCurrentCheckoutCount().catch((error: any) => {
      setIsLoadingBookCount(false);
      setError(error.message);
    });
  }, [authState, isCheckOut]);

  useEffect(() => {
    const fetUserCheckOutBook = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${API_BASE}/books/secure/ischeckedout?bookId=${bookId}`;
        const requestOption = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const bookCheckedOut = await fetch(url, requestOption);

        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }
        const bookCheckedOutJson = await bookCheckedOut.json();
        setIsCheckOut(bookCheckedOutJson);
      }
      setIsLoadingCheckout(false);
    };
    fetUserCheckOutBook().catch((error: any) => {
      setIsLoadingCheckout(false);
      setError(error.message);
    });
  }, [authState]);

  if (
    isLoading ||
    isLoadingReview ||
    isLoadingBookCount ||
    isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  if (error) {
    return (
      <div className="container m-5">
        <p>{error}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url = `${API_BASE}/books/secure/checkout?bookId=${book?.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      setDisplayError(true);
      return;
    }
    setDisplayError(false);
    setIsCheckOut(true);
  }
  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0;
    if (book?.id) {
      bookId = book.id;
    }

    const reviewRequestModel = new ReviewRequestModel(
      starInput,
      bookId,
      reviewDescription
    );
    const url = `${API_BASE}/reviews/secure`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true);
  }

  const defaultImage = require("../../Images/BooksImages/default-book-cover.jpeg");

  return (
    <div>
      <div className="container d-none d-lg-block">
        {displayError && (
          <div className="alert alert-danger mt-3" role="alert">
            Please pay outstanding fees and/or return late book(s).
          </div>
        )}
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img
              src={book?.img || defaultImage}
              width="200"
              height="300"
              alt="book"
            />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h6 className="text-primary">{book?.author}</h6>
              <p>{book?.description}</p>
              <StarsReview rating={totalStars} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentCheckoutCount={currentBookCount}
            isAuthenticated={authState?.isAuthenticated}
            isCheckedOut={isCheckOut}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
          <hr />
        </div>
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        {displayError && (
          <div className="alert alert-danger mt-3" role="alert">
            Please pay outstanding fees and/or return late book(s).
          </div>
        )}
        <div className="d-flex justify-content-center align-content-center">
          <img
            src={book?.img || defaultImage}
            width="200"
            height="300"
            alt="book"
          />
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h6 className="text-primary">{book?.author}</h6>
            <small>{book?.description}</small>
            <StarsReview rating={totalStars} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          currentCheckoutCount={currentBookCount}
          isAuthenticated={authState?.isAuthenticated}
          isCheckedOut={isCheckOut}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
