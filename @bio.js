// Hamming Distance Problem: Compute the Hamming distance between two strings.
//      Input: Two strings of equal length.
//      Output: The Hamming distance between these strings.
//
// Example : 
// HammingDistance('CTTGAAGTGGACCTCTAGTTCC', 'ATGCCTTACCTAGATGCAATGA');
exports.HammingDistance = function(stringX, stringY)
{
	for(var i = 0, h = 0; i < stringX.length; i++) if(stringX[i] != stringY[i]) h++;
	return h;
};

// Minimum Skew Problem: Find a position in a genome minimizing the skew.
//      Input: A DNA string Genome.
//      Output: All integer(s) i minimizing Skewi (Genome) among all values of i (from 0 to |Genome|).
//
// Example : 
// MinimumSkew('ATGCCTTACCTAGATGCAATGA');
// Skew('ATGCCTTACCTAGATGCAATGA');
exports.MinimumSkew = function(string)
{
	for(var i = 0, s = 0, min = 0, place = [ 1 ]; i < string.length; i++)
	{
		if(string[i] == "C") s--;
		if(string[i] == "G") s++;
		if(s == min) place.push(i + 1);
		if(s <  min) place = [ i + 1 ], min = s;
	}
	return place;
};
exports.Skew = function(string)
{
	for(var i = 0, s = 0, trace = []; i < string.length; i++)
	{
		if(string[i] == "C") s--;
		if(string[i] == "G") s++;
		trace.push(s);
	}
	return trace;
};

// Frequent Words with Mismatches and Reverse Complements Problem: Find the most frequent k-mers (with mismatches and reverse complements) in a DNA string.
//      Input: A DNA string Text as well as integers k and d.
//      Output: All k-mers Pattern maximizing the sum Countd(Text, Pattern) + Countd(Text, Rew(Pattern)) over all possible k-mers.
//
// Example : 
// FrequentWordsMismatches('ACGTTGCATGTCGCATGATGCATGAGAGCT', 4, 1);
exports.FrequentWordsMismatches = function(string, k, d)
{
	var parts = {};
	for(var i = 0; i <= string.length - k; i++) parts[ string.substr(i, k) ] = 0;
	var probable = exports.Mismatches(parts, d);
	
	var stringReverse = exports.ReverseComplement(string);
	for(var X in probable)
	{
		for(var i = 0; i <= string.length - k; i++)
		{
			if(exports.HammingDistance(X, string.substr(i, k)) <= d)        probable[X]++;
			if(exports.HammingDistance(X, stringReverse.substr(i, k)) <= d) probable[X]++;
		}
	}
	
	var max = 0, list = [];
	for(var name in probable)
	{
		if(probable[name] == max) list.push(name);
		if(probable[name] > max) var list = [name], max = probable[name];
	}
	return list;
};

// Reverse Complement
// 
// Example : 
// ReverseComplement('ATGCCTTACCTAGATGCAATGA');
exports.ReverseComplement = function(string)
{
	var Inverse = { 'A' : 'T', 'G' : 'C', 'T' : 'A', 'C' : 'G'}, s = '';
	for(var i = string.length - 1; i >= 0 ; i--) s += Inverse[string[i]];
	return s;
};

// Mismatches (d) in string 
//
// Example : 
// Mismatches('ATGCCTTAC', 2);
// Mismatches({'ATGCCTTAC' : 0, 'GCCTTACCA' : 0}, 1);
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
};

// Protein Translation Problem: Translate an RNA string into an amino acid string.
//      Input: An RNA string Pattern and the array GeneticCode.
//      Output: The translation of Pattern into an amino acid string Peptide.
//
// Example : 
// ProteinTranslation('AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA');
exports.ProteinTable = 
{
	'AAA':'K', 'AAC':'N', 'AAG':'K', 'AAU':'N', 'ACA':'T', 'ACC':'T', 'ACG':'T', 'ACU':'T', 
	'AGA':'R', 'AGC':'S', 'AGG':'R', 'AGU':'S', 'AUA':'I', 'AUC':'I', 'AUG':'M', 'AUU':'I', 
	'CAA':'Q', 'CAC':'H', 'CAG':'Q', 'CAU':'H', 'CCA':'P', 'CCC':'P', 'CCG':'P', 'CCU':'P', 
	'CGA':'R', 'CGC':'R', 'CGG':'R', 'CGU':'R', 'CUA':'L', 'CUC':'L', 'CUG':'L', 'CUU':'L', 
	'GAA':'E', 'GAC':'D', 'GAG':'E', 'GAU':'D', 'GCA':'A', 'GCC':'A', 'GCG':'A', 'GCU':'A', 
	'GGA':'G', 'GGC':'G', 'GGG':'G', 'GGU':'G', 'GUA':'V', 'GUC':'V', 'GUG':'V', 'GUU':'V', 
	'UAA':'.', 'UAC':'Y', 'UAG':'.', 'UAU':'Y', 'UCA':'S', 'UCC':'S', 'UCG':'S', 'UCU':'S', 
	'UGA':'.', 'UGC':'C', 'UGG':'W', 'UGU':'C', 'UUA':'L', 'UUC':'F', 'UUG':'L', 'UUU':'F' 
};
exports.ProteinTranslation = function(string)
{
	var Protein = '';
	var RNA = string.indexOf('T') == -1 ? string : string.replace(/T/g, 'U');
	for(var i = 0; i < string.length; i +=3) Protein += exports.ProteinTable[ RNA.substr(i, 3) ] || '?';
	return Protein;
};

