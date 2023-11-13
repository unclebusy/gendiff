import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import makeParsingData from '../src/makeParsingData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('makeParsingData', () => {
  const stylishResult = readFile('stylish_result_test.txt').trim();
  const plainResult = readFile('plain_result_test.txt').trim();
  const jsonResult = readFile('json_result_test.json').trim();

  // Stylish Format Tests
  test('compare file1.json and file2.json in stylish format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = makeParsingData(filepath1, filepath2, 'stylish').trim();
    expect(result).toEqual(stylishResult);
  });

  test('compare file1.yml and file2.yml in stylish format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const result = makeParsingData(filepath1, filepath2, 'stylish').trim();
    expect(result).toEqual(stylishResult);
  });

  // Plain Format Tests
  test('compare file1.json and file2.json in plain format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = makeParsingData(filepath1, filepath2, 'plain').trim();
    expect(result).toEqual(plainResult);
  });

  test('compare file1.yml and file2.yml in plain format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const result = makeParsingData(filepath1, filepath2, 'plain').trim();
    expect(result).toEqual(plainResult);
  });

  // JSON Format Tests
  test('compare file1.json and file2.json in json format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const result = makeParsingData(filepath1, filepath2, 'json').trim();
    expect(result).toEqual(jsonResult);
  });

  test('compare file1.yml and file2.yml in json format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const result = makeParsingData(filepath1, filepath2, 'json').trim();
    expect(result).toEqual(jsonResult);
  });
});
