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

  //-------------ajax gaurdian---------------------------------
 
  // $.ajax( 
  // {
  //     type: "GET",
  //     dataType: "jsonp",
  //     cache: false,
  //     url: "http://content.guardianapis.com/search?section=world&api-key=a4f92163-c44e-49ca-b122-c72594c02b28",
  //     success: function(data) 
  //     {
        
  //         $("#mainTitle").append("<a href='#''>" + data.response.results[0].webTitle + "</a>");
          
  //       for (var i = 0; i < 4; i++)
  //       {
  //         $("#title" + i).append("<a href='#''>" + data.response.results[i].webTitle + "</a>");
  //       }
        
  //     }
  // })



  //------------newsapi----------------------

  $.ajax( 
  {
      type: "GET",
      dataType: "json",
      cache: false,
      url: "https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d",
      success: function(data) 
      {
        $("#mainTitle").append("<a href='#''>" + data.articles[0].title + "</a>");
        $("#mainDesc").append(data.articles[0].description);
        $("#mainImg").append("<img class='img-preview' src='"+ data.articles[0].urlToImage + "' width='100%''>");
        
        for (var i = 0; i < 4; i++)
        {
          $("#title" + i).append("<a href='#''>" + data.articles[i].title + "</a>");
          $("#desc" + i).append(data.articles[i].description);
          $("#article" + i).prepend("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%''>");
        }
      }
  })

  $.ajax( 
  {
      type: "GET",
      dataType: "json",
      cache: false,
      url: "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=37666d41fc4e49f9acc12919662f769d",
      success: function(data) 
      {
       
        for (var i = 0; i < 2; i++)
        {
          $("#popularTitle" + i).append("<a href='#''>" + data.articles[i].title + "</a>");
          $("#popularDesc" + i).append(data.articles[i].description);
          $("#popular" + i).prepend("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%''>");
          
        }
      }
  })
});


  function populate(){
  	$('body').load('test.html');
  }

  //when tab changes:
  //1. Populate tab with template
  //2. Call function to populate tab with news articles using ajax.