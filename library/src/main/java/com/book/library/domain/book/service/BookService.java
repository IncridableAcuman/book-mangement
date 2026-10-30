package com.book.library.domain.book.service;

import com.book.library.domain.book.dto.BookDto;
import com.book.library.domain.book.entity.BookEntity;
import com.book.library.domain.book.entity.enums.Category;
import com.book.library.domain.book.repository.BookRepository;
import com.book.library.exception.CustomNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    private static final String DEFAULT_BOOK_COVER = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400";

    public BookEntity findBookById(Long id){
        return bookRepository.findById(id).orElseThrow(() -> new CustomNotFoundException("Book not found: " + id));
    }

    @Transactional
    public BookDto.BookResponse createBook(BookDto.BookRequest request){
        BookEntity book = new BookEntity();
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setAuthor(request.getAuthor());
        book.setPageSize(request.getPageSize());
        book.setCategory(request.getCategory());
        book.setPublishedDate(request.getPublishedDate());
        book.setPrice(request.getPrice());

        // Fayllar lokal saqlanmaydi - agar URL berilgan bo'lsa URL saqlanadi, aks holda standart muqova
        String imageUrl = (request.getImage() != null && !request.getImage().isBlank()) 
                ? request.getImage().trim() 
                : DEFAULT_BOOK_COVER;
        book.setImage(imageUrl);

        bookRepository.save(book);
        return BookDto.BookResponse.from(book);
    }

    public List<BookDto.BookResponse> bookList(){
        List<BookEntity> books = bookRepository.findAll();
        return books.stream().map(BookDto.BookResponse::from).toList();
    }

    public BookDto.BookResponse getBookById(Long id){
        BookEntity book = findBookById(id);
        return BookDto.BookResponse.from(book);
    }

    public List<BookDto.BookResponse> getBookByAuthor(String author){
        List<BookEntity> books = bookRepository.findByAuthor(author);
        return books.stream().map(BookDto.BookResponse::from).toList();
    }

    public List<BookDto.BookResponse> getBookByPublishedDate(LocalDate publishedDate){
        List<BookEntity> books = bookRepository.findByPublishedDate(publishedDate);
        return books.stream().map(BookDto.BookResponse::from).toList();
    }

    public List<BookDto.BookResponse> getBookByCategory(Category category){
        List<BookEntity> books = bookRepository.findByCategory(category);
        return books.stream().map(BookDto.BookResponse::from).toList();
    }

    public List<BookDto.BookResponse> getBookByPrice(double price){
        List<BookEntity> books = bookRepository.findByPrice(price);
        return books.stream().map(BookDto.BookResponse::from).toList();
    }

    @Transactional
    public void removeBookById(Long id){
        BookEntity book = findBookById(id);
        bookRepository.delete(book);
    }

    @Transactional
    public BookDto.BookResponse editBook(Long id, BookDto.BookRequest request){
        BookEntity book = findBookById(id);
        Optional.ofNullable(request.getTitle()).ifPresent(book::setTitle);
        Optional.ofNullable(request.getDescription()).ifPresent(book::setDescription);
        Optional.ofNullable(request.getAuthor()).ifPresent(book::setAuthor);
        Optional.ofNullable(request.getPageSize()).ifPresent(book::setPageSize);
        Optional.ofNullable(request.getCategory()).ifPresent(book::setCategory);
        Optional.ofNullable(request.getPublishedDate()).ifPresent(book::setPublishedDate);
        Optional.ofNullable(request.getPrice()).ifPresent(book::setPrice);
        if (request.getImage() != null && !request.getImage().isBlank()){
            book.setImage(request.getImage().trim());
        }

        bookRepository.save(book);
        return BookDto.BookResponse.from(book);
    }
}
