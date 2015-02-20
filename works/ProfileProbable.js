// Profile-most Probable k-mer Problem: Find a Profile-most probable k-mer in a string.
//      Input: A string Text, an integer k, and a 4 × k matrix Profile.
//      Output: A Profile-most probable k-mer in Text.

var string = 'ACCTGTTTATTGCCTAAGTTCCGAACAAACCCAATATAGCCCGAGGGCCT';
var matrix = {
  A: [0.2,0.2,0.3,0.2,0.3],
  C: [0.4,0.3,0.1,0.5,0.1],
  G: [0.3,0.3,0.5,0.2,0.4],
  T: [0.1,0.2,0.1,0.1,0.2] };

function ProfileProbable(string, k, matrix)
{
	var Probable = function(str)
	{
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
}

console.log(ProfileProbable(string, 5, matrix));
