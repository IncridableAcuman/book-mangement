package com.book.library.domain.book.controller;

import com.book.library.domain.book.dto.BookDto;
import com.book.library.domain.book.entity.enums.Category;
import com.book.library.domain.book.service.BookService;
import com.book.library.exception.CustomNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @MockitoBean
    private BookService bookService;

    private BookDto.BookResponse createSampleResponse() {
        return new BookDto.BookResponse(
                1L,
                "Sariq devni minib",
                "Sarguzasht asar",
                "Xudoyberdi To'xtaboyev",
                250,
                Category.FANTASY,
                LocalDate.of(1980, 5, 20),
                12.50,
                "https://images.unsplash.com/sample.jpg"
        );
    }

    private BookDto.BookRequest createSampleRequest() {
        return BookDto.BookRequest.builder()
                .title("Sariq devni minib")
                .description("Sarguzasht asar")
                .author("Xudoyberdi To'xtaboyev")
                .pageSize(250)
                .category(Category.FANTASY)
                .publishedDate(LocalDate.of(1980, 5, 20))
                .price(12.50)
                .image("https://images.unsplash.com/sample.jpg")
                .build();
    }

    @Test
    @DisplayName("GET /book - barcha kitoblar ro'yxatini 200 OK bilan qaytarishi kerak")
    void getList_Success() throws Exception {
        when(bookService.bookList()).thenReturn(List.of(createSampleResponse()));

        mockMvc.perform(get("/book"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Sariq devni minib"))
                .andExpect(jsonPath("$[0].author").value("Xudoyberdi To'xtaboyev"));
    }

    @Test
    @DisplayName("GET /book/{id} - kitob mavjud bo'lsa 200 OK qaytarishi kerak")
    void getBookById_Success() throws Exception {
        when(bookService.getBookById(1L)).thenReturn(createSampleResponse());

        mockMvc.perform(get("/book/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Sariq devni minib"));
    }

    @Test
    @DisplayName("GET /book/{id} - kitob topilmasa 404 Not Found qaytarishi kerak")
    void getBookById_NotFound() throws Exception {
        when(bookService.getBookById(999L)).thenThrow(new CustomNotFoundException("Book not found: 999"));

        mockMvc.perform(get("/book/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /book/filter/author/{author} - muallif bo'yicha 200 OK qaytarishi kerak")
    void getBookByAuthor_Success() throws Exception {
        when(bookService.getBookByAuthor("Xudoyberdi To'xtaboyev")).thenReturn(List.of(createSampleResponse()));

        mockMvc.perform(get("/book/filter/author/Xudoyberdi To'xtaboyev"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].author").value("Xudoyberdi To'xtaboyev"));
    }

    @Test
    @DisplayName("GET /book/filter/category/{category} - kategoriya bo'yicha 200 OK qaytarishi kerak")
    void getBookByCategory_Success() throws Exception {
        when(bookService.getBookByCategory(Category.FANTASY)).thenReturn(List.of(createSampleResponse()));

        mockMvc.perform(get("/book/filter/category/FANTASY"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].category").value("FANTASY"));
    }

    @Test
    @DisplayName("GET /book/filter/price/{price} - narx bo'yicha 200 OK qaytarishi kerak")
    void getBookByPrice_Success() throws Exception {
        when(bookService.getBookByPrice(12.50)).thenReturn(List.of(createSampleResponse()));

        mockMvc.perform(get("/book/filter/price/12.50"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].price").value(12.50));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("POST /book - ADMIN roli bilan 201 Created qaytarishi kerak")
    void createBook_AsAdmin_Success() throws Exception {
        BookDto.BookRequest request = createSampleRequest();
        when(bookService.createBook(any(BookDto.BookRequest.class))).thenReturn(createSampleResponse());

        mockMvc.perform(post("/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Sariq devni minib"));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("POST /book - oddiy USER roli bilan 403 Forbidden qaytarishi kerak")
    void createBook_AsUser_Forbidden() throws Exception {
        BookDto.BookRequest request = createSampleRequest();

        mockMvc.perform(post("/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("POST /book - avtorizatsiyasiz 403 Forbidden qaytarishi kerak")
    void createBook_Unauthenticated_Forbidden() throws Exception {
        BookDto.BookRequest request = createSampleRequest();

        mockMvc.perform(post("/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("PATCH /book/{id} - ADMIN roli bilan 200 OK qaytarishi kerak")
    void editBook_AsAdmin_Success() throws Exception {
        BookDto.BookRequest request = createSampleRequest();
        when(bookService.editBook(eq(1L), any(BookDto.BookRequest.class))).thenReturn(createSampleResponse());

        mockMvc.perform(patch("/book/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Sariq devni minib"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    @DisplayName("DELETE /book/{id} - ADMIN roli bilan 200 OK qaytarishi kerak")
    void removeBook_AsAdmin_Success() throws Exception {
        doNothing().when(bookService).removeBookById(1L);

        mockMvc.perform(delete("/book/1"))
                .andExpect(status().isOk());
    }
}
