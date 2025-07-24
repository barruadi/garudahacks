import { MiddlewareHandler } from "hono";
import { verifyToken } from "../utils/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) =>{
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    try {
        const token = authHeader.split(" ")[1];
        const user = verifyToken(token)
        c.set("user", user);
        return await next();
    }
    catch (error) {
        return c.json({ error: 'Invalid token' }, 401)
    }
}