---
layout: page
show_meta: false
title: "Topics in Biodiversity Science"
subheadline: ""
permalink: "/eeb/"
header:
   image_fullwidth: "eeb_main2.jpg"
   title: ""
   caption: Sea turtle, Curaçao
---
 As we move into the 21st century, we are beginning to develop new answers to questions scientists have asked about biodiversity for hundreds of years. 
<br>

Why are some groups more diverse than others? 
<br>

What habitats provide more ecological opportunities? 
<br>

How can learning about the past aid us in facing current challenges in conservation?
<br>

Addressing these sorts of questions allows us to develop an understanding of how biodiversity originates and what processes maintain it. Given the rapid pace of global change devloping this understanding now is fundamentally important if we want to accurately forecast how biodiversity will be impacted by factors ranging from species invasion, ocean acidification, development, and rising temperatures. 
<br>
<br>
Read about our own observations on the evolution of biodiversity and global change and how these relate to the findings from the research efforts of our friends and colleagues here!

<ul>
    {% for post in site.categories.eeb %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>