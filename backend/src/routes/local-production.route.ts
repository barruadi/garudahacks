import { Hono } from "hono";
import { localProductsController } from "../config/ioc.config";
import { authMiddleware } from "../middlewares/auth.middleware";

const localProductionRoute = new Hono();

localProductionRoute.get("/", async (c) => {
    return localProductsController.getAllLocalProducts(c);
});

localProductionRoute.get("/:id", async (c) => {
    return localProductsController.getLocalProductById(c);
});

localProductionRoute.post("/", authMiddleware, async (c) => {
    return localProductsController.createLocalProduct(c);
});

localProductionRoute.post("/nearest", async (c) => {
    return localProductsController.getNearestLocalProducts(c);
});

localProductionRoute.get("/all-tags", async (c) => {
    return localProductsController.getAllTags(c);
});

localProductionRoute.get("/tags/:tags", async (c) => {
    return localProductsController.getProductsByTag(c);
});
export { localProductionRoute };