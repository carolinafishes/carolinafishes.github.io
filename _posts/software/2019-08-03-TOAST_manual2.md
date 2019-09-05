---
layout: page
title:  "Walking Through TOAST, Part2: Data Harvesting"

teaser: "Use Linux and BUSCO to harvest public data"
categories:
    - software
tags:
    - software TOAST
    
image:
   thumb: "TOASTpage2b.jpg"
header:
    image_fullwidth: "TOASTpage2b.jpg"
    title: ""
    caption: Antarctica
comments: true
show_meta: false    
---
This is a three part tutorial. <a href='https://carolinafishes.github.io/software/TOAST_manual/'>Part 1 focuses on installation</a>. Make sure to look at this page prior to proceeding.
<br>
<br>
This part focuses on using BUSCO to harvest orthologs from online or locally stored fasta files, as well as the combination of the two. NOTE you need to be using LINUX to use BUSCO!
<br>
<br>
<a href='https://carolinafishes.github.io/software/TOAST_manual3/'>Part 3 focuses on visualization missing data and concatenated alignment assembly</a>. You can use any platform for these functions.

<h3>Quick Overview - Suggested Project Structure</h3>
<br>
TOAST will move between directories on your harddrive generating files. We recommend the following folder architecture to keep your project organized
<img class="b30" src="https://carolinafishes.github.io/images/TOAST_file_arc.png" alt="">
Within a main project folder, 
<br>
1) Create a separate folder in which you store FASTA files. TOAST will also place downloaded FASTA files here. 
<br>
2) Have a busco_results folder for storing and retrieving busco IDs
<br>
3) An extracted folder for your raw ortholog sequences
<br>
4) a mafft_aligned folder for your alignments of each ortholog
<br>
5) a threshold folder for you alignments of each ortholog with species removed due to not meeting requirements of representation
<br>
TOAST will write concatenated alignments, custom concatenated alignments of user selected loci, and partition files into the main directory for easy retrieval. 
<h3>Function Overview</h3>
<br>
Here is an overview of core functions and their purpose
<br>
<img class="b30" src="https://carolinafishes.github.io/images/TOAST_functions.png" alt="">
TOAST functions can be divided into 4 groups 
<br>
1) Sequence gathering functions 
and
2) BUSCO related functions
(covered on this page)
<br>
3) Missing data pattern visualization
and
4) Alignment assembly
(covered in the <a href='https://carolinafishes.github.io/software/TOAST_manual3/'>next section)</a>
<h3>Getting a Taxonomic ID</h3>
<br>
For a given focal clade (mammals, cetaceans, squirrels, etc), TOAST will utilize BUSCO and BLAST to download, find, and extract all orthologs from available public data on NCBI.
<br>
Use of this method requires a Taxonomic ID for your focal clade
<br>
The taxonomic ID can be easily obtained from NCBI as follows
<br> 
<br>
1) Navigate to <a href='https://www.ncbi.nlm.nih.gov/taxonomy/'>www.ncbi.nlm.nih.gov/taxonomy/</a>
<br>
2) In the Taxonomy search field enter your desired clade 
<br>
3) Click on the result. This will give you a full breakdown of subclade taxonomy. Click on the link for the clade you want to focus on. 
<br>
4) This will send you to a page that includes the taxonomic ID. In the case of Cetacea this is 9721. 
<br>
<h3>Harvesting New Ortholog Datasets</h3>
To use BUSCO and harvest orthologs you need to be using LINUX and also have installed the dependencies mentioned in section 1. If you said yes to both of these things, then we are ready to begin.
<br>
<br>
Looking at the example_script.R file from within the example folder, you will see that you need to define some locations as well as the number of cores to use.

