
import { uuid, varchar, pgTable, text, integer, pgEnum, date, timestamp } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED'])
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN'])
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED'])

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullname: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password: text("password").notNull(),
    universityCard: text("university_card").notNull(),
    status: STATUS_ENUM('status').notNull().default('PENDING'),
    role : ROLE_ENUM('role').notNull().default('USER'),
    lastAcitivityDate : date("last_activity_date").defaultNow(),
    createdAt : timestamp("created_at", {
        withTimezone: true,
    }).defaultNow()
})

export const books = pgTable("books", {
    id : uuid("id").notNull
})