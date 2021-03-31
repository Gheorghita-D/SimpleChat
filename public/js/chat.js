
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

setMembers();