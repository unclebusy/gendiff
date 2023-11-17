import formatPlain from './plain.js';
import formatTree from './stylish.js';

const formatters = {
  plain: (data) => formatPlain(data),
  json: (data) => JSON.stringify(data, null, 2),
  stylish: (data) => formatTree(data),
};

const getFormatter = (format, data) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported format: ${format}`);
  }

  return formatters[format](data);
};

export default getFormatter;
