

var cardLoad = 0;
var bgColor = 256;

$( document ).ready(function() {




//press
$( ".bubble" ).click(function() {
  cardLoad =  $(this).attr('class').split(' ')[1];

  $(".container").tween({
  		transform:{
		    start: 'translateX(0px) translateY( 100px ) rotateZ( 0deg )',
		    stop: 'translateX(-100px) translateY( -550px ) rotateZ( -20deg )',
		    time: 0,
		    duration: 0.5,
		    effect:'quintInOut',
		    	 onStop: function( elem ) {
		        console.log(cardLoad);
						$('.ft').css("background-image", "url(img/" + cardLoad + ".png)");
						$('.container').css("opacity", "0");


							$(".container").tween({
							  		transform:{
									    start: 'translateX(200px) translateY( 200px ) rotateZ( 45deg )',
									    stop: 'translateX(0px) translateY( 100px ) rotateZ( 0deg )',
									    time: 0,
									    duration: 1.3,
									    effect:'elasticOut'
									    },

										 opacity:{
										    start: 0,
										    stop: 100,
										    time: 0,
										    duration: 1,
										    effect:'easeOut',
										  }

							});


			   	}
		  }
  });
	$.play();


});
//end press



	//start appear function on page ready
	appear();

	$( ".fadein" ).click(function() {
	  ojoo = 0;
	  disappear();
	});

	$( ".tag" ).click(function() {
	  ojoo = 0;
	  appear();
	});
});


//variables
var ojoo = 0;
var totalitems = 6;
var appearspeed = 1.7;

//function appear executes function onStop as long as ojoo < total items
function appear(){
	$( '.fadin:eq(' + ojoo +')' ).tween({
		  transform:{
		    start: 'translateY( 400px ) rotateY( -180deg )',
		    stop: 'translateY( 100px ) rotateY( 0deg )',
		    time: 0.5,
		    duration: appearspeed,
		    effect:'elasticOut',
		  },

		  opacity:{
		    start: 0,
		    stop: 100,
		    time: 0.5,
		    duration: appearspeed,
		    effect:'easeOut',
		      onStop: function( elem ) {
		        if (ojoo < totalitems){
			    	 	appear();
			 			}
			   	}
		  }
});

//insert sequential tweens

	ojoo = ojoo + 1;
	console.log(ojoo);
//play all the tweens
	$.play();
}



function disappear(){
	$( '.roundimageclip:eq(' + ojoo +')' ).tween({
	  transform:{
	    start: 'scale( 1 )',
	    stop: 'scale( 0 )',
	    time: 0,
	    duration: 1,
	    effect:'easeOut',
	   },

	  opacity:{
	    start: 100,
	    stop: 0,
	    time: 0,
	    duration: appearspeed,
	    effect:'easeOut',
	      onStop: function( elem ) {
	        if (ojoo < totalitems){
		    		disappear();
		 			}
		   	}
	  }
});

// insert sequential dissappear tweens

ojoo = ojoo + 1;
console.log(ojoo);

$.play();

}
