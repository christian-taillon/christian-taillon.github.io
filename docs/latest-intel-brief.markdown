---
layout: page
title: Latest Intel Brief
---

> This page displays the latest intelligence brief.

---

{% if site.briefs %}
  {% assign latest_brief = site.briefs | sort: 'date' | reverse | first %}
{% else %}
  {% assign latest_brief = nil %}
{% endif %}

{% if latest_brief %}
<h2 class="post-list-heading">{{ latest_brief.title }}</h2>
<p class="post-meta">{{ latest_brief.date | date: "%B %-d, %Y" }}</p>

{{ latest_brief.content }}
{% else %}
<p>No intelligence briefs available at this time.</p>
{% endif %}