exports.anyMatch = function (contactList,name,callback) {
	name = name.toLowerCase().split(' ');
	var contactByName = [];

	for (var i=0 ; i<contactList.length ; ++i) {
		var currentName = contactList[i].FN.toLowerCase();
		for (var j=0 ; j<name.length ; ++j) {
			if (currentName.indexOf(name[j]) != -1) {
				contactByName.push(contactList[i]);
				break;
			}
		}
	}
	callback(contactByName);
}

exports.perfectMatch = function (contactList,name,callback) {
	name = name.toLowerCase();
	var contactByName = [];

	for (var i=0 ; i<contactList.length ; ++i) {
		var currentName = contactList[i].FN.toLowerCase();
		if (currentName === name) {
			contactByName.push(contactList[i]);
		}
	}
	callback(contactByName);
}