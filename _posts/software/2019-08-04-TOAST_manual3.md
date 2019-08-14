---
layout: page
title:  "Walking Through TOAST, Part3: Visualizating Missing Data and Assembly of Alignments"

teaser: "Consider what isn't in your data"
categories:
    - software
tags:
    - software TOAST
    
image:
   thumb: "TOASTpage3.jpg"
header:
    image_fullwidth: "TOASTpage3.jpg"
    title: ""
    caption: River Irwell, UK
comments: true
show_meta: false    
---
This is a three part tutorial. <a href='https://carolinafishes.github.io/software/TOAST_manual/'>Part 1 focuses on installation</a>. Check that you have followed directions.
<br>
<br>
<a href='https://carolinafishes.github.io/software/TOAST_manual2/'>Part 2 focuses on using BUSCO to harvest orthologs from online or locally stored fasta files, as well as the combination of the two.</a> NOTE you need to be using LINUX to use BUSCO for this section.
<br>
<br>
This part focuses on focuses on visualization missing data patterns and concatenated alignment assembly. You can use any platform for these functions.

<h3>Missing Data</h3>
Missing data is a common feature of large sequence datasets. Everything from changes in coverage depth, DNA/RNA quality, probe design, assembly method, etc can result in uneven coverage of loci between species.TOAST provides a suite of functions to both explore missing data and reassemble alignments based on user determined thresholds of acceptable representation.     
<br>
We will use the missing_data.tsv file distributed with TOAST in the examples in this section. 
<br>
<br>
Note that you can use the following code to generate a .tsv file of missing data patterns from ANY set of FASTA files in a directory with the following function
<pre>
missing<-MissingDataTable(aligned_dir = ad)
</pre>
In fact, ANY delimitated file of data presence/absence can be used with these visualization functions (just needs data and NA for no data). This includes phenotypic trait data, behavioural observations, etc!
<br>
<br>
<i>Now you have no excuse to not look at missing data patterns anymore!</i>
<br>
<h3>Visualizing Missing Data Patterns</h3>
Part of the orthology assembly steps in both sections 2 and 3 generates a .tsv file entited "missing_data.tsv" that is distrbuted with this software. We will use this file to throughout this section. Let's begin by reading it into memory.
<pre>
tsv<-read.delim("~/missing_data.tsv", header=TRUE)
</pre>
With this file we can begin to explore coarse missing data patterns. Let's start with a snapshot of who has more than 1000 out of 6000 loci in the cetacean dataset as follows
<pre>
VisualizeCoverage(tsv, 1000)
</pre>
This will produce a two panel graphic. The top panel is a circlepack plot showing the number of missing loci per species that meet the threshold of having at least 1000 loci. The bottom panel depicts the number of loci captured versus missing for each species that did not meet the treshold criterion.<br>
<img class="b30" src="https://carolinafishes.github.io/images/TOAST_VisCoverage.png" alt="">
<br>
In this case, the taxa not meeting the threshold were very similar in having little sequence coverage. In contrast, <i>Tursiops</i> stands out as having the most missing loci among the taxa that did meet this criterion.
<br>
<br>
You may also be interested in simply knowing which taxa have complete coverage of all orthologs.  
<pre>
CompleteCoverage(tsv)
</pre>
This provides a list of species with complete coverage.
<br>
<img class="b30" src="https://carolinafishes.github.io/images/TOAST_CompCoverage.png" alt="">
<br>
<br>
As we assemble genome-scale coverage of the Tree of Life, it is clear that sequence data is unevenly distributed between groups of organisms. TOAST offers the ability to explore missing data interactively based on a user speci ed taxonomic framework. For each species, you may supply as many taxonomic/phylocode levels as you like to explore the hierachical structure of missing data.
<br>
<br>
The guide file is formatted as follows
<br>
<img class="b30" src="https://carolinafishes.github.io/images/TOAST_TaxoGuide.png" alt="">
<br>
<br>
Leaves are your sampled species and there is no limit to the number of levels you can add. Simply add more columns if you wish for increased resolution. Please note that you need a column entitled "leaves". You can save this in any format you wish to read into R (.csv, .tsv, etc). In our case, we will use a .csv file.
<br>
<br>
Additionally, you must also fill in all levels. For the purpose of this tutorial we will look at the difference between baleen and toothed whales and higher level subclades such dolphins using your web browser to interactively explore missing data circlepack plots.
<pre>
taxonomy<-read.csv("cetacean_taxonomy", header=TRUE) 
VisualizeTaxonomyInteractive(tsv, taxonomy, 0)
</pre>
As above, the missing data file along with your threshold of mininum number of loci is used to generate these plots. We are going to begin by setting our threshold to zero, to see how missing data is distributed overall. The above code should have opened an interactive plot in your browser like this one
<br>
<iframe src="https://carolinafishes.github.io/images/TOAST_circlepack1.html" style='height: 100%; width: 100%;' frameborder="0"></iframe>
<br>
The size of the circles here indicate higher levels of missing data per leaf taxon. At a glace we can see that a big chunk of missing coverage is within a specific sphere of toothed whales (Odontoceti).
<br>
Clicking around this plot you can zoom in an out of these spheres to get more detail.
<br>
<br>
To give an example with a threshold, let's again look at taxa with more than 1000 loci sampled.
<pre>
VisualizeTaxonomyInteractive(tsv, taxonomy, 1000)
</pre>
<br>
<iframe src="https://carolinafishes.github.io/images/TOAST_circlepack1.html" style='height: 100%; width: 100%;' frameborder="0"></iframe>
<br>
Again, there is more missing data in Odontoceti and clicking within the plot reveals that the species with the most missing data are within dolphins.
<br>
<br>
You may be interested in exploring how the setting of a missing data threshold changes the distribution of missing data pre and post filtration.
<br>
For example, merely saying you would like to have at least 1000 loci represented per species may mask the fact that for taxa meeting this threshold, each has substantially more.
<br>
Alternatively, a user threshold may leave a single taxon with exceedingly higher levels of missing data than others.
<br>
To visualize the impact of thresholding on missing data do the following
<pre>
VisualizeThreshold(tsv, 1000)
</pre>
<img class="b30" src="https://carolinafishes.github.io/images/TOAST_VisThreshold.png" alt="">
<br>
The above plots shows your total remaing missing data (left), how much missing data was removed (right), and how much missing data was in the originally present in your data (right). In each case the bars are color coded by taxa.
<br>
<br>
In addition to thinking about missing data between taxa, it may also be of interest to look between loci and taxa at different hierarchical levels.
<br>
<br>
This could reveal clade biases in missing data representation and also be of interest for the design of probe sets or sequence capture efforts given a small pilot dataset.
<br>
<br>
TOAST currently offers two visualizations that facilitate taxon specific visualization of missing values using the taxonomy table from earlier examples in this section. We will begin by looking at a barplot of missing data.
<br>
Note that this uses parallel processing so if you have not done so, define the number of processors to use as follows, changing the number of cores to what you have available on your machine.
<pre>
library(doParallel) 
registerDoParallel(cores=8)
</pre>
Then
<pre>
MissingStreambar(tsv, taxonomy, "level1", 0, type="bar")
</pre>
This code will generate a traditional stacked barplot of missing data across all loci by hierarchical level (in this case odontocetes versus mysticetes).
<br>
<br>
The Y axis is the frequency of missing data for each locus, color coded by hierarchy. The X axis is each locus.
<br>
We set the threshold to zero here just to visualize raw missing data patterns. In this case, missing data is fairly evely distributed across loci.
<br>
An additional spin on this plot is that for experimental design, you may wonder what sorts of missing data patterns could I expect given a probe set or other sequence capture method. One way to visualize this is to make use of streamgraphs which interpolate data values across a matrix.
<br>
<br>
If you have pilot data and are considering the potential for sequence capture (or really any data caputre), you can generate an interactive streamgraph to see what sorts of missing data patterns you may expect should you continue to aggregate data using the same techniques as the pilot.
<br>
<br>
Prior to looking at this graph please do note that this assumes your pilot data is characteristic of dataset as a whole, so do use common sense and your own judgement in your experimental design choices as this is merely a prediction.
<pre>
MissingStreambar(tsv, taxonomy, "level1", 0, type="stream")
</pre>
The above code will open up an interactive plot in your web browser (plotted small here since it's just an example, so scroll around).
<br>
<iframe src="https://carolinafishes.github.io/images/TOAST_SB.html" style='height: 75%; width: 75%;' frameborder="0"></iframe>
<br>
Now that you have looked at missing data patterns, you may want to assemble your concatenated alignments with or without thresholds of missing data applied. TOAST has a series of tools for doing just that.
<br>
<h3>Assembly of Sequence Datasets</h3>
<br>
TOAST has several concatenation functions.
<br>
<br>
The most basic will assemble a concatenated alignment of aligned fasta files into the relaxed phylip format used by IQtree, along with a nexus file of partitions that can also be read directly into IQtree for model/partition selection. You can use this function with ANY set of aligned fasta files in a directory.
<pre>
coming soon...
</pre>
<h3> 7. References </h3>
Auguie, B. 2016. gridExtra: Miscellaneous Functions for "Grid" Graphics. R package version 2.2.1.
<br>
<br>
Bedward, M.D. Eppstein and P. Menzel. 2018. packcircles: Circle Packing. R package version 0.3.3.
<br>
<br>
Froelich, J. 2015. circlepackeR: htmlwidget for Mike Bostock d3.js circle packing visualization. version 0.1.0.9
<br>
<br>
Garnier, S. 2017. viridis: Default Color Maps from 'matplotlib'. R package version 0.4.0.
<br>
<br>
Glur, C. 2018. data.tree: General Purpose Hierarchical Data Structure. R package version 0.7.8.
<br>
<br>
Warnes, M.G.R., Bolker, B., Bonebakker, L. and Gentleman, R., 2016. Package ‘gplots’. Various R Programming Tools for Plotting Data.
<br>
<br>
Wickham, H. and W. Chang. 2017. devtools: Tools to Make Developing R Packages Easier. R package version 1.13.3.
<br>
<br>
Winter, D.J., 2017. rentrez: An R package for the NCBI eUtils API (No. e3179v1). PeerJ Preprints.
Wickham, H. 2016. ggplot2: Elegant Graphics for Data Analysis. Springer-Verlag New York.

