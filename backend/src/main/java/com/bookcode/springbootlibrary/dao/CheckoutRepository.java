package com.bookcode.springbootlibrary.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookcode.springbootlibrary.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long>{

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    List<Checkout> findByUserEmail(String userEmail);
} 