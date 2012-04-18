/*var verseDataObj = { // sample JSON
	"note": { "1":"This is a note for verse 1.", "3":"Verse 3 has a note also.", "4":"I also wrote a sample note for verse 4." },
	"highlight":{ "3":"blue", "4":"blue", "6":"yellow" }
};*/

function updLocSto(){
	stringifiedVerseDataObj = JSON.stringify(verseDataObj);
	localStorage.verseData = stringifiedVerseDataObj;
}
if(localStorage.verseData){
	var retrievedVerseData = localStorage.getItem('verseData');
	var verseDataObj = JSON.parse(retrievedVerseData);
} else {
	var verseDataObj = { "note":{},"highlight":{}, "bookmark":{} };
}
var current_path = location.pathname;
$(function(){
	$('[data-position="fixed"]').fixedtoolbar({ tapToggle:false});//, hideDuringFocus: "textarea"
	
	$('#submitNoteBtn').click(function(){
		noteTextAreaVal = $('#noteTextArea').val();
		verseDataObj.note[verseId] = noteTextAreaVal;
		updLocSto();
		$('#'+verseId).addClass('ui-btn-icon-right ui-li');
		$('#'+verseId).append('<a href="#note'+ returnedId +'"><span class="ui-icon ui-icon-custom-note ui-icon-shadow" ></span><a>');
		$('body').append('<div data-role="page" id=note' + returnedId + '><div data-role="header"><h1>Note</h1></div><div data-role="content">' + noteTextAreaVal + '</div></div>');
	});
	$('.verse').click(function(){
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
			if($(this).is('.ui-btn-icon-right')){
				alert('There is already a note for this verse');
			}else{				
				
				return(id);
				$.mobile.changePage('newNote.php');										
			}
			break;
		case 'delNote':
			delete verseDataObj.note[id];
			updLocSto();
			break;
		case 'addBmark':
			verseDataObj.bookmark[id] = current_path;
			updLocSto();
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
			$(this).addClass(color);
		}
		if (note){
			$(this).addClass('ui-btn-icon-right ui-li');
			$(this).append('<a href="#note'+ current_id +'"><span class="ui-icon ui-icon-custom-note ui-icon-shadow" ></span><a>');
			$('body').append('<div data-role="page" id=note' + current_id + '><div data-role="header"><h1>Note</h1></div><div data-role="content">' + note + '</div></div>');
		}
	});
	$('#noteSel').bind('change',function(){
		return action = $('#noteSel').val();				
	});
	$('#hlightSel').bind('change',function(){
		action = $('#hlightSel').val();
		$('#hlightSel-button').removeClass('blue pink yellow').addClass(action);
		return action;
	});
	$('#bmarkSel').bind('change',function(){
		action = $('#bmarkSel').val();
		return action;
	});
	
});