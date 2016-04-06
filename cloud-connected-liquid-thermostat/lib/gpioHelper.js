function gpioHelper() {
	var gpioHelper = this;
	console.log("Setting up wiring-pi");
	gpioHelper.wpi = require('wiring-pi');
	gpioHelper.wpi.setup("wpi");
}

gpioHelper.prototype.setPinHigh = function(pin) {
	var gpioHelper = this;
	gpioHelper.wpi.pinMode(pin, gpioHelper.wpi.OUTPUT);
	gpioHelper.wpi.digitalWrite(pin, 1);
	console.log("Setting pin:", pin, "high");
	return;
};

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