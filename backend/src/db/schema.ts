import { pgTable, unique, integer, text, timestamp, foreignKey, doublePrecision, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_username_key").on(table.username),
]);

export const community = pgTable("community", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "community_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	photoLink: text("photo_link"),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	createdBy: integer("created_by"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "created_by"
		}),
]);

export const localPromotions = pgTable("local_promotions", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "local_promotions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: integer().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	photoUrl: text("photo_url").notNull(),
	shopLink: text("shop_link"),
	gmapsLink: text("gmaps_link"),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	province: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "created_user"
		}),
]);

export const communityMessage = pgTable("community_message", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "community_message_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: integer("user_id").notNull(),
	message: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	communityId: integer("community_id").notNull(),
	replyTo: integer("reply_to"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user"
		}),
	foreignKey({
			columns: [table.communityId],
			foreignColumns: [community.id],
			name: "community"
		}),
	foreignKey({
			columns: [table.replyTo],
			foreignColumns: [community.id],
			name: "reply_to"
		}),
]);

export const localInteraction = pgTable("local_interaction", {
	messageId: integer("message_id").notNull(),
	userId: integer("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.messageId],
			foreignColumns: [communityMessage.id],
			name: "message"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user"
		}),
	primaryKey({ columns: [table.messageId, table.userId], name: "primary"}),
]);
