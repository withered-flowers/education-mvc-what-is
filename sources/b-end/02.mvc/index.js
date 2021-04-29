const Controller = require('./controllers/controller.js');

const argv = process.argv;

const command = argv[2];
const argvInput = Number(process.argv[3]);

if (command === 'search') {
  Controller.searchHandler(argvInput);
}
else {
  Controller.notImplementedHandler();
}
