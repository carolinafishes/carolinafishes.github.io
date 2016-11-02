---
layout: page
title:  "Walking Through phyinformR"

teaser: "Learn how to conduct phylogenetic informativeness analyses in R, part 2"
categories:
    - software
tags:
    - software phyinformR
    
image:
   thumb: "informer_thumb.jpg"
header:
    image_fullwidth: "texas_banner.jpg"
    title: ""
    caption: Guadalupe National Park, TX
comments: true
show_meta: false    
---
This is a two part tutorial. <a href='https://carolinafishes.github.io/software/phyinformR_manual/'>Part 1 focuses on the generation of PI profiles</a>
<br>
This part focuses on advanced features, visualizations, and calculations of quartet resolution probabilities 

<h3>4. Resolution probability quantification</h3>
Townsend et al. (2012) introduced theory that takes into the account the interplay of site rates, time, and internode length between species divergences to assess the predicted probabilty of data contributing to accurate topological resolution 
<br>
Use of this method requires three inputs: 
<br>
site rates, state space, and internode lengths
<br>
Site rates are covered above. Now we'll introduce the internode lengths and state spaces and will continue using the avian tree and site rates from Prum et al. (2015) that are distributed with phyinformR.In case these are not in memory already use
<pre>
library(ape) 
read.tree(system.file("extdata","Prumetal_timetree. phy",package="PhyInformR"))->tree 
as.matrix(prumetalrates)->rr
</pre>
<h3> Getting Started </h3>
There are three quantities that phyloInformeR calculates with regard to a specified internode given a set of site rates: Quartet Internode Resolution Probability (QIRP, "Quirp"), Quartet Internode Homoplasy Probability (QIHP, "Quip"), and Quartet Internode Polytomy Probability (QIPP, "Quippy"). Townsend et al.1 introduced two ways to calculate these quantities: An analytical approximation and a Monte Carlo based solution. Both approaches depend on site rates and two user defined internode lengths, T (time from present) and t (internode)
<br>
<img class="b30" src="https://carolinafishes.github.io/images/phyinformR_1.png" alt="">
The theory of Townsend et al. defines T and t based on a phylogenetic quartet with even branch lengths. Under this assumption, T is the time from the present to the ancestor of a taxon (red in the example above) and t, the focal internode length (grey in the example above). Later in this section we will discuss how to perform similar analyses allowing for uneven quartets 
<br>
<br>
Lets start by calculating approximate solutions for QIRP, QIHP, and QIPP
<br>
<br>
Using the above illustration, you should have an idea of what T (time) and t (internode distance) you will want to use for your data. 
<br>
<br>
For state space, a binary morphological matrix could be assessed by setting the state space to 2 or amino acid (20 or ~5)1, or other types of data with differing numbers of characters. If you are using nucleotides, despite having a four character states, Simmons et al. have demonstrated the state space to be better modelled using 3 states, so we will go with that for the remainder of this guide. 
<br>
Here is the implementation using T= 100 million year (Ma) and t= 0.5 Ma
<br>
<pre> Approximator(100,0.5, rr, 3) </pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_6.png" alt="">
<br>
Alternatively you can use the Monte Carlo simulation approach1. Since the simulation is time consuming dependent on the number of simulations and the number of sites, we recommend that you do this on a cluster or while you are doing something else. The output is automatically recorded to file. The input looks similar to the approximation, though now you specify a file name for the probabilities and an image file name. Note that the two files must have different names! 
<br>
You can also toggle the screen output on and off by setting image to either "TRUE" or "FALSE". The simulation can be run in parallel so 
<br>
Remember to set your cores appropriately using the registerDoParallel(cores=8) 
<br>
Here is the function using the same T and t and 5000 simulations on a subset of sites to save time
<pre>
as.matrix(prumetalrates[1:20000])->rr2 
parallel.cluster.signal.noise(100,0.5,rr2,5000,3,filename="test",imagename="testimage",image="FALSE
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_7.png" alt="">
<br>
<h3> 5. Advanced resolution probability quantification </h3>
<br>
Calculations based on the equations of Townsend et al.(2012) make several assumptions 
<br>
<br>
1) equal base frequency distributions in the alignment 
<br>
<br>
2) equal branch lengths within the phylogenetic quartet 
<br>
<br>
3) a Jukes-Cantor model of sequence evolution
<br>
<br>
Su et al. (2014) provided extensions to the equations of Townsend et al.(2012) that enable any nucleotide substitution model or distribution of base frequencies and Su and Townsend (2015) provided the theoretical framework for relaxing the assumption of even branch lengths 
<br>
To use these extension, first specify your model settings based on a model selection program such as Modeltest, or Partitionfinder6. Model settings are defined as follows and require changing for different nucleotide substitution models, base frequencies, and branch lengths 
<br>
For example:
<pre>
a=1 
b=1 
c=1 
d=1 
e=1
f=1 
Pi_T=0.25
Pi_C=0.25 
Pi_A=0.25 
Pi_G=0.25
internode<-c(62.4937, 62.4937, 62.4937, 62.4937, 8.9939)
</pre>
Pi_T through Pi_G are the empirical base frequency parameters 
<br>
<br>
IMPORTANT | these must sum up to one | Pi_T + Pi_C + Pi_A + Pi_G = 1 
<br>
<br>
a through f are the relative rate parameters which are defined as follows
<br> 
rCT = rTC = a; rAT = rTA = b; rTG = rGT = c; rCA = rAC = d; rCG = rGC = e; rAG = rGA = f 
<br>
 A table of relative rate parameter settings for different substitution models taken from Su et al. (2014) is attached for reference
