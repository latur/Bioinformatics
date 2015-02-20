exec = require('child_process').exec;
var exports = exports || {};

/* -------------------------------------------------------------------------- */
exports.MassTable = {
  'A' : 71.037110, 'C' : 103.00919, 'D' : 115.02694, 'E' : 129.04259, 
  'F' : 147.06841, 'G' : 57.021460, 'H' : 137.05891, 'I' : 113.08406, 
  'K' : 128.09496, 'L' : 113.08406, 'M' : 131.04049, 'N' : 114.04293,
  'P' : 97.052760, 'Q' : 128.05858, 'R' : 156.10111, 'S' : 87.032030, 
  'T' : 101.04768, 'V' : 99.068410, 'W' : 186.07931, 'Y' : 163.06333
};

/* -------------------------------------------------------------------------- */
// Расстояние Хэмминга между строками (без поправки на длину)
// Example : 
// HammingDistance('CTTGAAGTGGACCTCTAGTTCC', 'ATGCCTTACCTAGATGCAATGA');
exports.HammingDistance = function(S1, S2)
{
  var strlen = Math.min(S1.length, S2.length);
  for(var i=0, h=0; i < strlen; i++) if(S1[i] != S2[i]) h++;
  return h + Math.abs(S1.length - S2.length);
};

// Процентное отношение CG нуклеотидов к длине строки
// Example : 
// CGValue('CTTGAAGTGGACCTCTAGTTCC');
exports.CGValue = function(S)
{
  for(var i=0, cg=0; i < S.length; i++) if(S[i] == 'C' || S[i] == 'G') cg++;
  return cg*100 / S.length;
};

// Чтение fasta файла. Заголовком считается содержимое с ">"
exports.FastaParse = function(S)
{
  var blocks = S.split('\n>');
  for(var i in blocks){
    var tmp = blocks[i].split('\n');
    blocks[i] = { 'title' : tmp[0].replace('>', ''), 'data' : tmp.slice(1).join('') };
  }
  return blocks;
};

// Граф из последовательностей (собпадение начала с концом)
exports.OverlapGraph = function(AR, K)
{
  var graph = [];
  for(var i in AR){
    var end = AR[i].data.substr(AR[i].data.length - K, K);
    for(var t in AR){
      var init = AR[t].data.substr(0, K);
      if(end == init && t != i) graph.push([AR[i].title, AR[t].title]);
    }
  }
  return graph;
};

// Поиск всех вхождений подстроки в строку
exports.Find = function(string, element)
{
	for(var i = 0, l = element.length, places = []; i <= string.length + l; i++)
	{
		if(string.substr(i, l) == element) places.push(i);
	}
	return places;
};

// Получение Uniprot-файла
exports.Uniprot = function(ID, after)
{
  exec("curl -i http://www.uniprot.org/uniprot/"+ID+".fasta", 
    function(e,s,t){
      if(s.indexOf("Location: ") != -1){
        exec("curl -i " + s.split("Location: ")[1].split("\n")[0], 
          function(e,s,t){ return after(s,ID); }
        );
      } else {
        return after(s,ID);
      }
    }
  );
};

// Получение всех строк из данной с d мутациями
// Mismatches('ATGCCTTAC', 2);
exports.Mismatches = function(data, d)
{
  var variables = typeof(data) == "object" ? data : {};
  if(typeof(data) == "string") variables[data] = 0;
  for(var str in variables)
  {
    for(i = 0; i < str.length; i++)
    {
      var after  = str.substr(0, i), 
          before = str.substr(i + 1);
      variables[after + 'A' + before] = 0;
      variables[after + 'T' + before] = 0;
      variables[after + 'G' + before] = 0;
      variables[after + 'C' + before] = 0;
    }
  }
  return d > 1 ? exports.Mismatches(variables, d - 1) : variables;
}

// Поиск с мутациями
exports.FindMismatche = function(data, str, d){
  var m = exports.Mismatches(str, d);
  var pts = [];
  for(var word in m){
    var places = exports.Find(data, word);
    for(var i in places){
      if(pts.indexOf(places[i]) == -1) pts.push(places[i]);
    }
  }
  return pts;
}


