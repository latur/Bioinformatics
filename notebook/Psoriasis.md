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
