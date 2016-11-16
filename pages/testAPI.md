---
layout: page
show_meta: false
title:  "Testing API"

teaser: "testing"
categories:
    - team
tags:
    - team 
    
image:
   thumb: "volunteer_water.jpg"
header:
    image_fullwidth: "staff_beach.jpg"
    title: ""
    caption: Avon, NC
permalink: "/testAPI/"
---

{
  "name": "World Register of Marine Species",
  "identifierSpace": "urn:lsid:marinespecies.org:taxname:",
  "schemaSpace": "http:\/\/rdf.freebase.com\/ns\/type.object.id",
  "view": {
    "url": "http:\/\/www.marinespecies.org\/aphia.php?p=taxdetails&id={{id}}"
  },
  "defaultTypes": [
    {
      "id": "\/biology\/organism_classification\/scientific_name",
      "name": "Scientific name"
    }
  ]
}