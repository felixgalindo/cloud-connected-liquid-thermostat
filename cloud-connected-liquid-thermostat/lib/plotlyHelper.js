function plotlyHelper() {
	var plotlyHelper = this;
	console.log("Setting up plotly");
	plotlyHelper.plotly = require('plotly')('felixgalindo91', '54wtcm6ncf');
	plotlyHelper.moment = require("moment");
}

plotlyHelper.prototype.plotData = function(filename,value) {
	var plotlyHelper = this;
	var today = plotlyHelper.moment().format("YYYY-MM-DD hh:mm:ss A").toString();
	//console.log("today is ", today);
	var data = [{
		x: [today],
		y: [value],
		type: "scatter"
	}];
	var graphOptions = {
		filename: filename,
		fileopt: "extend"
	};
	plotlyHelper.plotly.plot(data, graphOptions, function(err, msg) {
		console.log(err,msg);
	});
};

module.exports = function() {
	var instance = new plotlyHelper();
	return instance;
};