var fs = require('fs');
var dict = fs.readFileSync('./cmudict.txt').toString();
var dictBySyl = formatData(dict);
// var dictHash = hashDict(dict);
// var text = fs.readFileSync('./test.txt');

function countSyllables(pronunciation) {
	if (pronunciation)
		return (pronunciation.match(/\d/g)||[]).length;
}

function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * (arr.length - 1))];
}

function formatData(data) {
	var lines = data.toString().split("\n");
	var wordArray = [];
	lines.forEach(function(line) {
		var pair = line.split("  ");
		var syl = countSyllables(pair[1]);
		if (!wordArray[syl])
			wordArray[syl] = [];
		wordArray[syl].push(pair[0]);
	});
	return wordArray;
}

function randomizeLine(sylTotal) {
	var line = [];
	while (sylTotal > 0) {
		var x = Math.round(Math.random() * sylTotal);
		if (x > 0)
			line.push(x);
		sylTotal -= x;
	}
	return line;
}

function generateStructure() {
	return [5,7,5].map(randomizeLine);
}

function createHaiku(structure) {
	if (structure === undefined)
		structure = [[5],[7],[5]];
	if (structure === "random")
		structure = generateStructure();
	var haikuString = "";
	for (var i = 0; i < structure.length; i++) {
		for (var j = 0; j < structure[i].length; j++) {
			var word = getRandomElement(dictBySyl[structure[i][j]]);
			if (word.match(/\(\d+\)/))
				word = word.slice(0,-3);
			haikuString += word + " "
		}
		haikuString += "\n";
	}
	console.log(haikuString);
	return haikuString;
}

// function hashDict(dictionary) {
// 	var lines = dictionary.toString().split("\n");
// 	var hash = {};
// 	lines.forEach(function(line) {
// 		var pair = line.split("  ");
// 		var syl = countSyllables(pair[1]);
// 		if (!hash[pair[0]])
// 			hash[pair[0]] = syl;
// 	});
// 	return hash;
// }

//function findHaiku(text) {
//	text = text.toString().replace("\n", " ").split(" ");
//	console.log(text);
//}

// findHaiku(text);

module.exports = {
	createHaiku: createHaiku,
}







