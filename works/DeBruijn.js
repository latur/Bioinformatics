// De Bruijn Graph from a String

function DeBruijn(s, k){
	var nodes = [];

	// Все узлы без повторений:
	for(var i = 0; i <= s.length - k + 1; i++){
		var node = s.substr(i, k - 1);
		if(nodes.indexOf(node) == -1) nodes.push(node);
	}
	
	// Связи каждого узла
	var right = function(node){
		var sG = [];
		for(var e in nodes){
			if(node.substr(1) == nodes[e].substr(0, node.length - 1)){
				if(sG.indexOf(nodes[e]) == -1) sG.push(nodes[e]);
			}
		}
		return sG;
	}
	
	// Граф:
	var G = [];
	for(var i in nodes){
		var compt = right(nodes[i]);
		if(compt.length > 0) G.push(nodes[i] + ' -> ' + (compt.join(',')));
	}

	return G;
}

console.log(DeBruijn('AAGATTCTCTAC', 4).join('\n'));
