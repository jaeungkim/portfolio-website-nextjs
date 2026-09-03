import assert from "node:assert/strict";
import { test } from "node:test";
import { negotiateLocale } from "@/src/i18n/negotiate";

test("falls back to the default locale", () => {
  assert.equal(negotiateLocale(null), "en");
  assert.equal(negotiateLocale(""), "en");
  assert.equal(negotiateLocale("de-DE,fr;q=0.8"), "en");
  assert.equal(negotiateLocale("*"), "en");
});

test("matches on the primary subtag", () => {
  assert.equal(negotiateLocale("ko-KR"), "ko");
  assert.equal(negotiateLocale("ko"), "ko");
  assert.equal(negotiateLocale("en-CA"), "en");
});

test("honours quality values over header order", () => {
  assert.equal(negotiateLocale("en;q=0.5,ko;q=0.9"), "ko");
  assert.equal(negotiateLocale("ko;q=0.2,en;q=0.7"), "en");
  assert.equal(negotiateLocale("de-DE,ko-KR;q=0.9,en-US;q=0.8"), "ko");
});

test("ignores ranges the client refused", () => {
  assert.equal(negotiateLocale("ko;q=0,en;q=0.4"), "en");
  assert.equal(negotiateLocale("ko;q=0"), "en");
});

test("keeps header order when qualities tie", () => {
  assert.equal(negotiateLocale("ko,en"), "ko");
  assert.equal(negotiateLocale("en,ko"), "en");
});

test("survives malformed input", () => {
  assert.equal(negotiateLocale(",,;q=,"), "en");
  assert.equal(negotiateLocale("ko;q=abc,en"), "en");
});
