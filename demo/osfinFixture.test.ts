import { describe, expect, it, afterEach, vi } from "vitest";
import { createOsfinFixture, getLabBank } from "./osfinFixture";
import { isDueToday } from "@/components/atomic-crm/tasks/tasksPredicate";

afterEach(() => vi.useRealTimers());

describe("synthetic bank fixture", () => {
  it("rejects unknown bank labels instead of silently picking Cedar", () => {
    expect(getLabBank(undefined)).toBe("Cedar");
    expect(getLabBank("cedar")).toBe("Cedar");
    expect(getLabBank("maple")).toBe("Maple");
    expect(() => getLabBank("cedar-prod")).toThrow("Unknown synthetic bank");
  });

  it.each(["Cedar", "Maple"])(
    "creates %s evening deadline in the browser timezone",
    (bank) => {
      const now = new Date(2026, 9, 27, 14);
      const timezone = import.meta.env.VITE_OSFIN_TEST_TIMEZONE;
      if (timezone) {
        expect(now.getTimezoneOffset()).toBe(timezone === "UTC" ? 0 : -330);
      }
      const db = createOsfinFixture(bank, now);
      const evening = db.tasks.find((task) => task.text.includes("Evening"))!;
      expect(db.tasks).toHaveLength(4);
      expect(
        db.tasks.every((task) => task.sales_id === 0 && !task.done_date),
      ).toBe(true);
      expect(
        db.contacts.find((contact) => contact.id === evening.contact_id)
          ?.nb_tasks,
      ).toBe(4);
      expect(new Date(evening.due_date).getHours()).toBe(20);
      expect(new Date(evening.due_date).getDate()).toBe(27);
    },
  );

  it("shows both morning and evening tasks under Today", () => {
    const now = new Date(2026, 9, 27, 14);
    vi.setSystemTime(now);
    const db = createOsfinFixture("Cedar", now);
    const evening = db.tasks.find((task) => task.text.includes("Evening"))!;
    expect(isDueToday(evening.due_date)).toBe(true);
    expect(db.tasks.filter((task) => isDueToday(task.due_date))).toHaveLength(
      2,
    );
  });
});
