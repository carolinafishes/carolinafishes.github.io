---
layout: page
show_meta: false
title:  "Research Publications"

teaser: "Keep up to date with what we have investigated!"
categories:
    - Pubs
tags:
    - Pubs
    
image:
   thumb: "publication_fish_thumb.jpg"
header:
    image_fullwidth: "publication_fish.jpg"
    title: ""
    caption: Curacao
    caption_url: https://carolinafishes.github.io/fieldwork/diving
permalink: "/Pubs/"
---
Check out our latest papers here, or browse our paper archives!
<a href="/Pubs/reprints/">Reprints</a>
<br>
<br>
Don't feel like getting weary from a heavy technical read? Keep up with us as we publish papers <a href="/highlights/">here</a> of the link below. We will be giving overviews of our findings as well as other neat stuff we discover along the way
<br>
<br><a href="/highlights/">Highlights</a>
<br>
<br>
If you are looking for data, please visit our archives on github to <a href="https://github.com/carolinafishes">download data from any of our recent studies</a>.

<ul>
    {% for post in site.categories.Pubs %}
    <li><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
