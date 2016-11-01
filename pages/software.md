---
layout: page
show_meta: false
title:  "Software"

teaser: "Bioinformatic tools for scientists"
categories:
    - software
tags:
    - software
    
image:
   thumb: "volunteer_water.jpg.jpg"
header:
    image_fullwidth: "software_goggles.jpg"
    title: ""
    caption: Long Island Sound, CT
permalink: "/software/"
---
As scientists we constantly need to modify or develop software in order to better analyze our data. As our team develops new tools or tweaks existing programs to do useful things, we will be updating this section to contribute to the growing body of bioinformatic software. 

<br><a href="/software/phyinformR/">phyinformR</a>

<ul>
    {% for post in site.categories.software %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>

<br><a href="/MiscR/">Other software</a>

<ul>
    {% for post in site.categories.MiscR %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
