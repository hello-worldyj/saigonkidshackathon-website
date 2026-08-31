import { google } from "googleapis";

const RANGE = "Waitlist!A:F";

function auth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY are not set");
  }
  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function sheetId() {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEET_ID is not set");
  return id;
}

export async function appendWaitlistRow(row: {
  name: string;
  email: string;
  parentEmail: string;
  builderPhone: string;
  parentPhone: string;
}) {
  const sheets = google.sheets({ version: "v4", auth: auth() });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId(),
    range: RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [new Date().toISOString(), row.name, row.email, row.parentEmail, row.builderPhone, row.parentPhone],
      ],
    },
  });
}

export type WaitlistEntry = {
  timestamp: string;
  name: string;
  email: string;
  parentEmail: string;
  builderPhone: string;
  parentPhone: string;
};

export async function listWaitlist(): Promise<WaitlistEntry[]> {
  const sheets = google.sheets({ version: "v4", auth: auth() });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId(),
    range: RANGE,
  });
  const rows = res.data.values ?? [];
  return rows
    .filter((r) => r[2])
    .map((r) => ({
      timestamp: r[0] ?? "",
      name: r[1] ?? "",
      email: r[2] ?? "",
      parentEmail: r[3] ?? "",
      builderPhone: r[4] ?? "",
      parentPhone: r[5] ?? "",
    }));
}
