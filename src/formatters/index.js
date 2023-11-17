import formatPlain from './plain.js';
import formatTree from './stylish.js';

const formatters = {
  plain: formatPlain,
  json: (data) => JSON.stringify(data, null, 2),
  stylish: formatTree,
};

const getFormatter = (format, data) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported format: ${format}`);
  }

  return formatters[format](data);
};

export default getFormatter;
