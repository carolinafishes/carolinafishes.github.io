---
layout: page
title: "Towards a Theory of Phylogenetic Experimental Design"
teaser: "Maximizing power in phylogenomics"
header:
    image_fullwidth: "fungalbanner.jpg"
    caption: Cary, NC
    title: ""
image:
    thumb:  ""
    homepage: fungalbanner.jpg
categories:
    - highlights
comments: true
show_meta: false
---
Since its original inception over 150 years ago by Charles Darwin, a fully sampled Tree of Life is coming into view. As we work towards its full resolution we have also made a major transition from analyzing datasets comprised of small numbers of loci to those comprised of hundreds of loci, if not entire genomes.
<br> 
<br> 
This transition has aided in resolving some of the most vexing of evolutionary problems, giving us a new perspective on biodiversity. Correspondingly, phylogenetic trees have taken a central role in fields that span ecology, conservation, and medicine. 
<br>
<br>
However, the rise of big data has also presented phylogenomicists with a new set of challenges to experimental design, quantitative analyses, and computation. Together Jeff Townsend, Zheng Wang, and I recently <a href="https://www.researchgate.net/publication/320882398_Maximizing_Power_in_Phylogenetics_and_Phylogenomics_A_Perspective_Illuminated_by_Fungal_Big_Data"> <en>finished a review of these challenges for the 100th volume of Advances in Genetics. </en></a>
<br> 
<br> 
This review used insights from fungal biology as a motivation, and offers some really exciting ideas for the continued progress of fungal evolutionary biology. My hope is that it also motivates the interdisciplinary development of new theory and methods designed to maximize the power of genomic scale data in phylogenetic analyses which is what this post will focus on.
<br> 
<br> 
<h3>Why Fungi?</h3>
<br>
<br>
One question I got from a few of my colleagues when I started writing this paper was "Why Fungi?". The short answer is "Because they are really important". 
<br>
<br>
Depending on who you ask, there are anywhere from 1.5 to 7.1 million species of fungus in the world. You may not realize it, but the interactions of other lineages with fungi is a major part of our world. Just consider the rapid spread of fungal pathogens like <i>Geomyces</i> or <i>Batrachochytrium</i> that have devasted populations of wildlife or the vital role numerous fungi play in the root system of plants. 
<br>
<br>
<img class="b30" src="http://carolinafishes.github.io/images/fungal01.jpg" alt=""><em>Fungi, Umstead State Park, Raliegh NC</em>
<br>
<br>
Resolving the fungal Tree of Life is pivotal for more accurately forecasting how fungi will respond to change. Such a framework is of critical importance if we are to predict the movement of botanical communities that rely on fungal interactions, the spread of crop pests, or the spread and evolution of virulent fungal pathogens. In other words, we need to understand fungal evolutionary biology to better solve emerging conservation, management, and human health concerns over the next hundred years. 
<br>
<br>
Our review discusses these challenges in more detail, so check it out! For this post we will focus on experimental design, starting with the observation that the experimental design decisions required to resolve the fungal Tree of Life are not unique to fungi.
<br>
<br>
<h3><i>Phylogenomics and Experimental Design</i></h3>
<br>
As we go from genes to genomes, selecting the best genes and taxa to better resolve nodes phylogenetic tree topologies remains an area of intense interest. Studies of why their is incongruence between markers have become ubiquitous, and for over a decade authors have repeatedly highlighted the fact that sequencing more genes is not enough. In the worst case, a few sequences can positively mislead an entire study. So what should we sequence from whom?   
<br>
<br>
<h3><i>More Genes or More Taxa?</i></h3> 
“Should more taxa or more genes be sequenced to help resolve this node?” is a classic question in phylogenetics. Although we have begun to change the narrative of this question from genes to genomes, the problem remains the same.
<br>
<br>
Dense taxon sampling has repeatedly been shown to increase phylogenetic accuracy by reducing the effects of long-branch attraction. However, increased taxon sampling increases the complexity of phylogenetic inference, demanding more information from the same loci. At the extreme, choosing to add certain taxa can add long branches that can compromise accuracy, introduce new rate heterogeneities, and incorporate dominant model violating branches. Given that personnel, computational, and funding resources are not infinite, finding a taxon gene sampling strategy that minimizes errors while maximizing the potential of resolution represents an ideal design strategy.
<br>
<br>
Theory of phylogenetic experimental design has recently advanced to provide significant guidance as to when increased taxon or gene sampling would be cost-effective. For reasonable rates of sequence evolution, selection of taxa proximate to a focal internode is a good rule of thumb—if the goal is to resolve a specific node. However, rates of character change are integral to effectively choosing whether more genes or more taxa should be added to a study. Townsend and Lopez-Giraldez provide a predictive framework to answer the question of taxon-sampling that we summarize here.
<br>
<br>
Theory of phylogenetic experimental design has recently advanced to provide significant guidance as to when increased taxon or gene sampling would be cost-effective. For reasonable rates of sequence evolution, selection of taxa proximate to a focal internode is a good rule of thumb—if the goal is to resolve a specific node. However, rates of character change are integral to effectively choosing whether more genes or more taxa should be added to a study. Townsend and Lopez-Giraldez provide a predictive framework to answer the question of taxon-sampling that we summarize here.
<br>
<img class="b30" src="http://carolinafishes.github.io/images/genes_or_taxa.png" alt=""><em>Graphic to aid in choosing more genes or more taxa</em>
<br>
This theory is a great foundation, however it is important to note that this approach is currently limited to a four taxon tree, ignoring heterogeneous predictions of homoplasy between taxa, and being agnostic to outgroup choice. We are in the process of solving all three of this issues, stay tuned.
<br>
<br>
<h3><i>Saturation and Divergence Times</i></h3> 
A time-calibrated Tree of Life holds tremendous potential for understanding the early origins of the planet’s biodiversity. However, age estimates concerning the origins of early fungi have varied dramatically, in some cases predating the Cambrian explosion by hundreds of millions of years. WHile this sounds extreme, incongruence between divergence time studies is certainly not restricted to fungi. From mammals to birds to fishes to plants, age estimates often vary by millions of years. Some of this conflict is the result of poor model choice, conflicting interpretations of the fossil record, or branch-length priors. However, marker choice can be just as important.
<br>
<br>
Consider dating a tree using a rapidly evolving marker and placing a calibration near the tips. If sites high in noise have converged in a pattern that appears fast relative to the real rates and a tipward calibration is used, then the deep branches of the tree will extend. 
<br>
<br>
Dating a tree based on only a single calibration and a single rapidly evolving marker is an unlikely design for a 21st century phylogenomic study. However, utilizing a combination of loci character- ized by high or low noise and a differential representation of deep or shallow calibrations for divergence time studies is subject to the same principles. For example, Brandley et al. (2011) demonstrated a loss of accuracy in age estimates of liz- ards when they used a combination of noisy and conserved markers. These marker types yielded nearly mutually exclusive distributions of ages when analyzed independently. However, when marker types were combined for analysis, they yielded age estimates that were largely absent from both distributions, demonstrating an averaging effect that was driving a wholesale misestimation of ages. 
<br>
<br>
So how do we detect hidden substitutions?
<br>
<br>
Phylogenetic informativeness (PI) profiles provide a useful roadmap of information content through time. Moving from the tips to the apex of a profile represents a rise of phylogenetic information. Declines in informativeness following the apex of the primary peak reflect a steady decline or loss in phylogenetic information toward the root of a given focal tree.
<br>
<br>
Retaining loci with high losses in PI along the timescale of interest greatly increases the risk of either tree compression or expansion. In contrast, retaining only loci with low losses in PI increases the accuracy of divergence time estimates.
<br>
<br>
<img class="b30" src="http://carolinafishes.github.io/images/fungus3.png" alt=""><em>As highlighted by Dornburg et al. (2014), we can use PI profiles to avoid saturation problems in divergence time studies </em>
<br>
<br>
Effective experimental design will greatly decrease cases of topological incongruence among research studies, aiding comparative genetic or genomic studies that critically depend on robust phylogenies. In the interest of space I'll conclude this little vignette of some of our review here, but hope that you check out our paper and source material cited within. 
<br>
<br>
With our increasing ability to collect more and more genetic and genomic data, the time is right for phylogeneticists to think of how to efficiently harness this incredible resource. One critical aspect is the continued development of software that enables scrutiny of collected data and/ or efficient design of preselected regions for targeted genomic capture. Our goal over the next several years is to continue to develop new theories to account for taxon sampling and nonrandom patterns of convergence in sequence data andto implement these approaches in software that will aid in detecting, harvesting, and visualizing regions of a given dataset that are appropriate for phylogenomic analyses.
 

