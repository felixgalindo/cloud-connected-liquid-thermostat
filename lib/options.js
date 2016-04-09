/**
 * Definition of options object. 
 * Set options to your liking
 * @author Felix Galindo
 */

const minute = 60 * 1000
const options = {
	tempSetPoint: 70,
	graphingEnabled: 1,
	sampleRate: minute / 2, //sample every 30 secs
	graphRate: sampleRate * 2, //plot every 1 min
	relayGpioNum: 29, //Gpio # where heater control relay is wired
	plotlyUsername: 'yourusername',
	plotlyApiKey: 'yourapikey';
}

module.export = options;