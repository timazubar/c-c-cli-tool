const { program } = require('commander');
const fs = require('fs');
const chalk = require('chalk');

const caesar = require('./caesar-cipher');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift: <shift size> ', 'a shift')
  .requiredOption('-a, --action: <encode|decode>', 'an action encode/decode')
  .option('-i, --input: <input file path> ', 'an input file')
  .option('-o, --output: <output file path>', 'an output file')
  .parse(process.argv);

const programOpts = program.opts();

if (programOpts.shift) console.log('shifted', programOpts.shift);
if (programOpts.action) console.log('action');
if (programOpts.input) console.log('input');
if (programOpts.output) console.log('output');

if (!programOpts.input) {
  console.log(
    chalk.rgb(0, 0, 0).bgRedBright.bold(' WARNING '),
    'No input file specified. Using stdin input file.\nTo add your input file, use ',
    chalk.white.bgBlackBright.bold(' -i <input file path> '),
    '\n'
  );
}

if (!programOpts.output) {
  console.log(
    chalk.rgb(0, 0, 0).bgRedBright.bold(' WARNING '),
    'No input file specified. Using stdout input file.\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> '),
    '\n'
  );
}

const inputText = fs.readFile('./stdin.txt', 'utf-8');
let outputText;

if (programOpts.action === 'encode') {
  outputText = caesar.encode(inputText, programOpts.shift);
} else if (programOpts.action === 'decode') {
  outputText = caesar.decode(outputText, programOpts.shift);
}

fs.writeFile('./stdout.txt', 'utf-8');
console.log(outputText);
