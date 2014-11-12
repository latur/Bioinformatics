# Node.js: Bioinformatics Algorithms 
[https://www.coursera.org/course/bioinformatics](https://www.coursera.org/course/bioinformatics)

### Подключение:
~~~
Bio = require('./@bio.js');
~~~

### Функции:

Расстояние Хэмминга. Количество отличий в соответствующих последовательностей
~~~
Bio.HammingDistance('ATGC', 'ATGC');
~~~

Минимум перевеса нуклеотида `G`. Возращает все точки минимума
~~~
Bio.MinimumSkew('ATGC');
~~~

Нахождение последовательности, обратно-комплементарной к данной
~~~
Bio.ReverseComplement('ATGC')
~~~

Нахождение всех последовательностей, которые возможно получить из данной за d замен
~~~
Bio.Mismatches('ATGC', 2)
~~~

Нахождение встречающегося чаще других k-мера с точностью до d мутаций
~~~
Bio.FrequentWordsMismatches('ATGCATGC', 4, 1)
~~~

Таблица замен триплета ДНК на нуклеотид
~~~
Bio.ProteinTable
~~~

Получение из последовательности РНК пептидной
~~~
Bio.ProteinTranslation('AUGGCCAUGG');
Bio.ProteinTranslation('ATGGCCATGG');
~~~

Нахождение подпоследовательности, которая может кодировать данный пептид
~~~
Bio.PeptideEncoding('ATGGCCATG', 'MA')
~~~

Поиск подстроки в строке. Результат — массив точек вхождения
~~~
Bio.Find('ATGGATCCAGAACTG', 'A')
~~~

Таблица масс аминокислоты в дальтонах (округление до целых чисел)
~~~
Bio.MassTable
~~~

Масса пептида в дальтонах
~~~
Bio.Mass('PRTEINSTRING')
~~~

Теоретический спектр циклопептида
~~~
Bio.Cyclospectrum('PRTEIN')
~~~
