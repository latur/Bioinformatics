fs = require('fs');

var filename = 'dataset.txt';
var data = fs.readFileSync(filename, {encoding : 'utf8'}).split('\n').slice(1)[0].split(' ');

// -------------------------------------------------------------------------- //
// Граф связей: каждая вершина связана с меньшими вершинами
var G = {};
for (var i in data) {
	G[i] = [];
	for (var j = i + 1; j <= data.length; j++) {
		if (parseInt(data[i]) > parseInt(data[j])) G[i].push(j);
	}
}

var cache = {};
var optimal = []; 
for (var i in data) {
	var f = From(i);
	if (f.length > optimal.length) optimal = f;
}

function From(i) {
	if (cache[i]) return cache[i];
	var max = [];
	for (var k in G[i]) {
		var tmp = From(G[i][k]);
		if (tmp.length > max.length) max = tmp; 
	}
	max.push(data[i]);
	cache[i] = max;
	return max;
}

//console.log(JSON.stringify(G));
console.log(optimal.reverse().join(' '));

