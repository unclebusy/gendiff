import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import makeParsingData from '../src/makeParsingData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare flat JSON files', () => {
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

test('compare flat YAML files', () => {
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
