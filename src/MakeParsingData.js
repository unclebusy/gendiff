import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const formatRemovedKey = (key, obj) => `  - ${key}: ${obj[key]}`;
const formatAddedKey = (key, obj) => `  + ${key}: ${obj[key]}`;
const formatModifiedKey = (key, obj1, obj2) => `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
const formatUnchangedKey = (key, obj) => `    ${key}: ${obj[key]}`;

const compareObjects = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return formatRemovedKey(key, obj1);
    }
    if (!_.has(obj1, key)) {
      return formatAddedKey(key, obj2);
    }
    if (obj1[key] !== obj2[key]) {
      return formatModifiedKey(key, obj1, obj2);
    }
    return formatUnchangedKey(key, obj1);
  }).join('\n');

  return `{\n${result}\n}`;
};

const makeParsingData = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const data1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf-8'));

  return compareObjects(data1, data2);
};

export default makeParsingData;
