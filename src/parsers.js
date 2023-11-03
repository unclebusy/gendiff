import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  if (filepath.endsWith('.json')) {
    return JSON.parse(data);
  }

  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${filepath}`);
};

export default parseData;
