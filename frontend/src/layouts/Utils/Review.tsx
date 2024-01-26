import ReviewModel from "../../models/ReviewModel";
import { StarsReview } from "./StarsReview";

export const Review: React.FC<{ review: ReviewModel }> = (props) => {
  const date = new Date(props.review.date);
  const longMonth = date.toLocaleString("default", { month: "long" });
  const dateDay = date.getDate();
  const dateYear = date.getFullYear();

  const dateRender = longMonth + " " + dateDay + ", " + dateYear;

  return (
    <div>
      <div className="col-sm-8 col-md-8">
        <h4>{props.review.userEmail}</h4>
        <div className="row">
          <div className="col">{dateRender}</div>
          <div className="col">
            <StarsReview rating={props.review.rating} />
          </div>
        </div>
        <div className="mt-2">
          <p>  {props.review.reviewDescription}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};
