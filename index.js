$( document ).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();  

	$(".title").click(function() {
		$('#myModal').modal('show');
    $(".modal-title").empty().append($(this).text());

    if (this.id == "mainTitle"){
      $(".modal-desc").empty().append($("#mainDesc").text());
      var img = $(".mainImg").attr('src');
      $(".modal-image").empty().append("<img class='img-preview' src='"+ img + "' width='100%''>");
    }
    else{
      $(".modal-desc").empty().append($(this).next().text());
      var img = $(this).siblings(".imgtPrev").children(".img-preview").attr('src');
      $(".modal-image").empty().append("<img class='img-preview' src='"+ img + "' width='100%''>");
    }
	});

	$(".img-preview").click(function() {
  		$('#myModal').modal('toggle');
	});

  $("nav li").click(function() {
    $("nav li").removeClass('navCurrent');
    $(this).addClass('navCurrent');
  });

  $("#searchbtn").click(function() {
    var input = $('#searchInput').val();
    $("#tab-1").hide();
    populateSearch(input);
  });

	//---------tabs ----------------------------
  $('ul.navbar-nav li').click(function(){
    var tab_id = $(this).attr('data-tab');
    switch(tab_id) {
      case "tab-1":
          populateHome();
          break;
      case "tab-2":
           populateWorld();
          break;
      case "tab-3":
          //populatePolitics();
          break;
      case "tab-4":
          //populateTechnology();
          break;
      case "tab-5":
          //populateScience();
          break;
      case "tab-6":
          //populateEntertainment(); 
          break;    
      default:
         //populateEntertainment(); 
    }
  })

  //home
   $.ajax( 
    {
        type: "GET",
        dataType: "json",
        cache: false,
        url: "https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d",
        success: function(data) 
        {
          $("#mainTitle").html("<a href='#''>" + data.articles[0].title + "</a>");
          $("#mainDesc").html(data.articles[0].description);
          $("#mainImg").html("<img class='mainImg' src='"+ data.articles[0].urlToImage + "' width='100%''>");
          
          for (var i = 0; i < 4; i++)
          {
            $("#title" + i).html("<a href='#''>" + data.articles[i].title + "</a>");
            $("#desc" + i).html(data.articles[i].description);
            $("#img" + i).html("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%''>");
          }
        }
    })
  //most popular
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
            $("#pImg" + i).append("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%''>");
            
          }
        }
    })
});

function populateHome(){
  $("#searchResults").hide();
   $("#tab-1").show();
    $.ajax( 
  {
      type: "GET",
      dataType: "json",
      cache: false,
      url: "https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d",
      success: function(data) 
      {
        $("#mainTitle").html("<a href='#''>" + data.articles[0].title + "</a>");
        $("#mainDesc").html(data.articles[0].description);
        $("#mainImg").html("<img class='mainImg' src='"+ data.articles[0].urlToImage + "' width='100%''>");
        
        for (var i = 0; i < 4; i++)
        {
          $("#title" + i).html("<a href='#''>" + data.articles[i].title + "</a>");
          $("#desc" + i).html(data.articles[i].description);
          $("#article" + i).html("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%''>");
        }
      }
  })
}

function populateWorld(){
  $("#searchResults").hide();
  $("#tab-1").show();
   $.ajax( 
  {
      type: "GET",
      dataType: "json",
      cache: false,
      url: "https://newsapi.org/v1/articles?source=der-tagesspiegel&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d",
      success: function(data) 
      {
        $("#mainTitle").html("<a href='#''>" + data.articles[0].title + "</a>");
        $("#mainDesc").html(data.articles[0].description);
        $("#mainImg").html("<img class='mainImg' src='"+ data.articles[0].urlToImage + "' width='100%''>");
        
        for (var i = 0; i < 4; i++)
        {
          $("#title" + i).html("<a href='#''>" + data.articles[i].title + "</a>");
          $("#desc" + i).html(data.articles[i].description);
          $("#article" + i).html("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%''>");
        }
      }
  })
}


function populateSearch(input){
  $("#searchResults").empty();
  $("#searchResults").css("display", "block");
  $.ajax( 
  {
      type: "GET",
      dataType: "json",
      cache: false,
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + input + "&api-key=0bb02209eb014a849723a61d4455bb87",
      success: function(data) 
      {
        
        for (var i = 0; i < 5; i++)
        {
          $("#searchResults").append("<div class='box panel panel-default'><h2 class='title'>" + data.response.docs[i].headline.main + 
            "</h2><p id='desc'>" + data.response.docs[i].snippet + "</p><p><a href='" + data.response.docs[i].web_url + "'> New York Times source </a></p></div>");
           
        }
      }
  })
}