<pre>
#universal variables
td <- "/home/dustin/temp/trial1" #toast_directory
fd <- "/home/dustin/temp/trial1/fasta" #fasta_dir
bs <- "/home/dustin/software/busco/scripts/run_BUSCO.py" #path to busco_script
bd <- "/home/dustin/temp/trial1/busco_results" #path to busco results directory
ed <- "/home/dustin/temp/trial1/extracted" #extracted_dir
md <- "/home/dustin/temp/trial1/mafft_aligned" #mafft_dir
od <- "/home/dustin/temp/trial1/350_laurasiatheria_odb9" #path to orthoDB directory
ad <- "/home/dustin/temp/trial1/mafft_aligned" #mafft_dir, which is a directory of aligned fastas
cpu <- 12 #number of threads to use at various steps
</pre>
<br>
To explain, you need to provide the location of toast (td), the location of where to store and or find your FASTA files (fd), the location of BUSCO (bs), where to store your BUSCO results (bd), where to store extracted orthologs (ed), where to store alignments (md), where the ortholog database is (od), where to store/find aligned FASTA files. We recommend working on a directory per project as above, but leave that choice up to you.
<br>
<br>
<h4>Step 1 Download Data</h4>
Once you have set up your paths, we can download sequences as follows 
<pre>
EntrezDownload(txid = 9721, fasta_dir = fd, minimumSeq = 350, maximumSeq = NULL)	
</pre>
Using a taxonomy id and a specified fasta directory, this is will download all databases per species with at least X number of sequences specified by minimumSeq. By default minimumSeq is set to 350. In addition, if you wish to simply test that things are working you can specify the maximum number of sequences to download. This is only to be used for testing and set to NULL by default.
<br>
<h4>Step 2 Run Busco</h4>
Once you have downloaded all the sequence data, you are ready to run BUSCO.
<pre>
RunBusco(fasta_dir = fd, toast_dir = td, path_to_run_busco.py = bs, path_to_orthoDB = od, threads = cpu)
</pre>
This function uses the paths you set up earlier to run BUSCO with a specified number of cores. Note that this step may take some time depending on the number of sequences and taxa you are searching. 
<br>
<h4> Step 3 & 4 Parse and Extract Results </h4>
<br>
BUSCO generates a lot of results, so next we will parse out BUSCO IDs and extract the sequences of interest. 
<pre>
parsed_busco_results <- ParseBuscoResults(busco_dir = bd)
write.table(parsed_busco_results, file = paste0(td, "/parsed_busco_results.tsv"), sep = "\t", row.names = FALSE) 
ExtractBuscoSeqs(busco_table = parsed_busco_results, fasta_dir = fd, extract_dir = ed) #parsed_busco_results from previous step
</pre>
These lines go through the BUSCO directory, parse the IDs to generate a table that is both stored locally for your records using write.table and used to extract all orthologs. 
<h4>Step 5 Align</h4>
All that is left to do is to align as follows 		
<pre>
MafftOrientAlign(extract_dir = ed, mafft_dir = md, threads = cpu)
</pre>
This will now generate alignments of each ortholog! Now lets see how local data could be added to this process. 
<br>
<h3>Harvesting Orthologs from local FASTA files</h3>
TOAST gives you the option to use BUSCO to either assemble new alignment from online data (previous section) or to use a combination of local and public files.
<br>
This means you can use TOAST to assemble orthologs from any local set of fasta files in a directory as covered above! Just throw the files into the mix!
<br>
<br>
Should you already have a target set of FASTA files from downloading as above or may have generated novel data (assembled transcriptomes, genomes, etc). It is of course possible to use TOAST to harvest BUSCO orthologs locally and either skip the download step or add public data to your own!
<br>
<br>
To do this all you have to do is 
<br>
1) Place your FASTA file/files into the specified FASTA directory as above  
<br>
2) Go through the code above, remembering to first set all of your directories and also your number of cores for BUSCO.
<br>
<br>
That's it! Use any combination of local and public data to extract orthologs. 
<br>
<br>
If you do not wish to download data or have already downloaded, simply omit 'Step 1 Download Data' above. 
<br>
<br>
At this point you should now be able to use BUSCO to harvest orthologs from any FASTA files, provided you are using LINUX. We encourage integration of public and novel data however caution that there can be high levels of missing data. 
<br>
<br>
In the <a href='https://carolinafishes.github.io/software/TOAST_manual3/'>next section</a> we will cover how to visualize missing data patterns and use this information to assemble custom concatenated alignments that meet user defined acceptable levels of data representation for a given problem. 



