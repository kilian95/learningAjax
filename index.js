$( document ).ready(function() {
	$(".title").click(function() {
  		$('#myModal').modal('show');
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

});

  function populateNews(category){
  	alert("test");
  }