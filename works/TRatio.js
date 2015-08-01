// Transitions and Transversions

fs = require('fs');

// Подготовка данных
var data = fs.readFileSync('dataset.txt', {encoding : 'utf8'}).split('\n');
for (var i in data) if (data[i][0] == '>') data[i] = '|';
data = data.join('').split('|').slice(1);

A = data[0];
B = data[1];

var transition = 0, transversion = 0;
for (var i = 0; i < A.length; i++) {
	if (A[i] == B[i]) continue;
	if (['AG','CT','GA','TC'].indexOf(A[i] + B[i]) != -1) transition++;
	else transversion++;
}

console.log(transition/transversion);
