import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import makeGenDiff from '../src/makeGenDiff.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('makeGenDiff', () => {
  const stylishResult = readFile('stylish_result_test.txt');
  const plainResult = readFile('plain_result_test.txt');
  const jsonResult = readFile('json_result_test.json');

  test.each([
    ['file1.json', 'file2.json', 'stylish', stylishResult],
    ['file1.json', 'file2.json', 'plain', plainResult],
    ['file1.json', 'file2.json', 'json', jsonResult],
    ['file1.yml', 'file2.yml', 'stylish', stylishResult],
    ['file1.yml', 'file2.yml', 'plain', plainResult],
    ['file1.yml', 'file2.yml', 'json', jsonResult],
  ])('compare %s and %s in %s format', (file1, file2, format, expected) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const result = makeGenDiff(filepath1, filepath2, format).trim();
    const expectedTrimmed = expected.trim();
    expect(result).toEqual(expectedTrimmed);
  });
});
