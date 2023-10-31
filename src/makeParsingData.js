import _ from 'lodash';
import parseData from './parsers.js';

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
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  return compareObjects(data1, data2);
};

export default makeParsingData;
