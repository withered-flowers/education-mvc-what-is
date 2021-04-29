// Jangan lupa panggil model di dalam controller
const Model = require('../models/model.js');
const View = require('../views/view.js');

class Controller {
  // handle search dari index.js
  static searchHandler(input) {
    // Di sini kita akan berhubungan langsung dengan data bukan?
    // Karena itu kita akan melemparnya ke model !

    // Jangan lupa setelah menerima hasil dari model,
    // Kemudian akan dilempar ke View untuk dijadikan output kepada user ! 
    let result = Model.readAndWrite(input);

    // Nah pada saat ini, kita tidak bisa memilih 
    // apakah error, atau success ?
    // sehingga kita hanya menggunakan showSuccess saja
    View.showSuccess(result);
  }

  // handle else (not implemented) dari index.js
  static notImplementedHandler() {
    View.showNotImplemented();
  }
}

// Jangan lupa export
module.exports = Controller;