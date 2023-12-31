#!/usr/bin/env node

import { program } from 'commander';
import makeParsingData from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .usage('Usage: gendiff [options] <filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(makeParsingData(filepath1, filepath2, options.format));
  })
  .parse(process.argv);
