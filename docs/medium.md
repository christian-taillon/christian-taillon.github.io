layout: page
title: "Medium Articles"
permalink: /medium/

<h2> Medium Blog Posts </h2>

{% for e in site.medium_posts %}

<div class="row">
  <h3>{{e.title}}</h3>
  <p>{{e.feed_content}}</p>

  {% endfor %}

</div>
