import { readFileSync } from 'fs';

process.chdir(require.main.path);

export const readInput = () => readFileSync('input.txt').toString();
