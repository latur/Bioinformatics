fs = require('fs');

// Подготовка данных
var data = fs.readFileSync('dataset.txt', {encoding : 'utf8'}).split('\n');
var seq = data[0];
var A = data[1].split(' '), B = [];

for (var i in A) {
	var sum = 0;
	var x = Number(A[i]);
	var cg = x/2, ncg = (1-x)/2;
	var pp = { 'A' : ncg, 'T' : ncg, 'G' : cg, 'C' : cg };
	for (var k in seq) sum += Math.log10(pp[seq[k]]);
	B.push(sum);
}

console.log(B.join(' '));
