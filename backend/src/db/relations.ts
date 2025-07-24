import { relations } from "drizzle-orm/relations";
import { users, community, communityMessage, localProducts, localProductsInteraction, communityInteraction } from "./schema";

export const communityRelations = relations(community, ({one, many}) => ({
	user: one(users, {
		fields: [community.createdBy],
		references: [users.id]
	}),
	communityMessages: many(communityMessage),
}));

export const usersRelations = relations(users, ({many}) => ({
	communities: many(community),
	communityMessages: many(communityMessage),
	localProducts: many(localProducts),
	localProductsInteractions: many(localProductsInteraction),
	communityInteractions: many(communityInteraction),
}));

export const communityMessageRelations = relations(communityMessage, ({one, many}) => ({
	user: one(users, {
		fields: [communityMessage.userId],
		references: [users.id]
	}),
	community: one(community, {
		fields: [communityMessage.communityId],
		references: [community.id]
	}),
	communityMessage: one(communityMessage, {
		fields: [communityMessage.replyTo],
		references: [communityMessage.id],
		relationName: "communityMessage_replyTo_communityMessage_id"
	}),
	communityMessages: many(communityMessage, {
		relationName: "communityMessage_replyTo_communityMessage_id"
	}),
	communityInteractions: many(communityInteraction),
}));

export const localProductsRelations = relations(localProducts, ({one, many}) => ({
	user: one(users, {
		fields: [localProducts.userId],
		references: [users.id]
	}),
	localProductsInteractions: many(localProductsInteraction),
}));

export const localProductsInteractionRelations = relations(localProductsInteraction, ({one}) => ({
	user: one(users, {
		fields: [localProductsInteraction.userId],
		references: [users.id]
	}),
	localProduct: one(localProducts, {
		fields: [localProductsInteraction.productId],
		references: [localProducts.id]
	}),
}));

export const communityInteractionRelations = relations(communityInteraction, ({one}) => ({
	communityMessage: one(communityMessage, {
		fields: [communityInteraction.messageId],
		references: [communityMessage.id]
	}),
	user: one(users, {
		fields: [communityInteraction.userId],
		references: [users.id]
	}),
}));