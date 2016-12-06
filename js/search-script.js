
var labels = ["#Demonetization", "#NoteBandi", "#PMModi", "#AbKiBaarModiSarkaar", "#KejriwalRules", "#IndianCurrency"];
var count = [65, 59, 80, 81, 56, 35];
var words = [
		  {text: "Lorem", weight: 13},
		  {text: "Ipsum", weight: 10.5},
		  {text: "Dolor", weight: 9.4},
		  {text: "Sit", weight: 8},
		  {text: "Amet", weight: 6.2},
		  {text: "Aneesh", weight: 5},
		  {text: "Testing", weight: 5},
		  {text: "SHIT", weight: 4}
		];
createChartForHashtags(labels,count);
createWordCloud(words);
/* Displaying Analysis Chart */
function createChartForHashtags(labelNames, labelCount){
	var data = {
		labels: labelNames,
		datasets: [
		{
			label: "Occurance of Hashtags",
			fill: false,
			lineTension: 0.1,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: "rgba(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(75,192,192,1)",
			pointHoverBorderColor: "rgba(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: labelCount,
			spanGaps: false,
		}]
	};
	var canvas = document.getElementById('hashtags-chart').getContext('2d');
	new Chart(canvas, {
		type: 'line',
		data: data,
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

/* Displaying WordCloud */
function createWordCloud(words){
	$('#word-cloud-area').jQCloud(words);
}