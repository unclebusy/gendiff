#!/usr/bin/env node

import { program } from 'commander';

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0')
	.arguments('<filepath1> <filepath2>')
	.option('-f, --format <type>', 'output format', 'stylish')
	.usage('Usage: gendiff [options] <filepath1> <filepath2>')
	.parse(process.argv);

if (program.help) {
	program.outputHelp();
}
