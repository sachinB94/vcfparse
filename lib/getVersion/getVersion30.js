exports.getVersion30 = function (bufferString,callback) {
	'use strict';
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
	var TEL;
	var ADR;
	var EMAIL;
	var contactList = [];
	var contactItem;

	while ((beginVcard = bufferString.indexOf('BEGIN:VCARD', endVcard)) !== -1) {
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
				contactItem.N = N;
			}

			if (contactString[i].substr(0,2) === 'FN') {
				FN = contactString[i].substring(3, contactString[i].length-1);
				contactItem.FN = FN;
			}

			if (contactString[i].substr(0,3) === 'ORG') {
				ORG = contactString[i].substring(4, contactString[i].length-1);
				contactItem.ORG = ORG;
			}

			if (contactString[i].substr(0,5) === 'TITLE') {
				TITLE = contactString[i].substring(6, contactString[i].length-1);
				contactItem.TITLE = TITLE;
			}

			if (contactString[i].substr(0,5) === 'PHOTO') {
				TYPE = contactString[i].substring(contactString[i].indexOf('TYPE')+5 , contactString[i].indexOf(':',contactString[i].indexOf('TYPE')));
				PHOTO = contactString[i].substring(contactString[i].indexOf(':')+1 , contactString[i].length-1);
				contactItem.PHOTO = {
					'TYPE': TYPE,
					'PHOTO': PHOTO
				};
			}

			if (contactString[i].substr(0,3) === 'TEL') {
				TYPE = contactString[i].substring(contactString[i].indexOf('TYPE')+5, contactString[i].indexOf(':',contactString[i].indexOf('TYPE')));
				TYPE = TYPE.split(',');
				TEL = contactString[i].substring(contactString[i].lastIndexOf(':')+1, contactString[i].length-1);
				TEL = escapeTEL(TEL);
				contactItem.TEL.push({
					'TYPE': TYPE,
					'TEL': TEL
				});
			}

			if (contactString[i].substr(0,5) === 'LABEL') {
				TYPE = contactString[i].substring(11, contactString[i].indexOf(':',11));
				ADR = contactString[i].substring(contactString[i].lastIndexOf(':')+1, contactString[i].length-1);
				ADR = escape(ADR);
				contactItem.ADR.push({
					'TYPE': TYPE,
					'ADR': ADR
				});
			}

			if (contactString[i].substr(0,5) === 'EMAIL') {
				EMAIL = contactString[i].substring(contactString[i].lastIndexOf(':')+1, contactString[i].length-1);
				contactItem.EMAIL = EMAIL;
			}
		}

		contactList.push(contactItem);

	}	

	callback(contactList);
};
