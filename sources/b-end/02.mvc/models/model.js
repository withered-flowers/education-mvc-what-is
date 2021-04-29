const fs = require('fs');
const Anime = require('./anime.js');

class Model {
  static readAndWrite(id) {
    let arrInstanceAnimes = [];
    let arrSelectedAnime = [];

    // Baca File
    let data = fs.readFileSync('./data/Anime.json', {
      encoding: 'utf8'
    });

    data = JSON.parse(data);

    // jadikan ke dalam versi instance (ingat ! oop sudah menyerang !)
    for (let i = 0; i < data.length; i++) {
      let instanceAnime = new Anime(
        data[i].id,
        data[i].season,
        data[i].name,
        data[i].total_episodes,
        data[i].studio
      );

      arrInstanceAnimes.push(instanceAnime);
    }

    // Select File
    for (let ctr = 0; ctr < arrInstanceAnimes.length; ctr++) {
      if (arrInstanceAnimes[ctr].id === id) {
        arrSelectedAnime.push(arrInstanceAnimes[ctr]);
      }
    };

    // Tulis File
    fs.writeFileSync(
      './data/output.json',
      JSON.stringify(arrSelectedAnime, null, 2),
      { encoding: 'utf8' }
    );

    return arrSelectedAnime[0];
  }
}

module.exports = Model;