import { Hono } from "hono";
import { communityController } from "../config/ioc.config";
import { authMiddleware } from "../middlewares/auth.middleware";

const communityRoute = new Hono();

communityRoute.get("/", async (c) => {
    return communityController.getAllCommunities(c);
});

communityRoute.get("/:id", async (c) => {
    return communityController.getCommunityById(c);
});

communityRoute.post("/", authMiddleware, async (c) => {
    return communityController.createCommunity(c);
});


export { communityRoute };