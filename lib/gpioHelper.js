/**
 * Definition of gpioHelper. 
 * gpioHelper provides functions to easiliy turn on and off a gpio
 * uses wiring-pi
 * @author Felix Galindo
 */

function gpioHelper() {
	var gpioHelper = this;
	console.log("Setting up wiring-pi");
	gpioHelper.wpi = require('wiring-pi');
	gpioHelper.wpi.setup("wpi");
}

//Sets pin high
gpioHelper.prototype.setPinHigh = function(pin) {
	var gpioHelper = this;
	gpioHelper.wpi.pinMode(pin, gpioHelper.wpi.OUTPUT);
	gpioHelper.wpi.digitalWrite(pin, 1);
	console.log("Setting pin:", pin, "high");
	return;
};

//Sets pin low
gpioHelper.prototype.setPinLow = function(pin) {
	var gpioHelper = this;
	gpioHelper.wpi.pinMode(pin, gpioHelper.wpi.OUTPUT);
	gpioHelper.wpi.digitalWrite(pin, 0);
	console.log("Setting pin:", pin, "low");
	return;
};

module.exports = function() {
	var instance = new gpioHelper();
	return instance;
};