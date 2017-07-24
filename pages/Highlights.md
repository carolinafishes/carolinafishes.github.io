---
layout: page
show_meta: false
title:  "Research Highlights"
permalink: "/highlights/"
teaser: "Keep up to date with our latest research news!"
categories:
    - highlights
tags:
    - highlights
    
image:
   thumb: "Highlights_thumb.jpg"
header:
    image_fullwidth: "Highlights.jpg"
    title: ""
    caption: Connecticut
    
---
<br>
News, updates, and media recaps about our research efforts.
<br>

<ul>
    {% for post in site.categories.highlights %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>







