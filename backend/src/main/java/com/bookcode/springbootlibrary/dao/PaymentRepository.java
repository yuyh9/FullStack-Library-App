package com.bookcode.springbootlibrary.dao;

import com.bookcode.springbootlibrary.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
  
  @Query("SELECT p FROM Payment p WHERE p.userEmail = :userEmail")
  Payment findByUserEmail(String userEmail);
}
