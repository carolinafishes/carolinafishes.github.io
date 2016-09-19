---
layout: page
show_meta: false
title: "Updates from the field"
subheadline: ""
permalink: "/fieldwork/"
header:
   image_fullwidth: "fieldworkmain.jpg"
   title: ""
   caption: Guam
---
The story of fishes over the last several hundred million years is one of success in any habitat where there is water. To better understand just how fishes are so successful in every aquatic habitat, we have an active field research program that may take us anywhere from the backyard creeks of North Carolina to remote regions in the Atlantic and Pacific Oceans. Join us here as we share stories and discoveries from our adventures.

<ul>
    {% for post in site.categories.fieldwork %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>