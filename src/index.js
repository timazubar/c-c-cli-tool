const { program } = require('commander');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift: <shift size> ', 'a shift')
  .option('-a, --action: <encode|decode>', 'an action encode/decode')
  .option('-i, --input: <input file path> ', 'an input file')
  .option('-o, --output: <output file path>', 'an output file');

program.parse(process.argv);

const programOpts = program.opts();

if (programOpts.shift) console.log('shifted', programOpts.shift);
if (programOpts.action) console.log('action');
if (programOpts.input) console.log('input');
if (programOpts.output) console.log('output');
