import fs from 'fs';
import { promisify } from 'util';
import { Package } from './types';
const readFile = promisify(fs.readFile);

export default async function read(path: string): Promise<Package> {
  const contents = await readFile(path);
  return JSON.parse(contents.toLocaleString()) as Package;
}

module.exports = read
