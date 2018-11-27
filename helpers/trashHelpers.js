const Trash = require('../model/trash');

module.exports = class TrashHelpers {
  static getNbTrash(result) {
    return result.length;
  }

  static getNbTrashIn(result) {
    return result.filter(e => e.type == 1).length;
  }

  static getNbTrashOut(result) {
    return result.filter(e => e.type == 0).length;
  }

  static setTrash(type, res) {
    Ashbin.create({
      time: new Date().getTime(),
      type: type
    }, (error, result) => {
      error ? res.send(error) : res.send(result);
    });
  }
}