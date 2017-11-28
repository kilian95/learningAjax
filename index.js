$( document ).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();  //tooltip for search

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

  //show loading gif untill ajax completes
  $(document).ajaxStart(function() {
    $('#ajax-loader').show(); 
  }).ajaxStop(function() {
    $('#ajax-loader').hide();
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

    var i = 0;
    //get category and source of clicked items
    $('.table :checkbox:checked').each(function () {
      var category = $(this).parent().prevAll().eq(1).html();
      var source = $("#" + "sel" + this.id + " :selected").attr('id')
      
      $('#myNewsContent').append('<div class="container-fluid myNews" id="newsItems' + (i++) + '"><div class="row"><div class="col-sm-8"><h2>' + category + '</h2><h2 id="' + source + '" class="title"></h2><p id="' + source + '" class="desc"></p></div></div></div');
     
      $.ajax( 
        {
          type: "GET",
          dataType: "json",
          cache: false,
          url: "https://newsapi.org/v2/top-headlines?sources=" + source + "&apiKey=37666d41fc4e49f9acc12919662f769d",
          success: function(data) 
          {
            $("#" + source + ".title").html("<a href='" + data.articles[0 ].url + "'  target='_blank'>" + data.articles[0].title + "</a>");
            $("#" + source + ".desc").html(data.articles[0].description);
            $("#mainImg").html("<img class='mainImg' src='"+ data.articles[0].urlToImage + "' width='100%'>");
          }
        }) 
     });
    $('#myNewsTitle').show(); //show edit button   
  });

  //click and drag categories
  $("#myNewsContent").sortable();

  $("#myNewsContent").disableSelection();
  
  
  //---------tabs ----------------------------
  $(".tab-link").click(function(){
    var tab_id = $(this).attr('data-tab');
    var apiUrl;
    
    switch(tab_id) {
      case "tab-1"://home
        apiUrl = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
        break;
      case "tab-2"://world
       apiUrl = "https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d";
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

  //populate home
  populate("https://newsapi.org/v1/articles?source=bbc-news&sortBy=latest&apiKey=37666d41fc4e49f9acc12919662f769d");
  
  //most popular
  populateMostPopular();
    
});

function populateSearch(input){
  $("#tab-1").hide();
  $("#tab-2").hide();
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
      
      for (var i = 0; i < 10; i++)
      {
        if (i < 5)
        {
          $("#searchResults").append("<article><div class='row'><div class='col-sm-4'><img class='pull-right' src='" + 
          data.articles[i].urlToImage + "' height='100px'></div><div class='col-sm-6'><h3><a href='" + 
          data.articles[i].url + "' target='_blank'>" + data.articles[i].title + "</a></h3><div class='row'><p>" + 
          data.articles[i].description + "</p></div</div></div></article>");
        }
        else if (i >= 5)
        {
          $("#searchResults").append("<div class='showMore'><article><div class='row'><div class='col-sm-4'><img class='pull-right' src='" + 
          data.articles[i].urlToImage + "' height='100px'></div><div class='col-sm-6'><h3><a href='" + 
          data.articles[i].url + "' target='_blank'>" + data.articles[i].title + "</a></h3><div class='row'><p>" + 
          data.articles[i].description + "</p></div</div></div></article></div>");
        }
      }
      $("#searchResults").append("<h4 id='more'> Show more </h4>")
    }
  })
}

//on click is used as btn is dynamically added.
$(function() {
  $("#searchResults").on( "click", "#more", function() {
    $(".showMore").css("display", "block");
    $("#more").hide();
  });
});


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
        $("#img" + i).html("<img class='img-preview' src='"+ data.articles[i].urlToImage + "' width='100%'>");        
      }
    }
  })
}

function populateMostPopular(){
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
}

function populateMyNews(){
  $("#tab-1").hide();
  $("#tab-2").show();
}