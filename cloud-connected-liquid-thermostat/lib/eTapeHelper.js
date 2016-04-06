var Promise = require('bluebird');

//Constants
//y=mx+b 
const m = -6.2957; //slope
const b = 14.8286; //b

function eTapeHelper() {
  var eTapeHelper = this;
  var ads1x15 = require('node-ads1x15');
  eTapeHelper.ads1x15 = Promise.promisifyAll(new ads1x15(1, 0x48));
}

eTapeHelper.prototype.getWaterLevel = function(pin) {
  var eTapeHelper = this;
  return eTapeHelper.ads1x15.readADCSingleEndedAsync(0, 4096, 250)
    .then(function(voltage) {
      voltage = voltage / 1000;
      console.log("rRef voltage:", voltage, "V");
      var resistance = (1000 * voltage) / (5 - voltage);
      console.log("rRef resistance:", resistance, "ohms");
      return eTapeHelper.ads1x15.readADCSingleEndedAsync(1, 4096, 250);
    })
    .then(function(voltage) {
      voltage = voltage / 1000;
      console.log("rSense voltage:", voltage, "V");
      var resistance = (1000 * voltage) / (5 - voltage);
      console.log("rSense resistance:", resistance, "ohms");
      var waterLevel = m * resistance / 1000 + b; //linear equation
      console.log("waterLevel", waterLevel, "inches");
      return waterLevel;
    })
    .catch(function(err) {
      console.log(err);
    });
};


module.exports = function() {
  var instance = new eTapeHelper();
  return instance;
};