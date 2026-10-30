package com.book.library.domain.book.dto;

import java.time.LocalDate;

import com.book.library.domain.book.entity.BookEntity;
import com.book.library.domain.book.entity.enums.Category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class BookDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BookRequest {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Description is required")
        private String description;

        @NotBlank(message = "Author is required")
        private String author;

        @NotNull(message = "Page size is required")
        private Integer pageSize;

        private Category category;

        @NotNull(message = "Published date is required")
        private LocalDate publishedDate;

        @NotNull(message = "Price is required")
        private Double price;

        // Fayllar lokal saqlanmaydi va majburiy emas. Ixtiyoriy muqova URL manzili.
        private String image;
    }

    public record BookResponse(
        Long id,
        String title,
        String description,
        String author,
        int pageSize,
        Category category,
        LocalDate publishedDate,
        double price,
        String image
    ) {
        public static BookResponse from(BookEntity book) {
            return new BookResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getDescription(),
                    book.getAuthor(),
                    book.getPageSize(),
                    book.getCategory(),
                    book.getPublishedDate(),
                    book.getPrice(),
                    book.getImage()
            );
        }
    }
}
