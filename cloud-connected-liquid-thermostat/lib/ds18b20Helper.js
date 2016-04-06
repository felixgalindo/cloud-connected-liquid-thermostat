var Promise = require('bluebird');

function ds18b20helper() {
	var ds18b20helper = this;
	console.log("Starting ds18b20helper");
	ds18b20helper.ds18x20 = Promise.promisifyAll(require('ds18x20'));
	ds18b20helper.isDriverLoaded = false;

	ds18b20helper.ds18x20.isDriverLoaded(function(err, isLoaded) {
		ds18b20helper.isDriverLoaded = isLoaded;
		if (!isLoaded) {
			ds18b20helper.ds18x20.loadDriver(function(err) {
				if (err) console.log('something went wrong loading the driver:', err);
				else {
					//console.log('ds18b20 driver is loaded');
					ds18b20helper.isDriverLoaded = true;

					ds18b20helper.ds18x20.list(function(err, listOfDeviceIds) {
						//console.log("device list", listOfDeviceIds);
						ds18b20helper.listOfDeviceIds = listOfDeviceIds;
					});
				}

			});
		} else {
			//console.log('driver is loaded');
			ds18b20helper.isDriverLoaded = true;

			ds18b20helper.ds18x20.list(function(err, listOfDeviceIds) {
				//console.log("device list", listOfDeviceIds);
				ds18b20helper.listOfDeviceIds = listOfDeviceIds;
			});
		}
	});
}

ds18b20helper.prototype.getWaterTemp = function(deviceId) {
	var ds18b20helper = this;
	if (ds18b20helper.isDriverLoaded) {
		return ds18b20helper.ds18x20.getAsync(deviceId)
			.then(function(tempC) {
				tempF = tempC * 1.8 + 32;
				return tempF;
			})
			.catch(function(err) {
				console.log(err);
			});
	}
};

module.exports = function() {
	var instance = new ds18b20helper();
	return instance;
};