---
layout: page
title: "A (really) quick guide to extracting and converting pdfs"
teaser: "Getting scans ready for zooniverse is easy with cpdf and sips!"
header:
    image_fullwidth: "zscriptbanner.jpg"
    caption: Ringing Rocks County Park, PA 
    title: ""
image:
    homepage: zscriptbanner.jpg
    thumb: zscriptbanner.jpg
categories:
    - collection
comments: true
show_meta: false
mediaplayer: true
---
 
I've <a href="https://carolinafishes.github.io/collection/zooniverse/"> <en>previously posted</en></a> on our <a href="https://www.zooniverse.org/projects/zhcreech/castaway/"> <en>zooniverse project "castaway" </en></a> that as part of an IMLS funded initiative to integrate three major orphaned fish collections and their data into our collection.   
<br>
<br>
Part of this project requires taking pdf scans of datasheets and splitting out specific pages that are then converted to png format for upload. 
<br>
<br>
With thousands of records that contain multiple pages each, this can be an overwhelming task. I wanted to offer a quick guide for how we've been automating this procedure using available tools. 
<br>
<br>
The first challenge is splitting the pdf pages. Fortunately, there is a free executable you can deploy for this task. Meet <a href="https://community.coherentpdf.com/"> <en>cpdf. </en></a> 
<br>
<br>
cpdf is short for 'Coherent PDF Command Line Tools' and offers a fantastic set of free tools available through github. For our purposes, splitting pdfs is done using a single line of code.
<br>
<br>
Assume we have a pdf called "DanMoore-0004.pdf", which corresponds to multiple pages (in this case 2) of one of our Dan Moore vessel stations. 
<br>
<img class="b30" src="http://carolinafishes.github.io/images/zscript2page.png" alt=""><em>Example of a two page pdf that needs to have page 1 extracted.</em>
<br>
<br>
Place this file into the folder where you have cpdf (or add cpdf to your bash). Open terminal and navigate to this folder. Now enter the following command:
<br>
<pre>
./cpdf DanMoore-0004.pdf 1  -o DanMoore-0004_page1.pdf
</pre>	
<br>
That's it! 1 indicates the page you want and the -o is the name of the outfile. You can easily turn this into a script to go through thousands of pdfs in seconds. 
<br>
<br>
<img class="b30" src="http://carolinafishes.github.io/images/zverse1page.png" alt=""><em>Using the above line, a single page from a pdf is readily extracted. </em>
<br>
<br>
To convert to png is also super easy on a mac and requires a single line of code. Move all your single page pdfs into a new folder and navigate there in terminal. Now enter:  
<br>
<pre>
for i in *; do sips -s format png $i --out $i.png; done	
</pre>
<br>
<br>
This will take all the files in your folder using the wildcard (*) and use the mac command line tool sips to convert them to a png. This is incredibly useful when you have hundreds or thousands of pdfs. 
<br>
<br>
From here, simply upload to zooniverse. I posted this for our lab and to link anyone who might find this useful. I'm sure there are other ways to accomplish the same thing, but regardless, this certainly beats spending days doing this manually!
<br>
<br>





