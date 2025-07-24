import { db } from "../db/config";
import { communityMessage, communityInteraction } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { CommunityMessage } from "../types/db.types";
import { count } from 'drizzle-orm/sql';


export class CommunityMessageService {

    async getLikeCount(messageId: number): Promise<number> {
        const likeCount = await db
            .select({ count: count() })
            .from(communityInteraction)
            .where(eq(communityInteraction.messageId, messageId))
        return likeCount[0]?.count ?? 0;
    }

    async getMessagesByCommunityId(communityId: number): Promise<CommunityMessage[]> {
        const messages = await db
            .select({
                id: communityMessage.id,
                communityId: communityMessage.communityId,
                userId: communityMessage.userId,
                content: communityMessage.message,
                createdAt: communityMessage.createdAt,
                replyTo: communityMessage.replyTo,
            })
            .from(communityMessage)
            .where(eq(communityMessage.communityId, communityId));

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
                id: communityMessage.id,
                communityId: communityMessage.communityId,
                userId: communityMessage.userId,
                content: communityMessage.message,
                createdAt: communityMessage.createdAt,
                replyTo: communityMessage.replyTo,
            })
            .from(communityMessage)
            .where(eq(communityMessage.id, id))
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
                id: communityMessage.id,
                communityId: communityMessage.communityId,
                userId: communityMessage.userId,
                content: communityMessage.message,
                createdAt: communityMessage.createdAt,
                replyTo: communityMessage.replyTo,
            })
            .from(communityMessage)
            .where(eq(communityMessage.replyTo, messageId));
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
                .insert(communityMessage)
                .values({
                    communityId: community_id,
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