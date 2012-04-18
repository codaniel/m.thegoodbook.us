/* start init */
/* Here I set default page transition and I set the fallback transition to none */
$(document).bind('mobileinit', function(){
	$.mobile.defaultPageTransition = 'slide';
	$.mobile.transitionFallbacks.slide = "none";	
});
$(document).on('pageinit','[data-role=page]', function(){
	$('[data-position=fixed]').fixedtoolbar({ tapToggle:false});
});
/* end init */
// newNote.php
$(document).on('pageinit','#newNote', function(){
	$('#submitNoteBtn').on('vclick',function(){
		var textAreaVal = $('#noteTextArea').val();
		var returnedId = $('body').data('verseId');
		verseDataObj.note[returnedId] = textAreaVal;
		updLocSto();
		$('#'+returnedId).addClass('ui-btn-icon-right ui-li');
		$('#'+returnedId).append('<a href="#note'+ returnedId +'"><span class="ui-icon ui-icon-custom-note ui-icon-shadow tgb-icon-right"></span><a>');
		$('body').append('<div data-role="page" id=note' + returnedId + '><div data-role="header"><h1>Note</h1></div><div data-role="content">' + textAreaVal + '</div></div>');
		window.history.back();
	});
});
// index.php
$(document).on('pageinit','#navigation', function(){
	$('#bookmarks').on('vclick','.bookmark', function(){
		var scroll_to_data = $(this).data('scrollto');
		sessionStorage.scrollto = scroll_to_data;
	});
	if(verseDataObj.bookmark){
		jQuery.each(verseDataObj.bookmark, function() {
		  $('#bookmarks').append('<li><a href="'+ this.path +'" class="bookmark" data-scrollto="'+ this.id +'">'+ this.title +'</a></li>');
		});
		$('#bookmarks').listview('refresh');	
	}
});
// this scrollto code has to be called at pageshow for some reason
$(document).on('pageshow','.chapter', function(){
	if(sessionStorage.scrollto){
		var scroll_to = sessionStorage.scrollto;
		$('html,body').animate({scrollTop: $("#"+scroll_to).offset().top},'slow',function(){
			$('#'+scroll_to).effect('highlight',{color:'#fff2a8'},1500);
		});
		sessionStorage.clear();			
	}
	return path = window.location.pathname // this is used for bookmarks
});
$(document).on('pageinit','.chapter',function(event){
	
	// touch events
	$(document).on('taphold', '[data-role=page]', function(){
		$('[data-position=fixed]').fixedtoolbar('toggle');
	});
	// end touch events
	$('.verse').on('vclick',function(){
		var id = $(this).attr('id');
		
		switch (action){
		
		case 'blue':
		case 'pink':
		case 'yellow':
			verseDataObj.highlight[id] = action;
			updLocSto();
			$(this).removeClass('blue pink yellow').addClass(action);
			break;					
		case 'delHlight':
			delete verseDataObj.highlight[id];
			updLocSto();
			$(this).removeClass('blue pink yellow').addClass(action);
			break;
		case 'addNote':			
			$('body').data('verseId',id);
			
			if($(this).is('.ui-btn-icon-right')){
				$.mobile.loadPage('/newNote.php');
				noteValue = verseDataObj.note[id];
				$('#noteTextArea').val(noteValue);			
			}
			$.mobile.changePage('/newNote.php');	
			break;
		case 'delNote':
			delete verseDataObj.note[id];
			updLocSto();
			break;
		case 'addBmark':
			var verseTitle = $(this).data('verse-title');
			verseDataObj.bookmark.push({"id": id , "path" : path, "title": verseTitle});
			updLocSto();
			alert('Bookmark added to your navigation page.');
			break;
		case 'delBmark':
			delete verseDataObj.bookmark[id];
			updLocSto();
			break;
		default: console.log(" Your action variable wasn't found ");
		}								
	});
	$('.verse').each(function(i){
		current_id = $(this).attr('id');
		color = verseDataObj.highlight[current_id];
		note = verseDataObj.note[current_id];
		if (color){ 
			$(this).children('.innerVerse').addClass(color);
		}
		if (note){
			$(this).append('<a href="#note'+ current_id +'"><span class="ui-icon ui-icon-custom-note ui-icon-shadow tgb-icon-right"></span></a>');
			$('body').append('<div data-role="page" id=note' + current_id + '><div data-role="header"><h1>Note</h1></div><div data-role="content">' + note + '</div></div>');
		}
	});
	// select menus	
	$(document).on('change','.ui-page-active .hlightSel',function(){
		action = $('.ui-page-active .hlightSel').val();
		$('.ui-page-active #hlightSel-button').removeClass('blue pink yellow').addClass(action);
		return action;
	});
	$(document).on('vclick', '.ui-page-active .addNoteBtn',function(){
		return action = 'addNote';				
	});
	$('.addBmarkBtn').on('vclick',function(){
		return action = 'addBmark';
	});	
});
// functions
function updLocSto(){
	stringifiedVerseDataObj = JSON.stringify(verseDataObj);
	localStorage.verseData = stringifiedVerseDataObj;
}
// retrieve local storage if it exists
if(localStorage.verseData){
	var retrievedVerseData = localStorage.getItem('verseData');
	var verseDataObj = JSON.parse(retrievedVerseData);
} else {
	var verseDataObj = { "note":{},"highlight":{}, "bookmark":[] };
}
