---
layout: page
show_meta: false
title: "Discover the Amazing World of Fish"
subheadline: ""
permalink: "/fish_diversity/"
header:
   image_fullwidth: "Fish2_banner.jpg"
   title: ""
   caption: Cannon Beach, Oregon
---
<br> There are over 34,000 species of ray-finned fishes in our world today. These animals comprise over half the world's vertebrates, meaing there are just as many fishes as there are mammals, reptiles, amphibians, turtles, crocodiles, and birds combined. 
<br>

From environments spanning rivers and lakes to caves and the bottom of the ocean, fish have found ways to make a living virtually anywhere there is water. In doing so, fish have evolved some amazing adaptions: extreme camoflouge, armor, chemical lures, lethal venom, new ways of swimming, new ways of eating, new ways of communicating, the list goes on and on. Yet despite their diversity, we rarely get to see even a fraction of them in our lives.  
<br>

Understanding fish and their diversity is important. Not just so we can be effective stewards of the world's water, but also for our survival as a species. Fish provide billions of dollars in ecosystem services for us. They also form the basis of of how thousands of people around the world make their living.Their staggering diversity of adaptations continues to provide insights into engineering problems, drug development, and disease research. 
<br>

Discover some of this amazing world and read about our encounters with these animals here


<ul>
    {% for post in site.categories.fish_diversity %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>