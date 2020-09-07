---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
header:
  image_fullwidth: main_page2.jpg
  title: ""
  caption: Cape Fear River, NC
widget1:
  title: "Research Highlights"
  url: 'https://carolinafishes.github.io/highlights/'
  image: Hiding_fish2.jpg
  text: 'With over 30,000 species, it is an understatement to say that there is much to discover about the diversity of fishes. Come learn about our ongoing research projects and discoveries here!'
widget2:
  title: "phyinformR"
  url: 'https://carolinafishes.github.io/software/phyinformR/'
  image: lizard_fish.jpg
  text: 'New to PhyInformR? Check out the manual and code here!'
widget3:
  title: "Reprints"
  url: 'https://carolinafishes.github.io/Pubs/reprints/'
  image: Hiding_fish2.jpg
  text: 'We are always busy working with our colleagues on all sorts of interesting projects. Browse our published articles here!'
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
  url: https://tinyletter.com/carolinafishes
  text: Inform me about new updates ›
  style: secondary
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
