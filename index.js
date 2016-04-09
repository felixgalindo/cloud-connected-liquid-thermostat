/**
 * Definition of liquidStat. liquidStat monitors liquid level, monitors liquid sensor,
 * and regulates liquid temperature. Sensor data is pushed to plotly for graphing.
 * @author Felix Galindo
 */


var liquidStat = this;
liquidStat.options = require("./config/")();
console.log("Cloud Connected Liquid Thermostat Starting with options: ", liquidStat.options);
liquidStat.ds18b20Helper = require('./lib/ds18b20Helper.js')();
liquidStat.eTapeHelper = require('./lib/eTapeHelper.js')();
liquidStat.plotlyHelper = require('./lib/plotlyHelper.js')();
liquidStat.gpioHelper = require('./lib/gpioHelper.js')();
liquidStat.counter = liquidStat.options.relayOnDelay; //Start heating at the beginning if temp is too cold

//Reads sensor data on specified interval and controls heater 
setInterval(function() {
	if (liquidStat.ds18b20Helper.listOfDeviceIds) {
		liquidStat.ds18b20Helper.getTemp(liquidStat.options.ds18b20Id)
			.then(function(liquidTemp) {
				liquidStat.liquidTemp = liquidTemp;
				console.log("Liquid temp is ", liquidStat.liquidTemp, "°F");
			})
			.then(function() {
				return liquidStat.eTapeHelper.getLiquidLevel();
			})
			.then(function(liquidLevel) {
				liquidStat.liquidLevel = liquidLevel;
				console.log("Liquid Level is ", liquidStat.liquidLevel, "inches");

				//Check to see if we need to heat or we need to stop heating
				if (liquidStat.liquidTemp !== false && liquidStat.liquidTemp < liquidStat.options.tempSetPoint && liquidStat.counter > (liquidStat.options.relayOnDelay / liquidStat.options.sampleRate)) {
					liquidStat.counter = 0;
					console.log("Turning heater on ");
					liquidStat.gpioHelper.setPinHigh(liquidStat.options.relayGpioNum);
					liquidStat.heaterStaus = "On";
				} else if (liquidStat.liquidTemp !== false && liquidStat.liquidTemp > liquidStat.options.tempSetPoint) {
					console.log("Turning heater off");
					liquidStat.gpioHelper.setPinLow(liquidStat.options.relayGpioNum);
					liquidStat.heaterStaus = "Off";
				}

			})
			.catch(function(err) {
				console.log(err);
			});
	}
	liquidStat.counter++;

}, liquidStat.options.sampleRate);

//Pushes to plotly on specified interval
if (liquidStat.options.graphingEnabled) {
	setInterval(function() {
		if (liquidStat.liquidLevel !== null && liquidStat.liquidLevel !== undefined) {
			liquidStat.plotlyHelper.plotData("Liquid Level", liquidStat.liquidLevel);
		}
		if (liquidStat.heaterStaus !== null && liquidStat.heaterStaus !== undefined) {
			liquidStat.plotlyHelper.plotData("Liquid Heater Status", liquidStat.heaterStaus);
		}
		if (liquidStat.liquidTemp !== null && liquidStat.liquidTemp !== undefined) {
			liquidStat.plotlyHelper.plotData("Liquid Temperature", liquidStat.liquidTemp);
		}
		if (liquidStat.options.tempSetPoint !== null && liquidStat.options.tempSetPoint !== undefined) {
			liquidStat.plotlyHelper.plotData("Liquid Temp Set Point", liquidStat.options.tempSetPoint);
		}
	}, liquidStat.options.graphRate);

	module.exports = function() {
		var instance = new liquidStat();
		return instance;
	};
}