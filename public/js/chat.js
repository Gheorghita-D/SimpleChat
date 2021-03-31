
const visionEndpoint = "https://us-central1-simplechat-308917.cloudfunctions.net/images";

var members = {members : [{id:"1", name:'John Doe'},{id:"2", name:'Michael Daniel'}, {id:"3", name:'Roger Tod'}]};

async function getAllMembers(){
	return members;
}

async function setMembers(){

	let allMembers = await getAllMembers().then((res) => {
		return res;
	});

	let htmlCode = ``;

	for(member of allMembers.members){
		htmlCode += `<div class="member" onclick="setConversation(${member.id},'${member.name}')">${member.name}</div>`;
	}

	$('#members').html(htmlCode);
}

function setConversation(memberId, memberName){
	$('#leftSide').css('visibility', 'visible');
	$('#name').text(memberName);
}

function openImagesKeyboard(){
	$('#imagesPanel').show();
}

function searchImages(){
	var string = $('#imageSearch').val();

	$('#loadingGif').show();
	$('#imageResults').hide();

	$.get( `${visionEndpoint}?label=${string}`, ( data ) => {

		var images = data.results;

		if(images.length > 0){

			let output = ``;

			for(image of images){

				output += `<img class="search-results-img" src="${image}" onclick="sendImg(this.src)">`;
			}

			$('#imageResults').html(output);
		}else{

			$('#imageResults').html('');
		}

		$('#loadingGif').hide();
		$('#imageResults').show();

	  });
}

$('#imageSearch').keyup(searchImages);

$('#send_img').click(openImagesKeyboard);

setMembers();

$(document).mouseup((e) => {
    var container = $("#imagesPanel");

    if(!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    }
});