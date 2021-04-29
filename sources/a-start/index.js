/*
  Requirement dari aplikasi ini adalah:
    * dengan diberikan data bernama `anime.json`
    * user akan memberikan inputan berupa id dari anime,
    * aplikasi akan membaca json tersebut, kemudian
    * aplikasi akan menulis ke dalam file `output.json`.
      outputnya berupa anime yang dipilih oleh `user` saja.
    * aplikasi akan memberikan respon berhasil atau gagal menulis.

  contoh:
  <input pada terminal>
    node index.js search 1

  <output pada terminal>
    Anime <nama_anime> sudah ditulis ke output.json

  <output pada output.json>
    [
      {
        "id": 2,
        "season": "Winter 2020",
        "name": "Plunderer",
        "total_episodes": 24,
        "studio": "GEEKTOYS"
      }
    ]
*/