// Peptide Encoding Problem: Find substrings of a genome encoding a given amino acid sequence.
//      Input: A DNA string Text, an amino acid string Peptide, and the array GeneticCode.
//      Output: All substrings of Text encoding Peptide (if any such substrings exist).
// 
// Example :
// PeptideEncoding('ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA', 'MA')
exports.PeptideEncoding = function(string, peptide)
{
	var stringReverse = exports.ReverseComplement(string);
	for(var i = 0, l = peptide.length, parts = []; i <= string.length + l; i++)
	{
		var part = string.substr(i, 3 * l);
		var partReverse = stringReverse.substr(i, 3 * l);
		if(exports.ProteinTranslation( part ) == peptide) parts.push(part);
		if(exports.ProteinTranslation( partReverse ) == peptide) parts.push(exports.ReverseComplement(partReverse));
	}
	return parts;
};

// Example :
// Find('ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA', 'A')
exports.Find = function(string, element)
{
	for(var i = 0, l = element.length, places = []; i <= string.length + l; i++)
	{
		if(string.substr(i, l) == element) places.push(i);
	}
	return places;
};

// 
// Generating Theoretical Spectrum Problem: Generate the theoretical spectrum of a cyclic peptide.
//      Input: An amino acid string Peptide.
//      Output: Cyclospectrum(Peptide).
// 
// Example :
// Cyclospectrum('ACKF')
exports.MassTable = 
{
  'A' : 71.037110, 'C' : 103.00919, 'D' : 115.02694, 'E' : 129.04259, 
  'F' : 147.06841, 'G' : 57.021460, 'H' : 137.05891, 'I' : 113.08406, 
  'K' : 128.09496, 'L' : 113.08406, 'M' : 131.04049, 'N' : 114.04293,
  'P' : 97.052760, 'Q' : 128.05858, 'R' : 156.10111, 'S' : 87.032030, 
  'T' : 101.04768, 'V' : 99.068410, 'W' : 186.07931, 'Y' : 163.06333
};
exports.Mass = function(peptide)
{
	var mass = peptide.split('').map(function(e){ return exports.MassTable[e] || 0; });
	return mass.reduce(function(i, j){ return i + j; });
};
exports.Cyclospectrum = function(peptide)
{
	var parts = [ 0, exports.Mass( peptide ) ];
	for(var sub = 1, l = peptide.length, cyclo = peptide + peptide; sub < l; sub++)
	{
		for(var i = 0; i < l; i++) parts.push( exports.Mass( cyclo.substr(i, sub) ) );
	}
	return parts.sort(function(i,j){ return i-j; });
};

// Cyclopeptide Sequencing
// 
// Example :
// CyclopeptideSequencing([0,87,87,87,113,114,128,128,128,129,129,131,174,200,215]);
exports.CyclopeptideSequencing = function(spectrum)
{
	// Проверка наличия всего массива с спектре
	var ok = function(arr){
		for(var i in arr) if(spectrum.indexOf(arr[i]) == -1) return false;
		return true;
	};
	
	// Набор возможных начальных масс 
	var M = []; 
	[57,71,87,97,99,101,103,113,114,115,128,129,131,137,147,156,163,186].map(function(n){ if(ok([n])) M.push(n); });
	
	var list = [];
	var possble = function(arr){
		if(arr.length == 0) return list;

		var line = arr.pop();
		var before = line[0];
		var max    = line[1];

		if(max == 0){
			list.push( before.join('-') );
		} else {
			var rbefore = before.reverse();
			var preline = [];
			for(var i in M){
				// Предшественники в списке. Все смежные справа суммы должны быть в спектре
				var init = [], tmp = rbefore.concat( M[i] );
				// [1,1,1,1,3] -> [3,4,5,6,7]
				for(var e in tmp) init.push( (init.slice(-1)[0] || 0) + tmp[e] );
				// Проверка суммы
				if(ok(init) && ok([ max - M[i] ])) arr.push( [before.concat(M[i]), max - M[i]] );
			}
		}
		return possble(arr);
	};
	
	return possble([[[], spectrum.slice(-1)[0]]]);
};

