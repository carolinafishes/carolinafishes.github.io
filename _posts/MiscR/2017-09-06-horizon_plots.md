---
layout: page
title:  "Horizon plots of sequence data"

teaser: "Visualizing the predicted benefits of adding more data"
categories:
    - MiscR
tags:
    - MiscR PhyInformR 
    
image:
   thumb: patagonia_banner.jpg
   homepage: patagonia_banner.jpg

header:
    image_fullwidth: "patagonia_banner.jpg"
    title: ""
    caption: Southern Chile, South America
comments: true
show_meta: false    
---
<h3>Sequence Data Horizons</h3>

We recently <a href='https://www.sciencedirect.com/science/article/pii/S1055790318302306?via%3Dihub'> finished a study</a> looking at predicted levels of phylogenetic information content in RADseq data. One of the figures in the paper involved using horizon plots to compare the probability of correctly resolving a small internode at different time depths:
<img class="b30" src="https://carolinafishes.github.io/images/Near_et_al_horizon_plot.png" alt="">

Horizon plots are a convenient way to display information content as a function of increasing sequence length while being able to simultaneously compare different time periods. These are normally used in time series data and an excellent tutorial on their general use can be found <a href='https://www.r-bloggers.com/application-of-horizon-plots/'> here</a>.  

<h3> Here is a walkthrough of how to do this in PhyInformR </h3>

<br>
This tutorial is for users already familiar with PhyInformR. If you haven't gone through the tutorial, give it a whirl! To start just read in this function, this is going to do the hard work. 
<pre>
horizon.prep<-function(rates,pre_name,filename,increment, time, internode,state_space){
rates[which(rates>0)]->nonzero
length(nonzero)->max
nonzero[1:increment]->start
seq(0,max,increment)->range
outsa<-matrix(ncol=1, nrow=length(range))
outsb<-matrix(ncol=1, nrow=length(range))
outsc<-matrix(ncol=1, nrow=length(range))
for(i in 2:length(range)){
  range[i]->stop
  nonzero[1:stop]->start
  as.matrix(start)->start2
  Approximator(time,internode,start2,4)->all
  all[1]-all[3]->signal.to.noise
  stop-increment->begin
  #cbind("one",begin,stop, signal.to.noise)->output
  
  signal.to.noise->outsc[i,]
    begin->outsa[i,]
      stop->outsb[i,]
}
rep(pre_name,length(range))->nn
cbind(nn,outsa,outsb,outsc)->final
write.csv(final, file=filename)
return(final)
}
</pre>
Let's demystify this a bit. 
<br>
rates: You need to feed this your site rates just like any other PhyInformR function.
<br>
pre_name: This will keep your times straight in the csv. go with pre_name="T_yourtime" where your time is the depth of the tree (e.g., 5, 10, 40, 500, etc)
<br>
filename: filename="yourfilename"
<br>
increment: how many more sites you want to sample per iteration (e.g., every 50, 100, 500 bp)
<br>
time: depth of the tree (T)
<br>
internode: internode length (t)
<br>
state_space: how many different types of characters you have, (e.g., 4 for nucleotides).
<br>
<br>
Note that here we are using the files from Prum et al. (2015), which are <a href='https://zenodo.org/record/30269?ln=en#.VfJJ-GRViko'> available on Zenodo (DOI 10.5281)</a>
though you could also substitute site rates from your own markers here. 
<br>
<br>
For the purpose of the tutorial I have only read a portion of the site rates (ratesA in the zenodo directory), in this case 27,222 of the sites. 
<br>
<br>
Now we can use these rates and make some plots for resolving a small internode 20,30,40 or 50 million years ago. For the purpose of tutorial I will only test increments of 1000 sites. Also note that the Prum et al guide tree was based on a tree with a root height of 1, so we are going to pick some relative times for the sake of tutorial. With your own trees the T and t values should reflect the scale your guide tree was based on. 
<pre>
library(PhyInformR)
setwd("~/Documents/your directory here")
horizon.prep(ratesA,pre_name="T_20",filename="20_million",1000, .28, .03,4)->twenty
horizon.prep(ratesA,pre_name="T_30",filename="30_million",1000, .38, .03,4)->thirty
horizon.prep(ratesA,pre_name="T_40",filename="40_million",1000, .48, .03,4)->forty
horizon.prep(ratesA,pre_name="T_50",filename="50_million",1000, .58, .03,4)->fifty
horizon.prep(ratesA,pre_name="T_50",filename="50_million",1000, .68, .03,4)->sixty
horizon.prep(ratesA,pre_name="T_50",filename="50_million",1000, .78, .03,4)->seventy
horizon.prep(ratesA,pre_name="T_50",filename="50_million",1000, .88, .03,4)->eighty
</pre>
<br>

<br>We need a few libriaries to plot these so load these really fast
<pre>
require(lattice)
require(reshape2)
require(latticeExtra)
require(quantmod)
</pre>

Almost there! Above you should have csv outputs of each step so you don't have to repeat the calculations each time and just read those in if you need to plot again. For plotting we first sort what we need. 
<pre>
na.omit(twenty[,4])->rh_twenty
na.omit(thirty[,4])->rh_thirty
na.omit(forty[,4])->rh_forty
na.omit(fifty[,4])->rh_fifty
na.omit(sixty[,4])->rh_sixty
na.omit(seventy[,4])->rh_seventy
na.omit(eighty[,4])->rh_eighty
as.numeric(rh_twenty)->rh_twenty
as.numeric(rh_thirty)->rh_thirty
as.numeric(rh_forty)->rh_forty
as.numeric(rh_fifty)->rh_fifty
as.numeric(rh_sixty)->rh_sixty
as.numeric(rh_seventy)->rh_seventy
as.numeric(rh_eighty)->rh_eighty
cbind(rh_twenty,rh_thirty,rh_forty, rh_fifty,rh_sixty,rh_seventy,rh_eighty)->signal
colnames(signal)<-c("twenty","thirty","forty","fifty","sixty","seventy","eighty")
</pre>
Now plot and add some separation between graphs with small white band
<pre>
horizonplot(ts(signal), horizonscale=.3, origin=0,colorkey = TRUE, layout=c(1,10))+

    layer(panel.xblocks(height=0.005,col="white",...))

</pre>
You should have something that looks like this:
<img class="b30" src="https://carolinafishes.github.io/images/horizon_example.png" alt="">

<br>
Note that in order for this to makes sense, you should keep either T or t constant. For example, you could flip this logic and ask for a tree of depth X (e.g., 30 million years) what is the predicted benefit of adding more data for resolving an internode of length Y, Z, etc. 
<br>
<br>
That's it! From here you can keep modifying the above, breaking out different subsets of data such as sites, or begin to use your favorite graphic editing software to customize as you like. We are working on a new release of PhyInformR that will have a more elegant version of the above as well as a lot of new theory for data exploration, so check back for updates.

<h3>Citations</h3>
<br> If you use this tutorial and code in a project, please cite:
<br>
<br>
Near, T.J., MacGuigan, D., Parker, C.E., Jones, C., Struthers, C., Dornburg, A. 2018. Phylogenetic analysis of Antarctic notothenioids illuminates the utility of RADseq for resolving Cenozoic adaptive radiations. Molecular Phylogenetics and Evolution 129: 268—279
<br>
<br>
and
<br>
<br>
Dornburg, A., Tamagnon, J., Townsend, J.P. 2016. PhyInformR: Phylogenetic experimental design and phylogenomic data exploration. BMC Evolutionary Biology 16 (1): 262


