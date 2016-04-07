//Options
//Modify to your liking

const minute = 60 * 1000;
const options = {
	tempSetPoint: 70,
	graphingEnabled: 1,
	sampleRate: minute/4, //sample rate
	graphRate: minute, //graphing rate
	relayGpioNum: 29, //Gpio # where heater control relay is wired
	plotlyUsername: 'felixgalindo91',
	plotlyApiKey: '54wtcm6ncf',
	relayOnDelay: 3 * minute, //Wait time before turning relay on again from the last time it was turned on
	ds18b20Id: '28-80000003a557'
};

module.exports = function() {
	return options;
};
