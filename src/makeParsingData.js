import _ from 'lodash';
import parseData from './parsers.js';

const formatRemovedKey = (key, obj, indent) => `${indent}- ${key}: ${formatValue(obj[key], indent)}`;
const formatAddedKey = (key, obj, indent) => `${indent}+ ${key}: ${formatValue(obj[key], indent)}`;
const formatModifiedKey = (key, obj1, obj2, indent) => `${indent}- ${key}: ${formatValue(obj1[key], indent)}\n${indent}+ ${key}: ${formatValue(obj2[key], indent)}`;
const formatUnchangedKey = (key, obj, indent) => `${indent}  ${key}: ${formatValue(obj[key], indent)}`;

const formatValue = (value, indent) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const result = keys.map((key) => `${indent}    ${key}: ${formatValue(value[key], `${indent}    `)}`).join('\n');
    return `{\n${result}\n${indent}  }`;
  }
  return value;
};

const compareObjects = (obj1, obj2, indent = '') => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const result = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return formatRemovedKey(key, obj1, indent);
    }
    if (!_.has(obj1, key)) {
      return formatAddedKey(key, obj2, indent);
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return `${indent}  ${key}: ${compareObjects(obj1[key], obj2[key], `${indent}    `)}`;
    }
    if (obj1[key] !== obj2[key]) {
      return formatModifiedKey(key, obj1, obj2, indent);
    }
    return formatUnchangedKey(key, obj1, indent);
  }).join('\n');

  return `{\n${result}\n${indent}}`;
};

const makeParsingData = (filepath1, filepath2) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  return compareObjects(data1, data2);
};

export default makeParsingData;
