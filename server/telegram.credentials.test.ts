import { describe, expect, it } from "vitest";

describe("Telegram bot credentials", () => {
  it("authenticates with the configured bot token", async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    expect(token).toBeTruthy();

    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    expect(response.ok).toBe(true);

    const body = (await response.json()) as { ok?: boolean; result?: { is_bot?: boolean } };
    expect(body.ok).toBe(true);
    expect(body.result?.is_bot).toBe(true);
  }, 30_000);
});
