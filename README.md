vcfParse
========

A node module for reading and parsing a vcf/vcard file


Installation
============

$ npm install vcfParse

Usage
=====

var vcf = require('vcfParse')

vcf.readFile('<path to the .vcf file>', function (err,contactList) { }); <br />
vcf.getByName('<path to the .vcf file>', '<name to be searched>', <perfectMatch>, function (err,contactList) { });
vcf.getByTitle('<path to the .vcf file>', '<title to be searched>', function (err,contactList) { });
vcf.getByEmail('<path to the .vcf file>', '<email to be searched>', <perfectMatch>, function (err,contactList) { });

// perfectMatch (optional) == true, if you want to match the search string perfectly
// perfectMatch (optional) == false (deafult), if perfect matching not required

skeletal 'contactList' structure:

[{
	N:
	FN:
	ORG:
	TITLE:
	EMAIL:
	PHOTO: {
		TYPE:,
		PHOTO:
	}
	TEL: [{
		TYPE: []
		TEL:
	}]
	ADR: [{
		TYPE: []
		ADR:
	}]
}]
