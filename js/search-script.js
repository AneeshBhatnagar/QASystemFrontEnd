//Replace +, ? etc
var queryTerm = getURLParameter();

for(var i = 0; i<queryTerm.length; i++){
	queryTerm = queryTerm.replace("+", " ");	
	queryTerm = queryTerm.replace("%3F", "?");
	queryTerm = queryTerm.replace("%20", " ");
}

$("#search-term").html(queryTerm);
$("#searchbar").val(queryTerm);
$("#search-question").html(queryTerm);

var queryUrl = "http://35.162.43.82:8888/getResults?query=%22" + queryTerm + "%22";

/*Query Backend server for results*/
$.ajax({
		  'url': queryUrl,
		  'success': parseData,
		  'dataType': 'jsonp',
		  'jsonp': 'callback'
		});

function parseData(data){
	if(data.status == 'fail'){
		$("#search-answer").html(data.error);
		$("#result-count").html('0');
		$("#right-col").css("display", "none");
	}
	else{
		if(data.answer == '' || data.answer == ' '){
			$("#result-box").css('display','none');
		}
		$("#search-answer").html(data.answer);
		$("#result-count").html(data.tweet_count);
		createWordCloud(data.wordcloud);
		createChartForHashtags(data.hashtags.labels, data.hashtags.count);
		createSentimentChart(data.sentiment.labels,data.sentiment.count);
		var tweets = data.tweets;
		var profilePic, name, username, tweet, appendData;
		for(var i=0; i<tweets.length;i++){
			profilePic = tweets[i].displaypic[0];
			name = tweets[i].name[0];
			username = tweets[i].username[0];
			tweet = tweets[i].text;
			$("#tweets-row").append(returnAppendData(profilePic, name, username, tweet));
		}
	}
	$("#preloader").fadeOut();
	$.ajax({
	    'url': "http://35.162.43.82:8888/getAutoComplete",
	    'success': function(data){
	      $("#searchbar").autocomplete({
	        source: data.matches,
	        minLength: 2,
	        select: function(event,ui){
	          $("#searchbar").val(ui.item.label);
	          $("#question-form").submit();
	        }
	      });
	    },
	    'dataType': 'jsonp',
	    'jsonp': 'callback'
	});
	
}

function returnAppendData(pic, name, username, text){

	var appendData = '<div class="col-md-12"><div class="media"><div class="media-left media-middle pull-left"><a href="#"><img class="media-object" src="'+pic+'" alt="..." width="64px"></a></div><div class="media-body"><h4 class="media-heading">'+name+'</h4><h5 class="media-heading">'+username+'</h5><p>'+text+'</p></div></div></div><hr/>';
	return appendData;
}
//jsonV = JSON.parse(jsonData2);
//parseJsonData(jsonV);
//createChartForHashtags(labels,count);
//createWordCloud(words);
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

/* Displaying sentiment analysis chart */
function createSentimentChart(sentimentLabels, sentimentData){

	var colors = new Array();

	for(var i=0; i<sentimentLabels.length; i++){
		if(sentimentLabels[i] == 'Verypositive'){
			colors.push("#24730E");
		}
		else if(sentimentLabels[i] == 'Positive'){
			colors.push("#3DC418");
		}
		else if(sentimentLabels[i] == 'Neutral'){
			colors.push("#FFDD00");
		}
		else if(sentimentLabels[i] == 'Negative'){
			colors.push("#ff0000");
		}
		else if(sentimentLabels[i] == 'Verynegative'){
			colors.push("#B22222");
		}
	}

	var data = {
		labels: sentimentLabels,
		datasets: [
        {
            data: sentimentData,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
	};

	var canvas = document.getElementById('sentiment-chart').getContext('2d');
	new Chart(canvas,{
	    type: 'pie',
	    data: data
	});

}

function getURLParameter(){
	var urlVars = window.location.search.substring(1).split('&');
	for(var i = 0; i<urlVars.length; i++){
		var splitParams = urlVars[i].split("=");
		if (splitParams[0] == 'query'){
			return splitParams[1];
		}
	}
}

/* Displaying WordCloud */
function createWordCloud(words){
	$('#word-cloud-area').jQCloud(words);
}