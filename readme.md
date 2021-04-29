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

kita akan mencoba untuk membuatnya dengan cara oop dan mvc yah !

### OOP

#### Code
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

// ---------- End of File: index.js
```

Sudah terlihat bukan ke-OOP-an dari kode di atas?
Namun kode ini sepertinya belum terlalu *ciamik* karena belum ada function nya
sama sekali yah....

Nah, selanjutnya kita akan mencoba membuatnya dalam bentuk Model-View-Controller.

### MVC
Pertama-tama kita akan membuat file `index.js` nya terlebih dahulu,
file `index.js` ini akan menerima input dari user, kemudian menyerahkannya
ke `Controller`. 

Dengan asumsi controller kita bernama `Controller`, maka kita akan membuat kerangka awal pada
`index.js` sebagai berikut:

#### Code
```javascript
// ---------- File: index.js
const argv = process.argv;

const command = argv[2];
const argvInput = Number(process.argv[3]);

if (command === 'search') {
  // satu command = satu tugas = satu method pada controller
  // (1) controller untuk handle search
}
else {
  // satu command = satu tugas = satu method pada controller
  // (2) controller untuk handle not implemented
}
// ---------- End of File: index.js
```

Setelah itu, kita akan membuat file `Controller.js` nya

Pertanyaan:
Apakah di dalam class `Controller` ini membutuhkan `constructor`?  
Jawabannya adalah:
**Tidak**, karena di dalam `Controller` ini hanya berisi method method
saja yang akan dipanggil langsung, oleh karena itu jangan lupa `static` yah !

#### Code
```javascript
// ---------- File: controllers/controller.js
// Jangan lupa panggil model di dalam controller
class Controller {
  // handle search dari index.js
  static searchHandler(input) {
    // Di sini kita akan berhubungan langsung dengan data bukan?
    // Karena itu kita akan melemparnya ke model !

    // selanjutnya kita akan membuat model terlebih dahulu
  }

  // handle else (not implemented) dari index.js
  static notImplementedHandler() {
    // nanti akan kita kerjakan lagi setelah searchHandler selesai
  }
}

// Jangan lupa export
module.exports = Controller;
// ---------- End of File: controllers/controller.js
```

Lalu selanjutnya, kita akan membuat bagian pada model.

sesuai dengan struktur data yang kita miliki adalah `Anime`,
maka kita akan membuat sebuah struktur data model dengan nama `Anime`

Setelah itu kita juga akan membuat sebuah file dengan nama `model.js` yang akan
menjadi file Model utama kita, yang berguna sebagai domain manipulasi datanya.

Total file yang dibuat adalah:
- `controller.js` dalam folder `controllers`
- `anime.js` dalam folder `models`
- `model.js` dalam folder `models`

Pada file struktur data model bernama `Anime` nya yang dibuat adalah:

#### Code:
```javascript
// ---------- File: models/anime.js
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
// ---------- End of File: models/anime.js
```

Setelah ini barulah kita membuat file `model.js` nya yang bertugas untuk memanipulasi data yang
ada

### Code:
```javascript
// ---------- File: models/model.js
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
// End of File: models/model.js
```

Barulah setelah ini kita memodifikasi file `Controller`nya lagi sehingga
mau menerima output dari `Model` dan mengirimkannya ke `View`

Sampai di langkah ini kita akan membuat `view.js` dan menyelesaikan `controller.js` nya

### Code
```javascript
// ---------- File: controllers/controller.js
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
// ---------- End of File: controllers/controller.js
```

Asumsi nama `View`-nya adalah `view.js`

#### Code:
```Javascript
// ---------- File: views/view.js
class View {
  static showSuccess(output) {
    console.log(`Anime ${output.name} sudah ditulis ke 'output.json'`);
  }

  static showNotImplemented() {
    console.log("command belum diimplementasikan");
  }
}

module.exports = View;
// ---------- End of File: views/view.js
```

Setelah ini kita akan menyelesaikan `index.js` sehingga menjadi:

### Code
```javascript
// ---------- File: index.js
const Controller = require('./controllers/controller.js');

const argv = process.argv;

const command = argv[2];
const argvInput = Number(process.argv[3]);

if (command === 'search') {
  Controller.searchHandler(argvInput);
}
else {
  Controller.notImplementedHandler();
}
// ---------- End of File: index.js
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