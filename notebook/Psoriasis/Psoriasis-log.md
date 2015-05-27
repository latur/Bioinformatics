
### Получение списка файлов с указателем: болен/здоров

```r
info_file <- "/Volumes/Macintosh/Users/latur/Process/RNAseq/E-GEOD-54456/E-GEOD-54456.sdrf.txt";
data_file <- "/Volumes/Macintosh/Users/latur/Process/RNAseq/E-GEOD-54456/SRP035988.text";
info <- read.table(info_file, sep="\t", header=TRUE)[,2:3]
data <- read.table(data_file, sep="\t", header=TRUE)[,c(4,11)]
colnames(info) <- c("Id", "Skin")
colnames(data) <- c("Id", "FTP")
H <- merge(info, data, by = "Id")
write.table(H, "/tmp/ok.txt", quote = F, sep = " ", col.names = F)
```

### Выбираем 15 произвольных:

```
Normal:
wget -O SRR1146114.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146114/SRR1146114.fastq.gz
wget -O SRR1146179.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146179/SRR1146179.fastq.gz
wget -O SRR1146207.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146207/SRR1146207.fastq.gz
wget -O SRR1146172.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146172/SRR1146172.fastq.gz
wget -O SRR1146142.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146142/SRR1146142.fastq.gz
wget -O SRR1146126.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/006/SRR1146126/SRR1146126.fastq.gz
wget -O SRR1146118.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146118/SRR1146118.fastq.gz
wget -O SRR1146131.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/001/SRR1146131/SRR1146131.fastq.gz
wget -O SRR1146244.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146244/SRR1146244.fastq.gz
wget -O SRR1146248.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146248/SRR1146248.fastq.gz
wget -O SRR1146169.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146169/SRR1146169.fastq.gz
wget -O SRR1146121.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/001/SRR1146121/SRR1146121.fastq.gz
wget -O SRR1146139.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146139/SRR1146139.fastq.gz
wget -O SRR1146120.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146120/SRR1146120.fastq.gz
wget -O SRR1146177.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146177/SRR1146177.fastq.gz

Psoriasis:
wget -O SRR1146128.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146128/SRR1146128.fastq.gz
wget -O SRR1146083.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/003/SRR1146083/SRR1146083.fastq.gz
wget -O SRR1146100.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146100/SRR1146100.fastq.gz
wget -O SRR1146093.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/003/SRR1146093/SRR1146093.fastq.gz
wget -O SRR1146208.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146208/SRR1146208.fastq.gz
wget -O SRR1146124.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146124/SRR1146124.fastq.gz
wget -O SRR1146214.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/004/SRR1146214/SRR1146214.fastq.gz
wget -O SRR1146090.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146090/SRR1146090.fastq.gz
wget -O SRR1146162.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146162/SRR1146162.fastq.gz
wget -O SRR1146078.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/008/SRR1146078/SRR1146078.fastq.gz
wget -O SRR1146202.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/002/SRR1146202/SRR1146202.fastq.gz
wget -O SRR1146099.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/009/SRR1146099/SRR1146099.fastq.gz
wget -O SRR1146210.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146210/SRR1146210.fastq.gz
wget -O SRR1146080.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/000/SRR1146080/SRR1146080.fastq.gz
wget -O SRR1146237.fastq.gz ftp.sra.ebi.ac.uk/vol1/fastq/SRR114/007/SRR1146237/SRR1146237.fastq.gz
```

### Запуск FastQC 
~~~
./Tmp.sh FastQC /home/latur/Public/Source/Norm/
./Tmp.sh FastQC /home/latur/Public/Source/Psor/
./Tmp.sh RCount /home/latur/Public/Source/Norm/ /home/latur/Public/_count_1.txt
./Tmp.sh RCount /home/latur/Public/Source/Psor/ /home/latur/Public/_count_1.txt
~~~

Удаление неопределённых прочтений.
Удаление праймера в начале прочтений: (для всех файлов)

~~~
./FastqNRemove.sh ../Source/Norm/SRR1146114.fastq
~~~

Удаление расширения .x
~~~
./Tmp.sh RemoveExt /home/latur/Public/Source/Norm/ x
./Tmp.sh RemoveExt /home/latur/Public/Source/Psor/ x
~~~

### Запуск FastQC 
~~~
./Tmp.sh FastQC /home/latur/Public/Source/Norm/
./Tmp.sh FastQC /home/latur/Public/Source/Psor/
./Tmp.sh RCount /home/latur/Public/Source/Norm/ /home/latur/Public/_count_2.txt
./Tmp.sh RCount /home/latur/Public/Source/Psor/ /home/latur/Public/_count_2.txt
~~~

Удаление плохих прочтений
~~~
./Tmp.sh Filter /home/latur/Public/Source/Norm/
./Tmp.sh Filter /home/latur/Public/Source/Psor/
~~~

Удаление расширения .trim
~~~
./Tmp.sh RemoveExt /home/latur/Public/Source/Norm/ trim
./Tmp.sh RemoveExt /home/latur/Public/Source/Psor/ trim
~~~

### Запуск FastQC 
~~~
./Tmp.sh FastQC /home/latur/Public/Source/Norm/
./Tmp.sh FastQC /home/latur/Public/Source/Psor/
./Tmp.sh RCount /home/latur/Public/Source/Norm/ /home/latur/Public/_count_3.txt
./Tmp.sh RCount /home/latur/Public/Source/Psor/ /home/latur/Public/_count_3.txt
~~~

