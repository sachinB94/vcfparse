exports.getVersion21 = function (bufferString,callback) {
	var escape = require('./escape.js').escape;
	var escapeTEL = require('./escape.js').escapeTEL;
	var beginVcard;
	var endVcard = 0;
	var contactString;
	var N;
	var FN;
	var ORG;
	var TITLE;
	var TYPE;
	var PHOTO;
	var EMAIL;
	var contactList = new Array();
	var contactItem;

	while ((beginVcard = bufferString.indexOf('BEGIN:VCARD', endVcard)) != -1) {
		endVcard = bufferString.indexOf('END:VCARD', beginVcard);
		contactString = bufferString.substring(beginVcard,endVcard);
		contactString = contactString.split('\n');

		contactItem = {
			N: '',
			FN: '',
			ORG: '',
			TITLE: '',
			PHOTO: {
				TYPE: '',
				PHOTO: ''
			},
			TEL: [],
			ADR: [],
			EMAIL: ''
		};
		
		for (var i=0 ; i<contactString.length ; ++i) {
			if (contactString[i].substr(0,1) === 'N') {
				N = contactString[i].substring(2, contactString[i].length-1);
				N = escape(N);
				contactItem['N'] = N;
			}

			if (contactString[i].substr(0,2) === 'FN') {
				FN = contactString[i].substring(3, contactString[i].length-1);
				contactItem['FN'] = FN;
			}

			if (contactString[i].substr(0,3) === 'ORG') {
				ORG = contactString[i].substring(4, contactString[i].length-1);
				contactItem['ORG'] = ORG;
			}

			if (contactString[i].substr(0,5) === 'TITLE') {
				TITLE = contactString[i].substring(6, contactString[i].length-1);
				contactItem['TITLE'] = TITLE;
			}

			if (contactString[i].substr(0,5) === 'PHOTO') {
				TYPE = contactString[i].substring(contactString[i].indexOf('TYPE')+5 , contactString[i].indexOf(':',contactString[i].indexOf('TYPE')));
				PHOTO = contactString[i].substring(contactString[i].indexOf(':')+1 , contactString[i].length-1);
				subContact = {
					'TYPE': TYPE,
					'PHOTO': PHOTO
				};
				contactItem['PHOTO'] = subContact;
			}

			if (contactString[i].substr(0,3) === 'TEL') {
				TYPE = contactString[i].substring(4, contactString[i].indexOf(':',4));
				TYPE = TYPE.split(';');
				TEL = contactString[i].substring(contactString[i].lastIndexOf(':')+1, contactString[i].length-1);
				TEL = escapeTEL(TEL);
				subContact = {
					'TYPE': TYPE,
					'TEL': TEL
				};
				contactItem['TEL'].push(subContact);
			}

			if (contactString[i].substr(0,5) === 'LABEL') {
				TYPE = contactString[i].substring(6, contactString[i].indexOf(';',6));
				ADR = contactString[i].substring(contactString[i].lastIndexOf(':')+1, contactString[i].length-1);
				console.log('TYPE = ' + TYPE);
				ADR = escape(ADR);
				subContact = {
					'TYPE': TYPE,
					'ADR': ADR
				};
				contactItem['ADR'].push(subContact);
			}

			if (contactString[i].substr(0,5) === 'EMAIL') {
				EMAIL = contactString[i].substring(contactString[i].lastIndexOf(':')+1, contactString[i].length-1);
				contactItem['EMAIL'] = EMAIL;
			}
		}

		contactList.push(contactItem);

	}	

	callback(contactList);
}