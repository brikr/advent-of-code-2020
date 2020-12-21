import {createReadStream, readFileSync} from 'fs';
import {createInterface} from 'readline';

export async function fileMap<T>(
  filename: string,
  iteratee: (line: string, index: number) => T
): Promise<T[]> {
  const fileStream = createReadStream(filename);
  const rl = createInterface({
    input: fileStream,
  });

  const values = [];
  let idx = 0;

  for await (const line of rl) {
    values.push(iteratee(line, idx));
    idx++;
  }

  return values;
}

export function fileLines(filename: string): string[] {
  return fileMapSync(filename, line => line);
}

export function fileMapSync<T>(
  filename: string,
  iteratee: (line: string, index: number) => T
): T[] {
  return readFileSync(filename, {encoding: 'utf8', flag: 'r'})
    .split('\n')
    .map(iteratee);
}

export function printSolution(part1: number | string, part2: number | string) {
  console.log('Part 1:');
  console.log(part1);
  console.log('Part 2:');
  console.log(part2);
}

export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
