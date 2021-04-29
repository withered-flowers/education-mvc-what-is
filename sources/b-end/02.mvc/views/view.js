class View {
  static showSuccess(output) {
    console.log(`Anime ${output.name} sudah ditulis ke 'output.json'`);
  }

  static showNotImplemented() {
    console.log("command belum diimplementasikan");
  }
}

module.exports = View;