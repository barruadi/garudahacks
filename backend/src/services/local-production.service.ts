import { db } from "../db/config";
import { users, localProducts, localProductsInteraction, productTags} from "../db/schema";
import { eq} from "drizzle-orm";
import { count, inArray } from 'drizzle-orm/sql';

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
                "3DUrl": localProducts["3DUrl"],
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
                "3DUrl": localProducts["3DUrl"],
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
        longitude: number,
        threeDUrl: string | null,
        tags: string[] = []
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
                "3DUrl": threeDUrl,
            })
            .returning();

        for (const tag of tags) {
            await db
                .insert(productTags)
                .values({
                    productId: result[0].id,
                    tag: tag,
                });
        }
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

    async getAllTags(): Promise<string[]> {
        const tags = await db
            .select({ tag: productTags.tag })
            .from(productTags)
            .groupBy(productTags.tag);
        return tags.map(t => t.tag).filter((tag): tag is string => tag !== null);
    }   

async getProductsByTag(tags: string[]): Promise<LocalProduct[]> {
    const products = await db
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
            "3DUrl": localProducts["3DUrl"],
        })
        .from(localProducts)
        .innerJoin(productTags, eq(localProducts.id, productTags.productId))
        .where(inArray(productTags.tag, tags)) // cari produk yang memiliki salah satu dari tag
        .groupBy(localProducts.id); // hindari duplikat karena join

    const productsWithLikes: LocalProduct[] = await Promise.all(
        products.map(async (product) => {
            const likeCount = await this.getLike(product.id);
            return {
                ...product,
                likeCount,
            };
        })
    );

    return productsWithLikes;
}

}