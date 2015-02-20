// Overlap Graph Problem
// Последовательности — вершины графа.
// Наложения — рёбра

var data = 'ATGCG GCATG CATGC AGGCA GGCAT'.split(' ');

for(var i in data){
	var coda = data[i].substr(1);
	for(var e in data){
		if(data[e].substr(0, coda.length) == coda){
			console.log(data[i] + ' -> ' + data[e]);
		}
	}
}
