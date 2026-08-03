import z from "zod";

export const BookCategoryEnum = z.enum([
    "HISTORY",
    "DRAMATIC",
    "ROMANCE",
    "FANTASY",
    "SCIENCE",
    "BIOGRAPHY"
]);


export const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    author: z.string().min(1, "Author is required"),

    pageSize: z.string().min(1, "Page size is required"),
    category: BookCategoryEnum,
    publishedDate: z.string().min(1, "Published date is required"),
    price: z.string().min(1, "Price is required"),
    image: z.custom<File>((val) => val instanceof File, "Image is required")
});

export type BookData = z.infer<typeof bookSchema>;