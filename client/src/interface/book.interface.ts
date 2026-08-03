
type Category = "HISTORY" | "DRAMATIC" | "ROMANCE" | "FANTASY" | "SCIENCE" | "BIOGRAPHY";

export default interface IBook {
    id: number;
    title: string;
    description: string;
    author: string;
    pageSize: number;
    category: Category;
    publishedDate: string;
    price: number;
    image: string;
}