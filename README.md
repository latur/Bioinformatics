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
