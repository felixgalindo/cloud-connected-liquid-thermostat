var waterStat = this;
waterStat.gpioHelper = require('./lib/gpioHelper.js')();
waterStat.eTapeHelper = require('./lib/eTapeHelper.js')();
waterStat.plotlyHelper = require('./lib/plotlyHelper.js')();
waterStat.ds18b20Helper = require('./lib/ds18b20Helper.js')();

//Constants
const tempSetPoint = 78;
const graphingEnabled = 1;
const minute = 60 * 1000
const sampleRate = minute; //sample every 10 secs
const graphRate = sampleRate; //plot every 1 min
const relayGpioNum = 29;

var counter = 60 * 1000 / sampleRate + 1; //Start heating at the beginning if temp is too cold

setInterval(function() {
	if (waterStat.ds18b20Helper.listOfDeviceIds) {
		waterStat.ds18b20Helper.getWaterTemp(waterStat.ds18b20Helper.listOfDeviceIds[0])
			.then(function(waterTemp) {
				waterStat.waterTemp = waterTemp;
				console.log("water temp is ", waterStat.waterTemp, "degrees F");
			})
			.then(function() {
				return waterStat.eTapeHelper.getWaterLevel();
			})
			.then(function(waterLevel) {
				waterStat.waterLevel = waterLevel;
				console.log("water Level is ", waterStat.waterLevel, "inches");

				//Only turn on relay after 3 minute delay if temp is too cold
				if (waterStat.waterTemp < tempSetPoint && counter > 3 * minute / sampleRate) {
					counter = 0;
					console.log("Turning heater on ");
					waterStat.gpioHelper.setPinHigh(relayGpioNum);
					waterStat.heaterStaus = "On";
				} else if (waterStat.waterTemp > tempSetPoint) {
					console.log("Turning heater off");
					waterStat.gpioHelper.setPinLow(relayGpioNum);
					waterStat.heaterStaus = "Off";
				}

			})
			.catch(function(err) {
				console.log(err);
			});
	}
	counter++;

}, sampleRate);

if (graphingEnabled) {
	setInterval(function() {
		if (waterStat.waterLevel != null && waterStat.waterLevel != undefined) {
			waterStat.plotlyHelper.plotData("Water Level", waterStat.waterLevel);
		}
		if (waterStat.heaterStaus != null && waterStat.heaterStaus != undefined) {
			waterStat.plotlyHelper.plotData("Water Heater Status", waterStat.heaterStaus);
		}
		if (waterStat.waterTemp != null && waterStat.waterTemp != undefined) {
			waterStat.plotlyHelper.plotData("Water Temperature", waterStat.waterTemp);
		}
				if (tempSetPoint != null && tempSetPoint != undefined) {
			waterStat.plotlyHelper.plotData("Water Temp Set Point", tempSetPoint);
		}
	}, graphRate);
}