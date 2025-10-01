---
layout: page
title: Latest Intel Brief
---

{% assign latest_brief = site.briefs | sort: 'date' | reverse | first %}

<h2 class="post-list-heading">{{ latest_brief.title }}</h2>
<p class="post-meta">{{ latest_brief.date | date: "%B %-d, %Y" }}</p>

{{ latest_brief.content }}
