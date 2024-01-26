import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Info = () => {
  const { authState } = useOktaAuth();

  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Journey into the World of Imagination!</h1>
              <p className="lead">
                Embark on a literary adventure with our handpicked collection of
                enchanting tales. Let your imagination soar with every page
                turned.
              </p>
              {authState?.isAuthenticated ? (
                <Link className="btn main-color btn-lg text-white" to="/search">
                  Explore top books
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
                      justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1>Discover Stories That Define Us!</h1>
              <p className="lead">
                Dive into narratives that shape our identities and celebrate
                diversity. Explore stories that reflect the rich tapestry of
                human experiences.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>Read Anywhere, Anytime</h1>
              <p className="lead">
                Carry a world of stories in your pocket. Our mobile-friendly
                library is your companion for reading on the go.
              </p>
              {authState?.isAuthenticated ? (
                <Link className="btn main-color btn-lg text-white" to="/search">
                  Explore top books
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign up
                </Link>
              )}
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Escape to Different Realms</h1>
              <p className="lead">
                Immerse yourself in worlds beyond imagination. Let our curated
                collection transport you to realms filled with wonder and
                excitement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
