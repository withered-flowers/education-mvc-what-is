## Table of Content
1. [Prelude MVC](#prelude-mvc)
1. [MVC What is](#mvc-what-is)
    * [Model](#model)
    * [View](#view)
    * [Controller](#controller)
1. [Flow in MVC](#flow-in-mvc)
1. [MVC How To](#mvc-how-to)
1. [Pros and Cons](#pros-and-cons)
1. [References](#references)

## Prelude MVC
Sebelumnya kita sudah pernah mempelajari mengenai pembuatan aplikasi yang semua
nya hanya menggunakan `main` saja, kemudian, kita mempelajari menggunakan 
`pengkotak-kotakan` logic berdasarkan kegunaan dengan menggunakan `function`,
Setelah itu kita `mengkotak-kotak`an lagi berdasarkan object yang 
di-*realisasi*-kan dari kehidupan nyata dengan menggunakan konsep OOP, dan
sampailah di hari ini, kita akan mencoba menggunakan suatu pola desain 
pemrograman yang baru lagi, yaitu `M-V-C` atau `Model-View-Controller`.

## MVC What is
MVC ini sebenarnya adalah sebuah Pola Desain dalam pembuatan *software* yang
umum digunakan dalam pengembangan *user interface* yang **membagi** logic dalam
*software* menjadi 3 element yang berhubungan satu sama lainnya: 
`Model`, `View`, dan `Controller`.

### Model
Komponen `model` ini adalah lingkup / domain yang berhubungan dengan logic untuk
data. Intinya semua hal yang berhubungan dengan data, adanya di model ini.

### View
Komponen `view` ini adalah lingkup / domain yang berhubungan dengan tampilan 
atau *user interface*. Segala macam tampilan, yang akan dilihat oleh pengguna
aplikasi kita, akan ada di sini.

### Controller
Komponen `controller` ini adalah `otak` dari MVC, yang menjawab 
`seluruh keinginan` atau aksi yang akan pengguna lakukan dalam aplikasi kita.
`controller` inilah yang akan melakukan permintaan data via `model`,
mengambil data yang disediakan `model`, dan mem-*passing* data tersebut ke 
`view` agar dapat ditampilkan. 

Intinya, input dari pengguna akan ditampung via `controller`, diteruskan 
ke `model`, untuk nantinya diambil kembaliannya, dan diteruskan ke `view` 
sebagai output tampilan. 

## Flow in MVC
Umumnya alur dalam MVC ini adalah:
1. User memberikan interaksi / input pada main app
2. input ini akan diteruskan dari main app ke `controller`
3. `controller` akan membaca input tersebut, apabila dibutuhkan data,
   `controller` akan meneruskan pada `model`
4. `model` kemudian akan memproses data tersebut, kemudian **mengembalikan**
   hasil pemrosesan data tersebut. Ingat yah, yang dikembalikan akan **hasil**
   nya saja, bukan langsung berupa output, ke `controller` lagi.
5. `controller` kemudian akan memberikan output dari `model` tersebut kepada
   `view` agar dapat ditampilkan kepada user.

Sehingga dari sini bisa diketahui bahwa `processor` nya si MVC ini adalah pada?
* [ ] Model
* [ ] View
* [x] Controller

WARNING:  
Dikarenakan `Controller` ini bertindak sebagai `processor`, maka 
**seluruh** interaksi dari aplikasi kita akan terpusat pada `Controller`,
sehingga tidak boleh ada direct access `View` atau `Model` pada app yang 
dibuat.

## MVC How To
Jadi, sekarang kita akan mencoba untuk membuat sebuah aplikasi sederhana untuk
membaca season anime yang sedang tayang saat ini yah !

Requirement dari aplikasi ini adalah:
* dengan diberikan data bernama `anime.json`
* user akan memberikan inputan berupa id dari anime, 
* aplikasi akan membaca json tersebut, kemudian
* aplikasi akan menulis ke dalam file `output.json`. outputnya adalah hanya
  anime yang dipilih oleh `user` saja
* aplikasi akan memberikan respon berhasil atau gagal menulis.

kita akan mencoba untuk membuatnya
dengan cara konvensional, oop, dan mvc yah !

### Konvensional

#### Code 01:
```javascript
// ---------- File: index.js
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
// ---------- End of File: index.js
```

Dapat dilihat dari kode di atas, apabila membuat semuanya menjadi satu file,
semuanya terkesan mudah bukan?

Sampai dengan negara api bernama `OOP` yang menyerang. Oleh karena itu, 
selanjutnya kita akan membuat kode di atas dengan *ala* OOP dan functional.

### OOP

#### Code 02:
```javascript
// ---------- File: models/Anime.js
class Anime {
  constructor(id, season, name, total_episodes, studio) {
    this.id = id;
    this.season = season;
    this.name = name;
    this.total_episodes = total_episodes;
    this.studio = studio;
  }
}

module.exports = Anime;
// ---------- End of File: models/Anime.js

// ---------- File: index.js
const fs = require('fs');
const Anime = require('./models/Anime.js');

const argvInput = Number(process.argv[2]);

let animes = [];

// Baca File
let data = fs.readFileSync('./data/Anime.json', {
  encoding: 'utf8'
});

data = JSON.parse(data);

// Select File
if (argvInput > data.length) {
  console.log("id terlalu besar !");
}
else if (argvInput < 0 || isNaN(argvInput)) {
  console.log("id terlalu kecil !");
}
else {
  for (let ctr = 0; ctr < data.length; ctr++) {
    if (data[ctr].id === argvInput) {
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

// Tulis File
  fs.writeFileSync('./data/ouput.json', JSON.stringify(animes, null, 2), {
    encoding: 'utf8'
  });

  console.log("data berhasil ditulis ke file 'output.json'");
}
// ---------- End of File: index.js
```

Sudah terlihat bukan ke-OOP-an dari kode di atas?
Namun kode ini sepertinya belum terlalu *ciamik* karena belum ada function nya
sama sekali yah....

Mari kita mengubah logic pada `index.js` di atas sehingga memiliki sebuah
function utama untuk membaca dan menulis filenya !

#### Code 03:
```javascript
// ---------- File: class/Anime.js
class Anime {
  constructor(id, season, name, total_episodes, studio) {
    this.id = id;
    this.season = season;
    this.name = name;
    this.total_episodes = total_episodes;
    this.studio = studio;
  }
}

module.exports = Anime;
// ---------- End of File: class/Anime.js

// ---------- File: index.js
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
// ---------- End of File: index.js
```

Nah, setelah kita berhasil membuatnya sampai dengan tahap ini, maka selanjutnya
kita akan mencoba membuatnya dalam bentuk Model-View-Controller.

### MVC
Pertama-tama kita akan membuat file `index.js` nya terlebih dahulu,
file `index.js` ini akan menerima input dari user, kemudian menyerahkannya
ke `Controller`. 

Dengan asumsi controller kita bernama `AnimeController`, maka:

#### Code 04:
```javascript
// ---------- File: index.js
const AnimeController = require('./controllers/AnimeController.js');

const argvInput = Number(process.argv[2]);

AnimeController.processInput(argvInput);
// ---------- End of File: index.js
```

Setelah itu, kita akan membuat file `AnimeController.js` nya

Pertanyaan:
Apakah di dalam class `AnimeController` ini membutuhkan `constructor`?  
Jawabannya adalah:
**Tidak**, karena di dalam `AnimeController` ini hanya berisi method method
saja yang akan dipanggil langsung, oleh karena itu jangan lupa `static` yah !

Dengan asumsi nama `Model` yang sudah dibuat ini adalah `Anime`, maka

#### Code 05:
```javascript
// ---------- File: controllers/AnimeController.js
// Jangan lupa panggil model di dalam controller
const Anime = require('../models/Anime.js');

class AnimeController {
  static processInput(input) {
// Di sini kita akan berhubungan langsung dengan data bukan?
// Karena itu kita akan melemparnya ke model !
    Anime.selectFile(input);
  }
}

// Jangan lupa export
module.exports = AnimeController;
// ---------- End of File: controllers/AnimeController.js
```

Kemudian pada file model bernama `Anime` nya yang dibuat adalah:

#### Code 06:
```javascript
// ---------- File: models/Anime.js
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
// End of File: models/Anime.js
```

Barulah setelah ini kita memodifikasi file `Controller`nya lagi sehingga
mau menerima output dari `Model` dan mengirimkannya ke `View`

Asumsi nama `View`-nya adalah `AnimeView.js`

#### Code 07:
```javascript
// ---------- File: controllers/AnimeController.js
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
// End of File: controllers/AnimeController.js
```

#### Code 08:
```Javascript
// ---------- File: views/AnimeView.js
class AnimeView {
  static showError(output) {
    console.log(`Error: ${output}`);
  }

  static showSuccess(output) {
    console.log(`Success: ${output}`);
  }
}

module.exports = AnimeView;
// ---------- End of File: views/AnimeView.js
```

🔥 Selamat ! 🔥  
Sampai di titik ini artinya kita sudah berhasil menguasai penggunaan MVC loh 😊

## Pros and Cons
Nah setelah kita mempelajari cara membuat MVC, 
sekarang kita bisa mencoba untuk menganalisis kekuatan dan kelemahan dari MVC
ini yah !

Pros:
* Bisa dikembangkan bersama - Satu orang handle view, satu orang handle 
  controller, satu orang handle model, satu orang handle main? BISA !
* `Kohesi`-nya tingkat tinggi - tingkat saling keterikatan antar fungsi dalam
  satu komponen-nya jadi tinggi
* `Coupling`-nya tingkat rendah - tingkat ketergantungan antar komponen 
  jadi rendah, sehingga perubahan dalam satu komponen, tidak akan berdampak
  besar terhadap komponen lainnya.
* Modifikasinya jadi lebih leluasa karena tiap komponen sudah ada tugasnya 
  masing-masing
* Model bisa memiliki banyak View, tergantung dari Controller meng-setnya 
  seperti apa.

Tiada gading yang tak retak, tentunya dalam MVC ini sendiri memiliki kelemahan
nya juga.

Cons:
* Navigasi kode jadi membingungkan karena banyaknya passing antar komponen satu
  ke komponen lainnya

Dan dengan menganalisis Pros dan Cons nya, selesai juga pelajaran MVC ini.

Keep humble and happy learning !

## References
* [Top 31 MVC Interview & Questions, Guru 99](https://www.guru99.com/mvc-interview-questions.html)
* [Why MVC, Medium](https://medium.com/@socraticsol/why-mvc-architecture-e833e28e0c76)