---
layout: page
title:  "Walking Through PhyR"

teaser: "Learn how to conduct phylogenetic informativeness analyses in R!"
categories:
    - software
tags:
    - software PhyR
    
image:
   thumb: "informer_thumb.jpg"
header:
    image_fullwidth: "software_stream.jpg"
    title: ""
    caption: Hells Canyon, ID
comments: true
show_meta: false    
---
<h3>1. Installation</h3>
PhyR is easy to install. Simply <a href='https://github.com/carolinafishes/PhyR'>download the compressed R script from github</a> and source it: 
<pre>source(“pathtoscript/PhyR”)</pre>
If you would like to load the sample data, you can also source this the same way. 
<pre>source(“pathtoscript/PhyR_sample”)</pre>
If you are using the equations from Su et al. (2014), you will need to ensure that you have set your working directory and placed the associated python script “Su_et_al.py” into this directory. 
<pre>setwd(“pathto/whereyou/are/working”)</pre>
<br>
<h3>2. Dependencies</h3>
PhyR uses several other R packages. Install then load these.
<pre>
library (phytools)
library(splines)
library(gplots)
library(RColorBrewer)
library(foreach)
library(iterators)
library(geiger)
library(doParallel)
library(gridExtra)
#set the number of cores if you are working in parallel registerDoParallel(cores=8)
</pre>

now set your working directory to save files
<pre>
setwd("~/Documents/PhyR")
</pre>
If you are using the Su_et_al.py script, you will need to install numpy, scipy, and sympy. This can be done easily using Anaconda by <a href='https://store.continuum.io/cshop/anaconda/'> Continuum Analytics</a> (free at the time of this writing).

