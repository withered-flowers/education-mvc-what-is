// Jangan lupa panggil model di dalam controller
const Anime = require('../models/Anime.js');
const AnimeView = require('../views/AnimeView.js');

class AnimeController {
  static processInput(input) {
// Di sini kita akan berhubungan langsung dengan data bukan?
// Karena itu kita akan melemparnya ke model !

// Jangan lupa setelah menerima hasil dari model,
// Kemudian akan dilempar ke View untuk dijadikan output kepada user ! 
    let result = Anime.selectFile(input);
    
    // Kalau hasilnya adalah error
    if(result instanceof Error) {
      AnimeView.showError(result);
    }
    // Kalau hasilnya bukan error
    else {
      AnimeView.showSuccess(result);
    }
  }
}

// Jangan lupa export
module.exports = AnimeController;