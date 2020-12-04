import {createReadStream} from 'fs';
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
