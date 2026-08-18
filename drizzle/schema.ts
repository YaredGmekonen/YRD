import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const telegramIntakeSessions = mysqlTable("telegram_intake_sessions", {
  chatId: varchar("chatId", { length: 64 }).primaryKey(),
  step: int("step").notNull().default(0),
  answers: text("answers").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const telegramIntakeLeads = mysqlTable(
  "telegram_intake_leads",
  {
    id: int("id").autoincrement().primaryKey(),
    chatId: varchar("chatId", { length: 64 }).notNull(),
    telegramUsername: varchar("telegramUsername", { length: 64 }),
    displayName: varchar("displayName", { length: 255 }),
    answers: text("answers").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [index("telegram_intake_leads_created_at_idx").on(table.createdAt), index("telegram_intake_leads_chat_id_idx").on(table.chatId)],
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
