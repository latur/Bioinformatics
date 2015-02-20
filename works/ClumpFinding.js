// Поиск комков.
// Есть геном. и три числа: t, L, k 
// Нужно найти в геноме такие слова длины k, встречающиеся t раз в подстроке генома длины L 
// Алгоритм тупой и требует оптимизации. Совсем тупой перебор

var GNM = 'CGGACTCGACAGATGTGAAGAAATGTGAAGACTGAGTGAAGAGAAGAGGAAACACGACACGACATTGCGACATAATGTACGAATGTAATGTGCCTATGGC';
var t = 5, L = 75, k = 4;

// Ищет частые слова в блоке G
var clumpfind = function(t,k,G){
  var words = {};
  for (var i = 0; i < G.length - t; i++){
    var w = G.substr(i, t);
    if(!words[w]) words[w] = 1; else words[w]++;
  }
  var result = [];
  for (var e in words){
    if(words[e] >= k) result.push(e);
  }
  return result;
};

var clumps = [];
for(var i = 0; i < GNM.length - L; i++){
  var tmp = clumpfind(t,k,GNM.substr(i, L));
  for(var c in tmp){
    if(clumps.indexOf(tmp[c]) == -1) clumps.push(tmp[c]);
  }
}

console.log(clumps.join(' '));
