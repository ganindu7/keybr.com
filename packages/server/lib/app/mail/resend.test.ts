import { test } from "node:test";
import { FakeResponse, useAdapter } from "@fastr/client";
import { equal, rejects } from "rich-assert";
import { ResendConfig, ResendMailer } from "./resend.ts";

const config = Object.assign(Object.create(ResendConfig.prototype), {
  key: "re_test_key",
  from: "keybr <k@example.com>",
  replyTo: null,
}) as ResendConfig;

test("send mail through resend", async () => {
  let seen: { url: string; auth: string | null; body: any } | null = null;
  useAdapter(async (request) => {
    seen = {
      url: String(request.url),
      auth: request.headers?.get("authorization") ?? null,
      body: JSON.parse(String(request.body)),
    };
    return new FakeResponse({ status: 200, body: { id: "msg-1" } });
  });

  await new ResendMailer(config).sendMail({
    to: "user@example.com",
    subject: "Sign in",
    text: "link",
    html: "<a>link</a>",
  });

  equal(seen!.url, "https://api.resend.com/emails");
  equal(seen!.auth, "Bearer re_test_key");
  equal(seen!.body.from, "keybr <k@example.com>");
  equal(seen!.body.to[0], "user@example.com");
  equal(seen!.body.subject, "Sign in");
  equal(seen!.body.text, "link");
  equal(seen!.body.html, "<a>link</a>");
});

test("report resend errors", async () => {
  useAdapter(FakeResponse.of({ message: "nope" }, { status: 403 }));
  await rejects(
    new ResendMailer(config).sendMail({
      to: "user@example.com",
      subject: "x",
      text: "y",
    }),
    /Unable to send email: 403/,
  );
});
