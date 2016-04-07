var liquidStat = this;
liquidStat.options = require("./config/")();
console.log("Cloud Connected Liquid Thermostat Starting with options: ", liquidStat.options);
liquidStat.ds18b20Helper = require('./lib/ds18b20Helper.js')();
liquidStat.eTapeHelper = require('./lib/eTapeHelper.js')();
liquidStat.plotlyHelper = require('./lib/plotlyHelper.js')();
liquidStat.gpioHelper = require('./lib/gpioHelper.js')();

//console.log("liquid stat",liquidStat);
var counter = liquidStat.options.relayOnDelay; //Start heating at the beginning if temp is too cold

setInterval(function() {
	if (liquidStat.ds18b20Helper.listOfDeviceIds) {
		liquidStat.ds18b20Helper.getTemp(liquidStat.options.ds18b20Id)
			.then(function(liquidTemp) {
				liquidStat.liquidTemp = liquidTemp;
				console.log("liquid temp is ", liquidStat.liquidTemp, "degrees F");
			})
			.then(function() {
				return liquidStat.eTapeHelper.getLiquidLevel();
			})
			.then(function(liquidLevel) {
				liquidStat.liquidLevel = liquidLevel;
				console.log("liquid Level is ", liquidStat.liquidLevel, "inches");

				//Only turn on relay after 3 minute delay if temp is too cold
				if (liquidStat.liquidTemp !== false && liquidStat.liquidTemp < liquidStat.options.tempSetPoint
				 && counter > (liquidStat.options.relayOnDelay / liquidStat.options.sampleRate)) {
					counter = 0;
					console.log("Turning heater on ");
					liquidStat.gpioHelper.setPinHigh(relayGpioNum);
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
	counter++;

}, liquidStat.options.sampleRate);

if (liquidStat.options.graphingEnabled) {
	setInterval(function() {
		if (liquidStat.liquidLevel != null && liquidStat.liquidLevel != undefined) {
			liquidStat.plotlyHelper.plotData("Water Level", liquidStat.liquidLevel);
		}
		if (liquidStat.heaterStaus != null && liquidStat.heaterStaus != undefined) {
			liquidStat.plotlyHelper.plotData("Water Heater Status", liquidStat.heaterStaus);
		}
		if (liquidStat.liquidTemp != null && liquidStat.liquidTemp != undefined) {
			liquidStat.plotlyHelper.plotData("Water Temperature", liquidStat.liquidTemp);
		}
		if (liquidStat.options.tempSetPoint != null && liquidStat.options.tempSetPoint != undefined) {
			liquidStat.plotlyHelper.plotData("Water Temp Set Point", liquidStat.options.tempSetPoint);
		}
	}, liquidStat.options.graphRate);
}