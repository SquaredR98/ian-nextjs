export type UserRole = "user" | "provider" | "admin";

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  location?: string;
}
