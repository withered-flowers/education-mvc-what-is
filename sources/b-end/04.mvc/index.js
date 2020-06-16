const AnimeController = require('./controllers/AnimeController.js');

const argvInput = Number(process.argv[2]);

AnimeController.processInput(argvInput);