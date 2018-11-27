module.exports = class Global {
  static getAll(model, callback) {
    return model.find((error, result) => {
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
      }
    });
  }
}
