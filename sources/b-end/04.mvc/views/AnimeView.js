class AnimeView {
  static showError(output) {
    // Tidak usah ditambahkan tulisan error lagi karena 
    // Error pasti ada tulisan "Error:" di depannya
    console.log(`${output}`);
  }

  static showSuccess(output) {
    console.log(`Success: ${output}`);
  }
}

module.exports = AnimeView;