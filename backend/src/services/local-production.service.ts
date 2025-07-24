import { db } from "../db/config";
import { users, localProducts, localProductsInteraction} from "../db/schema";
import { eq } from "drizzle-orm";
import { count } from 'drizzle-orm/sql';

import { LocalProduct } from "../types/db.types";

export class LocalProductsService {

    async getLike(id: number): Promise<number> {
        const likes = await db
            .select({ count: count() })
            .from(localProductsInteraction)
            .where(eq(localProductsInteraction.productId, id));

        return Number(likes[0]?.count ?? 0);
    }
    async getAllLocalProducts(): Promise<LocalProduct[]> {
        const allProducts = await db
            .select({
                id: localProducts.id,
                userId: localProducts.userId,
                title: localProducts.title,
                description: localProducts.description,
                photoUrl: localProducts.photoUrl,
                shopLink: localProducts.shopLink,
                gmapsLink: localProducts.gmapsLink,
                createdAt: localProducts.createdAt,
                latitude: localProducts.latitude,
                longitude: localProducts.longitude,
            })
            .from(localProducts);

        const productsWithLikes: LocalProduct[] = [];
        for (const product of allProducts) {
            const likeCount = await this.getLike(product.id);
            productsWithLikes.push({
                ...product,
                likeCount
            });
        }
        return productsWithLikes;
    }

    async getLocalProductById(id: number): Promise<LocalProduct | null> {
        const productData = await db
            .select({
                id: localProducts.id,
                userId: localProducts.userId,
                title: localProducts.title,
                description: localProducts.description,
                photoUrl: localProducts.photoUrl,
                shopLink: localProducts.shopLink,
                gmapsLink: localProducts.gmapsLink,
                createdAt: localProducts.createdAt,
                latitude: localProducts.latitude,
                longitude: localProducts.longitude,
            })
            .from(localProducts)
            .where(eq(localProducts.id, id))
            .limit(1);
        if (!productData[0]) return null;
        const likeCount = await this.getLike(productData[0].id);
        return {
            ...productData[0],
            likeCount
        };
    }

    async createLocalProduct(
        userId: number,
        title: string,
        description: string,
        photoUrl: string,
        shopLink: string | null,
        gmapsLink: string | null,
        latitude: number,
        longitude: number
    ): Promise<boolean> {
        const result = await db
            .insert(localProducts)
            .values({
                userId: userId,
                title: title,
                description: description,
                photoUrl: photoUrl,
                shopLink: shopLink,
                gmapsLink: gmapsLink,
                latitude: latitude,
                longitude: longitude,
            })
            .returning();
        return result.length > 0;
    }

    async getNearestLocalProducts(latitude: number, longitude: number): Promise<LocalProduct[]> {
        const allProducts = await this.getAllLocalProducts();
        const nearbyProducts = allProducts.filter(product => {
            const distance = Math.sqrt(
                Math.pow(product.latitude - latitude, 2) +
                Math.pow(product.longitude - longitude, 2)
            );
            return distance < 50;
        });
        return nearbyProducts;
    }
}