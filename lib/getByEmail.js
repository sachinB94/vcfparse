exports.anyMatch = function (contactList,email,callback) {
	email = email.substring(0,email.indexOf('@'));
	email = email.toLowerCase();
	console.log('email = ' + email);
	var contactByEmail = [];

	for (var i=0 ; i<contactList.length ; ++i) {
		var currentEmail = contactList[i].EMAIL.toLowerCase();
		currentEmail = currentEmail.substring(0,currentEmail.indexOf('@'));
		console.log('currentEmail = ' + currentEmail);
		if (currentEmail.indexOf(email) != -1) {
			contactByEmail.push(contactList[i]);
		}
	}
	callback(contactByEmail);
}

exports.perfectMatch = function (contactList,email,callback) {
	email = email.toLowerCase();
	var contactByEmail = [];

	for (var i=0 ; i<contactList.length ; ++i) {
		var currentEmail = contactList[i].EMAIL.toLowerCase();
		if (currentEmail === email) {
			contactByEmail.push(contactList[i]);
		}
	}
	callback(contactByEmail);
}