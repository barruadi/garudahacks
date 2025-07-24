import { LocalProductsService } from "../services/local-production.service";
import { Context } from "hono";

export class LocalProductsController {
    constructor(private localProductsService: LocalProductsService) { }
    async getAllLocalProducts(c: Context): Promise<Response> {
        try {
            const products = await this.localProductsService.getAllLocalProducts();
            return c.json({ success: true, data: products });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }
    async getLocalProductById(c: Context): Promise<Response> {
        try {
            const id = Number(c.req.param('id'));
            const product = await this.localProductsService.getLocalProductById(id);
            if (!product) {
                return c.json({ success: false, error: 'Product not found' }, 404);
            }
            return c.json({ success: true, data: product });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async getNearestLocalProducts(c: Context): Promise<Response> {
        try {
            const { latitude, longitude } = await c.req.json();
            const products = await this.localProductsService.getNearestLocalProducts(latitude, longitude);
            return c.json({ success: true, data: products });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }

    async createLocalProduct(c: Context): Promise<Response> {
        try {
            const userFromToken = c.get('user');
            const { title, description, photoUrl, shopLink, gmapsLink, latitude, longitude } = await c.req.json();

            const result = await this.localProductsService.createLocalProduct(
                userFromToken.id,
                title,
                description,
                photoUrl,
                shopLink,
                gmapsLink,
                latitude,
                longitude
            );
            if (!result) {
                return c.json({ success: false, error: 'Failed to create product' }, 400);
            }
            return c.json({ success: true, message: 'Product created successfully' });
        } catch (error: any) {
            return c.json({ success: false, error: error.message ?? 'Internal server error' }, 500);
        }
    }
}