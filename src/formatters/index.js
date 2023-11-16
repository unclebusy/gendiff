import formatPlain from './plain.js';
import formatJson from './json.js';
import formatTree from './stylish.js';

const formatters = {
  plain: formatPlain,
  json: formatJson,
  stylish: formatTree,
};

export default (format, data) => formatters[format](data);
