---
layout: page
title:  "Walking Through TOAST, Part1: Installation & Dependencies"

teaser: "Set up TOAST and prepare to harness more data"
categories:
    - software
tags:
    - software TOAST
    
image:
   thumb: "TOASTpage2_alt.jpg"
header:
    image_fullwidth: "TOASTpage2_alt.jpg"
    title: ""
    caption: Somewhere in Eastern Washington
comments: true
show_meta: false    
---
<br>
This is a three part tutorial. Part 1 focuses on installation of TOAST. 
<br>
<br>
Note that TOAST requires R version 3.6.1 or higher for installation of dependencies and functionality. 
<br>
Update R prior to going any further
<br>
<br>
<a href='https://carolinafishes.github.io/software/TOAST_manual2/'>Part 2 focuses on gathering public data using BUSCO.</a> Note that ONLY LINUX users can use BUSCO!
<br>
<br>
<a href='https://carolinafishes.github.io/software/TOAST_manual3/'>Part 3 focuses on visualization of missing data patterns and alignment assembly</a>. This functionality works on all platforms.

<h3>1. Installation</h3>
TOAST can be installed from github, but relies on dependencies not yet on CRAN. The easiest way to install TOAST and all dependencies is to copy the following code  

<pre>

#if you do not already have devtools
install.packages("devtools")

library(devtools)
devtools::install_github("carolinafishes/toast")

library("toast")
</pre>
<br>
<a href='https://github.com/carolinafishes/toast'> You can also download the R scripts from github</a> and install it manually. 


<h3>2. R Dependencies</h3>
TOAST is built upon the efforts of several other R packages including:
<pre>
gplot
rentrez
ggplot2 
devtools 
viridis 
packcircles 
gridExtra 
data.tree 
circlepackeR 
foreach 
doParallel 
seqinr 
reshape 
usethis 
streamgraph 
</pre>

LINUX USERS ONLY: Please note that rentrez makes use of several dependencies that may not be on your computer. If you encounter errors during the installation of this package here is a list of dependencies you may need to install as follows in terminal
<pre>
sudo apt install openssl
sudo apt install libssl-dev
sudo apt install libcurl4-opensll-dev
sudo apt install libxml2-dev
</pre>
If you did the above and only wish to visualize missing data patterns/assemble concatenated alignments you are ready to <a href='https://carolinafishes.github.io/software/TOAST_manual2/'>move on to part 2.</a><br> 
<br>
If you are a LINUX user and wish to harness BUSCO orthologs, keep reading! 
<br>
<h3>2. Additional Dependencies for Linux Users: BUSCO </h3>
<a href='https://busco.ezlab.org/'>BUSCO</a> is limited to only running on Linux machines. If you plan to use TOAST to visualize missing data patterns, these functions will work on any platform (Windows and UNIX). 
<br>
<br>
However, you need to be using LINUX to use any functions that involve <a href='https://busco.ezlab.org/'>BUSCO</a> harvesting of data. Further, MafftOrientAlign requires a Unix (Linux or OSX) environment.
 
<br>
<br>
Please see the BUSCO manual for instructions on installation. 
<br>
Note that BUSCO recommends specific releases of HMMER and BLAST. 
<br>
We recommend following the BUSCO instructions to ensure compatibility. 
<br>
<br>
After you have successfully installed BUSCO you will need to modify the config.ini file to direct BUSCO to both BLAST and HMMER. 
<br>
Please see the BUSCO manual and follow these directions carefully.
<br>
CHECK that you have successfully installed BUSCO prior to proceeding any further!
<br>
<h3>2. Additional Dependencies for Linux Users: MAFFT </h3>
TOAST requires you install <a href='https://mafft.cbrc.jp/alignment/software/'>MAFFT</a> and place this into your global path (e.g., modify your ~/.bashrc file).
<br>
<br>
<h3><a href='https://carolinafishes.github.io/software/TOAST_manual2/'>Continue to Part 2</a>