<img class="b30" src="https://carolinafishes.github.io/images/informR_8.png" alt="">
internode in the above code is as an object containing the numerical values of branch lengths of T1, T2, T3, T4, and the internode length t0 for the four - taxon tree in question
<img class="b30" src="https://carolinafishes.github.io/images/phyinformR_1.png" alt="">
IMPORTANT -T1 and T2 must belong to the same sister clade and T3 and T4 must belong to the other clade in the hypothesized topology of the four - taxon problem in question (see above)
<br>
<br>
Quartet trees do not need to be rooted. All four subtending branches may vary
<img class="b30" src="https://carolinafishes.github.io/images/phyinformR_1.png" alt="">
<br>
You can quantify QIHP, QIPP, and QIRP with
<pre>
allmodel.signal.noise (a,b,c,d,e,f,internode,Pi_T,Pi_C,Pi_A,Pi_G, rr)
</pre>
From left to right, the three values represent QIHP, QIPP, and QIRP
<h3> Posterior Distributions </h3>
Since branch length are rarely known with certainty, phyinformR can also be used to calculate QIRP, QIPP, and QIHP values across a distribution of trees such as those obtained from Bayesian analyses. 
<br>
For this example, we will read in use the sample distribution of bichir trees from a study by Near et al.8 that is provided with the release 
<pre>
Need from Nick>
</pre>	
First you will need to specify the quartet of interest. In the bichir dataset, we will look at the clade containing Polypterus congicus as this species was not placed with high support in the tree. We define the quartet as follows
<pre>
quart<- c("Polypterus_congicus","Polypterus_bichir","Polypterus_ansorgii" ,"Polypterus_endlicheri" ) 
</pre>
The remaining objects should be familiar, please review the above and preceeding page if the variable names seem enigmatic. To compute over a distribution of trees, run the function
<pre>
su.bayes(a,b,c,d,e,f,Pi_T,Pi_C,Pi_A,Pi_G,rate_vector,quart,trees)->final
</pre>
This function returns a matrix of internodes and T values from the trees and their associated QIHP,QIPP, and QIRP values 
<pre>
su.bayes runs in parallel 
<br>
Remember to set your cores appropriately using registerDoParallel(cores=8) 
<br>
su.bayes returns a matrix of internodes and T values from the trees and their associated QIHP, QIPP, and QIRP values. This matrix can be summarized using
<pre>
plot.posterior(final, plot="QIPs")   #or
plot.posterior(final,plot="violin")
</pre>
Setting plot="qips" returns a density plot of the quartet internode resolution/polytomy/homoplasy probabilities and the internode lengths
<img class="b30" src="http://carolinafishes.github.io/images/informR_14.png" alt="">
Visualizing the density of calculations reveals a trend that is common in phylogenetic datasets. Both lack of information and increased probabilities of convergence misleading inference plague smaller internodes. In this plot we can see that the bulk of the posterior density is in the realm of low QIRP and high QIPP, so we can conclude that the lack of resolution of this clade by this locus is in part predicted to be driven by limited information content
<br>
<br>
Plot = "violin" returns violin plots of the quartet internode resolution/polytomy/homoplasy probabilities and the internode lengths 
<img class="b30" src="http://carolinafishes.github.io/images/informR_15.png" alt="">
Visualizing the quantiles and kernel density of calculations allows for a additional perspective of how topological and branch length uncertainty influence quantifications. In this case we can see from the box plot of quantiles that QIHP is generally low, but that QIPP is centered near 0.45 with the majority of trees leading to a calculation between about 0.5 and 0.35. The kernel density gives us additional perspective, showcasing somewhat inverted distributions between QIRP and QIPP, with the majority of QIRP values being lower. 

