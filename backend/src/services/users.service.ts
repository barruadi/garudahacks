import { db } from "../db/config";
import { users } from "../db/schema";
import { User, UserWithoutPassword, CreateNewUserRequest } from "../types/db.types";
import { signToken } from "../utils/jwt";
import { eq, and } from "drizzle-orm";

export class UserService{
    async getAllUsers(): Promise<UserWithoutPassword[]> {
        const allUsers = await db
            .select({
                id: users.id,
                username: users.username,
            })
            .from(users);
        return allUsers as UserWithoutPassword[];
    }

    async getUserData(username: string): Promise<User | null> {
        const user = await db
            .select({
                id: users.id,
                username: users.username,
                password: users.password,
            })
            .from(users)
            .where(eq(users.username, username))
            .limit(1);
        return user[0] ?? null;
    }

    async getUserProfile(username: string): Promise<UserWithoutPassword | null> {
        const user = await db
            .select({
                id: users.id,
                username: users.username,
            })
            .from(users)
            .where(eq(users.username, username))
            .limit(1);
        return user[0] ?? null;
    }

    async isUsernameExists(username: string): Promise<boolean> {
        const result = await db.select().from(users).where(eq(users.username, username));
        return result.length > 0;
    }

    async loginUser(username: string, password: string): Promise<{ token: string } | null> {
        const user = await db
            .select({
                id: users.id,
                username: users.username,
                password: users.password,
            })
            .from(users)
            .where(and(eq(users.username, username), eq(users.password, password)))
            .limit(1);
        if (user.length === 0) return null;
        const token = signToken({ id: user[0].id, username: user[0].username});
        return { token };
    }

    async createUser(username: string, password: string): Promise<boolean> {
        const existingUser = await this.isUsernameExists(username);
        if (existingUser) {
            throw new Error("Username already exists");
        }
        const result = await db
            .insert(users)
            .values({
                username: username,
                password: password,
            })
            .returning();
        return result.length > 0;
    }



}