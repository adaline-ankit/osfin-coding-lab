import generateData from "@/components/atomic-crm/providers/fakerest/dataGenerator";

export const getLabBank = (value: string | undefined) => {
  if (value === undefined || value === "cedar") return "Cedar";
  if (value === "maple") return "Maple";
  throw new Error("Unknown synthetic bank. Use cedar or maple.");
};

export const createOsfinFixture = (bank: string, now = new Date()) => {
  const db = generateData();
  const contact = db.contacts[0];
  const dueAt = (dayOffset: number, hour: number) => {
    const date = new Date(now);
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, 0, 0, 0);
    return date.toISOString();
  };

  db.contacts = db.contacts.map((item) => ({ ...item, nb_tasks: 0 }));
  db.contacts[0] = {
    ...db.contacts[0],
    first_name: bank,
    last_name: "Synthetic Operations",
    nb_tasks: 4,
  };
  db.tasks = [
    { text: "SYNTHETIC: Review yesterday's reconciliation", day: -1, hour: 12 },
    { text: "SYNTHETIC: Morning settlement check", day: 0, hour: 9 },
    { text: "SYNTHETIC: Evening reconciliation sign-off", day: 0, hour: 20 },
    { text: "SYNTHETIC: Tomorrow's deployment review", day: 1, hour: 12 },
  ].map(({ text, day, hour }, index) => ({
    id: index + 1,
    contact_id: contact.id,
    sales_id: 0,
    type: "none",
    text,
    due_date: dueAt(day, hour),
    created_at: dueAt(-2, 8),
    done_date: undefined,
  }));
  return db;
};
