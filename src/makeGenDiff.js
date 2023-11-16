import buildTree from './treeBuilder.js';
import parseData from './parsers.js';
import getFormatter from './formatters/index.js';

const makeGenDiff = (filepath1, filepath2, format) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const diffTree = buildTree(data1, data2);

  return getFormatter(format, diffTree);
};

export default makeGenDiff;