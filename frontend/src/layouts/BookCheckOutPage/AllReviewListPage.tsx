import { useEffect, useState } from "react";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Review } from "../Utils/Review";
import { Pagination } from "../Utils/Pagination";
import { Link } from "react-router-dom";

export const AllReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const API_BASE = process.env.REACT_APP_API_BASE ;

  // Book to lookup reviews
  const bookId = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchReviewsData = async () => {
      const reviewUrl: string = `${API_BASE}reviews/search/findByBookId?bookId=${bookId}&page=${
        currentPage - 1
      }&size=${reviewsPerPage}`;

      const response = await fetch(reviewUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();
      const responseData = responseJson._embedded.reviews;
      setTotalAmountOfReviews(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);
      const loadedReviews: ReviewModel[] = [];

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].book_id,
          reviewDescription: responseData[key].reviewDescription,
        });
      }
      setReviews(loadedReviews);
      setIsLoading(false);
    };

    fetchReviewsData().catch((error: any) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, [currentPage]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (error) {
    return (
      <div className="container m-5">
        <p>{error}</p>
      </div>
    );
  }

  const indexOfLastReview: number = currentPage * reviewsPerPage;
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

  let lastItem =
    reviewsPerPage * currentPage <= totalAmountOfReviews
      ? reviewsPerPage * currentPage
      : totalAmountOfReviews;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div>
        <h3>Comments: ({reviews.length})</h3>
      </div>
      <p>
        {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
      </p>
      <div className="row">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
      <div>
        <Link
          type="button"
          className="btn btn-primary"
          to={`/checkout/${bookId}`}
        >
          Back to Book Detail
        </Link>
      </div>
    </div>
  );
};
