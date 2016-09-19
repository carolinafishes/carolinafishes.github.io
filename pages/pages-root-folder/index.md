---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
header:
    image_fullwidth: "main_page2.jpg"
    title: ""
    caption: Cape Fear River, NC
widget-1:
    title: "Research Highlights"
    url: 'https://carolinafishes.github.io/highlights'
    text: 'With over 30,000 species, it is an understatement to say that there is much to discover about the diversity of fishes. Come learn about our ongoing research projects and discoveries here!'
    image: Hiding_fish2.jpg
widget-2:
    title: "PhyR"
    url: 'https://carolinafishes.github.io/software/PhyR'
    text: 'We have a beta version of our new R package PhyR available for testing. Check out the manual and code here!'
    image: lizard_fish.jpg 
widget-3:
    title: "Recent Posts"
    url: 'https://carolinafishes.github.io/blog/archive'
    text: 'Browse our archives to see what we've been up to!'
    image: Hiding_fish2.jpg
#
# Use the call for action to show a button on the frontpage
#
# To make internal links, just use a permalink like this
# url: /getting-started/
#
# To style the button in different colors, use no value
# to use the main color or success, alert or secondary.
# To change colors see sass/_01_settings_colors.scss
#
callforaction:
  url: https://tinyletter.com/feeling-responsive
  text: Inform me about new updates and features ›
  style: alert
permalink: /index.html
#
# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

<div id="videoModal" class="reveal-modal large" data-reveal="">
  <div class="flex-video widescreen vimeo" style="display: block;">
    <iframe width="1280" height="720" src="https://www.youtube.com/embed/3b5zCFSmVvU" frameborder="0" allowfullscreen></iframe>
  </div>
  <a class="close-reveal-modal">&#215;</a>
</div>
