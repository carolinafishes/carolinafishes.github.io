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
Volunteers and interns form the heart of our research unit. We offer numerous opportunities for research and collections experience through both the <a href='http://naturalsciences.org/support/internships'> N.C. Museum of Natural Sciences Internship program</a> and the <a href='http://carolinafishes.github.io/Team/Volunteers/'>N.C. Museum of Natural Sciences Volunteer program</a>. Our interns and volunteers of span all age groups (high School through retiree) and educational backgrounds (high school through Ph.D.). We strongly believe in creating an open and intellectually engaging atmosphere that fosters personal growth and development while simultaneously creating a strong research team whose collective aim is to understand the origin and maintanence of the planet's biodiversity. 
<br>


<ul>
    {% for post in site.categories.Joinus %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>