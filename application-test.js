fs  = require('fs');
Bio = require('./@bio.js');

console.log( '\n> HammingDistance' );
console.log( Bio.HammingDistance('CTTGAAGTGGACCTCTAGTTCC', 'ATGCCTTACCTAGATGCAATGA') );

console.log( '\n> MinimumSkew' );
console.log( Bio.MinimumSkew('CTTGAAGTGGACCTCTAGTTCC') );

console.log( '\n> ReverseComplement' );
console.log( 'CTTGAAGTGGACCTCTAGTTCC' );
console.log( Bio.ReverseComplement('CTTGAAGTGGACCTCTAGTTCC') );

console.log( '\n> Mismatches' );
console.log( JSON.stringify(Bio.Mismatches('ATG', 1)) );
console.log( JSON.stringify(Bio.Mismatches({'GGG' : 0}, 1)) );

console.log( '\n> FrequentWordsMismatches' );
console.log( Bio.FrequentWordsMismatches('ACGTTGCATGTCGCATGATGCATGAGAGCT', 4, 1) );

