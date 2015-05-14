# Transcriptome analysis of psoriasis in a large case-control sample: RNA-seq provides insights into disease mechanisms

## Введение:

В работе рассматривается статья, посвящённая анализу транскриптома в клетках 
людей, подверженных псориазу. 

Авторы статьи рассмотрели метод RNA-seq для выявления генов, экспрессия которых 
в здоровых пациентах отличается от экспрессии в больных. Было рассмотрено 
82 образца биопсии здоровых пациентов и 92 — больных. 
В общей сложности исходные данные для проводимого анализа представляют собой 
~38 миллионов односторонних прочтений длиной 80 неуклеотидов.

Данные опубликованы в базе ArrayExpress: **E-GEOD-59148**.

Передо мной была поставлена задача провести аналогичные численные рассчёты 
с опубликованными данными эксперимента с целью выявления дифференциально 
экспрессирующихся генов.


## Имеющиеся данные

Результат РНК-секвенирования (RNA-seq) представляет собой список 
последовательностей нуклеотидов и соответствующих этим нуклеотидам качеств 
прочтений. Этоти результаты организованы в файлы формата `.fastq`:

~~~
http://www.ebi.ac.uk/ena/data/view/SRP044108
~~~

## Обработка данных

Объём данных достаточно велик. Ограничимся рассмотрением его подмножества. 
Далее представлены ссылки на выбранные мной (случайным образом) файлы:

~~~
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146087/SRR1146087.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146097/SRR1146097.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146102/SRR1146102.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146090/SRR1146090.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146089/SRR1146089.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146094/SRR1146094.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/005/SRR1146095/SRR1146095.fastq.gz [psor]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146088/SRR1146088.fastq.gz [norm]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/001/SRR1146101/SRR1146101.fastq.gz [norm]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/006/SRR1146106/SRR1146106.fastq.gz [norm]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/006/SRR1146076/SRR1146076.fastq.gz [norm]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/001/SRR1146111/SRR1146111.fastq.gz [norm]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146122/SRR1146122.fastq.gz [norm]
ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146109/SRR1146109.fastq.gz [norm]
~~~

### Качество данных. Очистка:

В каждом `.fastq` файле содержится огромное количество прочтений. 
РНК секвенатор предоставляет данные в сыром, необработанном виде. По этой 
причине `.fastq` файлы требуется предварительно очистить от мусорных и шумовых 
прочтений. Какие прочтения принимать за мусорные? Я предлагаю удалить все 
прочтения, которые более чем на половину состоят из неопределённых нуклеотидов, 
т.е. `N`. Т.к. для определения уровня экспресси требуется картирование прочтений
на геном человека, а картирование разумно проводить только тех прочтений, 
которые не короче чем 40 нуклеотидов.

