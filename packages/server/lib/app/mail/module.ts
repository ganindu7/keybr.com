import { type Binder, type Module } from "@fastr/invert";
import { Env } from "@keybr/config";
import { MailgunMailer } from "./mailgun.ts";
import { ResendMailer } from "./resend.ts";
import { Mailer } from "./types.ts";

/**
 * Transactional mail provider, selected by the `MAIL_PROVIDER` env property:
 * `mailgun` (default, needs `MAIL_DOMAIN` + `MAIL_KEY`) or `resend` (needs `MAIL_KEY`).
 */
export class MailModule implements Module {
  configure({ bind }: Binder) {
    switch (Env.getString("MAIL_PROVIDER", "mailgun").toLowerCase()) {
      case "resend":
        bind(Mailer).to(ResendMailer);
        break;
      default:
        bind(Mailer).to(MailgunMailer);
        break;
    }
  }
}
