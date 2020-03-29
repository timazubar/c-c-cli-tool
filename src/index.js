const { program } = require('commander');
const chalk = require('chalk');
const validateOptions = require('./options');
const { pipeline } = require('stream');

const createReadStream = require('./streams/createReadStream');
const createTransformStream = require('./streams/createTransformStream');
const createWriteStream = require('./streams/createWriteStream');

program
  .storeOptionsAsProperties(false)
  .option('-s, --shift [shift size]', 'a shift', (val) => parseInt(val))
  .option('-a, --action [encode|decode]', 'an action encode/decode')
  .option('-i, --input [input file path]', 'an input file')
  .option('-o, --output [output file path]', 'an output file')
  .parse(process.argv);

program.parse(process.argv);

process.on('exit', (code) => {
  process.stdout.write(chalk.white.bgBlack.bold(' EXIT CODE '));
  process.stdout.write(chalk.keyword('green')(` ${code}\n`));
});

const programOpts = program.opts();

validateOptions(programOpts);

const readStream = createReadStream(programOpts.input);
const transformStream = createTransformStream(
  programOpts.action,
  programOpts.shift,
);
const writeStream = createWriteStream(programOpts.output);

pipeline(readStream, transformStream, writeStream, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
