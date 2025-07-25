import { Hono } from 'hono'
import { userController } from "../config/ioc.config";
import { authMiddleware } from '../middlewares/auth.middleware';

const usersRoute = new Hono();

usersRoute.get("/", async (c) => {
    return userController.getAllUsers(c);
});

usersRoute.get("/profile", authMiddleware, async (c) => {
    return userController.getUserProfile(c);
});

usersRoute.post("/login", async (c) => {
    return userController.loginUser(c);
});

usersRoute.post("/register", async (c) => {
    return userController.createUser(c);
});

usersRoute.post("/add-province", async (c) => {
    return userController.addProvince(c);
});

usersRoute.post("/get-username", async (c) => {
    return userController.getUsernameById(c);
});

usersRoute.get("/:userId", async (c) => {
    return userController.getUserDataById(c);
});

export { usersRoute };