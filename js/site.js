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

    // ========== Research Highlights ==========

    // Wrap $...$ in a math-styled span
    function math(str) {
        return str.replace(/\$([^$]+)\$/g, '<span class="hl-math">$1</span>');
    }

    function el(tag, className, html) {
        var node = document.createElement(tag);
        node.className = className;
        if (html !== undefined) node.innerHTML = math(md(html));
        return node;
    }

    function renderHighlights() {
        var container = document.getElementById('highlights');
        if (!container || typeof HIGHLIGHTS === 'undefined') return;

        container.appendChild(el('p', 'hl-overview', HIGHLIGHTS.overview));

        var diagram = el('div', 'hl-diagram');

        // Hub: title, s0 -> s1 -> ... -> g chain, formula, question
        var hub = HIGHLIGHTS.hub;
        var hubBox = el('div', 'hl-hub');
        hubBox.appendChild(el('div', 'hl-hub-title', hub.title));

        var chain = el('div', 'hl-chain');
        var segments = hub.chain.segments;
        hub.chain.states.forEach(function (state, i) {
            chain.appendChild(el('span', 'hl-node hl-math', state));
            if (i < segments.length) {
                var edge = el('span', 'hl-edge' + (i === segments.length - 1 ? ' hl-edge-gap' : ''));
                edge.appendChild(el('span', 'hl-edge-label hl-math', segments[i]));
                chain.appendChild(edge);
            }
        });
        hubBox.appendChild(chain);

        hubBox.appendChild(el('div', 'hl-formula', hub.formula));
        hubBox.appendChild(el('div', 'hl-question', hub.question));
        diagram.appendChild(hubBox);

        // Pillars laid out as a triangle (see .hl-pillars), joined by SVG arrows
        var pillars = el('div', 'hl-pillars');
        var boxes = {};
        HIGHLIGHTS.pillars.forEach(function (pillar) {
            var box = el('div', 'hl-pillar');
            boxes[pillar.id] = box;

            var head = el('div', 'hl-pillar-head');
            head.appendChild(el('span', 'hl-pillar-name', pillar.name));
            head.appendChild(el('span', 'hl-math', pillar.symbol));
            box.appendChild(head);

            box.appendChild(el('div', 'hl-pillar-question', pillar.question));
            pillars.appendChild(box);
        });

        var svgNS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('class', 'hl-edges');
        pillars.appendChild(svg);

        // Tooltip listing the papers behind an edge
        var tip = el('div', 'hl-tip');
        pillars.appendChild(tip);
        var hideTimer;
        function showTip(edge, x, y) {
            clearTimeout(hideTimer);
            tip.innerHTML = '';
            edge.papers.forEach(function (paper) {
                var a = el('a', '', paper.name);
                a.href = paper.url;
                a.target = '_blank';
                var row = el('div', 'hl-tip-row');
                row.appendChild(a);
                if (paper.venue) row.appendChild(el('span', 'hl-tip-venue', ' ' + paper.venue));
                tip.appendChild(row);
            });
            tip.style.left = x + 'px';
            tip.style.top = y + 'px';
            tip.classList.add('hl-tip-show');
        }
        function hideTip() {
            hideTimer = setTimeout(function () { tip.classList.remove('hl-tip-show'); }, 200);
        }
        tip.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
        tip.addEventListener('mouseleave', hideTip);

        diagram.appendChild(pillars);
        container.appendChild(diagram);

        // Point where the ray from a box's center toward (dx, dy) leaves the box, plus a gap
        function exitPoint(r, dx, dy, gap) {
            var t = Math.min(
                dx ? (r.w / 2 + gap) / Math.abs(dx) : Infinity,
                dy ? (r.h / 2 + gap) / Math.abs(dy) : Infinity
            );
            return { x: r.cx + dx * t, y: r.cy + dy * t };
        }

        function line(p, q, className) {
            var l = document.createElementNS(svgNS, 'line');
            l.setAttribute('x1', p.x); l.setAttribute('y1', p.y);
            l.setAttribute('x2', q.x); l.setAttribute('y2', q.y);
            l.setAttribute('class', className);
            svg.appendChild(l);
            return l;
        }

        function drawEdges() {
            var origin = pillars.getBoundingClientRect();
            var rect = function (box) {
                var b = box.getBoundingClientRect();
                return {
                    cx: b.left - origin.left + b.width / 2, cy: b.top - origin.top + b.height / 2,
                    w: b.width, h: b.height
                };
            };

            svg.innerHTML = '';
            (HIGHLIGHTS.edges || []).forEach(function (edge) {
                var a = rect(boxes[edge.from]), b = rect(boxes[edge.to]);
                var dx = b.cx - a.cx, dy = b.cy - a.cy;
                var p = exitPoint(a, dx, dy, 4), q = exitPoint(b, -dx, -dy, 4);

                var visible = line(p, q, 'hl-edge-line');
                if (!edge.papers || !edge.papers.length) return;

                // Wider invisible line so the edge is easy to hover or tap
                var hit = line(p, q, 'hl-edge-hit');
                var mid = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
                hit.addEventListener('mouseenter', function () {
                    visible.classList.add('hl-edge-active');
                    showTip(edge, mid.x, mid.y);
                });
                hit.addEventListener('mouseleave', function () {
                    visible.classList.remove('hl-edge-active');
                    hideTip();
                });
                hit.addEventListener('click', function () { showTip(edge, mid.x, mid.y); });
            });
        }

        drawEdges();
        window.addEventListener('resize', drawEdges);
        // Web fonts can change box sizes after first paint
        if (document.fonts) document.fonts.ready.then(drawEdges);
    }

    // ========== Code Repositories ==========

    function renderCode() {
        var container = document.getElementById('code-list');
        if (!container || typeof CODE === 'undefined') return;

        CODE.forEach(function (repo) {
            var a = document.createElement('a');
            a.className = 'code-btn';
            a.textContent = repo.name;
            if (repo.url) {
                a.href = repo.url;
                a.target = '_blank';
            } else {
                a.onclick = function () { snackBar(); };
            }
            container.appendChild(a);
        });
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
            // Videos are hidden; Code shows only when a repository URL exists
            var links = pub.links.filter(function (link) {
                if (link.label === 'Code') return !!link.url;
                return link.label !== 'Video';
            });
            links.forEach(function (link, i) {
                var a = document.createElement('a');
                if (link.url) {
                    a.href = link.url;
                } else {
                    a.style.cursor = 'pointer';
                    a.onclick = function () { snackBar(); };
                }
                a.textContent = link.label;
                linksSpan.appendChild(a);
                if (i < links.length - 1) {
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

    renderHighlights();
    renderPublications();
    renderUpdates();
    renderCode();
    renderExperience();
    renderServices();
    initProfileCycling();


})();
