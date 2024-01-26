import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";

import { LatestReviews } from "./LatesReviews";

export const BookCheckoutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    console.log("useEffect is executed");
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

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
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`; 
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
        const roundedStarReview = (Math.round((startReview / 
        loadedReviews.length) * 2) / 2).toFixed(1);

        setTotalStars(Number(roundedStarReview));
      }
        setReviews(loadedReviews);
        setIsLoadingReview(false);
      };

      fetchReviews().catch((error: any) => {
        setIsLoadingReview(false);
        setError(error.message);
      });
  }, [])

  if (isLoading || isLoadingReview) {
    return <SpinnerLoading />;
  }

  if (error) {
    return (
      <div className="container m-5">
        <p>{error}</p>
      </div>
    );
  }
  const defaultImage = require("../../Images/BooksImages/default-book-cover.jpeg");

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            <img src={book?.img || defaultImage} width="200" height="300" alt="book" />
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h6 className="text-primary">{book?.author}</h6>
              <p>{book?.description}</p>
              <StarsReview rating={totalStars} />
            </div>
          </div>
          <CheckoutAndReviewBox book={book} mobile={false} />
          <hr />
        </div>
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-content-center">
          <img src={book?.img || defaultImage} width="200" height="300" alt="book" />
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h6 className="text-primary">{book?.author}</h6>
            <small>{book?.description}</small>
            <StarsReview rating={totalStars} />
          </div>
        </div>
        <CheckoutAndReviewBox book={book} mobile={true} />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};