// Cyclopeptide Scoring Problem: Compute the score of a cyclic peptide against a spectrum.
//      Input: An amino acid string Peptide and a collection of integers Spectrum. 
//      Output: The score of Peptide against Spectrum, Score(Peptide, Spectrum).
//
// Example :
// CyclopeptideScoring('NQEL', [0,99,113,114,128,227,257,299,355,356,370,371,484]);
exports.CyclopeptideScoring = function(peptide, spectrum)
{
	var theory = exports.Cyclospectrum(peptide), score = 0;
	for(var i in theory){
		var p = spectrum.indexOf(theory[i]);
		if(p != -1){
			spectrum.splice(p, 1); score++;
		}
	}
	return score;
};


// Implanted Motif Problem: Find all (k, d)-motifs in a collection of strings.
//      Input: A collection of strings Dna, and integers k and d.
//      Output: All (k, d)-motifs in Dna.
// 
// Example : 
// ImplantedMotif(['ATTTGGC', 'TGCCTTA', 'CGGTATC', 'GAAAATT'], 5, 1)
exports.ImplantedMotif = function(dna, k, d)
{
	// Получение всех k-меров (+мутации) из строк массива dna
	var kmers = {};
	for(var e in dna)
	{
		for(var i = 0; i <= dna[e].length - k; i++)
		{
			var mismatches = exports.Mismatches(dna[e].substr(i, k), d);
			for(var m in mismatches) kmers[ m ] = 0;
		}
	}

	// Есть ли в строке любой элемент массива
	var instring = function(str, obj){
		for(var e in obj) if(str.indexOf(e) != -1) return true;
		return false;
	};
	// Ксть ли строка во всех элементах массива dna (~ мутации)
	var check = function(m){
		for(var i in dna) if( !instring(dna[i], exports.Mismatches(m, d)) ) return false;
		return true;
	};

	var motifs = [];
	for(var m in kmers) if( check(m) ) motifs.push( m );
	return motifs;
};

// Median String Problem: Find a median string.
//      Input: A collection of strings Dna and an integer k.
//      Output: A k-mer Pattern that minimizes d(Pattern, Dna) among all k-mers Pattern.
//
// Example : 
// MedianString(['ATTTGGC', 'TGCCTTA', 'CGGTATC', 'GAAAATT'], 2)
exports.MedianString = function(dna, k)
{
	var d = function(xxx, y){
		var distance = Infinity;
		for(var i = 0, l = y.length; i <= xxx.length - l; i++)
		{
			var t = exports.HammingDistance(y, xxx.substr(i, l));
			distance = t < distance ? t : distance;  
		}
		return distance;
	};
	
	var dd = function(y){
		var sum = 0;
		for(var i in dna) sum += d(dna[i], y);
		return sum;
	};
	
	var patterns = exports.Patterns(k);
	for(var i = 0, l = patterns.length, min = Infinity, median = []; i < l; i++)
	{
		var s = dd(patterns[i]);
		if(s == min) median.push( patterns[i] );
		if(s <  min) median = [ patterns[i] ], min = s;
	}
	return median;
};
// Генерирование паттернов длины k 
exports.Patterns = function(k)
{
	var nk = function(s){
		return Array(k - s.length + 1).join('A') + 
		s.replace(/0/g, 'A').replace(/1/g, 'T').replace(/2/g, 'G').replace(/3/g, 'C');
	}
	var p = [];
	for(var i = 0, l = Math.pow(4, k); i < l; i++) p.push(  nk(i.toString(4)) );
	return p;
};

// Profile-most Probable k-mer Problem: Find a Profile-most probable k-mer in a string.
//      Input: A string Text, an integer k, and a 4 × k matrix Profile.
//      Output: A Profile-most probable k-mer in Text.
exports.ProfileMostProbable = function(string, k, matrix)
{
	var Probable = function(str){
		for(var w = 0, p = 1, len = str.length; w < len; w++) p = p * matrix[ str[w] ][ w ];
		return p;
	};
	for(var i = 0, max = 0, most = '', l = string.length; i <= l - k; i++)
	{
		var s = string.substr(i, k);
		var p = Probable(s);
		if( p >=  max) most = s, max = p;
	}
	return most;
};

