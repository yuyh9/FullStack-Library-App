import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { LeaveReview }  from "../Utils/LeaveReview";

export const CheckoutAndReviewBox: React.FC<{ book: BookModel | undefined,
  mobile: boolean, currentCheckoutCount: number, isAuthenticated: any, isCheckedOut: boolean, checkoutBook: any, isReviewLeft: boolean, submitReview: any}> = (props) => {

    function buttonRender() {
      if (props.isAuthenticated) {
          if (!props.isCheckedOut && props.currentCheckoutCount < 5) {
              return (<button onClick={() =>  props.checkoutBook()} className='btn btn-success btn-lg'>Checkout</button>)
          } else if (props.isCheckedOut) {
              return (<div className="mt-2"><b>Book checked out. Enjoy!</b></div>)
          } else if (!props.isCheckedOut) {
              return (<div className='text-danger'>Too many books checked out.</div>)
          }
      }
      return (<Link to={'/login'} className='btn btn-success btn-lg'>Sign in</Link>)
  }

  function reviewRender() {
    if (props.isAuthenticated && !props.isReviewLeft) {
        return(
        <div>
            <LeaveReview submitReview={props.submitReview}/>
        </div>
        )
    } else if (props.isAuthenticated && props.isReviewLeft) {
        return(
        <div>
            <b>Thank you for your review!</b>
        </div>
        )
    }
    return (
    <div>
        <hr/>
        <div>Sign in to be able to leave a review.</div>
    </div>
    )
}

  return (
    <div className={props.mobile ? "card d-flex mt-5" 
        : "card col-3 container d-flex mb-5"}>
      <div className="card-body container">
        <div className="mt-3">
          <div>
            <b>{props.currentCheckoutCount}/5 </b>books checked out
          </div>
          <hr />
          {props.book &&
          props.book.copiesAvailable &&
          props.book.copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <div className="col-6 lead">
              <b>{props.book?.copies}</b> copies
            </div>
            <div className="col-6 lead">
              <b>{props.book?.copiesAvailable}</b> available
            </div>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <div className="mt-2">
            This number can change until placing order has been completed.
        </div>
        <div className="mt-3">
          {reviewRender()}
        </div>
      </div>
    </div>
  );
};
