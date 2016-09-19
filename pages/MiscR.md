---
layout: page
show_meta: false
title:  "Functions, tutorials, and other useful things"
permalink: "/MiscR/"
teaser: "Tutorials of code used in our work"
categories:
    - MiscR
tags:
    - MiscR
    
image:
   thumb: "miscR_thumb.jpg"
header:
    image_fullwidth: "CostaRicabanner.jpg"
    title: ""
    caption: Costa Rica
    
---
<br>
One of the more frustrating things in science is seeing a figure or an analysis in a manuscript and then spending an inordinate amount of time trying to figure out how to use it for your own data. In order to help anyone interested in our work, we'll be posting code from recent manuscripts and tutorials here using <a href="https://github.com/carolinafishes"> data from our recent studies</a>.<br>

<ul>
    {% for post in site.categories.MiscR %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
