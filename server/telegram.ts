import crypto from "crypto";
import type { Express, Request, Response } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { telegramIntakeLeads, telegramIntakeSessions } from "../drizzle/schema";
import { getDb } from "./db";
import { ENV } from "./_core/env";

export type IntakeAnswers = {
  name?: string;
  projectType?: string;
  timeline?: string;
  budget?: string;
  projectDetails?: string;
  contact?: string;
};

type TelegramUser = {
  id?: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TelegramMessage = {
  chat?: { id?: number | string };
  text?: string;
  from?: TelegramUser;
  contact?: { phone_number?: string; user_id?: number | string };
};

type TelegramCallbackQuery = {
  id?: string;
  data?: string;
  from?: TelegramUser;
  message?: { chat?: { id?: number | string } };
};

const botApiBase = () => `https://api.telegram.org/bot${ENV.telegramBotToken}`;
const directMessageUrl = "https://t.me/Yada_cve";

export const intakeQuestions = [
  { key: "name", text: "01/06 — What is your name or company?", options: [] },
  { key: "projectType", text: "02/06 — What are you looking to build?", options: ["Website", "Web App", "Mobile App", "AI & Automation", "Not sure yet"] },
  { key: "timeline", text: "03/06 — What is your ideal timeline?", options: ["ASAP", "Within 1 month", "1–3 months", "Flexible"] },
  { key: "budget", text: "04/06 — What budget range are you considering?", options: ["Under 25K ETB", "25K–75K ETB", "75K+ ETB", "Prefer to discuss"] },
  { key: "projectDetails", text: "05/06 — In one or two sentences, what should the project do?", options: [] },
  { key: "contact", text: "06/06 — How else can Yared reach you? Reply with a phone/email, or type Skip.", options: [] },
] as const;

export function getWebhookSecret(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex").slice(0, 32);
}

export function formatLeadSummary(answers: IntakeAnswers, chatId: string, telegramUsername?: string) {
  const field = (value?: string) => value?.trim() || "Not provided";
  const username = telegramUsername ? `@${telegramUsername.replace(/^@/, "")}` : "Not available";
  return [
    "<b>New YRD. intake</b>",
    `Name / company: ${escapeHtml(field(answers.name))}`,
    `Project type: ${escapeHtml(field(answers.projectType))}`,
    `Timeline: ${escapeHtml(field(answers.timeline))}`,
    `Budget: ${escapeHtml(field(answers.budget))}`,
    `Project: ${escapeHtml(field(answers.projectDetails))}`,
    `Contact: ${escapeHtml(field(answers.contact))}`,
    `Telegram username: ${escapeHtml(username)}`,
    `Telegram chat: <code>${escapeHtml(chatId)}</code>`,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[character] ?? character);
}

export function buildQuestionKeyboard(options: readonly string[], step: number) {
  if (step === 5) {
    return {
      keyboard: [[{ text: "Share phone number", request_contact: true }], [{ text: "Skip" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    };
  }
  if (options.length === 0) return { remove_keyboard: true };
  return { keyboard: options.map(option => [{ text: option }]), resize_keyboard: true, one_time_keyboard: true };
}

async function telegramRequest(method: string, body: Record<string, unknown>) {
  const response = await fetch(`${botApiBase()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Telegram ${method} failed with ${response.status}`);
  return response.json() as Promise<{ ok: boolean }>;
}

async function sendQuestion(chatId: string, step: number) {
  const question = intakeQuestions[step];
  if (!question) return;
  await telegramRequest("sendMessage", {
    chat_id: chatId,
    text: question.text,
    reply_markup: buildQuestionKeyboard(question.options, step),
  });
}

async function getSession(chatId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const records = await db.select().from(telegramIntakeSessions).where(eq(telegramIntakeSessions.chatId, chatId)).limit(1);
  const record = records[0];
  if (!record) return null;
  return { step: record.step, answers: JSON.parse(record.answers) as IntakeAnswers };
}

async function saveSession(chatId: string, step: number, answers: IntakeAnswers) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.insert(telegramIntakeSessions).values({ chatId, step, answers: JSON.stringify(answers) }).onDuplicateKeyUpdate({
    set: { step, answers: JSON.stringify(answers), updatedAt: new Date() },
  });
}

async function clearSession(chatId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  await db.delete(telegramIntakeSessions).where(eq(telegramIntakeSessions.chatId, chatId));
}

async function saveLead(chatId: string, user: TelegramUser | undefined, answers: IntakeAnswers) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || null;
  await db.insert(telegramIntakeLeads).values({
    chatId,
    telegramUsername: user?.username ?? null,
    displayName,
    answers: JSON.stringify(answers),
  });
}

function ownerMenu() {
  return {
    inline_keyboard: [
      [{ text: "Intake status", callback_data: "yrd_admin:status" }, { text: "Recent leads", callback_data: "yrd_admin:recent" }],
      [{ text: "Refresh", callback_data: "yrd_admin:menu" }],
    ],
  };
}

export function isOwnerChat(userId: number | string | undefined, ownerChatId: string) {
  return String(userId ?? "") === ownerChatId;
}

export function isOwnerCommand(text?: string) {
  return /^\/(start|restart|admin)(\s|$)/i.test(text ?? "");
}

function isOwner(user?: TelegramUser) {
  return isOwnerChat(user?.id, ENV.telegramOwnerChatId);
}

async function getAdminSnapshot() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const [leadTotal] = await db.select({ count: sql<number>`count(*)` }).from(telegramIntakeLeads);
  const [activeTotal] = await db.select({ count: sql<number>`count(*)` }).from(telegramIntakeSessions);
  const recentLeads = await db.select().from(telegramIntakeLeads).orderBy(desc(telegramIntakeLeads.createdAt)).limit(5);
  return { leadCount: Number(leadTotal?.count ?? 0), activeCount: Number(activeTotal?.count ?? 0), recentLeads };
}

function formatAdminStatus(snapshot: Awaited<ReturnType<typeof getAdminSnapshot>>) {
  return [
    "<b>YRD. intake status</b>",
    `Completed client intakes: <b>${snapshot.leadCount}</b>`,
    `Active client sessions: <b>${snapshot.activeCount}</b>`,
    "The client flow is live. Use Recent leads to review the newest completed intakes.",
  ].join("\n");
}

function formatRecentLeads(snapshot: Awaited<ReturnType<typeof getAdminSnapshot>>) {
  if (snapshot.recentLeads.length === 0) return "<b>Recent client intakes</b>\nNo completed client intakes yet.";
  const entries = snapshot.recentLeads.map((lead, index) => {
    const answers = JSON.parse(lead.answers) as IntakeAnswers;
    const name = escapeHtml(answers.name?.trim() || lead.displayName || "Unnamed client");
    const projectType = escapeHtml(answers.projectType?.trim() || "Project type not provided");
    const username = lead.telegramUsername ? ` · @${escapeHtml(lead.telegramUsername)}` : "";
    return `${index + 1}. <b>${name}</b> — ${projectType}${username}`;
  });
  return ["<b>Recent client intakes</b>", ...entries].join("\n");
}

async function sendOwnerMenu(chatId: string) {
  await telegramRequest("sendMessage", {
    chat_id: chatId,
    text: "<b>YRD. owner controls</b>\nReview live intake status or the newest completed client notes.",
    parse_mode: "HTML",
    reply_markup: ownerMenu(),
  });
}

async function beginIntake(chatId: string, firstName?: string) {
  await saveSession(chatId, 0, {});
  await telegramRequest("sendMessage", {
    chat_id: chatId,
    text: `Welcome${firstName ? `, ${escapeHtml(firstName)}` : ""}. I’ll ask six quick questions so YRD. can understand your project.`,
    reply_markup: { inline_keyboard: [[{ text: "Message Yared directly", url: directMessageUrl }]] },
  });
  await sendQuestion(chatId, 0);
}

async function handleMessage(message?: TelegramMessage) {
  if (!message) return;
  const chatId = String(message.chat?.id ?? "");
  const text = message.text?.trim();
  const phone = message.contact?.phone_number?.trim();
  if (!chatId || (!text && !phone)) return;

  if (isOwner(message.from) && isOwnerCommand(text)) {
    await sendOwnerMenu(chatId);
    return;
  }

  if (/^\/(start|restart)(\s|$)/i.test(text ?? "")) {
    await beginIntake(chatId, message.from?.first_name);
    return;
  }

  const session = await getSession(chatId);
  if (!session) {
    await beginIntake(chatId, message.from?.first_name);
    return;
  }

  const question = intakeQuestions[session.step];
  if (!question) {
    await beginIntake(chatId, message.from?.first_name);
    return;
  }

  const answer = phone ?? text ?? "";
  const answers = { ...session.answers, [question.key]: /^skip$/i.test(answer) ? "Not provided" : answer } as IntakeAnswers;
  const nextStep = session.step + 1;
  if (nextStep < intakeQuestions.length) {
    await saveSession(chatId, nextStep, answers);
    await sendQuestion(chatId, nextStep);
    return;
  }

  await saveLead(chatId, message.from, answers);
  await telegramRequest("sendMessage", {
    chat_id: ENV.telegramOwnerChatId,
    text: formatLeadSummary(answers, chatId, message.from?.username),
    parse_mode: "HTML",
  });
  await clearSession(chatId);
  await telegramRequest("sendMessage", {
    chat_id: chatId,
    text: "Thank you — your project note has been sent. Yared will review it and reply as soon as possible.",
    reply_markup: { remove_keyboard: true, inline_keyboard: [[{ text: "Message Yared directly", url: directMessageUrl }]] },
  });
}

async function handleCallback(callback?: TelegramCallbackQuery) {
  if (!callback) return;
  const chatId = String(callback.message?.chat?.id ?? "");
  if (!callback.id || !chatId) return;
  if (!isOwner(callback.from)) {
    await telegramRequest("answerCallbackQuery", { callback_query_id: callback.id, text: "Owner access only.", show_alert: true });
    return;
  }
  await telegramRequest("answerCallbackQuery", { callback_query_id: callback.id });
  const snapshot = await getAdminSnapshot();
  const text = callback.data === "yrd_admin:recent" ? formatRecentLeads(snapshot) : formatAdminStatus(snapshot);
  await telegramRequest("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", reply_markup: ownerMenu() });
}

export function registerTelegramWebhook(app: Express) {
  app.post("/api/telegram/webhook/:secret", async (req: Request, res: Response) => {
    const token = ENV.telegramBotToken;
    const webhookSecret = token ? getWebhookSecret(token) : "";
    const signature = req.header("x-telegram-bot-api-secret-token") ?? "";
    if (!token || req.params.secret !== webhookSecret || signature !== webhookSecret) {
      res.sendStatus(404);
      return;
    }

    const incomingMessage = req.body?.message as TelegramMessage | undefined;
    const incomingChatId = incomingMessage?.chat?.id;
    if (incomingChatId) {
      res.status(200).json({ method: "sendChatAction", chat_id: String(incomingChatId), action: "typing" });
    } else {
      res.sendStatus(200);
    }
    try {
      await handleMessage(incomingMessage);
      await handleCallback(req.body?.callback_query as TelegramCallbackQuery | undefined);
    } catch (error) {
      console.error("[Telegram intake] Failed to process webhook:", error);
    }
  });
}
