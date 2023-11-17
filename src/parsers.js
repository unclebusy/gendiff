import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parseData = (data, fileType) => {
  const parser = parsers[fileType];

  if (!parser) {
    throw new Error(`Unsupported file format: ${fileType}`);
  }

  return parser(data);
};

export default parseData;
