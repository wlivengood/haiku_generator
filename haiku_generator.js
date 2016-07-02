var haiku = require('./haiku');
var structure = process.argv[2];

if (structure === "random")
	haiku.createHaiku(structure);
else
	haiku.createHaiku(eval(structure));