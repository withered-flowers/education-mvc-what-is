const fs = require('fs');
const Anime = require('./models/Anime.js');

const argvInput = Number(process.argv[2]);

let animes = [];

// Function baca file
const bacaFile = () => {
  let data = fs.readFileSync('./data/Anime.json', {
    encoding: 'utf8'
  });
  
  data = JSON.parse(data);

  return data;
}

const tulisFile = (animes) => {
  fs.writeFileSync('./data/ouput.json', JSON.stringify(animes, null, 2), {
    encoding: 'utf8'
  });

  console.log("data berhasil ditulis ke file 'output.json'");
}

// Function select file
const selectFile = (input) => {
// Baca File
  let data = bacaFile();

  if (input > data.length) {
    console.log("id terlalu besar !");
  }
  else if (input < 0 || isNaN(input)) {
    console.log("id terlalu kecil !");
  }
  else {
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

// Tulis file
    tulisFile(animes);
  }
}

// Main Code
selectFile(argvInput);