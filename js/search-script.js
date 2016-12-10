/*var jsonData = '{"answer":"Narendra Modi","hashtag_counts":"10,20,15,35","hashtag_labels":"Aneesh,Testing,Blah,Blah","tweet_count":2,"tweets":[{"profile_pic_url":"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png","screen_name":"Aneesh Bhatnagar","tweet_text":"Hello there!","user_name":"SlashAneesh"},{"profile_pic_url":"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png","screen_name":"Aneesh Testing","tweet_text":"Hello therew2!","user_name":"SlashAnTs"}]}';
var jsonData2 = '{"answer":"Narendra Modi","hashtag_counts":"[10,20,15,35]","hashtag_labels":"[Aneesh,Testing,Blah,Blah]","tweet_count":2,"tweets":[{"profile_pic_url":"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png","screen_name":"Aneesh Bhatnagar","tweet_text":"Hello there!","user_name":"SlashAneesh"},{"profile_pic_url":"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png","screen_name":"Aneesh Testing","tweet_text":"Hello therew2!","user_name":"SlashAnTs"}],"wordcloud":[{"text":"Aneesh","weight":5},{"text":"Bhatnagar","weight":7},{"text":"Test","weight":10}]}';
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
*/

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