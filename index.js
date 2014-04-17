module.exports = {
	readVCF:  function (path,callback) {
		var fs = require('fs');
		var getVersion21 = require('./lib/getVersion/getVersion21.js');
		var getVersion30 = require('./lib/getVersion/getVersion30.js');
		var getVersion40 = require('./lib/getVersion/getVersion40.js');

		fs.readFile(path, function (err,data) {
			if (!err) {
				var buffer = new Buffer(data, 'utf-8');
				var bufferString = buffer.toString('utf-8');
				
				var version = bufferString.substr(bufferString.indexOf('VERSION')+8,3);

				if (version === '2.1') {
					getVersion21.getVersion21(bufferString, function (contactList){
						callback(null,contactList);
					});
				} else if (version === '3.0') {
					getVersion30.getVersion30(bufferString, function (contactList){
						callback(null,contactList);
					});
				} else if (version === '4.0') {
					getVersion40.getVersion40(bufferString, function (contactList){
						callback(null,contactList);
					});
				} else {
					callback('Incorrect VCF format',null);
				}
			} else {
				callback(err,null);
			}
		});
	},

	getByName: function (path,name,perfectMatch,callback) {
		var vcf = require('vcf');
		var getByName = require('./lib/getByName.js');
		
		var args = [];
		for (var i = 0; i < arguments.length; ++i) {
			args.push(arguments[i]);
		}

		callback = args.pop();
		if (args.length != 3) {
			perfectMatch = false;
		}
		
		vcf.readVCF(path, function (err,contactList) {
			if (!err) {
				if (perfectMatch === false) {
					getByName.anyMatch(contactList, name, function (contactByName) {
						callback(null,contactByName);
					});
				} else {
					getByName.perfectMatch(contactList, name, function (contactByName) {
						callback(null,contactByName);
					});
				}
			} else {
				callback(err,null);
			}
		});
	},

	getByTitle: function (path,title,callback) {
		var vcf = require('vcf');
		var getByTitle = require('./lib/getByTitle.js');
		
		vcf.readVCF(path, function (err,contactList) {
			if (!err) {
				getByTitle.getByTitle(contactList,title, function (contactByTitle) {
					callback(null,contactByTitle);
				});
			} else {
				callback(err,null);
			}
		});
	},

	getByEmail: function (path,name,perfectMatch,callback) {
		var vcf = require('vcf');
		var getByEmail = require('./lib/getByEmail.js');
		
		var args = [];
		for (var i = 0; i < arguments.length; ++i) {
			args.push(arguments[i]);
		}

		callback = args.pop();
		if (args.length != 3) {
			perfectMatch = false;
		}
		
		vcf.readVCF(path, function (err,contactList) {
			if (!err) {
				if (perfectMatch === false) {
					getByEmail.anyMatch(contactList, name, function (contactByEmail) {
						callback(null,contactByEmail);
					});
				} else {
					getByEmail.perfectMatch(contactList, name, function (contactByEmail) {
						callback(null,contactByEmail);
					});
				}
			} else {
				callback(err,null);
			}
		});
	}
};