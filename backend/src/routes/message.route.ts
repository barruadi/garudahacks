import { Hono } from "hono";
import { communityMessageController } from "../config/ioc.config";
import { authMiddleware } from "../middlewares/auth.middleware";

const messageRoute = new Hono();

messageRoute.get("/community/:community_id", async (c) => {
    return communityMessageController.getMessagesByCommunityId(c);
});

messageRoute.get("/message/:id", async (c) => {
    return communityMessageController.getMessageById(c);
});

messageRoute.get("/replies/:message_id", async (c) => {
    return communityMessageController.getRepliesToMessage(c);
});

messageRoute.post("/create/:communityId", authMiddleware, async (c) => {
    return communityMessageController.createMessage(c);
});

export { messageRoute };