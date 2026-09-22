---
layout: default
title: Personal Website
---
<div id="jekyll-fallback">
  <section class="hero-app">
    <div class="hero-card">
      <div class="hero-top">
        <img class="avatar" src="{{ site.data.site.profile.avatar }}" alt="Foto {{ site.data.site.profile.name }}" width="84" height="84" loading="lazy">
        <div class="chip-online"><span></span> Available</div>
      </div>
      <h1>{{ site.data.site.profile.name }}<span class="accent">.</span></h1>
      <p class="role">{{ site.data.site.profile.role }} — {{ site.data.site.profile.location }}</p>
      <p class="desc">{{ site.data.site.profile.desc }}</p>
      <div class="cta-row"><a href="#kontak" class="btn primary">Hubungi →</a><a href="{{ '/karya/' | relative_url }}" class="btn ghost">Lihat Karya</a></div>
      <div class="stats">
        {% for s in site.data.site.stats %}<div><b>{{ s.value }}</b><span>{{ s.label }}</span></div>{% endfor %}
      </div>
    </div>
    <div class="hero-actions">
      {% for link in site.data.site.social %}<a href="{{ link.url }}" class="mini-card"><span>{{ link.icon }}</span> {{ link.label }}</a>{% endfor %}
    </div>
  </section>

  <section class="section"><div class="section-head"><h2>Karya Pilihan</h2><a href="{{ '/karya/' | relative_url }}" class="link-more">Semua Karya →</a></div>
    <div class="grid">
      {% for w in site.karya limit:3 %}
      <article class="work"><div class="thumb t{{ w.thumb | default: 1 }}"></div><div class="work-body"><span class="cat">{{ w.cat }} • {{ w.year | default: '2026' }}</span><h3>{{ w.title }}</h3><p>{{ w.desc }}</p><a href="{{ w.url | relative_url }}">Buka →</a></div></article>
      {% endfor %}
    </div>
  </section>

  <section id="tentang" class="section">
    <div class="section-head"><h2>Tentang</h2></div>
    {% include about-card.html %}
  </section>

  <section id="skill" class="section">
    <div class="section-head"><h2>Keahlian</h2><span class="pill">{{ site.data.site.skills.size }} Stack</span></div>
    <div class="card">
      <div class="skills">
        {% for s in site.data.site.skills %}
        <div class="skill"><div class="skill-head"><span>{{ s.name }}</span><span>{{ s.level }}</span></div><div class="bar"><i style="width:{{ s.level }}"></i></div></div>
        {% endfor %}
      </div>
      <div class="tags"><span>Cari Kayu Bakar</span><span>>Angon Bebek</span><span>Nyiram Pekarangan</span><span>Nyeduh Kopi</span><span>Mancing</span><span>Nyantai</span></div>
    </div>
  </section>


  <section class="section"><div class="section-head"><h2>Blog Terbaru</h2><a href="{{ '/blog/' | relative_url }}" class="link-more">Semua Artikel →</a></div>
    <div class="grid">
      {% for p in site.posts limit:3 %}
      <article class="work"><div class="thumb" style="background:linear-gradient(135deg,#6C5CE7,#06B6D4);height:110px"></div><div class="work-body"><span class="cat">{{ p.date | date: "%Y-%m-%d" }}</span><h3>{{ p.title }}</h3><p>{{ p.excerpt | strip_html | truncate: 80 }}</p><a href="{{ p.url | relative_url }}">Baca →</a></div></article>
      {% endfor %}
    </div>
  </section>
  
  <section id="kontak" class="section">
    <div class="section-head"><h2>Kontak</h2><span class="muted">Balas &lt; 24 jam</span></div>
    {% include contact-card.html %}
  </section>
</div>
