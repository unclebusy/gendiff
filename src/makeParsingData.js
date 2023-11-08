import buildTree from './treeBuilder.js';
import formatTree from './formatters/stylish.js';
import parseData from './parsers.js';

import formatPlain from './formatters/plain.js'

const makeParsingData = (filepath1, filepath2) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const diffTree = buildTree(data1, data2);
  return formatPlain(diffTree);
};

export default makeParsingData;
