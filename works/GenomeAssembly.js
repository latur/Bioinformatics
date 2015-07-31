fs = require('fs');

// Додготовка данных
var data = fs.readFileSync('dataset.txt', {encoding : 'utf8'}).split('\n');
for (var i in data) if (data[i][0] == '>') data[i] = '|';
data = data.join('').split('|');

// Поиск строки, максимально перекрывающейся справа с данной строкой
function MaxRightIntersection(k, minLen) {
	var max = false;
	var maxLen = 0;
	var minLen = minLen || 40;
	var pattern = data[k].substr(data[k].length - minLen, minLen);
	// Поиск совпадений во всех строках
	for (var i in data) {
		var index = data[i].indexOf(pattern);
		if (i == k || index == -1) continue;
		// При совпадении минимального отрезка, проверить всё правую часть строки
		var full = data[k].substr(data[k].length - minLen - index, minLen + index);
		if (data[i].indexOf(full) == -1) continue;
		if (maxLen < index) maxLen = index, max = i;
	}
	return max;
}

// Формирование ориентированного графа по пересечениям:
var G = {}, NG = {}, M = [];
for (var i in data) {
	var exist = MaxRightIntersection(i);
	if (exist) M.push(i + ' \\[DirectedEdge] ' + exist), NG[exist] = i, G[i] = exist;
	else console.log('> ' + data[i]);
}

// Mathematica Graph
console.log('\nGraph[{' + M.join(', ') + '}, VertexLabels -> "Name"]\n');

// Поиск в графе конца
var init = false;
for (var node in NG) if (!NG[ NG[node] ]) init = NG[node];

// Сборка генома по графу
var genome = data[init];
var k = init;
while (G[k]) genome = Merge(genome, data[G[k]]), k = G[k];

function Merge(genome, end) {
	for (var k = 40; k < end.length; k++) {
		if (genome.substr(genome.length - k, k) == end.substr(0, k)) {
			return genome + end.substr(k);
		}
	}
	return genome;
}

console.log(genome);