<h3>6. Advanced visualizations</h3>
The quantitative framework of quartet internode calculations lends itself wonderfully to the development of new ways to visualize information in a given dataset. This section highlights graphics from a few recent publications 
<br>
<br>
Hwang et al. 2015 depicted QIRP across an entire tree by plotting the QIRP of a marker for each node simultaneously. This plot can be drawn by providing a tree, rate vector, and state space as in section 3. For this example, we will use a single tree from Near et al. 2014 along with site rates from the same study
<pre>
	Need from Nick

trees[[1]]->bichir_tree
PlotTreeSI(sample.tree,rr,3) </pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_11.png" alt="">
Here the branch lengths (x axis) and the blue lines (QIRP, y axis) match up and we can see that signal is pretty high for many nodes. However, some of the smaller internodes are predicted to be impacted by homoplasy or contain little information. We can explore this further by looking at the rate distribution. First we will get the rates from a partition we defined in the the PI profile section:
<br>
<br>
Visualizing Phylogenetic Experimental Design
<br>
Say we are interested choosing a new marker to sequence for bichirs. 
<br>
We can compare the predicted utility of rag1 to candidate markers using this plotting method. In this example we will compare rag1 with the first locus from Prum et al. 2015
We'll start by isolating the locus

<pre>as.matrix(prumetalrates[1:1594])->candidate.locus
</pre>
Now we can compare to the above plot as follows
<pre> Plot.Another.TreeSI(bichir_tree, candidate.locus,3,col="red",type=3)</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_12.png" alt="">
In the above plot QIRP is on the Y axis and time is on the X axis. Blue lines correspond to the QIRP values of the tree internodes for rag1 while red lines correspond to our candidate locus. This visualization reveals that the candidate marker is predicted to be of higher utility for resolving every node in the bichir tree. This sort of visualization can be a great heuristic for choosing probe sets or primers for cost and time effective sequencing of markers

This form of visualization also displays overall trends of markers over time, and can help disentangle sources of error in tree inference. However, the above method requires a fixed internode length. Prum et al. 2015 provided an alternative visualization that accommodates for uncertainty in internode length  

Note that here we are using the files from Prum et al. (2015), which are <a href='https://zenodo.org/record/30269?ln=en#.VfJJ-GRViko'> available on Zenodo (DOI 10.5281)</a>
though you could also substitute site rates from your own markers here. 
<br>
Download the above files and open prumetal_heatmap_rosetta.r that is hosted on the github repository with phyinformR
<br>
Navigate to the "Phylogenetic_Informativeness" part of the downloaded directory 
<br>
Change the setwd() function at the top of the rosetta file to the directory path, save, then source
<pre>
setwd("~/yourpath/Zenodo/Phylogenetic_Informativeness")
source("~/yourpathtofile/prumetal_heatmap_rosetta.r")
</pre>
This file translates the rates into locus specific rate matrices for you to explore. For this tutorial we will sort some loci by length to ask whether size of the locus is associated with increased information content. We are going to visualize a random subset of loci for the sake of keeping the tutorial manageable, though feel free to explore the full data further!

