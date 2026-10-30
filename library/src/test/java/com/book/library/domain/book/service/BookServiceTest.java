package com.book.library.domain.book.service;

import com.book.library.domain.book.dto.BookDto;
import com.book.library.domain.book.entity.BookEntity;
import com.book.library.domain.book.entity.enums.Category;
import com.book.library.domain.book.repository.BookRepository;
import com.book.library.exception.CustomNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private BookEntity sampleBook;
    private BookDto.BookRequest sampleRequest;

    @BeforeEach
    void setUp() {
        sampleBook = new BookEntity();
        sampleBook.setId(1L);
        sampleBook.setTitle("O'tkan kunlar");
        sampleBook.setDescription("Tarixiy roman");
        sampleBook.setAuthor("Abdulla Qodiriy");
        sampleBook.setPageSize(350);
        sampleBook.setCategory(Category.HISTORY);
        sampleBook.setPublishedDate(LocalDate.of(1925, 1, 1));
        sampleBook.setPrice(15.99);
        sampleBook.setImage("https://images.unsplash.com/photo-sample.jpg");

        sampleRequest = BookDto.BookRequest.builder()
                .title("O'tkan kunlar")
                .description("Tarixiy roman")
                .author("Abdulla Qodiriy")
                .pageSize(350)
                .category(Category.HISTORY)
                .publishedDate(LocalDate.of(1925, 1, 1))
                .price(15.99)
                .image("https://images.unsplash.com/photo-sample.jpg")
                .build();
    }

    @Test
    @DisplayName("createBook: kitobni muvaffaqiyatli yaratishi kerak (lokal fayl saqlanmaydi)")
    void createBook_WithCustomImage() {
        when(bookRepository.save(any(BookEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookDto.BookResponse response = bookService.createBook(sampleRequest);

        assertNotNull(response);
        assertEquals("O'tkan kunlar", response.title());
        assertEquals("Abdulla Qodiriy", response.author());
        assertEquals("https://images.unsplash.com/photo-sample.jpg", response.image());
        verify(bookRepository, times(1)).save(any(BookEntity.class));
    }

    @Test
    @DisplayName("createBook: rasm berilmasa default rasm qo'yilishi kerak")
    void createBook_WithDefaultImage() {
        sampleRequest.setImage(null);
        when(bookRepository.save(any(BookEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookDto.BookResponse response = bookService.createBook(sampleRequest);

        assertNotNull(response);
        assertNotNull(response.image());
        assertTrue(response.image().startsWith("https://"));
        verify(bookRepository, times(1)).save(any(BookEntity.class));
    }

    @Test
    @DisplayName("findBookById: kitob mavjud bo'lsa qaytarishi kerak")
    void findBookById_Found() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));

        BookEntity book = bookService.findBookById(1L);

        assertNotNull(book);
        assertEquals(1L, book.getId());
        assertEquals("O'tkan kunlar", book.getTitle());
    }

    @Test
    @DisplayName("findBookById: kitob topilmasa CustomNotFoundException otishi kerak")
    void findBookById_NotFound() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(CustomNotFoundException.class, () -> bookService.findBookById(99L));
    }

    @Test
    @DisplayName("bookList: barcha kitoblarni qaytarishi kerak")
    void bookList_Success() {
        when(bookRepository.findAll()).thenReturn(List.of(sampleBook));

        List<BookDto.BookResponse> list = bookService.bookList();

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals("O'tkan kunlar", list.get(0).title());
    }

    @Test
    @DisplayName("getBookByAuthor: muallif bo'yicha qidirish")
    void getBookByAuthor_Success() {
        when(bookRepository.findByAuthor("Abdulla Qodiriy")).thenReturn(List.of(sampleBook));

        List<BookDto.BookResponse> list = bookService.getBookByAuthor("Abdulla Qodiriy");

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals("Abdulla Qodiriy", list.get(0).author());
    }

    @Test
    @DisplayName("getBookByCategory: kategoriya bo'yicha qidirish")
    void getBookByCategory_Success() {
        when(bookRepository.findByCategory(Category.HISTORY)).thenReturn(List.of(sampleBook));

        List<BookDto.BookResponse> list = bookService.getBookByCategory(Category.HISTORY);

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals(Category.HISTORY, list.get(0).category());
    }

    @Test
    @DisplayName("getBookByPrice: narx bo'yicha qidirish")
    void getBookByPrice_Success() {
        when(bookRepository.findByPrice(15.99)).thenReturn(List.of(sampleBook));

        List<BookDto.BookResponse> list = bookService.getBookByPrice(15.99);

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals(15.99, list.get(0).price());
    }

    @Test
    @DisplayName("removeBookById: kitobni o'chirish")
    void removeBookById_Success() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));
        doNothing().when(bookRepository).delete(sampleBook);

        assertDoesNotThrow(() -> bookService.removeBookById(1L));
        verify(bookRepository, times(1)).delete(sampleBook);
    }

    @Test
    @DisplayName("editBook: kitobni muvaffaqiyatli tahrirlash")
    void editBook_Success() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(sampleBook));
        when(bookRepository.save(any(BookEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookDto.BookRequest updateRequest = BookDto.BookRequest.builder()
                .title("Mehrobdan Chayon")
                .description("Yangi tavsif")
                .author("Abdulla Qodiriy")
                .pageSize(400)
                .category(Category.HISTORY)
                .publishedDate(LocalDate.of(1928, 1, 1))
                .price(20.0)
                .image("https://images.unsplash.com/new-image.jpg")
                .build();

        BookDto.BookResponse updated = bookService.editBook(1L, updateRequest);

        assertNotNull(updated);
        assertEquals("Mehrobdan Chayon", updated.title());
        assertEquals(400, updated.pageSize());
        assertEquals(20.0, updated.price());
        assertEquals("https://images.unsplash.com/new-image.jpg", updated.image());
    }
}
