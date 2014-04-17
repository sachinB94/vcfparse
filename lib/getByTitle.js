exports.getByTitle = function (contactList,title,callback) {
	title = title.toLowerCase();
	var contactByTitle = [];

	for (var i=0 ; i<contactList.length ; ++i) {
		var currentTitle = contactList[i].TITLE.toLowerCase();
		if (currentTitle === title) {
			contactByTitle.push(contactList[i]);
		}
	}
	callback(contactByTitle);
}