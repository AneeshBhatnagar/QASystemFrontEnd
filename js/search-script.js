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

/*Read JSON File*/
$.ajax({
		  'url': 'http://192.168.1.233:8888/getResults?query=%22who%20is%20the%20PM?%22',
		  'data': {},
		  'success': callOnSuccess,
		  'dataType': 'jsonp',
		  'jsonp': 'callback'
		});

function callOnSuccess(data){
	$("#search-answer").html(data.answer);
	$("#result-count").html(data.tweet_count);
	createWordCloud(data.wordcloud);
	createChartForHashtags(data.hashtags.labels, data.hashtags.count);
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

/* Displaying WordCloud */
function createWordCloud(words){
	$('#word-cloud-area').jQCloud(words);
}

function parseJsonData(data){
	$("#search-answer").html(data.answer);
	$("#result-count").html(data.tweet_count);
	var hashtag_count = data.hashtag_counts.split(",");
	for(var i=0; i<hashtag_count.length; i++) { hashtag_count[i] = parseInt(hashtag_count[i], 10); } 
	createChartForHashtags(data.hashtag_labels.split(","), hashtag_count);
		
}