import fs from 'fs';
import path from 'path';
import buildTree from './treeBuilder.js';
import parseData from './parsers.js';
import getFormatter from './formatters/index.js';

const makeGenDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = fs.readFileSync(absolutePath1, 'utf-8');
  const data2 = fs.readFileSync(absolutePath2, 'utf-8');

  const fileType1 = path.extname(filepath1).slice(1);
  const fileType2 = path.extname(filepath2).slice(1);

  const parsedData1 = parseData(data1, fileType1);
  const parsedData2 = parseData(data2, fileType2);

  const diffTree = buildTree(parsedData1, parsedData2);

  return getFormatter(format, diffTree);
};

export default makeGenDiff;
