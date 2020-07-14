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
    
    // Nah pada saat ini, kita tidak bisa memilih 
    // apakah error, atau success ?
    // sehingga kita hanya menggunakan showSuccess saja
    AnimeView.showSuccess(result);
  }
}

// Jangan lupa export
module.exports = AnimeController;