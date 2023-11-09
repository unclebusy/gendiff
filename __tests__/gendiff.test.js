import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import makeParsingData from '../src/makeParsingData.js';
import makeDiffPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare JSON files', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/file1.json');
  const filepath2 = path.resolve(__dirname, '__fixtures__/file2.json');

  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(makeParsingData(filepath1, filepath2)).toBe(expected);
});

test('compare YAML files', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/file1.yml');
  const filepath2 = path.resolve(__dirname, '__fixtures__/file2.yml');

  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(makeParsingData(filepath1, filepath2)).toBe(expected);
});

test('compare JSON files in plain format', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/file1.json');
  const filepath2 = path.resolve(__dirname, '__fixtures__/file2.json');

  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting1' was unchanged. Value: Value 1
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: vops
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(makeDiffPlain(filepath1, filepath2)).toBe(expected);
});

test('compare YAML files in plain format', () => {
  const filepath1 = path.resolve(__dirname, '__fixtures__/file1.yml');
  const filepath2 = path.resolve(__dirname, '__fixtures__/file2.yml');

  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting1' was unchanged. Value: Value 1
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: vops
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(makeDiffPlain(filepath1, filepath2)).toBe(expected);
});
