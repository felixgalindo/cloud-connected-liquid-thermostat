/**
 * Definition of liquidStat options object
 * @author Felix Galindo
 */

const minute = 60 * 1000;
const options = {
	tempSetPoint: 80, //Liquid temperature to maintain
	graphingEnabled: true, //Set to false if you don't want to graph 
	sampleRate: minute/2, //sample rate in mS
	graphRate: minute, //graphing rate in mS
	relayGpioNum: 29, //Gpio # where heater control relay is wired, switch to what yours is wired to
	plotlyUsername: 'felixgalindo91', //https://plot.ly/settings/api   , username
	plotlyApiKey: '54wtcm6ncf', //https://plot.ly/settings/api , apikey
	relayOnDelay: 3 * minute, //Wait time before turning relay on again from the last time it was turned on
	ds18b20Id: '28-80000003a557'
};

module.exports = function() {
	return options;
};
