---
layout: page
show_meta: false
title: "Research Opportunities"
subheadline: ""
permalink: "/Joinus/"
header:
   image_fullwidth: "volunteer_fish.jpg"
   title: ""
   caption: Peacock flounder, Curaçao
---
<h3>Interested in joining our group?</h3>

<br>
<br> 
Students form the heart of our research group. We strive to offer numerous opportunities for research experience through both <a href=''> Undergraduate research opportunities</a> and <a href=''> graduate research</a>. We strongly believe in creating an open and intellectually engaging atmosphere that fosters personal growth and development while simultaneously creating a strong research team whose collective aim is to understand the origin and maintanence of the planet's biodiversity. 
<br>


<ul>
    {% for post in site.categories.Joinus %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>