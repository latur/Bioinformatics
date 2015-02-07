fs  = require('fs');

// Количество всевозможных пептидов с данной массой.
// Если масса невелика (до 500), используйте MSimple
// Иначе, MR

var predefined = {};

function MSimple(n)
{
  if(predefined[n]) return predefined[n];
  var parts = [57,71,87,97,99,101,103,113,114,115,128,129,131,137,147,156,163,186];
  var sum = 0;
  var s = parts.map(function(e){ 
    return n == e ? 1 : (n - e < 57 ? 0 : MSimple( n - e ));
  });
  while(s.length > 0) sum += s.pop();
  return sum;
}

function MR(n){
  // Предподсчёт первых 500 для ускорения
  var tmp = {};
  for(var i = 1; i < 500; i++){
    tmp[i] = MSimple(i);
    console.log(i + ' -> ' + tmp[i]);
  }
  predefined = tmp;
  return MSimple(n);
}

console.log(MR(1000));