### Картирование
~~~
/users/asokolkova/STAR_2.3.0e.Linux_x86_64/STAR \
  --runThreadN 8 \
  --genomeDir /storage2/aigolkina/idxDasha/STARindex_v71/ \
  --readFilesIn /storage2/aigolkina/Igor/$1 \
  --sjdbOverhang 78 \
  --outFilterMultimapNmax 150 \
  --outFilterMismatchNmax 8
~~~

### Правка результатов (файлы некорректные встречаются)
~~~
cd ../SRR1146099
rm -f Aligned.rep.sam
./SamRepair Aligned.out.sam > Aligned.rep.sam
htseq-count Aligned.rep.sam ../Homo_sapiens.GRCh38.79.gtf > hn.htseq
~~~


```r
# Объединение таблиц
# Директория с .htseq файлами
workDir <- "/Volumes/Macintosh/Users/latur/Process/RNAseq/E-GEOD-54456/map/"
# Функция чтения .htseq таблицы
Fread <- function(file) read.table( paste(workDir, "/hn.htseq", sep = file) )
# Список файлов
fNorm = c('SRR1146118','SRR1146248','SRR1146121','SRR1146114','SRR1146126','SRR1146169');
fPsor = c('SRR1146099','SRR1146202','SRR1146128','SRR1146162','SRR1146100','SRR1146083','SRR1146208', 'SRR1146210');

# Первый столбец (наименование гена) всех .htseq файлов должен совпадать. 
# Извлекаем его из первого файла
box <- Fread(fNorm[1])["V1"]
colnames(box) = c("gene_id")

# Добавляем второй столбец (количественные данные экспрессии)
for(i in 1:length(fNorm)) {
  box[substr(fNorm[i],0,15)] = Fread(fNorm[i])[,2]
} 
for(i in 1:length(fPsor)) {
  box[substr(fPsor[i],0,15)] = Fread(fPsor[i])[,2]
} 
# Последние 5 строчек - техническая информация, вырезаем:
box <- box[1:(length(box[,1]) - 5),]
# Сохраняем таблицу как htseq.tsv
tsvFile <- paste(workDir, "htseq.tsv", sep = "")
write.table(box, tsvFile, quote = F, sep = "\t", row.names = F)
```

```r
# Установка bioconductor
source("http://bioconductor.org/biocLite.R") 
# Установка пакетов через biocLite
biocLite("pasilla")
biocLite("DESeq")

# Подключение библиотеки
library("DESeq")

workDir <- "/Volumes/Macintosh/Users/latur/Process/RNAseq/E-GEOD-54456/map/"
tsvFile <- paste(workDir, "htseq.tsv", sep = "")
box     <- read.table(tsvFile, header = T, row.names = 1)
design  <- data.frame(row.names = colnames(box),
  condition = c("norm","norm","norm","norm","norm","norm","psor","psor","psor","psor","psor","psor","psor","psor")
)

# Поправка на количество прочитанных ридов
cds = newCountDataSet(box, design$condition)
cds <- estimateSizeFactors( cds )
cds <- estimateDispersions( cds )

plotDispEsts(cds)

# Прочли фрагментов РНК гораздо меньше, чем было в смеси
res <- nbinomTest(cds, "norm", "psor")
plotMA(res)
hist(res$pval, breaks = 50)

resTmp <- res[!is.na(res$padj), ]
resTmpOrder <- resTmp[ order(resTmp$padj), ]
resTmpOrder[1:15,]
write.table(resTmpOrder[1:50,1], "/tmp/probable.tsv", quote = F, sep = " ", row.names = F)
```


### Текст вспомогательного `Tmp.sh`:

```bash
#!/bin/bash

norm="/home/latur/Public/Source/Norm/";
psor="/home/latur/Public/Source/Psor/";
ftqc="/home/latur/Public/FastQC/fastqc";
filtr="/home/latur/Public/App/filter"

################################################################################ 
# Удаление расширения в указанной папке
# ./Tmp.sh RemoveExt /home/latur/Public/Source/Norm/ ext newext

function RemoveExt {
  cd $1;
  ls *.$2 | while read f 
  do
    src=${f##*/_}
    srcrem=${src%.$2}
    srcnew=$srcrem$3
    echo "> mv $src $srcnew";
    mv $src $srcnew
  done
}

if [ $1 == 'RemoveExt' ]; then
  RemoveExt $2 $3 $4;
fi


################################################################################ 
# Запуск FastQC
# ./Tmp.sh FastQC /home/latur/Public/Source/Norm/

function FastQC {
  cd $1;
  ls * | while read f 
  do
    src=${f##*/_}
    echo "> $ftqc $src";
    $ftqc $src;
    echo "> Done";
  done
}

if [ $1 == 'FastQC' ]; then
  FastQC $2 $3;
fi


################################################################################ 
# Извлечение количества прочтений из html 
# ./Tmp.sh RCount /home/latur/Public/Source/Norm/

function RCount {
  cd $1
  ls *.html | while read f 
  do
    s=${f##*/_}
    n=${s%_fastqc.html}
    cnt=$(cat $s | grep -oP "<td>Total Sequences</td><td>[0-9]{1,15}")
    echo "$n:${cnt:28}" >> $2
  done
}

if [ $1 == 'RCount' ]; then
  RCount $2 $3;
fi


################################################################################ 
# Удаление плохих прочтений
# ./Tmp.sh Filter /home/latur/Public/Source/Norm/

function Filter {
  cd $1
  ls *.fastq | while read f 
  do
    src=${f##*/_}
    echo "> $filtr $src > $src.trim";
    $filtr $src > $src.trim;
    rm -f $src;
  done
}

if [ $1 == 'Filter' ]; then
  Filter $2 $3;
fi
```

