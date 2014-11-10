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
