import buildTree from './treeBuilder.js';
import parseData from './parsers.js';
import formatTree from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

const makeParsingData = (filepath1, filepath2, format) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const diffTree = buildTree(data1, data2);

  if (format === 'plain') {
    return formatPlain(diffTree);
  }
  if (format === 'json') {
    return formatJson(diffTree);
  }
  return formatTree(diffTree);
};

export default makeParsingData;
