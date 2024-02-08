package com.bookcode.springbootlibrary.responsemodels;

import com.bookcode.springbootlibrary.entity.Book;

import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {
  
    public ShelfCurrentLoansResponse(Book book, int daysRemaining) {
        this.book = book;
        this.daysRemaining = daysRemaining;
    }

    private Book book;

    private int daysRemaining;
}
