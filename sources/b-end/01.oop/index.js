const fs = require('fs');
const Anime = require('./models/Anime.js');

const argv = process.argv;

const command = argv[2];
const argvInput = Number(process.argv[3]);

if (command === 'search') {
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
    if (arrInstanceAnimes[ctr].id === argvInput) {
      arrSelectedAnime.push(arrInstanceAnimes[ctr]);
    }
  };

  // Tulis File
  fs.writeFileSync(
    './data/output.json',
    JSON.stringify(arrSelectedAnime, null, 2),
    { encoding: 'utf8' }
  );

  console.log(`Anime ${arrSelectedAnime[0].name} sudah ditulis ke 'output.json'`);
}
else {
  console.log("command belum diimplementasikan");
}
