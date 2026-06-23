import * as XLSX from 'xlsx';

export type LoginCredentials = {
  username: string;
  password: string;
};

const WORKBOOK_PATH = 'test-data/login-credentials.xlsx';
const SHEET_NAME = 'LoginData';

export function readLoginCredentials(rowIndex = 0): LoginCredentials {
  const workbook = XLSX.readFile(WORKBOOK_PATH);
  const worksheet = workbook.Sheets[SHEET_NAME];

  if (!worksheet) {
    throw new Error(`Sheet "${SHEET_NAME}" was not found in ${WORKBOOK_PATH}.`);
  }

  const rows = XLSX.utils.sheet_to_json<LoginCredentials>(worksheet, {
    defval: '',
    raw: false,
  });

  const row = rows[rowIndex];
  if (!row?.username || !row?.password) {
    throw new Error(
      `Missing username or password at row index ${rowIndex} in ${WORKBOOK_PATH}.`
    );
  }

  return {
    username: String(row.username).trim(),
    password: String(row.password),
  };
}
