import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import makeParsingData from '../src/MakeParsingData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare flat JSON files', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/file1.json');
  const filepath2 = path.resolve(__dirname, '__fixtures__/file2.json');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(makeParsingData(filepath1, filepath2)).toBe(expected);
});

test('compare flat YAML files', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/file1.yml');
  const filepath2 = path.resolve(__dirname, '__fixtures__/file2.yml');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(makeParsingData(filepath1, filepath2)).toBe(expected);
});