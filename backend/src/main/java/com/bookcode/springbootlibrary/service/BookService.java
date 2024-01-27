package com.bookcode.springbootlibrary.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookcode.springbootlibrary.dao.BookRepository;
import com.bookcode.springbootlibrary.dao.CheckoutRepository;
import com.bookcode.springbootlibrary.entity.Book;
import com.bookcode.springbootlibrary.entity.Checkout;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookService {
  
    private BookRepository bookRepository;

    private CheckoutRepository checkoutRepository;
    
    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkoutBook (String userEmail, Long bookId) throws Exception {
        // get object from book repository
        Optional<Book> book = bookRepository.findById(bookId);
        // check whether user has checked out same book or not
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout != null ||
          book.get().getCopiesAvailable() <= 0) {
          throw new Exception("Book not available or already checked out by user");
        }
        // reduce book quantity by 1 
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        // create checkout record, 14 day for return book date
        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(), 
        LocalDate.now().plusDays(14).toString(), book.get().getId());
        checkoutRepository.save(checkout);

        return book.get();
    } 

    // check specify book is checked out by user or not
    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (validateCheckout != null) {
          return true;
        } else  {
          return false;
        }
    }

    // count of books currently checked out by user
    public int currentCheckoutCount(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail).size();
    }
}
