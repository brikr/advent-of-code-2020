import {createReadStream} from 'fs';
import {createInterface} from 'readline';

export async function fileMap<T>(
  filename: string,
  iteratee: (line: string) => T
): Promise<T[]> {
  const fileStream = createReadStream(filename);
  const rl = createInterface({
    input: fileStream,
  });

  const values = [];

  for await (const line of rl) {
    values.push(iteratee(line));
  }

  return values;
}
