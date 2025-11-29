---
layout: page
title: Categories
permalink: /categories/
---

<div class="categories">
  {% assign sorted_categories = site.categories | sort %}
  {% for category in sorted_categories %}
    {% assign category_name = category[0] %}
    {% assign posts = category[1] %}

  <h2 id="{{ category_name | slugify }}">{{ category_name }}</h2>
  <ul class="post-list">
    {% for post in posts %}
      <li>
        <span class="post-meta">{{ post.date | date: site.plainwhite.date_format }}</span>
        <h3>
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
      </li>
    {% endfor %}
  </ul>
  {% endfor %}
</div>

<style>
.categories {
  margin-top: 2rem;
}

.categories h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
  text-transform: capitalize;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-list li {
  margin-bottom: 2rem;
}

.post-meta {
  font-size: 0.9rem;
  color: #828282;
}

.post-list h3 {
  margin: 0.5rem 0;
  font-size: 1.3rem;
}

.post-list h3 a {
  color: #2a7ae2;
  text-decoration: none;
}

.post-list h3 a:hover {
  text-decoration: underline;
}

.post-list p {
  color: #666;
  margin-top: 0.5rem;
}
</style>
