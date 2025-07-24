import { Hono } from 'hono'
import { userController } from "../config/ioc.config";

const usersRoute = new Hono();

usersRoute.get("/", async (c) => {
    return userController.getAllUsers(c);
});

usersRoute.get("/profile", async (c) => {
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

export { usersRoute };