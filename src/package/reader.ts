import fs from 'node:fs';
import { promisify } from 'node:util';
import type { Package } from './types';
const readFile = promisify(fs.readFile);

export default async function read(path: string): Promise<Package> {
  const contents = await readFile(path);
  return JSON.parse(contents.toLocaleString()) as Package;
}

module.exports = read;
