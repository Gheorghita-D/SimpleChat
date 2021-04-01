
const visionEndpoint = "https://us-central1-simplechat-308917.cloudfunctions.net/images";
const usersApiEndpoint = "https://europe-west1-simplechat-308917.cloudfunctions.net/users";

async function getAllMembers(){

	return new Promise(function (resolve, reject) {
		$.get(usersApiEndpoint).done(resolve).fail(reject);
	  });
}

async function setMembers(){

	let allMembers = await getAllMembers().then((res) => {
		return res.results;
	});

	let htmlCode = ``;

	let currentUserId = $('#currentId').val();

	for(member of allMembers){
		if(currentUserId != member.id){
			htmlCode += `<div class="member" onclick="setConversation(${member.id},'${member.username}')">${member.username}</div>`;
		}
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