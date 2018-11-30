const Light = require('../models/light');
const helpers = require('./global')

module.exports = class LightHelpers {

  static setLight(status, callback) {
    LightHelpers.lastLightOn((light) => {
      if (light) {
        if (!light.time_light_off && !parseInt(status)) { // si date_closed est null et que status = 0
          LightHelpers.switchLightOff(light, callback);
        } else if (light.time_light_off && parseInt(status)) { // si date_closed est que la porte vient de s'ouvrir
          LightHelpers.switchLightOn(callback);
        } else {
          callback({error: 'La lumiere est déjà allumée'})
          console.log('La lumière est déjà allumée')
        }
      } else if (parseInt(status)) {
        LightHelpers.switchtLightOn(callback);
      }
    })
  }

  static switchLightOn(callback) {
    Light.create({
      time_light_on: new Date().getTime(),
      time_light_off: null
    }, (error, result) => {
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
        helpers.emitEvent ('switchLightOn', result);
      }
    });
  }

  static switchLightOff(light, callback) {
    light.set({time_light_off: new Date().getTime()});
    light.save((er, newLight) => {
      console.log('updated new light', light);
      callback({ result: light });
      helpers.emitEvent ('switchLightOff', light);
    })
  }

  static lastLightOn(returnValue) {
    Light.find().sort({_id: -1}).limit(1).exec((err, res) => {
      if (err) throw err;
      if (res) {
        returnValue(res[0]);
      } else {
        returnValue(0);
      }
    });
  }
};
