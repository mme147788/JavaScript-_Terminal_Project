
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db.json');

export async function readDb() {
    const data = await readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

export async function writeDb(data) {
    await writeFile(dbPath, JSON.stringify(data, null, 2));
}
