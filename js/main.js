/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	// /* local validation */
	// $('#contactForm').validate({

	// 	/* submit via ajax */
	// 	submitHandler: function(form) {

	// 		var sLoader = $('#submit-loader');

	// 		$.ajax({      	

	// 	      type: "POST",
	// 	      url: "inc/sendEmail.php",
	// 	      data: $(form).serialize(),
	// 	      beforeSend: function() { 

	// 	      	sLoader.fadeIn(); 

	// 	      },
	// 	      success: function(msg) {

	//             // Message was sent
	//             if (msg == 'OK') {
	//             	sLoader.fadeOut(); 
	//                $('#message-warning').hide();
	//                $('#contactForm').fadeOut();
	//                $('#message-success').fadeIn();   
	//             }
	//             // There was an error
	//             else {
	//             	sLoader.fadeOut(); 
	//                $('#message-warning').html(msg);
	// 	            $('#message-warning').fadeIn();
	//             }

	// 	      },
	// 	      error: function() {

	// 	      	sLoader.fadeOut(); 
	// 	      	$('#message-warning').html("Something went wrong. Please try again.");
	// 	         $('#message-warning').fadeIn();

	// 	      }

	//       });     		
  	// 	}

	// });


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);

//name validation
function validateName(){
	var namevalue=$('#contactName').val()
	var letters = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
	if(namevalue==""){
		$("#username").html("Required field")
		return false
	}
	else if(namevalue==" "){
		$('#username').html("Do not enter space as first character")
		return false
	}
	// else if((namevalue.length < 3)|| (namevalue.length > 10))
	// {
	//      $('#username').html("**length of username must be between 3 and 10");
	//      return false;
	
	// }
	else if(namevalue.match(letters)){
		$('#username').html("")
		return true
	}
	else{
		$('#username').html("Please enter a valid name")
		return false
	}
	}

//emailvalidation
function validateEmail(){
	var emailvalue=$('#contactEmail').val()
	var mail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
	
	if(emailvalue==""){
		$('#useremail').html("Required field")
		return false
	} 
	else if(emailvalue==" "){
		$('#useremail').html("Donot enter space in this field")
		return false
	}
	else if(emailvalue.match(mail)){
		$('#useremail').html("")
		return true
	}else{
		$('#useremail').html("Please enter a valid email id")
		return false
	}
	
}

//mobileNumber validation 
function validateNumber(){
	var numvalue=$('#contactNumber').val()
	var numbers=/^[0-9]*$/
	if(numvalue==""){
		$('#usernumber').html("Required field")
		return false
	}
	else if(numvalue==" "){
		$('#usernumber').html("Please donot enter space in this field")
		return false
	}
	else if(numvalue.match(numbers) && numvalue.length<10)
    {
		$('#usernumber').html("Please enter 10 digit number")
        return false
    }
	else if(numvalue.match(numbers) && numvalue.length==10 )
    {
        $('#usernumber').html("")
        return true
    }
	else{
		$('#usernumber').html("Please enter a valid number")
		return false
	}
	
}

//messagevalidation

function validateMessage(){
	var char=$("#contactMessage").val()
    if(char=="")
    {
        $('#usermessage').html("Required field")
        return false
    }
    else if(char.length<10)
    {
        $('#usermessage').html("Please enter minimum 10 characters")
        return false
    }
    else{
        $('#usermessage').html("")
        return true
    }
}

//form validation
$(document).ready(function () {
$('#contactName').keyup(function(){
	validateName();
});
$('#contactEmail').keyup(function(){
	validateEmail();
});
$('#contactNumber').keyup(function(){
	validateNumber();
});
$('#contactMessage').keyup(function(){
	validateMessage();
});



});

