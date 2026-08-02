package com.book.library.domain.book.service;

import com.book.library.domain.book.dto.BookDto;
import com.book.library.domain.book.entity.BookEntity;
import com.book.library.domain.book.entity.enums.Category;
import com.book.library.domain.book.repository.BookRepository;
import com.book.library.exception.CustomNotFoundException;
import com.book.library.util.FileUtil;
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
    private final FileUtil fileUtil;

    @Transactional
    public BookEntity saveBook(BookEntity book){
       return bookRepository.save(book);
    }
    public BookEntity findBookById(Long id){
        return bookRepository.findById(id).orElseThrow(()-> new CustomNotFoundException("Book not found: " + id));
    }
    public BookDto.BookResponse createBook(BookDto.BookRequest request){
        BookEntity book = new BookEntity();
        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setAuthor(request.getAuthor());
        book.setPageSize(request.getPageSize());
        book.setCategory(request.getCategory());
        book.setPublishedDate(request.getPublishedDate());
        book.setPrice(request.getPrice());
        book.setImage(fileUtil.saveFile(request.getImage()));
        // save
        BookEntity saved = saveBook(book);
        return BookDto.BookResponse.from(saved);
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
    public void removeBookById(Long id){
        BookEntity book = findBookById(id);
        bookRepository.delete(book);
    }
    public BookDto.BookResponse editBook(Long id,BookDto.BookRequest request){
        BookEntity book = findBookById(id);
        Optional.ofNullable(request.getTitle()).ifPresent(book::setTitle);
        Optional.ofNullable(request.getDescription()).ifPresent(book::setDescription);
        Optional.ofNullable(request.getAuthor()).ifPresent(book::setAuthor);
        Optional.of(request.getPageSize()).ifPresent(book::setPageSize);
        Optional.ofNullable(request.getCategory()).ifPresent(book::setCategory);
        Optional.of(request.getPublishedDate()).ifPresent(book::setPublishedDate);
        Optional.of(request.getPrice()).ifPresent(book::setPrice);
        if (request.getImage()!=null){
            book.setImage(fileUtil.saveFile(request.getImage()));
        }
        // save
        saveBook(book);
        return BookDto.BookResponse.from(book);
    }
}
