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
exports.ProteinTranslation = function(string)
{
	var table = { 'AAA':'K', 'AAC':'N', 'AAG':'K', 'AAU':'N', 'ACA':'T', 'ACC':'T', 'ACG':'T', 'ACU':'T', 'AGA':'R', 'AGC':'S', 'AGG':'R', 'AGU':'S', 'AUA':'I', 'AUC':'I', 'AUG':'M', 'AUU':'I', 'CAA':'Q', 'CAC':'H', 'CAG':'Q', 'CAU':'H', 'CCA':'P', 'CCC':'P', 'CCG':'P', 'CCU':'P', 'CGA':'R', 'CGC':'R', 'CGG':'R', 'CGU':'R', 'CUA':'L', 'CUC':'L', 'CUG':'L', 'CUU':'L', 'GAA':'E', 'GAC':'D', 'GAG':'E', 'GAU':'D', 'GCA':'A', 'GCC':'A', 'GCG':'A', 'GCU':'A', 'GGA':'G', 'GGC':'G', 'GGG':'G', 'GGU':'G', 'GUA':'V', 'GUC':'V', 'GUG':'V', 'GUU':'V', 'UAA':'.', 'UAC':'Y', 'UAG':'.', 'UAU':'Y', 'UCA':'S', 'UCC':'S', 'UCG':'S', 'UCU':'S', 'UGA':'.', 'UGC':'C', 'UGG':'W', 'UGU':'C', 'UUA':'L', 'UUC':'F', 'UUG':'L', 'UUU':'F' };
	var Protein = '';
	for(var i = 0; i < string.length; i +=3) Protein += (table[string.substr(i, 3)] ? table[string.substr(i, 3)] : '?');
	return Protein;
}
exports.ProteinEncode = function(string)
{
	return exports.ProteinTranslation( string.replace(/T/g, 'U') );
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
		if(exports.ProteinEncode( part ) == peptide) parts.push(part);
		if(exports.ProteinEncode( partReverse ) == peptide) parts.push(exports.ReverseComplement(partReverse));
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

// Mass Spectrometry
export.MassTable = { 'G':'57', 'A':'71', 'S':'87', 'P':'97', 'V':'99', 'T':'101', 'C':'103', 'I':'113', 'L':'113', 'N':'114', 'D':'115', 'K':'128', 'Q':'128', 'E':'129', 'M':'131', 'H':'137', 'F':'147', 'R':'156', 'Y':'163', 'W':'186' };

