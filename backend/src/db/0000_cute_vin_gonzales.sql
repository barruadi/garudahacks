-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_username_key" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "community" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "community_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"photo_link" text,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_by" integer
);
--> statement-breakpoint
CREATE TABLE "local_promotions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "local_promotions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"photo_url" text NOT NULL,
	"shop_link" text,
	"gmaps_link" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"province" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_message" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "community_message_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"message" text,
	"createdAt" timestamp DEFAULT now(),
	"community_id" integer NOT NULL,
	"reply_to" integer
);
--> statement-breakpoint
CREATE TABLE "local_interaction" (
	"message_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "primary" PRIMARY KEY("message_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "community" ADD CONSTRAINT "created_by" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "local_promotions" ADD CONSTRAINT "created_user" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_message" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_message" ADD CONSTRAINT "community" FOREIGN KEY ("community_id") REFERENCES "public"."community"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_message" ADD CONSTRAINT "reply_to" FOREIGN KEY ("reply_to") REFERENCES "public"."community"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "local_interaction" ADD CONSTRAINT "message" FOREIGN KEY ("message_id") REFERENCES "public"."community_message"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "local_interaction" ADD CONSTRAINT "user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
*/