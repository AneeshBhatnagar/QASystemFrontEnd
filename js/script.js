$(document).ready(function(){
	var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];

	$("#searchbar").autocomplete({
      source: availableTags,
      minLength: 3,
      select: function(event,ui){
      	console.log(ui.item.label);
      }
    });
});

