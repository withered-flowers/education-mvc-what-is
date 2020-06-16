const fs = require('fs');
const argvInput = Number(process.argv[2]);

let animes = [];

let data = fs.readFileSync('./data/Anime.json', {
  encoding: 'utf8'
});

data = JSON.parse(data);

if (argvInput > data.length) {
  console.log("id terlalu besar !");
}
else if (argvInput < 0 || isNaN(argvInput)) {
  console.log("id terlalu kecil !");
}
else {
  for (let ctr = 0; ctr < data.length; ctr++) {
    if(data[ctr].id === argvInput) {
      animes.push(data[ctr]);
    }
  };

  fs.writeFileSync('./data/ouput.json', JSON.stringify(animes, null, 2), {
    encoding: 'utf8'
  });

  console.log("data berhasil ditulis ke file 'output.json'");
}
