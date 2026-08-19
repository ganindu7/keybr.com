import { authenticate, request } from "@fastr/client";
import { injectable } from "@fastr/invert";
import { Env } from "@keybr/config";
import { Mailer } from "./types.ts";

@injectable({ singleton: true })
export class ResendConfig {
  readonly key: string;
  readonly from: string;
  readonly replyTo: string | null;

  constructor() {
    this.key = Env.getString("MAIL_KEY");
    const fromAddress = Env.getString("MAIL_FROM_ADDRESS", "k@keybr.com");
    const fromName = Env.getString("MAIL_FROM_NAME", "keybr.com");
    this.from = `${fromName} <${fromAddress}>`;
    this.replyTo = Env.getString("MAIL_REPLY_TO", "") || null;
  }
}

/** Sends mail through the Resend HTTP API (https://resend.com/docs/api-reference/emails/send-email). */
@injectable()
export class ResendMailer extends Mailer {
  constructor(readonly config: ResendConfig) {
    super();
  }

  async sendMail({
    from = this.config.from,
    to,
    subject,
    text,
    html,
  }: Mailer.Message): Promise<void> {
    const body: Record<string, unknown> = { from, to: [to], subject };
    if (text) {
      body.text = text;
    }
    if (html) {
      body.html = html;
    }
    if (this.config.replyTo) {
      body.reply_to = this.config.replyTo;
    }

    const response = await request
      .use(authenticate.bearer(this.config.key))
      .POST("https://api.resend.com/emails")
      .send(body);

    if (response.ok) {
      await response.body.json<{ id: string }>();
    } else {
      response.abort();
      throw new Error(
        `Unable to send email: ${response.status} ${response.statusText}`,
      );
    }
  }
}
