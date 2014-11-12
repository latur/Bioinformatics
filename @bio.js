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
}

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
}
exports.Skew = function(string)
{
	for(var i = 0, s = 0, trace = []; i < string.length; i++)
	{
		if(string[i] == "C") s--;
		if(string[i] == "G") s++;
		trace.push(s);
	}
	return trace;
}

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
}

// Reverse Complement
// 
// Example : 
// ReverseComplement('ATGCCTTACCTAGATGCAATGA');
exports.ReverseComplement = function(string)
{
	var Inverse = { 'A' : 'T', 'G' : 'C', 'T' : 'A', 'C' : 'G'}, s = '';
	for(var i = string.length - 1; i >= 0 ; i--) s += Inverse[string[i]];
	return s;
}

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
}

// Protein Translation Problem: Translate an RNA string into an amino acid string.
//      Input: An RNA string Pattern and the array GeneticCode.
//      Output: The translation of Pattern into an amino acid string Peptide.
//
// Example : 
// ProteinTranslation('AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA');
exports.ProteinTable = {
	'AAA':'K', 'AAC':'N', 'AAG':'K', 'AAU':'N', 'ACA':'T', 'ACC':'T', 'ACG':'T', 'ACU':'T', 
	'AGA':'R', 'AGC':'S', 'AGG':'R', 'AGU':'S', 'AUA':'I', 'AUC':'I', 'AUG':'M', 'AUU':'I', 
	'CAA':'Q', 'CAC':'H', 'CAG':'Q', 'CAU':'H', 'CCA':'P', 'CCC':'P', 'CCG':'P', 'CCU':'P', 
	'CGA':'R', 'CGC':'R', 'CGG':'R', 'CGU':'R', 'CUA':'L', 'CUC':'L', 'CUG':'L', 'CUU':'L', 
	'GAA':'E', 'GAC':'D', 'GAG':'E', 'GAU':'D', 'GCA':'A', 'GCC':'A', 'GCG':'A', 'GCU':'A', 
	'GGA':'G', 'GGC':'G', 'GGG':'G', 'GGU':'G', 'GUA':'V', 'GUC':'V', 'GUG':'V', 'GUU':'V', 
	'UAA':'.', 'UAC':'Y', 'UAG':'.', 'UAU':'Y', 'UCA':'S', 'UCC':'S', 'UCG':'S', 'UCU':'S', 
	'UGA':'.', 'UGC':'C', 'UGG':'W', 'UGU':'C', 'UUA':'L', 'UUC':'F', 'UUG':'L', 'UUU':'F' 
}
exports.ProteinTranslation = function(string)
{
	var Protein = '';
	var RNA = string.indexOf('T') == -1 ? string : string.replace(/T/g, 'U');
	for(var i = 0; i < string.length; i +=3) Protein += exports.ProteinTable[ RNA.substr(i, 3) ] || '?';
	return Protein;
}

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
}

// Example :
// Find('ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA', 'A')
exports.Find = function(string, element)
{
	for(var i = 0, l = element.length, places = []; i <= string.length + l; i++)
	{
		if(string.substr(i, l) == element) places.push(i);
	}
	return places;
}

// 
// Generating Theoretical Spectrum Problem: Generate the theoretical spectrum of a cyclic peptide.
//      Input: An amino acid string Peptide.
//      Output: Cyclospectrum(Peptide).
// 
// Example :
// Cyclospectrum('ACKF')
exports.MassTable = 
{
	'G' : 57,  'A' : 71,  'S' : 87,  'P' : 97,  'V' : 99, 
	'T' : 101, 'C' : 103, 'I' : 113, 'L' : 113, 'N' : 114, 
	'D' : 115, 'K' : 128, 'Q' : 128, 'E' : 129, 'M' : 131, 
	'H' : 137, 'F' : 147, 'R' : 156, 'Y' : 163, 'W' : 186 
}
exports.Mass = function(peptide)
{
	var mass = peptide.split('').map(function(e){ return exports.MassTable[e] || 0; });
	return mass.reduce(function(i, j){ return i + j; });
}
exports.Cyclospectrum = function(peptide)
{
	var parts = [ 0, exports.Mass( peptide ) ];
	for(var sub = 1, l = peptide.length, cyclo = peptide + peptide; sub < l; sub++)
	{
		for(var i = 0; i < l; i++) parts.push( exports.Mass( cyclo.substr(i, sub) ) );
	}
	return parts.sort(function(i,j){ return i-j; });
}

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
}

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
}