Удалить прочтения, которые более чем на половину состоят из неопределённых 
нуклеотидов `N`, можно с помощью JS скрипта: 
[FastqNRemove.js](https://gist.github.com/latur/ffb9dbd1952aed731d8c)

При запуске скрипта рекомендуется разбить каждый `.fastq` файл на части, 
обработать эти части и результат склеить (в комментариях к скрипту приложена 
инструкция).

~~~
$ split -l 30000000 SRR1146106.norm.fastq SRR1146106.norm.fastq.p_
~~~ 

Теперь если взглянуть на усреднённое качество для всех прочтений, можно 
заметить, что имеется большое количество прочтений с качеством 2 (очень низким).
Их требуется исключить из рассмотрения. 
[Код на JS: FastqFilter.js](https://gist.github.com/latur/ec4c2d891bc837395344).

![Пример усреднённого качества для всех прочтений](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/historgam.png)

Анализируя оставшиеся прочтения (FastQC) можно выбрать подмножество `.fastq`
файлов удовлетворительного качества. Мною были выбраны:

~~~
SRR1146122.norm
SRR1146109.norm
SRR1146101.norm
SRR1146094.psor
SRR1146097.psor
SRR1146087.psor
~~~

### Картирование. Анализ:

Прочтения из этих файлов были картированы на геном человека с помощью программы 
`STAR`. Результат картирования — координата каждого из прочтений в геноме 
человека. Для количественного анализа этих данных потребуется 
[HTSeq](http://www-huber.embl.de/users/anders/HTSeq/doc/overview.html). 
[Установка HTSeq на Mac](http://www-huber.embl.de/users/anders/HTSeq/doc/install.html#installation-on-macos-x) 
требует наличия [SciPy](http://www.scipy.org/install.html). 
Поставить его можно через [Macports](http://www.macports.org):

~~~
sudo port install py27-numpy py27-scipy py27-matplotlib py27-ipython +notebook py27-pandas py27-sympy py27-nose
~~~

Имея файлы `.sam` (результат картирования) и `.gtf` (файл нотации генов 
человека) получаем количественные значения экспрессии каждого из генов. 
Например, для `SRR1146087.psor.sam`: 

~~~
htseq-count map/SRR1146087.psor.sam Homo_sapiens.GRCh38.79.gtf > map/SRR1146087.psor.htseq
~~~

Имеющиеся файлы `SRR1146087.psor.htseq` разумно объединить в общую таблицу 
`htseq.tsv`:

```r
## Объединение таблиц
# Директория с .htseq файлами
workDir <- "/Volumes/Macintosh/Users/latur/Process/RNAseq/E-GEOD-54456/map/"
# Функция чтения .htseq таблицы
Fread   <- function(file) read.table( paste(workDir, file, sep = "") )
# Список .htseq файлов
files   <- list.files(workDir, pattern = "*.htseq")
# Первый столбец (наименование гена) всех .htseq файлов должен совпадать. 
# Извлекаем его из первого файла
table   <- Fread(files[1])["V1"]
colnames(table) = c("gene_id")
# Добавляем второй столбец (количественные данные экспрессии)
for(i in 1:length(files)) {
  table[substr(files[i],0,15)] = Fread(files[i])[,2]
} 
# Последние 5 строчек - техническая информация, вырезаем:
table <- table[1:(length(table[,1]) - 5),]
# Сохраняем таблицу как htseq.tsv
tsvFile <- paste(workDir, "htseq.tsv", sep = "")
write.table(table, tsvFile, quote = F, sep = "\t", row.names = F)
```

```r
# Установка bioconductor
source("http://bioconductor.org/biocLite.R") 
# Установка пакетов через biocLite
biocLite("pasilla")
biocLite("DESeq")
# Подключение библиотеки
library("DESeq")

table  <- read.table(tsvFile, header = T, row.names = 1)
design <- data.frame(row.names = colnames(table),
  condition = c("psor","psor","psor","norm","norm","norm")
)

cds = newCountDataSet(table, design$condition)
cds <- estimateSizeFactors( cds )
cds <- estimateDispersions( cds )
plotDispEsts(cds)
```

![Variance Estimation](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/plotDispEsts.png)

### Отрицательное биномиальное распределение (Паскаля)

> Распределение дискретной случайной величины равной количеству произошедших неудач в последовательности испытаний Бернулли с вероятностью успеха p , проводимой до r-го успеха.

```r
res <- nbinomTest(cds, "psor", "norm")
```

![Variance Estimation](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/plotMA.png)

```r
hist(res$pval, breaks = 50)
```

![Variance Estimation](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/hist.png)

Судя по гистограмме, дифференциально экспрессирующихся генов нет:

```r
resTmp <- res[!is.na(res$padj), ]
resTmpOrder <- resTmp[ order(resTmp$padj), ]
resTmpOrder[1:5,]
```

~~~
             id    baseMean  baseMeanA baseMeanB          pval         padj
ENSG00000163218 36.67340356 0.07446936  73.27234  2.051816e-18 9.916428e-15
ENSG00000000005  0.03723468 0.07446936   0.00000  1.000000e+00 1.000000e+00
ENSG00000000938  0.06597916 0.13195832   0.00000  1.000000e+00 1.000000e+00
ENSG00000001036  0.06597916 0.13195832   0.00000  1.000000e+00 1.000000e+00
ENSG00000001084  0.03723468 0.07446936   0.00000  1.000000e+00 1.000000e+00
~~~