---
layout: page
title:  "Walking Through phyinformR, Part1: Installation & PI Profiles"

teaser: "Learn how to conduct phylogenetic informativeness analyses in R, Part 1"
categories:
    - software
tags:
    - software phyinformR
    
image:
   thumb: "informer_thumb.jpg"
header:
    image_fullwidth: "software_stream.jpg"
    title: ""
    caption: Hells Canyon, ID
comments: true
show_meta: false    
---
<br>
This is a three part tutorial. Part 1 focuses on the generation of PI profiles
<br>
<br>
<a href='https://carolinafishes.github.io/software/phyinformR_manual2/'>Part 2 focuses on advanced features, visualizations, and calculations of quartet resolution probabilities</a>
<br>
<br>
<a href='https://carolinafishes.github.io/software/phyinformR_manual3/'>Part 3 focuses on visualization</a>

<h3>1. Installation</h3>
PhyInformR is easy to install. Simply install via CRAN or <a href='https://github.com/carolinafishes/PhyInformR'>download the compressed R script from github</a> and install it manually 

<pre>
##cran install
install.packages("PhyInformR")
library(PhyInformR)
</pre>
<br>
To install from github
<pre>
library(devtools) 
install_github("carolinafishes/PhyInformR")
library(PhyInformR)
</pre> 
<br> FOR WINDOWS USERS - devtools will not install depencies for certain versions of windows. This is being addressed and should be fixed in the next major release. If your install fails, please first install the dependencies through CRAN and then use devtools as above for the final install. 
<br>
<pre>
install.packages("doParallel") 
install.packages("phytools") 
install.packages("splines") 
install.packages("gplots") 
install.packages("RColorBrewer") 
install.packages("foreach") 
install.packages("iterators") 
install.packages("geiger") 
install.packages("doParallel") 
install.packages("gridExtra") 
install.packages("hexbin") 
install.packages("PBSmodelling") 
install.packages("ggplot2")
</pre>	
Once you load PhyInformR, set the number of cores at the start of your session to enable later parallel processing if desired
<br>
We will also be hosting more sample data through Zenodo archives and github to explore new features as we develop them, so check back often!
<br>
<h3>2. Dependencies</h3>
PhyInformR is built upon the efforts of several other R packages including:
<pre>
phytools
splines
gplots
RColorBrewer
foreach
iterators
geiger
doParallel
gridExtra
hexbin
ggplot2
PBSmodelling
</pre>

Several functions in PhyInformR use parallel processing. Enable this via
<pre>
library(doParallel) 
#set the number of cores if you are working in parallel 
registerDoParallel(cores=8)
</pre>

now set your working directory to save files
<pre>
setwd("~/Documents/phyinformR")
</pre>


<h3>3. Phylogenetic Informativeness Profiles</h3>
<br> Townsend's phylogenetic informativeness profiles are a visual tool that enables assessment of the predicted utility of a given sequence for phylogenetic inference across a timescale of interest. Use of this method requires two inputs: site rates and a guide tree
<br>
<br>
Site rates can be obtained through a variety of software applications such as hyphy, rate4site, or DNArates. The phydesign web interface2 makes quantifying site rates easy: 
<br>
<br>
1) Navigate to http://phydesign.townsend.yale.edu/
<br>
2) Upload an alignment and ultrametric tree 
<br>
3) Choose your program for estimating rates from a dropdown 
<br>
4) Wait for the email that your results are ready 
<br>
Once you have site rates, use the the "c" function in R to format them. You are ready to explore your data
<pre> mysiterates<-c(0.00034, 0.005678, 0.0,..., 0.008967)
</pre>
<h3> Getting Started </h3>
For this walkthrough, we will be using the avian tree and site rates from Prum et al.3 that are distributed with PhyInformR
<br>
<pre>
read.tree(system.file("extdata","Prumetal_timetree.phy",package="PhyInformR"))->tree
as.matrix(prumetalrates)->rr
informativeness.profile(rr,tree, codon="FALSE", values="off")
</pre>
<br> Easy! Now you can make phylogenetic informativeness profiles (Townsend 2007) that look like this
<img class="b30" src="https://carolinafishes.github.io/images/informR_1.png" alt="">
To obtain PI profiles for each codon position, you can toggle codon="TRUE" if you are in reading frame
<pre>
informativeness.profile(rr,tree, codon=”TRUE”)
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_2.png" alt="">
If you would like phyinformR to output of branching times and PI values, simply switch the values="on"

<h3> Exploring Data with PI Profiles </h3>
<br>Let's do something different and partition the data by site rates. First we will view the rates:
<pre> hist(rr) </pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_3.png" alt="">

We can see a bit of a tail going out, lets see what happens when we partition the data by rates above and below (0.003). We'll start by creating some partitions

By defining rate based breaks in our data, we can see the PI of "fast" versus "slow" sites
<pre>
lower<-c(0,0.003) 
upper<-c(0.003000001,10) 
cbind(lower,upper)->breaks
</pre>
<br>
phyinformR has a function allowing profiles to be broken along any point in the rate vector, to assess changes in phylogenetic informativeness associated with thresholding the dataset at that rate
<code>multi.profile(rr,tree, breaks)</code>
<img class="b30" src="https://carolinafishes.github.io/images/informR_4.png" alt="">
Partition 1 represents the slower site rates. As expected, the decay in phylogenetic informativeness for partition 1 is much lower across the tree than for partition 2. Conversely, we can see the faster sites in part two are informative for recent divergences, yet exhibit a rapid decline in informative site patterns as we move to deeper portions of the tree.
<br>
The above examples serve to illustrate what phyinformR does, but this approach is not common practice. Instead, it is more common to work with character sets partitioned by loci you wish to evaluate. In this case, simply use the same approach as above to define your loci and use defined.multi.profile 
<br>
In this example we will compare locus 1, that spans sites 1-1594 in the alignment and locus2, that spans sites 1595-2787.

<pre>
Lower<-c(1,1594)
Upper<-c(1595,2787) 
Breaks<-cbind(Lower,Upper) 
defined.multi.profile(rr,tree,Breaks, values="off")
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_5.png" alt="">
In this example the two loci are very similar.
<br>
Using this logic we can break datasets into any size partition we wish to evaluate. Feel free to give this a whirl with other included trees on the <a href='https://github.com/carolinafishes/phyinformR'> github repo</a> from one of our recent studies (<a href='https://www.researchgate.net/publication/275103683_Phylogenetic_analysis_of_molecular_and_morphological_data_highlights_uncertainty_in_the_relationships_of_fossil_and_living_species_of_Elopomorpha_%28Actinopterygii_Teleostei%29'>Dornburg et al. 2015</a>; <a href='https://www.researchgate.net/publication/268452611_The_impact_of_shifts_in_marine_biodiversity_hotspots_on_patterns_of_range_evolution_Evidence_from_the_Holocentridae_%28squirrelfishes_and_soldierfishes%29'>Dornburg et al. 2014</a>) to get comfortable. Now, how about visualizing signal or noise probabilities across a tree?
<br>
<br>
<h3><a href='https://carolinafishes.github.io/software/phyinformR_manual2/'>Continue to Part 2</a>


