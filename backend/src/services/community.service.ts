import { db } from "../db/config";
import { users, sites, province } from "../db/schema";
import { eq } from "drizzle-orm";
import { Community, LocalProduct } from "../types/db.types";
import { LocalProductsService } from "./local-production.service";

export class CommunityService{
    constructor(private localProductsService: LocalProductsService) {}
    async getAllCommunities(): Promise<Community[]> {
        const allCommunities = await db
            .select({
                id: sites.id,
                photo: sites.photoLink,
                latitude: sites.latitude,
                longitude: sites.longitude,
                title: sites.title,
                description: sites.description,
                createdBy: sites.createdBy,
                provinceId: sites.provinceId,
                "3DUrl": sites["3DUrl"],
            })
            .from(sites);
        return allCommunities as Community[];
    }

    async getSitesById(id: number): Promise<Community | null> {
        const communityData = await db
            .select({
                id: sites.id,
                photo: sites.photoLink,
                latitude: sites.latitude,
                longitude: sites.longitude,
                title: sites.title,
                description: sites.description,
                createdBy: sites.createdBy,
                provinceId: sites.provinceId,
                "3DUrl": sites["3DUrl"],
            })
            .from(sites)
            .where(eq(sites.id, id))
            .limit(1);
        return communityData[0] ?? null;
    }

    async createSites(photoLink: string|null, latitude: number, longitude: number, title: string, description: string, createdBy: number, threeDUrl: string | null, province_id: number | null): Promise<boolean> {
        const result = await db
            .insert(sites)
            .values({
                photoLink: photoLink,
                latitude: latitude,
                longitude: longitude,
                title: title,
                description: description,
                createdBy: createdBy,
                provinceId: province_id,
                "3DUrl": threeDUrl,
            })
            .returning();
        return result.length > 0;
    }

    async getNearestLocalProducts(latitude: number, longitude: number): Promise<LocalProduct[]> {
        return this.localProductsService.getNearestLocalProducts(latitude, longitude);
    }

}