<h3>3. Phylogenetic Informativeness Profiles</h3>
<br>
<br> We are using the squirrelfish tree from Dornburg et al. (2014) in the sample file, in conjunction with the example rate vector from the Mathematica notebook of Su et al. (2014) in the sample file.
<br>
For your own data paste or read in rates from hyphy or other rate estimation software (e.g., rates<-c(0,3.4,5,6.7). Likewise read in your tree using ape’s read.tree function.
convert your rates into a matrix, PhyR requires this format
<br>
<pre>
as.matrix(sample.rates)->rr 
informativeness.profile(rr,sample.tree, codon=”FALSE”)
</pre>
<br> Easy! Now you can make phylogenetic informativeness profiles (Townsend 2007) that look like this
<img class="b30" src="https://carolinafishes.github.io/images/informR_1.png" alt="">

Just to contrast, we can take another sample tree that is older
If your alignment is in reading frame simply modify the function to get profiles by codon position as follows
<pre>
informativeness.profile(rr,tree, codon=”TRUE”)
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_2.png" alt="">

<br>The data can be explored in multiple ways. For example, why not try dividing the data based on site rates? To begin, we can simply visualize the rates.
<pre> hist(rr) </pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_3.png" alt="">

ok, lets arbitrarily say we want to retain rates below “0.005”
<pre>
lower<-c(0,0.005) 
upper<-c(0.00501,10) 
cbind(lower,upper)->breaks
</pre>
<br>
PhyR has a function allowing profiles to be broken along any point in the rate vector to assess changes in phylogenetic informativeness
<code>multi.profile(rr,sample.tree, breaks)</code>
<img class="b30" src="https://carolinafishes.github.io/images/informR_4.png" alt="">

Part1 represents the slower site rates, and as expected the decay in phylogenetic informativeness is much lower across the tree. Conversely, we can see the faster sites in part two are informative for recent divergences, yet exhibit a rapid decline in informative site patterns as we move to deeper portions of the tree.
<br>
The above is not the usual way that nucleotide sequence data is explored. Instead, it is more common to have character sets based loci you wish to evaluate. In this case simply use the same logic as above to define your loci and use defined.multi.profile as follows. In this example we will have locus 1 span sites 1-499 in the alignment and locus2 span sites 500-979.
<pre>
Lower<-c(0,500)
Upper<-c(499,979) 
Breaks<-cbind(Lower,Upper) 
defined.multi.profile(rr,sample.tree,Breaks)
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_5.png" alt="">
In this example the two loci are very similar.
<br>
Using this logic we can break datasets into any size partition we wish to evaluate. Feel free to give this a whirl with the other included tree from one of our recent studies (Dornburg et al. 2015) that spans the evolutionary history of elopomorpha (eels, tarpons, bonefishes) to get comfortable. Simply replace sample.tree with sample.tree2. Now, how about visualizing signal or noise probabilities across a tree?
<br>
<h3>4. Resolution probability quantification</h3>
PhyR calculates quartet internode resolution probabilities (QIRP) and compares these to quartet internode homoplasy probabilities (QIHP) as well as quartet internode polytomy probabilities (QIPP) following the equations of Townsend et al. (2012).
<code> Approximator(T,t, rr, s)->ll </code>
<br>
This function gives us the approximate contribution of QIRP versus QIHP for resolution of an internode using the equations of Townsend et al. (2012). T=time, t=internode distance, rr=rate vector, and s=state space. For example:
<code> Approximator(50,5, rr, 3) </code>
<img class="b30" src="https://carolinafishes.github.io/images/informR_6.png" alt="">
<br>
Alternatively you can use the monte carlo simulation approach to get the histogram, since this is time consuming based on the number of simulations, PhyR assumes you will do this on a cluster or while you are doing something else and records the output to file. The input looks similar, though now you specify a file name for the probabilities and an image file name histogram. Note that the two files must have different names!
<code>#cluster.signal.noise(t, t0, rateVector, nsims,s, filename=”file1”,imagename=”file2.pdf”)</code>
<br>
For large phylogenomic datasets these simulations become cumbersome very quickly so we can take advantage of R’s parallel processing abilities. To run the simulation in parallel use the following function (remember to set your cores appropriately using the registerDoParallel(cores=desired#(e.g., 8) function!)
Also remember the file and image names CAN NOT be identical. The syntax is the same, the function name just changes slightly
<pre>
#parallel.cluster.signal.noise(t, t0, rateVector, nsims,s, filename=”file1”,imagename=”file2.pdf”) 
parallel.cluster.signal.noise(50,5,rr,500,3,filename=”test”,imagename=”test.image”)
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_7.png" alt="">
<br>
<h3> 5. Advanced resolution probability quantification </h3>
<br>
Calculations based on the equations of Townsend et al. (2012) make several assumptions including equal base frequency distributions in the alignment, equal branch lengths within the phylogenetic quartet, and a Jukes-Cantor model of sequence evolution. Su et al. (2014) introduced extensions to the equations of Townsend et al. (2012) that allow for uneven branch lengths, and any nucleotide substitution model or distribution of base frequencies.
<br>
PhyR makes use of external python script to enable these calculations, as R is not an ideal platform in which to simplify symbolic equations. In order to utilize the script Su_et_al.py, simply copy into the working directory you have set for your R session. Once this is in place, there are several input commands.
<br>
First specify your model settings based on a model selection program such as Modeltest (Posada and Crandall 1998), or Partitionfinder (Lanfear et al. 2012, Lanfear et al. 2014). Model settings are defined as follows and require changing for different nucleotide substitution models, base frequencies, and branch lengths. For example:

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
a through f are the relative rate parameters which are defined as follows: rCT = rTC = a; rAT = rTA = b; rTG = rGT = c; rCA = rAC = d; rCG = rGC = e; rAG = rGA = f. A table of relative rate parameter settings for different substitution models taken from Su et al. (2014) is attached for reference
<img class="b30" src="https://carolinafishes.github.io/images/informR_8.png" alt="">
Pi_T through Pi_G are the empirical base frequency parameters. IMPORTANT, these must sum up to one : Pi_T + Pi_C + Pi_A + Pi_G = 1!
<br>
Next the numerical values of branch lengths of T_ 1, T_ 2, T_ 3, T_ 4, and the internode length t_o, are entered into an object respectively, for the four - taxon tree problem in question.
<img class="b30" src="https://carolinafishes.github.io/images/informR_9.png" alt="">
<br>
There is another IMPORTANT point here: T_ 1 and T_ 2 branches must belong to the same sister clade and T_ 3 and T_ 4 must belong to the other clade in the hypothesized correct/consensus topology of the four - taxon problem in question (see above).
<br>
Once these are entered, simply calculate QIRP, QIHP, or QIPP values as follows:
<pre>
allmodel.signal.noise (a,b,c,d,e,f,internode,Pi_T,Pi_C,Pi_A,Pi_G, rate_vector)
</pre>
Using the rate vector from the sample data with the above input values, the output should look like this
<img class="b30" src="https://carolinafishes.github.io/images/informR_10.png" alt="">
The probabilities from left to write are the probability of contributing to an incorrect tree (0.168..;QIHP), the probability of providing no information for resolution (0.082.. ;QIPP), and the probability of providing information towards correct resolution (0.745.. ;QIRP).

<br>
<h3>6. Advanced visualizations</h3>
One way to assess signal across a tree is to plot the probability of a marker contributing to correct inference for each node simultaneously by providing a tree, rate vector, and state space as in Hwang et al. (2015):
<pre> PlotTreeSI(sample.tree,rr,3) </pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_11.png" alt="">
Here the branch lengths (x axis) and the blue lines (QIRP, y axis) match up and we can see that signal is pretty high for many nodes. However, some of the smaller internodes are predicted to be impacted by homoplasy or contain little information. We can explore this further by looking at the rate distribution. First we will get the rates from a partition we defined in the the PI profile section:
<pre>get.ind.sites(rr,breaks)->ES
ES[,2]->part
as.matrix(part)->partx
partx[partx%in% Upper[1]:Upper[2]]->part.check 
as.numeric(part.check)->part.check
rr->rates
rates[part.check]->part.current
as.matrix(part.current)->parts
</pre>
Now plot!
<pre>Plot.Another.TreeSI(tree,parts,3,col=”green”,type=3)</pre>
<img class="b30" src="https://carolinafishes.github.io/images/informR_12.png" alt="">
An alternative to visualization of multiple loci or dataset partitions while assessing uncertainty in the true internode length is to create heatmaps similar to those in Prum et al. (2015) that evaluate QIRP at a given node age across a range of internodes use the following commands. Note that here we are using the files from Prum et al. (2015), which are <a href='https://zenodo.org/record/30269?ln=en#.VfJJ-GRViko'> available on Zenodo (DOI 10.5281). </a>
We begin by assembling the rates of all loci, and convert those into matrix form
<pre>
allrates<- c(L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L21,L22,L24,L27,L28,L30,L31,L32,L34,L35,L3 6,L37,L38,L39,L41,L42,L43,L44,L48,L49,L50,L51,L53,L54,L57,L58,L59,L61,L62,L63,L64,L 65,L67,L72,L73,L74,L75,L76,L77,L78,L79,L80,L81,L82,L85,L86,L87,L88,L89,L91,L94,L95, L98,L99,L100,L102,L103,L104,L105,L107,L108,L110,L111,L113,L115,L116,L118,L119,L12 0,L121,L122,L125,L126,L127,L128,L129,L130,L131,L133,L134,L135,L136,L137,L141,L142, L143,L145,L146,L147,L148,L149,L150,L151,L152,L153,L154,L155,L157,L158,L159,L161,L 162,L163,L165,L169,L170,L171,L174,L175,L176,L177,L178,L180,L181,L182,L183,L184,L1 86,L187,L188,L189,L190,L192,L193,L194,L195,L196,L197,L201,L202,L203,L204,L205,L209,L207,L208,L209,L210,L211,L213,L214,L215,L216,L217,L219,L221,L222,L223,L224,L225, L226,L228,L229,L230,L231,L232,L233,L234,L235,L237,L239,L240,L241,L242,L243,L244,L 245,L246,L247,L248,L249,L250,L251,L252,L253,L255,L256,L257,L258,L260,L261,L262,L2 64,L265,L266,L267,L269,L270,L271,L272,L275,L276,L277,L279,L280,L281,L282,L288,L28 9,L290,L292,L293,L294,L295,L296,L297,L298,L301,L302,L303,L305,L306,L307,L310,L311, L312,L314,L315,L316,L317,L318,L319,L320,L321,L322,L325,L327,L328,L329,L330,L331,L 333,L334,L335,L336,L337,L338,L339,L340,L341,L342,L343,L344,L346,L347,L348,L349)
as.matrix(allrates)->allrates
</pre>
We then sort the remaining loci by length, this lets us ask whether size of the locus is associated with increased information content. We are going to visualize a random subset of loci for the sake of keeping the tutorial manageable.
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
"leL41","leL295","leL107","leL163","leL21","leL2","leL325","leL80","leL28") sort(ll)
</pre>
The guide tree from Prum et al. (2015) used relative rates, so we are going to look at resolving Neoaves with a crown at .30. We begin by calculating the signal for different internode lengths. Note that the loci were already formatted as matrices in the Prum et al. (2015) script.
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
 <img class="b30" src="https://carolinafishes.github.io/images/informR_13.png" alt="">  
This heatmap shows us the probability of correct resolution for increasingly small internodes. This map can be generated for other loci and the internode distances can be zoomed in on using the space.maker.narrow function.
<br>
<br>
<h3>6. Posterior Distributions</h3>

Since branch length are rarely known with certainty, PhyR can also be used to calculate QIRP, QIPP, and QIHP values across a distribution of trees such as those obtained from Bayesian analyses. To do this, simply read in your trees or use the sample distribution of bichir trees from a study by Near et al. (2014) provided with the sample data.
<br>
First you will need to specify the quartet of interest. In the bichir dataset, we will look at the clade containing Polypterus congicus as this species was not placed with high support in the tree. We define the quartet as follows:
<br>
<pre>quart<- c(”Polypterus_congicus","Polypterus_bichir","Polypterus_ansorgii" ,"Polypterus_endlicheri” ) </pre>
<br>The rest is easy. PhyR will go over your distribution of trees using the Su et al. (2015) calculations. See section 5 if you skipped it and the variable names seem enigmatic. To begin, simply run the function:
<pre>
post.su(a,b,c,d,e,f,Pi_T,Pi_C,Pi_A,Pi_G,
 rate_vector,quart,trees)->final
</pre>
<br> 
Note that “trees” are the posterior trees you can read in using APES "read.tree" function with the example trees provided in the download package. 
<br>This function returns a matrix of
internodes and T values from the trees and their associated QIHP,QIPP, and QIRP values. Summarizing these can be done by using the following function:
<br>
<pre>plot.posterior(final, plot=”QIPs”)</pre>
<br>This returns a density plot of the quartet internode resolution/polytomy/homoplasy probabilities and the internode lengths allowing for easy visualization
<br>
<img class="b30" src="http://carolinafishes.github.io/images/informR_14.png" alt="">
<br>
Alternatively:
<pre>plot.posterior(final, plot=”violin”)</pre>
<img class="b30" src="http://carolinafishes.github.io/images/informR_15.png" alt="">
<br>Returns violin plots of the quartet internode resolution/polytomy/homoplasy probabilities and the internode lengths.
<br>
<h3> 8. References </h3>
Dornburg, A., M. Friedman, and T. J. Near. 2015. Phylogenetic analysis of molecular and morphological data highlights uncertainty in the relationships of fossil and living species of Elopomorpha (Actinopterygii: Teleostei). Molecular Phylogenetics and Evolution 89:205-218.
<br>
<br>
Dornburg, A., A. J. Moore, J. M. Beaulieu, R. I. Eytan, and T. J. Near. 2014. The impact of shifts in marine biodiversity hotspots on patterns of range evolution: evidence from the Holocentridae (squirrelfishes and soldierfishes). Evolution 69:146-161.
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
Near, T. J., A. Dornburg, M. Tokita, D. Suzuki, M. C. Brandley, and M. Friedman. 2014. Boom and bust: ancient and recent diversification in bichirs (Polypteridae: Actinopterygii), a relictual lineage of ray-finned fishes. Evolution 68:1014-1026.
<br>
<br>
Posada, D., and K. A. Crandall. 1998. Modeltest: testing the model of DNA substitution. Bioinformatics 14:817-818.
<br>
<br>
Prum, R. O., J. S. Berv, A. Dornburg, D. J. Field, J. P. Townsend, E. Moriarty Lemmon, and A. R. Lemmon. Accepted. A Comprehensive Phylogeny of Birds (Aves) using Targeted Next Generation DNA Sequencing. Nature.
<br>
<br>
Su, Z., Z. Wang, F. Lopez-Giraldez, and J. P. Townsend. 2014. The impact of incorporating molecular evolutionary model into predictions of phylogenetic signal and noise. Phylogenetics, Phylogenomics, and Systematics 2:11.
<br>
<br>
Townsend, J. P. 2007. Profiling phylogenetic informativeness. Systematic Biology 56:222-231. 
<br>
<br>
Townsend, J. P., Z. Su, and Y. I. Tekle. 2012. Phylogenetic signal and noise: predicting the
power of a data set to resolve phylogeny. Systematic Biology 61:835-849.
