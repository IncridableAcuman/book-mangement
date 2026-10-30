package com.book.library.domain.book.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.library.domain.book.dto.BookDto;
import com.book.library.domain.book.entity.enums.Category;
import com.book.library.domain.book.service.BookService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto.BookResponse> createBook(@Valid @RequestBody BookDto.BookRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(request));
    }

    @GetMapping
    public ResponseEntity<List<BookDto.BookResponse>> getList(){
        return ResponseEntity.ok(bookService.bookList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto.BookResponse> getBookById(@PathVariable Long id){
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @GetMapping("/filter/author/{author}")
    public ResponseEntity<List<BookDto.BookResponse>> getBookByAuthorList(@PathVariable String author){
        return ResponseEntity.ok(bookService.getBookByAuthor(author));
    }

    @GetMapping("/filter/date/{publishedDate}")
    public ResponseEntity<List<BookDto.BookResponse>> getBookByPublishedDateList(@PathVariable LocalDate publishedDate){
        return ResponseEntity.ok(bookService.getBookByPublishedDate(publishedDate));
    }

    @GetMapping("/filter/category/{category}")
    public ResponseEntity<List<BookDto.BookResponse>> getBookByCategoryList(@PathVariable Category category){
        return ResponseEntity.ok(bookService.getBookByCategory(category));
    }

    @GetMapping("/filter/price/{price}")
    public ResponseEntity<List<BookDto.BookResponse>> getBookByPriceList(@PathVariable double price){
        return ResponseEntity.ok(bookService.getBookByPrice(price));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeBookById(@PathVariable Long id){
        bookService.removeBookById(id);
        return ResponseEntity.ok("Book removed successfully: " + id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BookDto.BookResponse> editBook(@PathVariable Long id, @Valid @RequestBody BookDto.BookRequest request){
        return ResponseEntity.ok(bookService.editBook(id, request));
    }
}
