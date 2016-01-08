vcfParse
========

A node module for reading and parsing a vcf/vcard file


Installation
============

$ npm install vcfParse

Usage
=====

var vcf = require('vcfParse')
  
var path = 'path to vcf file';
  
vcf.readVCF(path , function (err,contactList) { });  
vcf.getByName(path , NAME , PERFECT_MATCH , function (err,contactList) { });  
vcf.getByTitle(path , TITLE , function (err,contactList) { });  
vcf.getByEmail(path , 'EMAIL' , PERFECT_MATCH , function (err,contactList) { });  
  
// PERFECT_MATCH (optional) == true, if you want to match the search string perfectly  
// PERFECT_MATCH (optional) == false (deafult), if perfect matching not required  
  
skeletal 'contactList' structure:  
  
[{  
	N:  
	FN:  
	ORG:  
	TITLE:  
	EMAIL:  
	PHOTO: {  
		TYPE:  
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
