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
    title: z.string().min(1, "Kitob nomi majburiy"),
    description: z.string().min(1, "Tavsif majburiy"),
    author: z.string().min(1, "Muallif majburiy"),
    pageSize: z.union([z.string().min(1, "Sahifalar soni majburiy"), z.number()]),
    category: BookCategoryEnum,
    publishedDate: z.string().min(1, "Nashr etilgan sana majburiy"),
    price: z.union([z.string().min(1, "Narxi majburiy"), z.number()]),
    image: z.string().optional().or(z.literal(""))
});

export type BookData = z.infer<typeof bookSchema>;
