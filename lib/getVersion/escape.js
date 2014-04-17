//escape special characters
exports.escape = function (processString) {
	processString = processString.replace(/;/g,',');
	processString = processString.replace(/=0D=0A/g,'\n');
	processString = processString.replace(/\\n/g,'\n');
	return processString;
}

exports.escapeTEL = function (processString) {
	processString = processString.replace(/\(/g,'');
	processString = processString.replace(/\)/g,'');
	processString = processString.replace(/-/g,'');
	processString = processString.replace(/ /g,'');
	processString = processString.replace(/\+/g,'');
	return processString;
}