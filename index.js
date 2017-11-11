$( document ).ready(function() {

  // $('body').load('./test.html');

	$(".title").click(function() {
  		$('#myModal').modal('show');
      $(".modal-title").empty();
      $(".modal-title").append($(this).text());
	});

	$(".img-preview").click(function() {
  		$('#myModal').modal('toggle');
	});


  $("nav li").click(function() {
    $("nav li").removeClass('navCurrent');
    $(this).addClass('navCurrent');
  });


	//---------tabs ----------------------------
  $('ul.navbar-nav li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').hide();

    $(this).addClass('current');
    $("#"+tab_id).show();
  })

  //-------------ajax---------------------------------
  $.ajax( 
  {
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: "http://content.guardianapis.com/search?section=world&api-key=a4f92163-c44e-49ca-b122-c72594c02b28",
      success: function(data) 
      {
        
          $("#mainTitle").append("<a href='#''>" + data.response.results[0].webTitle + "</a>");
          
        for (var i = 0; i < 4; i++)
        {
          $("#title" + i).append("<a href='#''>" + data.response.results[i].webTitle + "</a>");
        }
        
      }
  })
});


  function populate(){
  	$('body').load('test.html');
  }