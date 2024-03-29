import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";
import HistoryModel from "../../../models/HistoryModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { Link } from "react-router-dom";

export const HistoryPage = () => {
  const { authState } = useOktaAuth();
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState(null);

  const [histories, setHistories] = useState<HistoryModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API_BASE}/histories/search/findBooksByUserEmail?userEmail=${
          authState.accessToken?.claims.sub
        }&page=${currentPage - 1}&size=4`;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const historyResponse = await fetch(url, requestOptions);
        if (!historyResponse.ok) {
          console.error(
            "Failed to fetch data:",
            historyResponse.status,
            historyResponse.statusText
          );
          throw new Error("Something went wrong!");
        }
        const historyResponseJson = await historyResponse.json();

        setHistories(historyResponseJson._embedded.histories);
        setTotalPages(historyResponseJson.page.totalPages);
      }
      setIsLoadingHistory(false);
    };
    fetchUserHistory().catch((error: any) => {
      setIsLoadingHistory(false);
      setError(error.message);
    });
  }, [authState, currentPage]);

  if (isLoadingHistory) {
    return <SpinnerLoading />;
  }

  if (error) {
    return (
      <div className="container m-5">
        <p>{error}</p>
      </div>
    );
  }
  const defaultImage = require("../../../Images/BooksImages/default-book-cover.jpeg");
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="mt-2">
      {histories.length > 0 ? (
        <>
          <h5>Recent History:</h5>

          {histories.map((history) => (
            <div key={history.id}>
              <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-none d-lg-block">
                      <img
                        src={history.img || defaultImage}
                        width="150"
                        height="200"
                        alt="book"
                      />
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                      <img
                        src={history.img || defaultImage}
                        width="150"
                        height="200"
                        alt="book"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title"> {history.author} </h5>
                      <h4>{history.title}</h4>
                      <p className="card-text">{history.description}</p>
                      <hr />
                      <p className="card-text">
                        Checked out on: {history.checkoutDate}
                      </p>
                      <p className="card-text">
                        Returned on: {history.returnedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className="mt-3">Currently no history: </h3>
          <Link className="btn btn-primary" to="/search">
            Search for new book
          </Link>
        </>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
