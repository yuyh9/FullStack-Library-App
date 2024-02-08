package com.bookcode.springbootlibrary.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookcode.springbootlibrary.dao.BookRepository;
import com.bookcode.springbootlibrary.dao.CheckoutRepository;
import com.bookcode.springbootlibrary.dao.ReviewRepository;
import com.bookcode.springbootlibrary.entity.Book;
import com.bookcode.springbootlibrary.requestmodels.AddBookRequest;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminService {
  
  private BookRepository bookRepository;
  private ReviewRepository reviewRepository;
  private CheckoutRepository checkoutRepository;

  @Autowired
  public AdminService(BookRepository bookRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository) {
    this.bookRepository = bookRepository;
    this.reviewRepository = reviewRepository;
    this.checkoutRepository = checkoutRepository;
  }

  public void increaseBookQuantity(Long bookId) throws Exception {
    Optional<Book> book = bookRepository.findById(bookId);
    if (!book.isPresent()) {
      throw new Exception("Book not found.");
    }

    Book bookToIncrease = book.get();
    bookToIncrease.setCopies(bookToIncrease.getCopies() + 1);
    bookToIncrease.setCopiesAvailable(bookToIncrease.getCopiesAvailable() + 1);
    bookRepository.save(bookToIncrease);

  }

  public void decreaseBookQuantity(Long bookId) throws Exception {
    Optional<Book> book = bookRepository.findById(bookId);
    if (!book.isPresent() || book.get().getCopiesAvailable() <= 0 || book.get().getCopies() <= 0) {
      throw new Exception("Book not found or quantity locked");
    }

    Book bookToDecrease = book.get();
    bookToDecrease.setCopies(bookToDecrease.getCopies() - 1);
    bookToDecrease.setCopiesAvailable(bookToDecrease.getCopiesAvailable() - 1);
    bookRepository.save(bookToDecrease);
  }

  public void postBook(AddBookRequest addBookRequest) {
    Book book = new Book();
    book.setTitle(addBookRequest.getTitle());
    book.setAuthor(addBookRequest.getAuthor());
    book.setDescription(addBookRequest.getDescription());
    book.setCopies(addBookRequest.getCopies());
    book.setCopiesAvailable(addBookRequest.getCopies());
    book.setCategory(addBookRequest.getCategory());
    book.setImg(addBookRequest.getImg());
    bookRepository.save(book);
  }
  
  public void deleteBook(Long bookId) throws Exception {
    Optional<Book> book = bookRepository.findById(bookId);
    if (!book.isPresent()) {
        throw new Exception("Book not found");
    }
    
    bookRepository.delete(book.get());
    checkoutRepository.deleteAllByBookId(bookId);
    reviewRepository.deleteAllByBookId(bookId);
}
}
