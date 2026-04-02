// site.js — Renders all dynamic sections from data/*.js files.
// Loaded after the data scripts: PUBLICATIONS, UPDATES, EXPERIENCE, SERVICES, PROFILE_IMAGES

(function () {
    'use strict';

    // ========== Helpers ==========

    // Convert [text](url) to clickable links
    function md(str) {
        return str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    }

    // Auto-bold "Utkarsh A. Mishra" (with optional trailing *)
    function formatAuthors(str) {
        return str.replace(/(Utkarsh A\. Mishra\*?)/g, '<span class="fw6">$1</span>');
    }

    // ========== Snackbar ==========

    window.snackBar = function () {
        var x = document.getElementById('snackbar');
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    };

    // ========== Bio Toggle ==========

    window.toggleBio = function () {
        var more = document.getElementById('bio-more');
        var btn = document.querySelector('.bio-toggle');
        more.classList.toggle('bio-expanded');
        btn.textContent = more.classList.contains('bio-expanded') ? '[less]' : '[more]';
    };

    // ========== Profile Image Cycling ==========

    function initProfileCycling() {
        if (typeof PROFILE_IMAGES === 'undefined' || PROFILE_IMAGES.length < 2) return;
        var img = document.getElementById('headshot');
        if (!img) return;

        var idx = 0;
        setInterval(function () {
            idx = (idx + 1) % PROFILE_IMAGES.length;
            img.classList.add('headshot-fade');
            setTimeout(function () {
                img.src = PROFILE_IMAGES[idx];
                img.classList.remove('headshot-fade');
            }, 400);
        }, 3000);
    }

    // ========== Publications ==========

    function renderPublications() {
        var container = document.getElementById('publications-list');
        if (!container || typeof PUBLICATIONS === 'undefined') return;

        PUBLICATIONS.forEach(function (pub) {
            var row = document.createElement('div');
            row.className = 'row publication';
            if (pub.selected) row.dataset.selected = 'true';
            if (!pub.selected) row.classList.add('collapsed');

            // Media column
            var media = document.createElement('div');
            media.className = 'pub-image four columns';
            if (pub.video) {
                var v = document.createElement('video');
                v.src = pub.video;
                v.autoplay = true;
                v.muted = true;
                v.loop = true;
                v.playsInline = true;
                v.style.maxHeight = '110px';
                v.style.borderRadius = '4px';
                media.appendChild(v);
            } else if (pub.image) {
                var im = document.createElement('img');
                im.src = pub.image;
                im.alt = pub.title;
                im.loading = 'lazy';
                media.appendChild(im);
            }

            // Details column
            var details = document.createElement('div');
            details.className = 'pub-desc eight columns';

            var title = document.createElement('span');
            title.className = 'pub-title';
            title.innerHTML = '<a href="' + pub.url + '">' + pub.title + '</a>';
            details.appendChild(title);

            var authors = document.createElement('div');
            authors.className = 'pub-authors';
            authors.innerHTML = formatAuthors(pub.authors);
            details.appendChild(authors);

            pub.venues.forEach(function (v) {
                var venue = document.createElement('span');
                venue.className = 'pub-venue';
                venue.textContent = v;
                details.appendChild(venue);
                details.appendChild(document.createElement('br'));
            });

            var linksSpan = document.createElement('span');
            linksSpan.className = 'pub-desc';
            pub.links.forEach(function (link, i) {
                var a = document.createElement('a');
                if (link.url) {
                    a.href = link.url;
                } else {
                    a.style.cursor = 'pointer';
                    a.onclick = function () { snackBar(); };
                }
                a.textContent = link.label;
                linksSpan.appendChild(a);
                if (i < pub.links.length - 1) {
                    linksSpan.appendChild(document.createTextNode('\u00a0\u00a0\u00a0'));
                }
            });
            details.appendChild(linksSpan);

            row.appendChild(media);
            row.appendChild(details);
            container.appendChild(row);
        });
    }

    window.switchTab = function (tab, btn) {
        document.querySelectorAll('.pub-tab').forEach(function (el) { el.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('.publication').forEach(function (el) {
            if (tab === 'all') {
                el.classList.remove('collapsed');
            } else {
                if (el.dataset.selected === 'true') {
                    el.classList.remove('collapsed');
                } else {
                    el.classList.add('collapsed');
                }
            }
        });
    };

    // ========== Updates ==========

    var updatesVisible = 5;
    var STEP = 5;

    function renderUpdates() {
        var ul = document.getElementById('updates-list');
        if (!ul || typeof UPDATES === 'undefined') return;

        UPDATES.forEach(function (text, i) {
            var li = document.createElement('li');
            li.innerHTML = md(text);
            if (i >= updatesVisible) li.classList.add('update-hidden');
            ul.appendChild(li);
        });
        syncUpdatesBtn();
    }

    window.showMoreUpdates = function () {
        var items = document.querySelectorAll('#updates-list li');
        updatesVisible = Math.min(updatesVisible + STEP, items.length);
        applyUpdateVisibility(items);
    };

    window.showLessUpdates = function () {
        updatesVisible = STEP;
        var items = document.querySelectorAll('#updates-list li');
        applyUpdateVisibility(items);
    };

    function applyUpdateVisibility(items) {
        items.forEach(function (li, i) {
            if (i < updatesVisible) {
                li.classList.remove('update-hidden');
            } else {
                li.classList.add('update-hidden');
            }
        });
        syncUpdatesBtn();
    }

    function syncUpdatesBtn() {
        var moreBtn = document.getElementById('updatesMoreBtn');
        var lessBtn = document.getElementById('updatesLessBtn');
        if (!moreBtn || !lessBtn) return;
        var total = document.querySelectorAll('#updates-list li').length;
        moreBtn.style.display = updatesVisible >= total ? 'none' : '';
        lessBtn.style.display = updatesVisible > STEP ? '' : 'none';
    }

    // ========== Experience ==========

    function renderExperience() {
        var container = document.getElementById('experience-timeline');
        if (!container || typeof EXPERIENCE === 'undefined') return;

        EXPERIENCE.forEach(function (item) {
            var div = document.createElement('div');
            div.className = 'timeline-item';

            var logoDiv = document.createElement('div');
            logoDiv.className = 'timeline-logo' + (item.logoSize ? ' logo-' + item.logoSize : '');
            var img = document.createElement('img');
            img.src = item.logo;
            img.alt = item.name;
            logoDiv.appendChild(img);

            var dot = document.createElement('div');
            dot.className = 'timeline-dot';

            var info = document.createElement('div');
            info.className = 'timeline-info';
            info.innerHTML =
                '<div class="timeline-role">' + item.role + '</div>' +
                '<div class="timeline-place">' + item.place + '</div>' +
                '<div class="timeline-date">' + item.date + '</div>';

            div.appendChild(logoDiv);
            div.appendChild(dot);
            div.appendChild(info);
            container.appendChild(div);
        });
    }

    // ========== Services ==========

    function renderServices() {
        var ul = document.getElementById('services-list');
        if (!ul || typeof SERVICES === 'undefined') return;

        SERVICES.forEach(function (item) {
            var li = document.createElement('li');
            li.innerHTML = '<span class="fw6">' + item.category + ':</span> ' + md(item.description);
            ul.appendChild(li);
        });
    }

    // ========== Init ==========

    renderPublications();
    renderUpdates();
    renderExperience();
    renderServices();
    initProfileCycling();


})();
