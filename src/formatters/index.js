import formatPlain from './plain.js';
import formatJson from './json.js';
import formatTree from './stylish.js';

const formatters = {
  plain: formatPlain,
  json: formatJson,
  stylish: formatTree,
};

const getFormatter = (format) => formatters[format];

export default getFormatter;
