const Door = require('../models/door');

module.exports = class DoorHelpers {

  static setDoor(status, callback) {
    DoorHelpers.lastDoorOpen((door) => {
      if (door) {
        if (!door.time_closed && !parseInt(status)) { // si date_closed est null et que status = 0
          DoorHelpers.closeDoor(door, callback);
        } else if (door.time_closed && parseInt(status)) { // si date_closed est que la porte vient de s'ouvrir
          DoorHelpers.createDoor(callback);
        } else {
          callback({error: 'La porte est déjà ouverte'})
          console.log('une porte est déjà ouverte')
        }
      } else if (parseInt(status)) {
        DoorHelpers.createDoor(callback);
      }
    })
  }

  static createDoor(callback) {
    Door.create({
      time_open: new Date().getTime(),
      time_closed: null
    }, (error, result) => {
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
      }
    });
  }

  static closeDoor(door, callback) {
    door.set({time_closed: 99999});
    door.save((er, newDoor) => {
      console.log('updated new door', door);
      callback({ result: door });
    })
  }

  static lastDoorOpen(returnValue) {
    Door.find().sort({_id: -1}).limit(1).exec((err, res) => {
      if (err) throw err;
      if (res) {
        returnValue(res[0]);
      } else {
        returnValue(0);
      }
    });
  }
};
