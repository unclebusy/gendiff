import yaml from 'js-yaml';

const parseData = (data, fileType) => {
  if (fileType === 'json') {
    return JSON.parse(data);
  }

  if (fileType === 'yml' || fileType === 'yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${fileType}`);
};

export default parseData;
