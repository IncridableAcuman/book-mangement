export type Role = "USER" | "ADMIN"
export interface IUser {
    id: number;
    username: string;
    email: string;
    role: Role;

}