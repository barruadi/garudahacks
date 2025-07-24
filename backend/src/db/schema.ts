import { pgTable, integer, text, unique, timestamp, foreignKey, doublePrecision, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const province = pgTable("province", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "province_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: text(),
});

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_username_key").on(table.username),
]);

export const sites = pgTable("sites", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "community_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	photoLink: text("photo_link"),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	createdBy: integer("created_by"),
	provinceId: integer("province_id"),
	"3DUrl": text("3d_url"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "created_by"
		}),
	foreignKey({
			columns: [table.provinceId],
			foreignColumns: [province.id],
			name: "province"
		}),
]);

export const localProducts = pgTable("local_products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "local_promotions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: integer().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	photoUrl: text("photo_url").notNull(),
	shopLink: text("shop_link"),
	gmapsLink: text("gmaps_link"),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	"3DUrl": text("3d_url"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "created_user"
		}),
]);

export const sitesMessage = pgTable("sites_message", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "community_message_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: integer("user_id").notNull(),
	message: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	sitesId: integer("sites_id").notNull(),
	replyTo: integer("reply_to"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user"
		}),
	foreignKey({
			columns: [table.sitesId],
			foreignColumns: [sites.id],
			name: "community"
		}),
	foreignKey({
			columns: [table.replyTo],
			foreignColumns: [table.id],
			name: "reply_to"
		}),
]);

export const localProductsInteraction = pgTable("local_products_interaction", {
	productId: integer("product_id").generatedAlwaysAsIdentity({ name: "local_products_interaction_product_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: integer("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user"
		}),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [localProducts.id],
			name: "product"
		}),
	primaryKey({ columns: [table.productId, table.userId], name: "connect"}),
]);

export const sitesInteraction = pgTable("sites_interaction", {
	messageId: integer("message_id").notNull(),
	userId: integer("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.messageId],
			foreignColumns: [sitesMessage.id],
			name: "message"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user"
		}),
	primaryKey({ columns: [table.messageId, table.userId], name: "primary"}),
]);
