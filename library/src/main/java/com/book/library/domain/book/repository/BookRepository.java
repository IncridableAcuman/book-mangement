package com.book.library.domain.book.repository;

import com.book.library.domain.book.entity.BookEntity;
import com.book.library.domain.book.entity.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<BookEntity,Long> {
    List<BookEntity> findByAuthor(String author);
    List<BookEntity> findByCategory(Category category);
    List<BookEntity> findByPrice(double price);
    List<BookEntity> findByPublishedDate(LocalDate publishedDate);
}
