import { db } from "../db/config";
import { users, community } from "../db/schema";
import { eq } from "drizzle-orm";
import { Community } from "../types/db.types";

export class CommunityService{
    async getAllCommunities(): Promise<Community[]> {
        const allCommunities = await db
            .select({
                id: community.id,
                photo: community.photoLink,
                latitude: community.latitude,
                longitude: community.longitude,
                title: community.title,
                description: community.description,
                createdBy: community.createdBy,
            })
            .from(community);
        return allCommunities as Community[];
    }

    async getCommunityById(id: number): Promise<Community | null> {
        const communityData = await db
            .select({
                id: community.id,
                photo: community.photoLink,
                latitude: community.latitude,
                longitude: community.longitude,
                title: community.title,
                description: community.description,
                createdBy: community.createdBy,
            })
            .from(community)
            .where(eq(community.id, id))
            .limit(1);
        return communityData[0] ?? null;
    }

    async createCommunity(photoLink: string|null, latitude: number, longitude: number, title: string, description: string, createdBy: number): Promise<boolean> {
        const result = await db
            .insert(community)
            .values({
                photoLink: photoLink,
                latitude: latitude,
                longitude: longitude,
                title: title,
                description: description,
                createdBy: createdBy,
            })
            .returning();
        return result.length > 0;
    }

}