import BookModel from "./BookModel";

class ShelfCurrentLoans {
    book: BookModel;
    daysRemaining: number;

    constructor(book: BookModel, daysRemaining: number) {
        this.book = book;
        this.daysRemaining = daysRemaining;
  }
}

export default ShelfCurrentLoans;
