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

  static getNbTrashWhichNotBeSort(result) {
    return result.filter(e => e.type == 0).length - result.filter(e => e.type == 1).length;
  }

  static setTrash(options, callback) {
    Trash.create({
      time: new Date().getTime(),
      type: options.type
    }, (error, result) => {
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
      }
    });
  }
};
