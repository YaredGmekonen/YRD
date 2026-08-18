import { describe, expect, it } from "vitest";
import { buildQuestionKeyboard, formatLeadSummary, getWebhookSecret, intakeQuestions, isOwnerChat, isOwnerCommand } from "./telegram";

describe("Telegram intake helpers", () => {
  it("keeps the configured intake to six concise questions", () => {
    expect(intakeQuestions).toHaveLength(6);
    expect(intakeQuestions.map(question => question.key)).toEqual(["name", "projectType", "timeline", "budget", "projectDetails", "contact"]);
  });

  it("formats a complete and safely escaped owner summary with Telegram metadata", () => {
    const summary = formatLeadSummary({ name: "A < B", projectType: "Website", timeline: "ASAP", budget: "Prefer to discuss", projectDetails: "A product & launch", contact: "+251900000000" }, "123", "yrd_client");
    expect(summary).toContain("A &lt; B");
    expect(summary).toContain("A product &amp; launch");
    expect(summary).toContain("Contact: +251900000000");
    expect(summary).toContain("Telegram username: @yrd_client");
    expect(summary).toContain("Telegram chat: <code>123</code>");
  });

  it("marks a missing Telegram username as unavailable instead of fabricating one", () => {
    const summary = formatLeadSummary({}, "123");
    expect(summary).toContain("Telegram username: Not available");
  });

  it("limits owner controls to the configured Telegram chat identity", () => {
    expect(isOwnerChat("5473210957", "5473210957")).toBe(true);
    expect(isOwnerChat("client-chat", "5473210957")).toBe(false);
  });

  it("treats standard bot commands as owner-menu commands for the owner account", () => {
    expect(isOwnerCommand("/start")).toBe(true);
    expect(isOwnerCommand("/restart")).toBe(true);
    expect(isOwnerCommand("/admin")).toBe(true);
    expect(isOwnerCommand("/unknown")).toBe(false);
  });

  it("offers consent-based phone sharing only at the final intake step", () => {
    expect(buildQuestionKeyboard([], 0)).toEqual({ remove_keyboard: true });
    expect(buildQuestionKeyboard([], 5)).toMatchObject({
      keyboard: [[{ text: "Share phone number", request_contact: true }], [{ text: "Skip" }]],
    });
  });

  it("derives a stable non-plain webhook path secret", () => {
    expect(getWebhookSecret("demo-token")).toHaveLength(32);
    expect(getWebhookSecret("demo-token")).not.toBe("demo-token");
    expect(getWebhookSecret("demo-token")).toBe(getWebhookSecret("demo-token"));
  });
});
