---
layout: page
title: "Detecting bias in phylogenomic data"
teaser: "Identifying the sister lineage to Percomorpha"
header:
    image_fullwidth: "Percomorphbanner.jpg"
    caption: Director's Bay, Curaçao
    title: ""
image:
    thumb:  Percomorphbanner.jpg
    homepage: Percomorphbanner.jpg
categories:
    - highlights
comments: true
show_meta: false
---
<br> 
The past decade has given rise to incredible advances in sequencing technology that are enabling us to infer parts of the Tree of Life that have never seen resolution. Correspondingly we are seeing phylogenetic trees take center stage in studies with applications that span conservation to human health. However, despite major breakthroughs some parts of the Tree of Life refuse to come into view or conflict between research studies.
<br>
<br>
We just <a href='https://www.researchgate.net/publication/314104725_New_Insights_on_the_Sister_Lineage_of_Percomorph_Fishes_with_an_Anchored_Hybrid_Enrichment_Dataset'>published a study</a> investigating one area of the fish Tree of Life that has been particularly recalcitrant: identifying the sister lineage to percomorpha.
<br>
<br>
Percomorph fishes represent over 17,000 species, including several model organisms and species of eco- nomic importance. However, resolution of the sister lineage to Percomorpha remains inconsistent. This is a problem as identifying what the sister lineage is serves to not only place studies of morphological and genomic evolution of teleost fishes into a broader context, but also provide a comparative perspective to investigate the processes that have generated a quarter of living vertebrate biodiversity. 
<br>
<h3>Searching for lost relatives</h3>
<br>
Over the past few decades, potential sister lineages to percomorpha have been restricted to a small number of candidate lineages. Our detective work now requires figuring out which lineage or lineages are the sisters, and why there have been competing results. To accomplish this, we used an anchored hybrid enrichment (AHE) dataset of 132 loci with over 99,000 base pairs.
<img class="b30" src="http://carolinafishes.github.io/images/Percomorph1.png" alt=""><em>Examples of previous molecular based studies (A-C) resolving the sister lineage of Percomorpha: A. Betancur-R et al. (2013a); B. Miya et al. (2003); C. Miya et al. (2005), Near et al. (2012b). Highlighted branches indicate the inferred sister clade to Percomorpha, dashed lines indicate divergences prior to the most recent common ancestor of Percomorpha and its sister lineage. Lineages marked with a ‘‘*” indicate lineages not sampled in the referenced studies. Placement of these lineages in the tree is based on Nelson et al. (2016).</em>
<br>
<br>
<br>
We took our new software package <a href='https://carolinafishes.github.io/software/phyinformR/'> PhyInformR </a>for a spin on this data. <a href='https://carolinafishes.github.io/software/phyinformR/'> PhyInformR </a> makes use of Jeff Townsend's phylogenetic experimental design methods that assess when evolutionary information content in a locus has degraded. Basically these methods allow for an assessment of when results based on a locus are no longer credible.
<br>
<br>
After filtering loci based on Jeff's methods, we scrutinized the filtered data and found an interesting pattern. Base pair composition was heavily biased towards guanine and cytosine.
<br>
<br>
<h3> Bias in Phylogenetic Analyses </h3>
<br>
Although the mechanisms generating codon biases are heterogeneous, codon biases are a ubiquitous genomic phenomenon that has been observed in taxa as disparate as mammals, fishes, fruit flies, and viruses. Codon biases are often found in highly conserved and highly expressed genes, but have also also been found in fast-evolving genes. In our case the bias is largely restricted to fast evolving portions of the AHE data, which is why Jeff's rate based methods are able to detect this problem.
<br>
<br>
<br>
<img class="b30" src="http://carolinafishes.github.io/images/Percomorph2.png" alt="">
<em>Nucleotide frequencies of the codon partitions in one of the retained (blue) versus filtered (grey) data sets. Frequencies within each panel correspond to the frequency within each partition of either adenine, thymine, guanine, cytosine, or guanine + cytosine. (For interpretation of the references to colour in this figure legend, the reader is referred to the web version of this article.)</em>
<br>
<br>
<br>
Investigating previous data used to infer the sister lineage of percomorphs reveals that this problem is also present in the genetic markers previously used. When we account for bias we find concordance between all of our analyses, and identify the sister lineage of percomorpha. 
<br>
<br>
<img class="b30" src="http://carolinafishes.github.io/images/Percomorph3.png" alt="">
<em>Maximum clade credibility tree of the posterior distribution of phylogenies based on amino acid analysis of next-generation sequence data using PhyloBayes. No circles at nodes represent Bayesian Posterior Probability (BPP) estimates of 1.00 and the black circle represents a BPP of 0.98. All branch lengths are in substitution units and the highlighted branches correspond with the inferred sister lineage to Percomorpha. *** symbols indicate a branch length scaling of 25% of all subtending branches to accommodate graphical constraints.</em>
<br>
<br>
Bias have become a major problem for phylogenomic data that is leading to the development of several new techniques to overcome this obstacle. We are also part of this effort and are currently collaborating with Jeff Townsend on new theory of phylogenetic experimental design that incorporates bias and will enable prediction of when analyses are misled. Stay tuned!
<br>
<br>
<br>
<img class="b30" src="http://carolinafishes.github.io/images/Percomorph4.jpg" alt="">
<em>Soldierfishes swimming in Curaçao. Soldierfishes belong to the family Holocentridae, one of the candidate sister lineages of Percomorpha. Our study reveals Holocentridae and a range of primarily deep-sea families to comprise the sister lineage of percomorpha.</em>
<br>

