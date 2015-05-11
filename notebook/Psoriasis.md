# Transcriptome analysis of psoriasis in a large case-control sample: RNA-seq provides insights into disease mechanisms

## Исходные данные:

* **ArrayExpress** [E-GEOD-59148](http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-59148/)
* **Fastq файлы** [SRP044108](http://www.ebi.ac.uk/ena/data/view/SRP044108)

## Обработка:

Изучаются два вида пациентов — больные просариаз и здоровые. Файл `E-GEOD-54456.sdrf.txt` содежит информацию о пациентах, в том числе указатель `normal_skin` и `psoriasis_skin`. 

[Здесь](http://www.ebi.ac.uk/ena/data/view/SRP044108) имеется файл `SRP035988.text` с ftp ссылками на `.fastq` файлы секвенирования. Извлекаем три файла для здорового и три файла для больного пациента.

### Загрузка данных:

**R:**

```r
info_file <- "E-GEOD-54456/E-GEOD-54456.sdrf.txt";
data_file <- "E-GEOD-54456/SRP035988.text";
info <- read.table(info_file, sep="\t", header=TRUE)[,2:3]
data <- read.table(data_file, sep="\t", header=TRUE)[,c(4,11)]
colnames(info) <- c("Id", "Skin")
colnames(data) <- c("Id", "FTP")
H <- merge(info, data, by = "Id")
write.table(H, "/tmp/ok.txt", quote = F, sep = " ", col.names = F)
```

Имеем таблицу `H` со ссылкой на файл `.fastq` и указателем болен/здоров. Для просмотра информации о размерах файлов вожно воспользоваться инструментом `./fsize`:

```bash
#!/bin/bash
cat $1 | while read line
do
  url="$(echo $line | awk '{print $4}')"
  size="$(curl -sI $url | grep Content-Length)"
  echo "$line $(echo $size | awk '{print $2}')"
done
```

~~~
$ ./fsize /tmp/ok.txt > /tmp/ok.s.txt
$ cat /tmp/ok.s.txt
~~~ 

Скачиваем по 7 образцов как для больных псориазом так и для здоровых:

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

Данные «засорены». Удаляем прочтения, которые более чем на половину состоят из неопределённых нуклеотидов `N`. [Код на JS: FastqNRemove.js](https://gist.github.com/latur/ffb9dbd1952aed731d8c). При запуске скрипта рекомендуется разбить каждый `.fastq` файл на части, обработать эти части и результат склеить. 

~~~
$ split -l 30000000 SRR1146106.norm.fastq SRR1146106.norm.fastq.p_
~~~ 

Если посмотреть на гистограмму усреднённого качества для всех прочтений, можно заметить, что имеется большое количество прочтений с качеством 2. Отсекаем их. [Код на JS: FastqFilter.js](https://gist.github.com/latur/ec4c2d891bc837395344).

![Пример гистограммы усреднённого качества для всех прочтений](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/historgam.png)

Выбираем по три набора данных для каждого из двух типов образцов и картируем прочтения на геном человка

~~~
SRR1146122.norm
SRR1146109.norm
SRR1146101.norm
SRR1146094.psor
SRR1146097.psor
SRR1146087.psor
~~~

Для количественного анализа данных потребуется [HTSeq](http://www-huber.embl.de/users/anders/HTSeq/doc/overview.html). [Установка HTSeq на Mac](http://www-huber.embl.de/users/anders/HTSeq/doc/install.html#installation-on-macos-x) требует наличия [SciPy](http://www.scipy.org/install.html). Поставить его можно через [Macports](http://www.macports.org):

~~~
sudo port install py27-numpy py27-scipy py27-matplotlib py27-ipython +notebook py27-pandas py27-sympy py27-nose
~~~

Далее из файлов `.sam` и файла `.gtf` нотации генов человека получаем количественные значения экспрессии каждого из генов. Например для `SRR1146087.psor.sam`: 

~~~
htseq-count map/SRR1146087.psor.sam Homo_sapiens.GRCh38.79.gtf > map/SRR1146087.psor.htseq
~~~

Объединяем таблицы в одну и помещаем в файл `htseq.tsv`:

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

### Variance Estimation

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
plotMA(res)
```

![Variance Estimation](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/plotMA.png)

```r
hist(res$pval, breaks = 50)
```

![Variance Estimation](https://raw.githubusercontent.com/latur/Bioinformatics-JS/master/notebook/Psoriasis/hist.png)
