const fs = require('fs');

class Anime {
  constructor(id, season, name, total_episodes, studio) {
    this.id = id;
    this.season = season;
    this.name = name;
    this.total_episodes = total_episodes;
    this.studio = studio;
  }

  static bacaFile() {
  // Ingat bahwa memanggil fs.readFileSync itu bacanya relatif dari
  // memanggil file utamanya
    let data = fs.readFileSync('./data/anime.json', {
      encoding: 'utf8'
    });

    data = JSON.parse(data);

    return data;
  }

  static tulisFile(animes) {
    fs.writeFileSync('./data/ouput.json', JSON.stringify(animes, null, 2), {
      encoding: 'utf8'
    });
  
    return "data berhasil ditulis ke file 'output.json'";
  }

  static selectFile(input) {
    let data = this.bacaFile();

    if (input > data.length) {
      return "id terlalu besar !";
    }
    else if (input < 0 || isNaN(input)) {
      return "id terlalu kecil !";
    }
    else {
      let animes = [];
      let result;

      for (let ctr = 0; ctr < data.length; ctr++) {
        if (data[ctr].id === input) {

          animes.push(
            new Anime(
              data[ctr].id,
              data[ctr].season,
              data[ctr].name,
              data[ctr].total_episodes,
              data[ctr].studio
            )
          );
        }
      };

      result = this.tulisFile(animes);

      return result;
    }
  }
}

module.exports = Anime;