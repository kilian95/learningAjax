$( document ).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();  //tooltip

  //display modal and text in modal
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

  $("nav li").click(function() {
    $("nav li").removeClass('navCurrent');
    $(this).addClass('navCurrent');
  });

  $("#searchbtn").click(function() {
    var input = $('#searchInput').val();
    $("#tab-1").hide();
    populateSearch(input);
  });

// ---------------------- modal for mynews -----------------------------

  $("#getStartedBtn").click(function() { 
    $('#customize').modal('show');
  });

  $("#editBtn").click(function() { 
    $('#customize').modal('show');
  });

  $(".list-group-item").click(function() {
    $(".list-group-item").removeClass('active');
    $(this).addClass('active'); 
  });

  
  $("#submit").click(function() {
    $('#customize').modal('hide');
    $('#getStarted').hide();
    $('#myNewsContent').empty();//delete what is currently displayed

    //get category and source of clicked items
    $('.table :checkbox:checked').each(function () {
      var category = $(this).parent().prevAll().eq(1).html();
      var source = $("#" + "sel" + this.id + " :selected").attr('id')
      
      $('#myNewsContent').append('<div class="container-fluid myNews" id="newsItems"><div class="row"><div class="col-sm-8"><h2>' + category + '</h2><h2 id="' + source + '" class="title"></h2><p id="' + source + '" class="desc"></p></div></div></div');
      $.ajax( 
        {
          type: "GET",
          dataType: "json",
          cache: false,
          url: "https://newsapi.org/v2/top-headlines?sources=" + source + "&apiKey=37666d41fc4e49f9acc12919662f769d",
          success: function(data) 
          {
            for (var i = 0; i < 2; i++){
              $("#" + source + ".title").html("<a href='" + data.articles[0 ].url + "'  target='_blank'>" + data.articles[0].title + "</a>");
              $("#" + source + ".desc").html(data.articles[0].description);
              $("#mainImg").html("<img class='mainImg' src='"+ data.articles[0].urlToImage + "' width='100%'>");
            }
          }
        }) 
     });
    $('#myNewsTitle').show(); //show edit button
  });

  //show loading gif untill ajax completes
  $(document).ajaxStart(function() {
    $('#ajax-loader').show(); 
  }).ajaxStop(function() {
    $('#ajax-loader').hide();
  });  
      
  //---------tabs ----------------------------
  $(".tab-link").click(function(){
    var tab_id = $(this).attr('data-tab');
    var apiUrl;
    
    switch(tab_id) {
      case "tab-1"://home
        apiUrl = "https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
      case "tab-2"://world
       apiUrl = "https://newsapi.org/v1/articles?source=der-tagesspiegel&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
      case "tab-3"://politics
        apiUrl = "https://newsapi.org/v1/articles?source=bbc-news&category=politics&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
      case "tab-4"://technology
        apiUrl = "https://newsapi.org/v1/articles?source=ars-technica&category=technology&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
      case "tab-5"://science
       apiUrl = "https://newsapi.org/v1/articles?source=national-geographic&category=science-and-nature&sortBy=top&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
      case "tab-6"://entertainment
        apiUrl = "https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
    }
      populate(apiUrl);
  })

  $(".myNews").click(function(){
    populateMyNews();
  })

//--------------------------------------------------------------------------------
  // populateMyNews();
  //populate home
  populate("https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d");
  
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
          $("#pImg" + i).append("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%'>");
          
        }
      }
    })
});

function populateSearch(input){
  $("#tab-1").hide();
  $("#searchResults").empty();
  $("#searchResults").css("display", "block");
  $.ajax( 
  {
    type: "GET",
    dataType: "json",
    cache: false,
    url: "https://newsapi.org/v2/everything?q=" + input + "&sources=bbc-news&apiKey=37666d41fc4e49f9acc12919662f769d",

    success: function(data) 
    {
      
      for (var i = 0; i < 5; i++)
      {
        $("#searchResults").append("<div class='box panel panel-default'><div id='searchImg'><img class='img-preview' src='"+ data.articles[i].urlToImage + "' height='100%'></div><h2 class='title'>" + data.articles[i].title + 
          "</h2><p id='desc'>" + data.articles[i].description + "</p><p><a href='" + data.articles[i].url + "'>" + data.articles[i].author + "</a></p></div>");
      }
    }
  })
}

function populate(apiUrl){
  $("#searchResults").hide();
  $("#tab-1").show();
  $("#tab-2").hide();
   $.ajax( 
  {
    type: "GET",
    dataType: "json",
    cache: false,
    url: apiUrl,
    success: function(data) 
    {
      $("#mainTitle").html("<a href='#''>" + data.articles[0].title + "</a>");
      $("#mainDesc").html(data.articles[0].description);
      $("#mainImg").html("<img class='mainImg' src='"+ data.articles[0].urlToImage + "' width='100%'>");
      
      for (var i = 1; i < 5; i++)
      {
        $("#title" + i).html("<a href='#''>" + data.articles[i].title + "</a>");
        $("#desc" + i).html(data.articles[i].description);
        $("#img" + i).html("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%'>");        }
    }
  })
}

function populateMyNews(){
  $("#tab-1").hide();
  $("#tab-2").show();
}