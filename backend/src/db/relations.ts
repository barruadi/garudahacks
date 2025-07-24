import { relations } from "drizzle-orm/relations";
import { users, community, localPromotions, communityMessage, localInteraction } from "./schema";

export const communityRelations = relations(community, ({one, many}) => ({
	user: one(users, {
		fields: [community.createdBy],
		references: [users.id]
	}),
	communityMessages_communityId: many(communityMessage, {
		relationName: "communityMessage_communityId_community_id"
	}),
	communityMessages_replyTo: many(communityMessage, {
		relationName: "communityMessage_replyTo_community_id"
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	communities: many(community),
	localPromotions: many(localPromotions),
	communityMessages: many(communityMessage),
	localInteractions: many(localInteraction),
}));

export const localPromotionsRelations = relations(localPromotions, ({one}) => ({
	user: one(users, {
		fields: [localPromotions.userId],
		references: [users.id]
	}),
}));

export const communityMessageRelations = relations(communityMessage, ({one, many}) => ({
	user: one(users, {
		fields: [communityMessage.userId],
		references: [users.id]
	}),
	community_communityId: one(community, {
		fields: [communityMessage.communityId],
		references: [community.id],
		relationName: "communityMessage_communityId_community_id"
	}),
	community_replyTo: one(community, {
		fields: [communityMessage.replyTo],
		references: [community.id],
		relationName: "communityMessage_replyTo_community_id"
	}),
	localInteractions: many(localInteraction),
}));

export const localInteractionRelations = relations(localInteraction, ({one}) => ({
	communityMessage: one(communityMessage, {
		fields: [localInteraction.messageId],
		references: [communityMessage.id]
	}),
	user: one(users, {
		fields: [localInteraction.userId],
		references: [users.id]
	}),
}));