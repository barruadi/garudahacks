import { relations } from "drizzle-orm/relations";
import { users, sites, province, localProducts, sitesMessage, localProductsInteraction, sitesInteraction } from "./schema";

export const sitesRelations = relations(sites, ({one, many}) => ({
	user: one(users, {
		fields: [sites.createdBy],
		references: [users.id]
	}),
	province: one(province, {
		fields: [sites.provinceId],
		references: [province.id]
	}),
	sitesMessages: many(sitesMessage),
}));

export const usersRelations = relations(users, ({many}) => ({
	sites: many(sites),
	localProducts: many(localProducts),
	sitesMessages: many(sitesMessage),
	localProductsInteractions: many(localProductsInteraction),
	sitesInteractions: many(sitesInteraction),
}));

export const provinceRelations = relations(province, ({many}) => ({
	sites: many(sites),
}));

export const localProductsRelations = relations(localProducts, ({one, many}) => ({
	user: one(users, {
		fields: [localProducts.userId],
		references: [users.id]
	}),
	localProductsInteractions: many(localProductsInteraction),
}));

export const sitesMessageRelations = relations(sitesMessage, ({one, many}) => ({
	user: one(users, {
		fields: [sitesMessage.userId],
		references: [users.id]
	}),
	site: one(sites, {
		fields: [sitesMessage.sitesId],
		references: [sites.id]
	}),
	sitesMessage: one(sitesMessage, {
		fields: [sitesMessage.replyTo],
		references: [sitesMessage.id],
		relationName: "sitesMessage_replyTo_sitesMessage_id"
	}),
	sitesMessages: many(sitesMessage, {
		relationName: "sitesMessage_replyTo_sitesMessage_id"
	}),
	sitesInteractions: many(sitesInteraction),
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

export const sitesInteractionRelations = relations(sitesInteraction, ({one}) => ({
	sitesMessage: one(sitesMessage, {
		fields: [sitesInteraction.messageId],
		references: [sitesMessage.id]
	}),
	user: one(users, {
		fields: [sitesInteraction.userId],
		references: [users.id]
	}),
}));