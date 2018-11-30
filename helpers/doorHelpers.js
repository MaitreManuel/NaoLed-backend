const Door = require('../models/door');
const helpers = require('../helpers/global')

module.exports = class DoorHelpers {

  static setDoor(status, callback) {
    DoorHelpers.lastDoorOpen(door => {
      if (door) {
        if (!door.time_closed && !parseInt(status)) { // si date_closed est null et que status = 0
          DoorHelpers.closeDoor(door, callback);
        } else if (door.time_closed && parseInt(status)) { // si date_closed est que la porte vient de s'ouvrir
          DoorHelpers.openDoor(callback);
        } else {
          callback({error: `La porte est déjà ${ status == 1 ? 'ouverte' : 'fermée' }`});
        }
      } else if (parseInt(status)) {
        DoorHelpers.openDoor(callback);
      }
    })
  }

  static openDoor(callback) {
    Door.create({
      time_open: new Date().getTime(),
      time_closed: null
    }, (error, result) => {
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
        helpers.emitEvent ('openDoor', result);
      }
    });
  }

  static closeDoor(door, callback) {
    door.set({time_closed: new Date().getTime()});
    door.save((er, newDoor) => {
      console.log('updated new door', door);
      callback({ result: door });
      helpers.emitEvent ('closeDoor', door);
    })
  }

  static lastDoorOpen(returnValue) {
    Door.find().sort({ _id: -1 }).limit(1).exec((err, res) => {
      if (err) throw err;
      if (res) {
        returnValue(res[0]);
      } else {
        returnValue(0);
      }
    });
  }
};
