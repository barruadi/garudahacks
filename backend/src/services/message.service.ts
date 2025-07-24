import { db } from "../db/config";
import { sitesMessage, sitesInteraction } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { CommunityMessage } from "../types/db.types";
import { count } from 'drizzle-orm/sql';


export class CommunityMessageService {

    async getLikeCount(messageId: number): Promise<number> {
        const likeCount = await db
            .select({ count: count() })
            .from(sitesInteraction)
            .where(eq(sitesInteraction.messageId, messageId))
        return likeCount[0]?.count ?? 0;
    }

    async getMessagesByCommunityId(communityId: number): Promise<CommunityMessage[]> {
        const messages = await db
            .select({
                id: sitesMessage.id,
                communityId: sitesMessage.sitesId,
                userId: sitesMessage.userId,
                content: sitesMessage.message,
                createdAt: sitesMessage.createdAt,
                replyTo: sitesMessage.replyTo,
            })
            .from(sitesMessage)
            .where(eq(sitesMessage.sitesId, communityId));

        const productsWithLikes: CommunityMessage[] = [];
        for (const message of messages) {
            const likeCount = await this.getLikeCount(message.id);
            productsWithLikes.push({
                ...message,
                likeCount
            });
        }
        return productsWithLikes;
    }

    async getMessageById(id: number): Promise<CommunityMessage | null> {
        const messageData = await db
            .select({
                id: sitesMessage.id,
                communityId: sitesMessage.sitesId,
                userId: sitesMessage.userId,
                content: sitesMessage.message,
                createdAt: sitesMessage.createdAt,
                replyTo: sitesMessage.replyTo,
            })
            .from(sitesMessage)
            .where(eq(sitesMessage.id, id))
            .limit(1);
        const productsWithLikes: CommunityMessage[] = [];
        for (const message of messageData) {
            const likeCount = await this.getLikeCount(message.id);
            productsWithLikes.push({
                ...message,
                likeCount
            });
        }

        return productsWithLikes[0] || null;
    }

    async getRepliesToMessage(messageId: number): Promise<CommunityMessage[]> {
        const replies = await db
            .select({
                id: sitesMessage.id,
                communityId: sitesMessage.sitesId,
                userId: sitesMessage.userId,
                content: sitesMessage.message,
                createdAt: sitesMessage.createdAt,
                replyTo: sitesMessage.replyTo,
            })
            .from(sitesMessage)
            .where(eq(sitesMessage.replyTo, messageId));
        const productsWithLikes: CommunityMessage[] = [];
        for (const reply of replies) {
            const likeCount = await this.getLikeCount(reply.id);
            productsWithLikes.push({
                ...reply,
                likeCount
            });
        }
        return productsWithLikes;
    }

    async createMessage(community_id: number, userId: number, content: string, replyTo: number | null): Promise<boolean> {
        try {
            const result = await db
                .insert(sitesMessage)
                .values({
                    sitesId: community_id,
                    userId: userId,
                    message: content,
                    replyTo: replyTo ?? null,
                })
                .returning();

            return result.length > 0;
        } catch (e) {
            console.error("DB INSERT ERROR:", e);
            throw e;
        }
    }
}