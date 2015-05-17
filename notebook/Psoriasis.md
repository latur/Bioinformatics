# Анализ транскриптома в клетках людей, подверженных псориазу

## Введение

В рассматриваемой работе производится анализ вычислений, проведённых в статье 
«Transcriptome analysis of psoriasis in a large case-control sample: RNA-seq 
provides insights into disease mechanisms». Статья посвящена анализу 
транскриптома в клетках людей, подверженных псориазу. Для исследования был 
использован метод RNA-seq для выявления дифференциаьной экспрессии генов. Было 
рассмотрено 82 образца биопсии здоровых пациентов и 92 — больных.

В общей сложности исходные данные для проводимого анализа представляют собой 
~38 миллионов односторонних прочтений длиной 80 неуклеотидов. Данные 
опубликованы в базе ArrayExpress: E-GEOD-59148.

Цель работы: провести аналогичные численные рассчёты с опубликованными данными 
эксперимента с целью выявления дифференциально экспрессирующихся генов.


## Имеющиеся данные

Результат РНК-секвенирования (RNA-seq) представляет собой список прочтений.
Прочтение — последовательность нуклеотидов (A, T, G, C, N), в которой для 
каждого нуклеотида указано качество его секвенирования. Результаты организованы 
в файлы формата `.fastq`. 

[http://www.ebi.ac.uk/ena/data/view/SRP044108](http://www.ebi.ac.uk/ena/data/view/SRP044108)

Объём обуликованных результатов секвенирования достаточно велик. В работе 
рассматривается анализ лишь части этих данных. Ссылки на использованные 
`.fastq` файлы доступны в приложении.


## Анализ и обработка данных

В каждом `.fastq` файле содержится большое количество прочтений. РНК 
секвенатор предоставляет данные в сыром, необработанном виде. По этой причине 
`.fastq` файлы требуется предварительно очистить от мусорных и шумовых 
прочтений. Для анализа `.fastq` было использовано приложение FastQC.

### Праймер начала прочтения

Первые 7 нуклеотидов в каждом прочтении — праймер, требующийся для 
секвенирования. Все праймеры (т.е. первые 7 нуклеотидов) были вырезаны из всех 
прочтений.

### Неопределённые нуклеотиды

Для картирования прочтения на геном человека это прочтение должно иметь длину 
более 55 нуклеотидов. В случе, если прочтения будут короче, картирование с 
большой вероятностью будет проведено неоднозначно.

По этой причине из исходных прочтений были удалены те, в которых 60 или более 
нуклеотидов неопределены. (`N`)

Для подобной фильтрации был использован скрипт:

[https://gist.github.com/latur/ffb9dbd1952aed731d8c](https://gist.github.com/latur/ffb9dbd1952aed731d8c)

### Прочтения низкого качества

Исходя из распределения качества прочтений видно, что имеется относительно 
большое количество прочтений с низим качеством. Для каждого файла были 
удалены все прочтения, усреднённое качество всех нуклеотидов не превышает 
`7`.

Для этого была использована программа на c++:

`https://gist.github.com/latur/048dce7639de65de0ef6`

### Праймеры Illumina

Секвенирование проводилось на машине Illumina. Помимо праймеров, которые 
находятся в начале каждого прочтения, могут быть отсеквенированы служебные 
праймеры. В данном случае это «Illumina Paired End PCR Primer 2».

Они не вляются продуктами транскрипции рассматриваемых клеток, их следует 
удалить.


|Образец|0 шаг|1 шаг|2 шаг|
|:---|:---|:---|:---|
| `norm` SRR1146114 | 43927786 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146114_fastqc.html) | 43837251 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146114_fastqc.html) | 27218268 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146114_fastqc.html) | 
| `norm` SRR1146126 | 40828714 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146126_fastqc.html) | 39867510 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146126_fastqc.html) | 30550398 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146126_fastqc.html) | 
| `norm` SRR1146169 | 33672486 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146169_fastqc.html) | 33319512 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146169_fastqc.html) | 28281087 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146169_fastqc.html) | 
| `norm` SRR1146207 | 30592407 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146207_fastqc.html) | 29815296 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146207_fastqc.html) | 27705061 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146207_fastqc.html) | 
| `norm` SRR1146118 | 44043334 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146118_fastqc.html) | 43983999 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146118_fastqc.html) | 25855886 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146118_fastqc.html) | 
| `norm` SRR1146131 | 40404469 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146131_fastqc.html) | 39254565 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146131_fastqc.html) | 28882561 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146131_fastqc.html) | 
| `norm` SRR1146172 | 45610994 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146172_fastqc.html) | 45057559 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146172_fastqc.html) | 38275716 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146172_fastqc.html) | 
| `norm` SRR1146244 | 45456637 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146244_fastqc.html) | 44536267 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146244_fastqc.html) | 37819823 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146244_fastqc.html) | 
| `norm` SRR1146120 | 44073434 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146120_fastqc.html) | 42733935 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146120_fastqc.html) | 31066219 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146120_fastqc.html) | 
| `norm` SRR1146139 | 34432182 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146139_fastqc.html) | 33380116 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146139_fastqc.html) | 28154894 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146139_fastqc.html) | 
| `norm` SRR1146177 | 38839304 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146177_fastqc.html) | 38481132 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146177_fastqc.html) | 30813723 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146177_fastqc.html) | 
| `norm` SRR1146248 | 41265411 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146248_fastqc.html) | 40103791 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146248_fastqc.html) | 33928802 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146248_fastqc.html) | 
| `norm` SRR1146121 | 41538775 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146121_fastqc.html) | 41481911 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146121_fastqc.html) | 25181345 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146121_fastqc.html) | 
| `norm` SRR1146142 | 41465382 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146142_fastqc.html) | 40274088 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146142_fastqc.html) | 28311458 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146142_fastqc.html) | 
| `norm` SRR1146179 | 47719890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146179_fastqc.html) | 46944715 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146179_fastqc.html) | 38575305 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146179_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 
| `psor` SRR1146208 | 34425121 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S/SRR1146208_fastqc.html) | 33464890 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.I/SRR1146208_fastqc.html) | 29961863 [`fqc`](http://dev.mazepa.us/bio/Psoriasis/S.II/SRR1146208_fastqc.html) | 


## Приложение

Ссылки на использованные в данной работе `.fastq` файлы.

~~~
Normal:
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146114/SRR1146114.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146179/SRR1146179.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146207/SRR1146207.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146172/SRR1146172.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146142/SRR1146142.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/006/SRR1146126/SRR1146126.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146118/SRR1146118.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/001/SRR1146131/SRR1146131.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146244/SRR1146244.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146248/SRR1146248.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146169/SRR1146169.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/001/SRR1146121/SRR1146121.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146139/SRR1146139.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146120/SRR1146120.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146177/SRR1146177.fastq.gz

Psoriasis:
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146128/SRR1146128.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/003/SRR1146083/SRR1146083.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146100/SRR1146100.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/003/SRR1146093/SRR1146093.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146208/SRR1146208.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146124/SRR1146124.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146214/SRR1146214.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146090/SRR1146090.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146162/SRR1146162.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146078/SRR1146078.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146202/SRR1146202.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146099/SRR1146099.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146210/SRR1146210.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146080/SRR1146080.fastq.gz
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146237/SRR1146237.fastq.gz
~~~
