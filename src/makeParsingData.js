import buildTree from './treeBuilder.js';
import formatTree from './stylish.js';
import parseData from './parsers.js';

const makeParsingData = (filepath1, filepath2) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const diffTree = buildTree(data1, data2);
  return formatTree(diffTree);
};

export default makeParsingData;
