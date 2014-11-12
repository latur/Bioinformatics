fs  = require('fs');
Bio = require('./@bio.js');

console.log( '\n> HammingDistance' );
console.log( Bio.HammingDistance('CTTGAAGTGGACCTCTAGTTCC', 'ATGCCTTACCTAGATGCAATGA') );

console.log( '\n> MinimumSkew' );
console.log( Bio.MinimumSkew('CTTGAAGTGGACCTCTAGTTCC') );
console.log( '\n> Skew' );
console.log( Bio.Skew('CTTGAAGTGGACCTCTAGTTCC') );

console.log( '\n> ReverseComplement' );
console.log( 'CTTGAAGTGGACCTCTAGTTCC' );
console.log( Bio.ReverseComplement('CTTGAAGTGGACCTCTAGTTCC') );

console.log( '\n> Mismatches' );
console.log( JSON.stringify(Bio.Mismatches('ATG', 1)) );
console.log( JSON.stringify(Bio.Mismatches({'GGG' : 0}, 1)) );

console.log( '\n> FrequentWordsMismatches' );
console.log( Bio.FrequentWordsMismatches('ACGTTGCATGTCGCATGATGCATGAGAGCT', 4, 1) );

console.log( '\n> ProteinTable' );
console.log( JSON.stringify(Bio.ProteinTable) );

console.log( '\n> ProteinTranslation' );
console.log( Bio.ProteinTranslation('AUGGCCAUGGCGCCCAGAACUGAGAUCAAUAGUACCCGUAUUAACGGGUGA') );
console.log( Bio.ProteinTranslation('ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA') );

console.log( '\n> PeptideEncoding' );
console.log( Bio.PeptideEncoding('ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA', 'MA') );

console.log( '\n> Find' );
console.log( Bio.Find('ATGGCCATGGCCCCCAGAACTGAGATCAATAGTACCCGTATTAACGGGTGA', 'A') );

console.log( '\n> MassTable' );
console.log( JSON.stringify(Bio.MassTable) );

console.log( '\n> Mass' );
console.log( Bio.Mass('PRTEINSTRING') );

console.log( '\n> Cyclospectrum' );
console.log( JSON.stringify(Bio.Cyclospectrum('PRTEIN')) );

console.log( '\n> CyclopeptideSequencing' );
console.log( Bio.CyclopeptideSequencing([0,87,87,87,113,114,128,128,128,129,129,131,174,200,215]) );

console.log( '\n> CyclopeptideScoring' );
console.log( Bio.CyclopeptideScoring('NQEL', [0,99,113,114,128,227,257,299,355,356,370,371,484]) );
