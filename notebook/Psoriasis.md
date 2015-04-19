# Transcriptome analysis of psoriasis in a large case-control sample: RNA-seq provides insights into disease mechanisms

## Исходные данные:

* **ArrayExpress** [E-GEOD-59148](http://www.ebi.ac.uk/arrayexpress/experiments/E-GEOD-59148/)
* **Fastq файлы** [SRP044108](http://www.ebi.ac.uk/ena/data/view/SRP044108)

## Обработка:

Изучаются два вида пациентов — больные просариаз и здоровые. Файл `E-GEOD-54456.sdrf.txt` содежит информацию о пациентах, в том числе указатель `normal_skin` и `psoriasis_skin`. 

[Здесь](http://www.ebi.ac.uk/ena/data/view/SRP044108) имеется файл `SRP035988.text` с ftp ссылками на `.fastq` файлы секвенирования. Извлекаем три файла для здорового и три файла для больного пациента.

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

Данные засорены. Удаляем прочтения, которые более чем на половину состоят из неопределённых нуклеотидов `N`. [Код на JS](https://gist.github.com/latur/ffb9dbd1952aed731d8c). При запуске скрипта рекомендуется разбить каждый `.fastq` файл на части, обработать эти части и результат склеить. 

~~~
$ split -l 30000000 SRR1146106.norm.fastq SRR1146106.norm.fastq.p_
~~~ 


