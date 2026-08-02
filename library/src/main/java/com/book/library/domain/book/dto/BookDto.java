package com.book.library.domain.book.dto;

import com.book.library.domain.book.entity.BookEntity;
import com.book.library.domain.book.entity.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

public class BookDto {

    @Data
    public static class BookRequest{
        @NotBlank private String title;
        @NotBlank private String description;
        @NotBlank String author;
        @NotNull private int pageSize;
        private Category  category;
        @NotNull private LocalDate publishedDate;
        @NotNull private double price;
    }
    public record BookResponse(
        Long id,
        String title,
        String description,
        String author,
        int pageSize,
        Category category,
        LocalDate publishedDate,
        double price
    ){
        public static BookResponse from(BookEntity book){
            return new BookResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getDescription(),
                    book.getAuthor(),
                    book.getPageSize(),
                    book.getCategory(),
                    book.getPublishedDate(),
                    book.getPrice()
            );
        }
    }
}
