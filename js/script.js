$(document).ready(function(){
	var availableTags = [
      "Who is the Prime Minister of India?",
      "Who is behind the Demonetization?",
      "When was Demonetization announced? ",
      "Who announced the Demonetization?",
      "Where was Demonetization announced?"
    ];

	$("#searchbar").autocomplete({
      source: availableTags,
      minLength: 2,
      select: function(event,ui){
      	console.log(ui.item.label);
      }
    });
});

