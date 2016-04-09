/**
 * Definition of plotlyHelper. 
 * plotlyHelper provides a function to easily plot data on plotly.
 * @author Felix Galindo
 */

function plotlyHelper() {
	var plotlyHelper = this;
	console.log("Setting up plotly");
	var options = require("../config/")();
	plotlyHelper.userName = options.plotlyUsername;
	plotlyHelper.apiKey = options.plotlyApiKey;
	plotlyHelper.plotly = require('plotly')(plotlyHelper.userName, plotlyHelper.apiKey);
	plotlyHelper.moment = require("moment");
}

// const defaultGraphOptions = {
// 	filename: "filename",
// 	fileopt: "extend",
// 	layout: {
// 		title: "Plot Title",
// 		xaxis: {
// 			title: "x Axis",
// 			titlefont: {
// 				family: "Courier New, monospace",
// 				size: 18,
// 				color: "#7f7f7f"
// 			},
// 			tickfont: {
// 				size: 8
// 			},
// 		},
// 		yaxis: {
// 			title: "y Axis",
// 			titlefont: {
// 				family: "Courier New, monospace",
// 				size: 18,
// 				color: "#7f7f7f"
// 			},
// 			tickfont: {
// 				size: 8
// 			},
// 		}
// 	}
// }

const defaultGraphOptions = {
	filename: "filename",
	fileopt: "extend",
	layout: {
		autosize: true,
		yaxis: {
			tickfont: {
				size: 8
			},
			showticklabels: true,
			tickmode: "auto",
			title: "°F",
			tickangle: 0,
			ticks: "",
			dtick: 10,
			range: [-0.11111111111111112,
				2.111111111111111
			],
			titlefont: {
				color: "#7f7f7f",
				family: "Courier New, monospace",
				size: 18
			},
			nticks: 6,
			type: "category",
			autorange: true,
			rangemode: "normal",
			fixedrange: false
		},
		plot_bgcolor: "rgb(217, 217, 217)",
		title: "Water Temp Set Point",
		height: 480,
		width: 1036,
		xaxis: {
			tickfont: {
				size: 8
			},
			showticklabels: true,
			tickmode: "auto",
			title: "Date",
			tickangle: 0,
			ticks: "",
			dtick: 10,
			range: [
				0,
				298
			],
			titlefont: {
				color: "#7f7f7f",
				family: "Courier New, monospace",
				size: 18
			},
			nticks: 6,
			type: "category",
			autorange: true,
			rangemode: "normal",
			fixedrange: false
		}
	}
}

//Plots value on the specified graph name on plotly
plotlyHelper.prototype.plotData = function(filename, value) {
	var plotlyHelper = this;
	var today = plotlyHelper.moment().format("YYYY-MM-DD hh:mm:ss A").toString();
	var data = [{
		x: [today],
		y: [value],
		type: "scatter"
	}];

	var graphOptions = defaultGraphOptions;
	graphOptions.filename = filename;
	graphOptions.layout.title = filename;

	switch (filename) {
		case "Liquid Level":
			graphOptions.layout.yaxis.title = "Inches";
			graphOptions.layout.xaxis.title = "Date";
			break;
		case "Liquid Heater Status":
			graphOptions.layout.yaxis.title = "Status";
			graphOptions.layout.xaxis.title = "Date";
			break;
		case "Liquid Temperature":
		case "Liquid Temp Set Point":
			graphOptions.layout.yaxis.title = "°F";
			graphOptions.layout.xaxis.title = "Date";
			break;
		default:
			break;

	}
	//console.log("plotting to graph with options \r\n", graphOptions, "\r\nand data", data);
	plotlyHelper.plotly.plot(data, graphOptions, function(err, msg) {
		console.log('Plotting',filename);
		if (err) {
			console.log(err);
		}
		//console.log(msg);
	});
};

module.exports = function() {
	var instance = new plotlyHelper();
	return instance;
};