$(document).ready(function(){

  $.ajax({
    'url': "http://35.166.31.35:8888/getAutoComplete",
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
});


function validateForm(){
  var val = $("#searchbar").val();
  if( val == '' || val == ' ' || val == null){
    alert("Please enter a question.")
    return false;
  }
  return true;
}