<pre>
length(L216)->leL216
length(L182)->leL182
length(L149)->leL149
length(L213)->leL213
length(L184)->leL184
length(L223)->leL223
length(L305)->leL305
length(L8)->leL8
length(L203)->leL203
length(L95)->leL95
length(L41)->leL41
length(L295)->leL295
length(L107)->leL107
length(L163)->leL163
length(L21)->leL21
length(L2)->leL2
length(L325)->leL325
length(L80)->leL80
length(L28)->leL28 c(leL216,leL182,leL149,leL213,leL184,leL223,leL305,leL8,leL203,leL95,leL41,leL295,leL107,
leL163,leL21,leL2,leL325,leL80,leL28)->ll names(ll)<-
c("leL216","leL182","leL149","leL213","leL184","leL223","leL305","leL8","leL203","leL95",
"leL41","leL295","leL107","leL163","leL21","leL2","leL325","leL80","leL28") 
sort(ll)
</pre>
The guide tree from Prum et al. 2015 used relative rates (root height=1), so we are going to look at resolving Neoaves with a crown at .30. We begin by calculating the signal for different internode lengths. Note that the loci were already formatted as matrices in the Prum et al. 2015 script.
<pre>
space.maker(allrates,.30,3)->a1 
space.maker(L213,.30,3)->a2 
space.maker(L182,.30,3)->a3
space.maker(L203,.30,3)->a4 
space.maker(L149,.30,3)->a5 
space.maker(L2,.30,3)->a6 
space.maker(L295,.30,3)->a7 
space.maker(L325,.30,3)->a8 
space.maker(L107,.30,3)->a9 
space.maker(L41,.30,3)->a10 
space.maker(L216,.30,3)->a11 
space.maker(L28,.30,3)->a12 
space.maker(L184,.30,3)->a13 
space.maker(L8,.30,3)->a14 
space.maker(L95,.30,3)->a15 
space.maker(L80,.30,3)->a16 
space.maker(L163,.30,3)->a17 
space.maker(L21,.30,3)->a18 
space.maker(L305,.30,3)->a19 
space.maker(L223,.30,3)->a20    
</pre>
We now take this output and assemble our heatmaps.
<pre>
rbind(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20)->demo as.matrix(demo)->demo2
row.names(demo2)<-
c("allrates","L213","leL182","leL203","leL149","leL2","leL295","leL325","leL107","leL41","l
eL216","leL28", "leL184","leL8","leL95","leL80","leL163","leL21","leL305","leL223")
.30/20->by.this 
seq(by.this,0.30-0.0001,by=by.this)->lilts
colnames(demo2)<-lilts
heatmap.2(demo2, Colv=F,Rowv=F, scale='none') 
</pre>
<br>
<img class="b30" src="https://carolinafishes.github.io/images/informR_13.png" alt=""> 
<br> 
This heatmap shows us the probability of correct resolution for increasingly small internodes. This map can be generated for other loci and the internode distances can be zoomed in on using the space.maker.narrow function.
<br>
<br>
<h3> 7. References </h3>
Dornburg, A., M. Friedman, and T. J. Near. 2015. Phylogenetic analysis of molecular and morphological data highlights uncertainty in the relationships of fossil and living species of Elopomorpha (Actinopterygii: Teleostei). Molecular Phylogenetics and Evolution 89:205-218.
<br>
<br>
Dornburg, A., A. J. Moore, J. M. Beaulieu, R. I. Eytan, and T. J. Near. 2014. The impact of shifts in marine biodiversity hotspots on patterns of range evolution: evidence from the Holocentridae (squirrelfishes and soldierfishes). Evolution 69:146-161.
<br>
<br>
Graybeal, A. “The Phylogenetic Utility of Cytochrome B: Lessons from Bufonid Frogs” Molecular phylogenetics and evolution 1993;: 256–269. 
<br>
<br>
Harmon LJ, Weir JT, Brock CD, Glor RE, Challenger W. GEIGER: investigating evolutionary radiations. Bioinformatics. 2008;24:129–31.
<br>
<br>
Hwang, J., Q. Zhao, Z. L. Yang, Z. Wang, and J. P. Townsend. 2015. Solving the ecological puzzle of mycorrhizal associations using data from annotated collections and environmental samples–an example of saddle fungi. Environmental microbiology reports 7:658-667.
<br>
<br>
Lanfear, R., B. Calcott, S. Y. W. Ho, and S. Guindon. 2012. PartitionFinder: combined selection of partitioning schemes and substitution models for phylogenetic analyses. Molecular Biology and Evolution 29:1695-1701.
<br>
<br>
Lanfear, R., B. Calcott, D. Kainer, C. Mayer, and A. Stamatakis. 2014. Selecting optimal partitioning schemes for phylogenomic datasets. BMC Evolutionary Biology 14:82.
<br>
<br>
McCallum E, Weston S. Parallel R. “O’Reilly Media, Inc.”; 2011.
<br>
<br>
Near, T. J., A. Dornburg, M. Tokita, D. Suzuki, M. C. Brandley, and M. Friedman. 2014. Boom and bust: ancient and recent diversification in bichirs (Polypteridae: Actinopterygii), a relictual lineage of ray-finned fishes. Evolution 68:1014-1026.
<br>
<br>
Neuwirth,E.RColorBrewer: ColorBrewer Palettes. 2014. R package version 1.1-2. https://CRAN.R-project.org/package=RColorBrewer
<br>
<br>
Paradis E, Claude J, Strimmer K. APE: Analyses of Phylogenetics and Evolution in R language. Bioinformatics. 2004;20:289–90.
<br>
<br>
Posada, D., and K. A. Crandall. 1998. Modeltest: testing the model of DNA substitution. Bioinformatics 14:817-818.
<br>
<br>
Prum, R. O., J. S. Berv, A. Dornburg, D. J. Field, J. P. Townsend, E. Moriarty Lemmon, and A. R. Lemmon. Accepted. A Comprehensive Phylogeny of Birds (Aves) using Targeted Next Generation DNA Sequencing. Nature.
<br>
<br>
Revell LJ. phytools: an R package for phylogenetic comparative biology (and other things). Methods Ecol. Evol. 2011;3:217–23
<br>
<br>
Su, Z., Z. Wang, F. Lopez-Giraldez, and J. P. Townsend. 2014. The impact of incorporating molecular evolutionary model into predictions of phylogenetic signal and noise. Phylogenetics, Phylogenomics, and Systematics 2:11.
<br>
<br>
Su Z, Townsend JP. Utility of characters evolving at diverse rates of evolution to resolve quartet trees with unequal branch lengths: analytical predictions of long-branch effects. BMC Evol. Biol. 2015;15:86.
Townsend, J. P. 2007. Profiling phylogenetic informativeness. Systematic Biology 56:222-231. 
<br>
<br>
Townsend, J. P., Z. Su, and Y. I. Tekle. 2012. Phylogenetic signal and noise: predicting the
power of a data set to resolve phylogeny. Systematic Biology 61:835-849.
<br>
<br>
Warnes,G.R., Bolker, B., Bonebakker, L., Gentleman, R., Liaw, W.H.A., Lumley, T., Maechler, M., Magnusson, A., Moeller, S., Schwartz, B., Venables B., gplots: Various R Programming Tools for Plotting Data. 2016. R package version 3.0.1. https://CRAN.R-project.org/package=gplots.
<br>
<br>
Wickham H. ggplot2: Elegant Graphics for Data Analysis. Springer; 2016.
<br>
<br>
Yang, Z. Fair-balance paradox, star-tree paradox, and Bayesian phylogenetics. Molecular biology and evolution 2007; 24(8), pp.1639-1655.
