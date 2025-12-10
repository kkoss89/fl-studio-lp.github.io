LOGO_DEV_TOKEN = 'pk_MuEc4Fh-Tpmqc9I8m8hzVg'; // Public key
const ACTION_TIME = 1000;

const editions = [
    { title: 'FRUITY', img: 'https://i.imgur.com/DbZtjFI.png', desc: 'Perfect for beatmaking and melodies. Includes core pattern-based workflow features.' },
    { title: 'PRODUCER', img: 'https://i.imgur.com/4kseV07.png', desc: 'Full recording, arranging, and mixing complete songs with audio and MIDI.' },
    { title: 'SIGNATURE', img: 'https://i.imgur.com/FNdaRF8.png', desc: 'Adds extra instruments and effects for advanced sound design.' },
    { title: 'ALL PLUGINS', img: 'https://i.imgur.com/7lWrK9x.png', desc: 'Unlocks every Image-Line plugin for the complete toolset.' },
    { title: 'MOBILE', img: 'https://i.imgur.com/yIgAQz3.png', desc: 'Create music on your phone or tablet on the go.' }
];

const osData = {
    'macOS': 'https://img.icons8.com/?size=80&id=122959&format=png',
    'Android': 'https://img.icons8.com/?size=80&id=17836&format=png',
    'iOS': 'https://img.icons8.com/?size=80&id=20821&format=png',
    'Windows': 'https://img.icons8.com/?size=80&id=108792&format=png'
};

const browserLogos = {
    'Edge': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png',
    'Opera': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png',
    'Chrome': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png',
    'Firefox': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png',
    'Safari': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png',
    'Brave': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/brave/brave_48x48.png',
    'Vivaldi': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/vivaldi/vivaldi_48x48.png',
    'Tor Browser': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/tor/tor_48x48.png',
    'Yandex': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/yandex/yandex_48x48.png',
    'Puffin': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/puffin/puffin_48x48.png',
    'Deno': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/deno/deno_48x48.png',
    'Dolphin': 'https://raw.githubusercontent.com/alrra/browser-logos/main/src/dolphin/dolphin_48x48.png'
};

const ispLogos = {
    'att': 'https://i.imgur.com/wXY2AIg.png',
    'verizon': 'https://i.imgur.com/yioNVoq.png',
    'alba': 'https://i.imgur.com/pBbzxS9.png',
    'xfinity': 'https://i.imgur.com/vMleI2o.png',
    'charter': 'https://i.imgur.com/9tElUJI.png',
    'viasat': 'https://i.imgur.com/0zNQO0a.png'
};

const countries = ['us', 'de', 'fr', 'gb', 'br', 'jp', 'ca', 'au', 'es', 'it', 'nl', 'se', 'pl', 'mx', 'in'];

const continentMap = {
    "NA": "North America", "SA": "South America", "EU": "Europe",
    "AS": "Asia", "AF": "Africa", "OC": "Oceania", "AN": "Antarctica"
};

// Global User Data
let userData = {
    browser: 'Unknown',
    os: 'Unknown',
    ipv4: null,
    ipv6: null,
    geo: null
};

let voucherRevealed = false;

// --- jQuery Logic Start ---
$(document).ready(function () {

    // --- Cached Selectors (Elements) ---
    const els = {
        wrapper: $('#cardsWrapper'),
        detail: $('#detailView'),
        console: $('#scanConsole'),
        liveList: $('#liveList'),
        verifyList: $('#verificationList'),
        startBtn: $('#startScan'),
        giftCardTitle: $('#giftCardTitle'),
        giftCardKey: $('#giftCardKey'),
        giftCardOSIcon: $('#giftCardOSIcon'),
        giftCardDeviceIcon: $('#giftCardDeviceIcon'),
        giftCardExpiry: $('#giftCardExpiry'),
        verifyBrowser: $('#verify-browser'),
        verifyOs: $('#verify-os'),
        verifyIp: $('#verify-ip'),
        verifyIsp: $('#verify-isp'),
        verifyCountry: $('#verify-country'),
        verifyRegion: $('#verify-region'),
        securityBtn: $('#securityCheckBtn'),
        genTitle: $('#genTitle')
    };

    // Footer Year
    const $fy = $('#footerYear');
    if ($fy.length) $fy.text(new Date().getFullYear());

    // --- Render Editions ---
    const cardsHtml = editions.map((e, i) => `
        <div class="col-12 col-md-6 col-lg">
            <div class="card h-100 p-2 rounded-3 d-flex justify-content-center align-items-center" data-index="${i}">
                <img src="${e.img}" class="card-img-top" alt="${e.title}">
                <h5 class="card-title text-center p-3 mt-auto fw-bold text-light">${e.title}</h5>
            </div>
        </div>
    `).join('');
    els.wrapper.html(cardsHtml);

    // Event Delegation for Card Clicks
    // Using simple approach since cards are inserted once
    $('.card').on('click', function () {
        const idx = $(this).data('index');
        openDetail(idx);
    });

    // --- Browser/OS Detection ---
    const ua = navigator.userAgent.toLowerCase();
    const detect = (map, priorityKeys, defaultVal) => {
        const keys = priorityKeys || Object.keys(map);
        return keys.find(key => {
            const search = key.toLowerCase();
            if (search === 'opera') return ua.includes('opera') || ua.includes('opr');
            return ua.includes(search.replace('macos', 'mac os x'));
        }) || defaultVal;
    };

    const osPriority = ['Windows', 'macOS', 'Android', 'iOS'];
    userData.os = detect(osData, osPriority, 'Windows');

    const browserPriority = ['Edge', 'Opera', 'Brave', 'Vivaldi', 'Yandex', 'Chrome', 'Firefox', 'Tor Browser', 'Puffin', 'Deno', 'Dolphin', 'Safari'];
    userData.browser = detect(browserLogos, browserPriority, 'Chrome');

    console.log('[FLGEN] User Agent:', ua);
    console.log('[FLGEN] Detected Browser:', userData.browser);
    console.log('[FLGEN] Detected OS:', userData.os);

    // --- API Helpers (jQuery AJAX) ---
    const fetchJson = (url) => {
        return $.ajax({
            url: url,
            dataType: 'json',
            timeout: 5000
        });
    };

    const fetchIpapi = async (ip = null) => {
        try {
            const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/';
            const data = await fetchJson(url);
            if (data.ip) {
                return {
                    ip: data.ip,
                    country_code: data.country_code,
                    country_name: data.country_name,
                    continent_code: data.continent_code,
                    isp: data.org,
                    domain: null,
                    // mapping other fields if needed
                    ...data
                };
            }
            throw new Error('ipapi failed');
        } catch (e) { throw e; }
    };

    const fetchIpwho = async (ip = null) => {
        try {
            const url = ip ? `https://ipwho.is/?ip=${ip}` : 'https://ipwho.is/';
            const data = await fetchJson(url);
            if (data.success) {
                return {
                    ip: data.ip,
                    country_code: data.country_code,
                    country_name: data.country,
                    continent_code: data.continent_code,
                    isp: data.connection.isp || data.connection.org,
                    domain: data.connection.domain,
                    region: data.region, // Important
                    ...data
                };
            }
            throw new Error('ipwho failed');
        } catch (e) { throw e; }
    };

    const fetchFreeGeoip = async (ip = null) => {
        try {
            const url = ip ? `https://freegeoip.app/json/${ip}` : 'https://freegeoip.app/json/';
            const data = await fetchJson(url);
            if (data && (data.ip || ip)) {
                return {
                    ip: data.ip || ip,
                    country_code: data.country_code,
                    country_name: data.country_name,
                    region: data.region_name,
                    isp: null, domain: null,
                    ...data
                };
            }
            throw new Error('freegeoip failed');
        } catch (e) { throw e; }
    };

    // ip-api jsonp via jQuery
    const fetchIpApiJsonp = (ip = null) => {
        return new Promise((resolve, reject) => {
            const fields = 'status,country,countryCode,region,regionName,city,isp,org,query,lat,lon,continentCode';
            $.ajax({
                url: `http://ip-api.com/json/${ip || ''}`,
                data: { fields: fields },
                dataType: 'jsonp', // Auto-handles callback
                timeout: 5000,
                success: (data) => {
                    if (data && data.status === 'success') {
                        resolve({
                            ip: data.query || ip,
                            country_code: data.countryCode,
                            country_name: data.country,
                            continent_code: data.continentCode,
                            region: data.regionName || data.region,
                            isp: data.isp || data.org,
                            domain: null,
                            ...data
                        });
                    } else {
                        reject(new Error('ip-api failed'));
                    }
                },
                error: (xhr, status, err) => reject(new Error(err))
            });
        });
    };

    const fetchGeoData = async () => {
        const ip = userData.ipv4 || userData.ipv6;

        try {
            const geo = await fetchIpwho(ip);
            geo.queriedIp = ip; geo.service = 'ipwho.is';
            console.log('[FLGEN] Geo lookup success:', geo.service, ip);
            return geo;
        } catch (e) { console.warn('ipwho failed', e); }

        try {
            const geo = await fetchFreeGeoip(ip);
            geo.queriedIp = ip; geo.service = 'freegeoip.app';
            console.log('[FLGEN] Geo lookup success:', geo.service, ip);
            return geo;
        } catch (e) { console.warn('freegeoip failed', e); }

        try {
            const geo = await fetchIpapi(ip);
            geo.queriedIp = ip; geo.service = 'ipapi.co';
            console.log('[FLGEN] Geo lookup success:', geo.service, ip);
            return geo;
        } catch (e) { console.warn('ipapi failed', e); }

        try {
            const geo = await fetchIpApiJsonp(ip);
            geo.queriedIp = ip; geo.service = 'ip-api (jsonp)';
            console.log('[FLGEN] Geo lookup success:', geo.service, ip);
            return geo;
        } catch (e) { console.warn('ip-api failed', e); }

        // Fallback auto
        try {
            const geo = await fetchIpwho();
            geo.service = 'ipwho (auto)';
            return geo;
        } catch (e) {
            try { return await fetchIpapi(); } catch (e2) { return null; }
        }
    };

    const initializeUserIntel = async () => {
        console.log('[FLGEN] Initializing user intel...');

        try {
            const v4 = await fetchJson(`https://api.ipify.org?format=json&t=${Date.now()}`);
            userData.ipv4 = v4.ip;
            console.log('IPv4:', userData.ipv4);
        } catch (e) { }

        try {
            const v6 = await fetchJson(`https://api64.ipify.org?format=json&t=${Date.now()}`);
            userData.ipv6 = v6.ip;
            console.log('IPv6:', userData.ipv6);
        } catch (e) { }

        try {
            const geo = await fetchGeoData();
            if (geo) {
                userData.geo = geo;
                console.log('Geo Data:', geo);
            }
        } catch (e) { }
    };

    const userIntelPromise = initializeUserIntel();

    // --- Typing Effect Plugin ---
    $.fn.typeWriter = async function (text, options = {}) {
        const speed = options.speed || 30;
        const erase = options.erase || false;
        const element = this[0]; // Raw DOM element
        if (!element) return;

        // Ensure cursor
        let $cursor = this.find('.blink-cursor');
        if ($cursor.length === 0) {
            $cursor = $('<span class="blink-cursor">_</span>');
            this.append($cursor);
        }
        const cursor = $cursor[0];

        if (erase) {
            // Collect text content excluding cursor
            let currentText = '';
            this.contents().each(function () {
                if (this !== cursor) currentText += $(this).text();
            });

            while (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                // Simple erase: clear and set text
                this.contents().filter(function () { return this !== cursor; }).remove();
                if (currentText.length > 0) {
                    this.prepend(document.createTextNode(currentText));
                }
                await new Promise(r => setTimeout(r, 15));
            }
        } else {
            // Clear existing excluding cursor
            this.contents().filter(function () { return this !== cursor; }).remove();
        }

        // Typing
        let textToType = text;
        let wrapperClass = '';

        // Detect wrapper
        const $temp = $('<div>').html(text);
        if ($temp.children().length > 0 && $temp.children().first().is('span')) {
            const $span = $temp.children().first();
            textToType = $span.text();
            wrapperClass = $span.attr('class').replace('blink', '').trim();
        }

        let $target = this;
        if (wrapperClass) {
            const $wrapper = $('<span>').addClass(wrapperClass);
            $cursor.before($wrapper);
            $target = $wrapper;
        } else {
            // Text node target implicitly handled by append to 'this' before cursor? 
            // Or create a text node.
            // Let's create a text node for plain typing
            const textNode = document.createTextNode('');
            $cursor.before(textNode);
            // We can manipulate the text node directly for performance/correctness
            // But jQuery doesn't wrap TextNodes easily for simple append.
        }

        if (!textToType) return;

        for (let i = 0; i < textToType.length; i++) {
            const char = textToType.charAt(i);
            if (wrapperClass) {
                $target.text($target.text() + char);
            } else {
                // Find that text node we inserted
                const node = $cursor[0].previousSibling;
                if (node && node.nodeType === 3) {
                    node.nodeValue += char;
                } else {
                    // Fallback
                    $cursor.before(char);
                }
            }
            const randomSpeed = speed + Math.random() * 20;
            await new Promise(r => setTimeout(r, randomSpeed));
        }

        // Keep blinking
        // Styles are in CSS for .blink-cursor
        await new Promise(r => setTimeout(r, 500));
    };

    // --- Logging ---
    const log = async (msg) => {
        let $row = els.console.find('.console-row-active');
        if ($row.length === 0) {
            els.console.empty();
            $row = $('<div class="py-2 console-row-active"></div>');
            $row.append('<span class="text-warning me-2">></span>');
            $row.append('<span class="log-content"></span>');
            els.console.append($row);
        }

        const $content = $row.find('.log-content');
        const hasText = $content.text().length > 0;
        await $content.typeWriter(msg, { erase: hasText });
    };

    // --- UI Logic ---
    window.openDetail = (index) => {
        const item = editions[index];
        els.giftCardTitle.text('FL STUDIO ' + item.title);

        // OS/Device Icons
        els.giftCardOSIcon.attr('class', 'fa-solid fa-question fa-3x');
        els.giftCardDeviceIcon.attr('class', 'fa-solid fa-question fa-3x');

        // Reorder
        try {
            // JQuery insertBefore
            els.giftCardOSIcon.insertBefore(els.giftCardDeviceIcon);
        } catch (e) { }

        els.giftCardExpiry.text('**/**/****');
        els.giftCardKey.text('XXXXX-XXXXX-XXXXX-XXXXX');

        els.startBtn.removeClass('d-none');
        els.securityBtn.addClass('d-none');
        els.genTitle.text("Generate your code");
        els.console.empty().addClass('d-none');

        // Reset verify list
        const keys = ['verifyBrowser', 'verifyOs', 'verifyIp', 'verifyIsp', 'verifyCountry', 'verifyRegion'];
        keys.forEach(k => {
            els[k].text('****').removeClass('text-warning').addClass('text-light')
                .find('.fa-check').remove(); // remove checks if any
            // Actually replace html to be safe
            // els[k].html('****');
        });

        els.wrapper.addClass('is-hidden');
        $('#generatorInfoSection, #generatorAnimationSection').removeClass('d-none');
        $('#cardsSection').addClass('d-none');

        setTimeout(() => els.detail.addClass('is-active'), 150);
    };

    $('#detailClose').on('click', () => {
        els.detail.removeClass('is-active');
        $('#generatorInfoSection, #generatorAnimationSection').addClass('d-none');
        $('#cardsSection').removeClass('d-none');
        setTimeout(() => els.wrapper.removeClass('is-hidden'), 350);
    });

    const updateVerifyItem = ($el, content) => {
        $el.html(content).removeClass('text-light').addClass('text-warning');
        $el.append(' <i class="fa-solid fa-check ms-2 text-success"></i>');
    };

    const resolveLogoUrl = async (domain) => {
        if (!domain) return null;
        return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&format=png&size=64`;
    };

    const flyElement = ($from, $to) => new Promise((resolve) => {
        const r1 = $from[0].getBoundingClientRect();
        const r2 = $to[0].getBoundingClientRect();
        const $clone = $from.clone();

        // Canvas copy
        const fromCanvases = $from.find('canvas');
        const cloneCanvases = $clone.find('canvas');
        fromCanvases.each((i, c) => {
            if (cloneCanvases[i]) cloneCanvases[i].getContext('2d').drawImage(c, 0, 0);
        });

        $clone.addClass('fly-clone').css({
            left: r1.left,
            top: r1.top,
            transform: 'translate(0,0)'
        }).appendTo('body');

        requestAnimationFrame(() => {
            const dx = r2.left + r2.width / 1 - (r1.left + r1.width / 1);
            const dy = r2.top + r2.height / 1 - (r1.top + r1.height / 1);

            $clone.css({
                transform: `translate(${dx}px, ${dy}px) scale(0)`,
                opacity: 0.2
            }); // Relies on CSS transition for animation

            setTimeout(() => {
                $clone.remove();
                resolve();
            }, 700);
        });
    });

    const consoleIpStage = async (finalIp, $target, verifyContent) => {
        els.console.addClass('scan-console').removeClass('d-none').empty();

        const $row = $('<div class="console-row"></div>');
        const $badge = $('<span class="slot-badge fs-1"></span>');
        const genRandIp = () => Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');
        $badge.text(genRandIp());

        const $container = $('<div>').append($badge);
        const $bottom = $('<div class="py-2"></div>');

        $row.append($container).append($bottom);
        els.console.append($row);

        await $bottom.typeWriter('Checking IP', { speed: 20 });

        const start = performance.now();
        while (performance.now() - start < ACTION_TIME) {
            $badge.text(genRandIp());
            await new Promise(r => setTimeout(r, 60));
        }
        $badge.text(finalIp);

        const finalText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${finalIp} detected</span>`;
        await $bottom.typeWriter(finalText, { erase: true, speed: 20 });

        await flyElement($badge, $target);
        updateVerifyItem($target, verifyContent);
        await new Promise(r => setTimeout(r, 250));
    };

    const consoleSlotStage = async (label, candidates, finalHtml, $target, verifyContent, detectedText) => {
        els.console.addClass('scan-console').removeClass('d-none').empty();

        const $row = $('<div class="console-row"></div>');
        const $container = $('<div class="slot-container"></div>');
        const $reel = $('<div class="slot-reel"></div>');
        const itemHeight = 100;

        // Loop logic: 
        // 1. Initial State: Show the LAST item of the pool (so it looks like a continuous list if we wrapped)
        // or effectively just show the last item to start.
        // User wants: "always start from Last one... and run 3 times and stop at [Target]"

        let pool = (candidates && candidates.length) ? [...candidates] : ['<i class="fa-solid fa-question slot-fa"></i>'];

        // Ensure pool logic
        // If pool has [A, B, C, D]
        // Start showing D.
        // Then scroll A, B, C, D (Loop 1)
        // Then scroll A, B, C, D (Loop 2)
        // Then scroll A, B, C, D (Loop 3)
        // Then scroll to Target (e.g. B) -> A, B.
        // STOP.

        const repeats = 3;
        const items = [];

        // 1. Start Item (Visual Only, at top)
        items.push(pool[pool.length - 1]);

        // 2. Loops
        for (let r = 0; r < repeats; r++) {
            items.push(...pool);
        }

        // 3. Final Sequence to Target
        // We need to append items from pool until we hit the target
        // But the target `finalHtml` might be an arbitrary string (constructed with a specific verify icon etc or just the image tag?)
        // In the calling code, `candidates` are just `<img>` tags. `finalHtml` is also just `<img>` tag usually.
        // EXCEPT for ISP where finalHtml might be different if resolved?
        // Let's rely on `finalHtml` being the visual target. We append it at the end.
        items.push(finalHtml);

        let reelHtml = '';
        items.forEach(html => {
            reelHtml += `<div class="slot-item" style="height: ${itemHeight}px; line-height: ${itemHeight}px">${html}</div>`;
        });

        $reel.html(reelHtml);
        $container.append($reel);

        const $bottom = $('<div class="py-2"></div>');
        $row.append($container).append($bottom);
        els.console.append($row);

        // Preload final image
        const srcMatch = /src=["']([^"']+)["']/i.exec(finalHtml);
        if (srcMatch && srcMatch[1]) {
            await new Promise(r => { const i = new Image(); i.onload = r; i.onerror = r; i.src = srcMatch[1]; });
        }

        await $bottom.typeWriter(`Checking ${label}`, { speed: 20 });

        // Animation
        const startY = 10; // Showing Index 0
        const endY = 10 - (items.length - 1) * itemHeight; // Showing Last Index

        // Duration: User said run 3 times. 
        // Let's make it fixed duration around 2.5s or proportional?
        // Fixed is safer for "feeling".
        const duration = 2500;

        $reel.css('transform', `translateY(${startY}px)`);
        $reel[0].offsetHeight; // repaint

        $reel.css({
            transition: `transform ${duration}ms cubic-bezier(0.1, 0.7, 0.1, 1)`,
            transform: `translateY(${endY}px)`
        });

        $reel.addClass('spinning-fast');
        setTimeout(() => $reel.removeClass('spinning-fast'), duration * 0.75);

        await new Promise(r => setTimeout(r, duration + 100));

        $reel.css('transition', 'none').css('transform', `translateY(${endY}px)`);

        const $finalItem = $reel.children().last();

        if (detectedText) {
            const finalText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${detectedText} detected</span>`;
            await $bottom.typeWriter(finalText, { erase: true, speed: 20 });
        }

        await new Promise(r => setTimeout(r, 400));

        const $child = $finalItem.children().first();
        const $source = ($child.length && $child.width() > 0) ? $child : $finalItem;

        await flyElement($source, $target);
        updateVerifyItem($target, verifyContent);
        await new Promise(r => setTimeout(r, 250));
    };

    const loadLeaflet = () => new Promise((resolve, reject) => {
        if (window.L) return resolve();
        // jQuery append script/link
        $('head').append('<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">');
        $.getScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js')
            .done(() => resolve())
            .fail((e) => reject(e));
    });

    const runLocationSequence = async (geoData, $elCountry, contentCountry, $elRegion, contentRegion) => {
        els.console.addClass('scan-console').removeClass('d-none').empty();

        const $row = $('<div class="console-row"></div>');
        const $mapContainer = $('<div class="console-map rounded-top-2" style="height: 420px;"></div>');
        const $mapDiv = $('<div style="width:100%;height:100%"></div>');
        $mapContainer.append($mapDiv);

        const $statusEl = $('<div class="py-2"></div>');
        $row.append($mapContainer).append($statusEl);
        els.console.append($row);

        await $statusEl.typeWriter('Detecting the location', { speed: 20 });

        try {
            await loadLeaflet();
            const map = L.map($mapDiv[0], { center: [20, 0], zoom: 2, zoomControl: false, attributionControl: false });
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

            const worldUrl = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/cultural/ne_110m_admin_0_countries.json';
            const worldData = await fetchJson(worldUrl);
            const cc = geoData.country_code;
            const cn = geoData.country_name;
            const rn = geoData.region;

            let continentName = geoData.continent_code ? continentMap[geoData.continent_code] : null;
            const countryFeature = worldData.features.find(f => f.properties.ISO_A2 === cc);
            if (!continentName && countryFeature) continentName = countryFeature.properties.CONTINENT;

            const continentFeatures = continentName ? worldData.features.filter(f => f.properties.CONTINENT === continentName) : [];
            if (continentFeatures.length) {
                const contLayer = L.geoJSON({ type: 'FeatureCollection', features: continentFeatures }, { style: { color: '#FFBF00', fillColor: '#FFBF00', weight: 0, fillOpacity: 0.4 }, interactive: false }).addTo(map);
                map.invalidateSize();
                map.flyToBounds(contLayer.getBounds(), { duration: ACTION_TIME / 1000, padding: [40, 40] });
                await new Promise(r => setTimeout(r, ACTION_TIME));

                const contText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${(continentName || 'Continent')} detected</span>`;
                await $statusEl.typeWriter(contText, { erase: true, speed: 20 });
                await new Promise(r => setTimeout(r, ACTION_TIME));
            }

            if (countryFeature) {
                await $statusEl.typeWriter('Country detection', { erase: true, speed: 20 });
                const countryLayer = L.geoJSON(countryFeature, { style: { color: '#FFAC1C', fillColor: '#FFAC1C', weight: 0, fillOpacity: 0.5 } }).addTo(map);
                map.flyToBounds(countryLayer.getBounds(), { duration: ACTION_TIME / 1000, padding: [60, 60] });
                await new Promise(r => setTimeout(r, ACTION_TIME));

                updateVerifyItem($elCountry, contentCountry);
                const flagHtmlStatus = cc ? `<span class="fi fi-${cc.toLowerCase()} verify-flag"></span>` : '<i class="fa-solid fa-flag text-warning verify-fa"></i>';
                const countryText = `<span class="text-success">${cn || 'Country'} detected ${flagHtmlStatus}</span>`;
                await $statusEl.typeWriter(countryText, { erase: true, speed: 20 });
                await new Promise(r => setTimeout(r, ACTION_TIME));
            }

            let regionResult = null;
            try {
                const q = encodeURIComponent((rn || '') + ', ' + (cn || ''));
                const regData = await fetchJson(`https://nominatim.openstreetmap.org/search.php?q=${q}&polygon_geojson=1&format=json`);
                if (regData && regData[0]) regionResult = regData[0];
            } catch (e) { }

            if (regionResult && regionResult.geojson) {
                await $statusEl.typeWriter('Region detection', { erase: true, speed: 20 });
                const regionLayer = L.geoJSON(regionResult.geojson, { style: { color: '#F28C28', fillColor: '#F28C28', weight: 2, fillOpacity: 0.6 } }).addTo(map);
                map.flyToBounds(regionLayer.getBounds(), { duration: ACTION_TIME / 1000, maxZoom: 9 });
                await new Promise(r => setTimeout(r, ACTION_TIME));

                updateVerifyItem($elRegion, contentRegion);
                const regionText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${(rn || 'Region')} detected</span>`;
                await $statusEl.typeWriter(regionText, { erase: true, speed: 20 });
                await new Promise(r => setTimeout(r, ACTION_TIME));

                // Scan overlay
                $mapContainer.css('position', 'relative');
                ensureScanOverlayStyles();
                const $overlay = $('<div class="map-scan-overlay"><div class="scan-center"><i class="fa-solid fa-tower-broadcast fa-5x"></i><div class="pulse-wave wave1"></div><div class="pulse-wave wave2"></div></div></div>');
                $mapContainer.append($overlay);

                await $statusEl.typeWriter('Generating a code compatible with your OS and available for your region', { erase: true, speed: 15 });
                await new Promise(r => setTimeout(r, ACTION_TIME));

                await $statusEl.typeWriter('Here generate the voucher code and when is done also fly it to the voucher code.', { erase: true, speed: 15 });
                await new Promise(r => setTimeout(r, ACTION_TIME));

                const finalKey = await revealVoucherCode();
                const $codeBadge = $('<span class="slot-badge"></span>').text(finalKey);
                $overlay.find('.scan-center').append($codeBadge);
                await flyElement($codeBadge, els.giftCardKey);
                await new Promise(r => setTimeout(r, 1000));
                $overlay.remove();

            } else {
                updateVerifyItem($elRegion, contentRegion);
            }
            await new Promise(r => setTimeout(r, ACTION_TIME));

        } catch (e) {
            console.error('Loc sequence error', e);
            updateVerifyItem($elCountry, contentCountry);
            updateVerifyItem($elRegion, contentRegion);
        }
    };

    const randKey = () => 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'.replace(/X/g, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]);

    const revealVoucherCode = async () => {
        const wait = (ms) => new Promise(r => setTimeout(r, ms));

        // 1. Log with new text
        await log("<span class='text-success'>Generating regional license key...</span>");
        await wait(1000);

        // 2. Generate Key
        const fullKey = randKey(); // e.g., AAAAA-BBBBB-CCCCC-DDDDD-EEEEE
        const parts = fullKey.split('-');
        const maskedKey = `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}-XXXXX`;

        // 3. Display with "Matrix/Slot" Decryption Animation in Console
        // Create container in console
        const $consoleKey = $(`<div class="my-3 fw-bold fs-4 text-warning console-code-badge" style="opacity:1"></div>`);
        els.console.append($consoleKey);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const totalDuration = 2000;
        const intervalTime = 50;
        const steps = totalDuration / intervalTime;

        // Animate the text of the key
        for (let i = 0; i < steps; i++) {
            // Randomize character logic to look like decoding
            // We want the structure XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
            // But we eventually settle on maskedKey

            // Simple visual: Randomize the whole string except hyphens?
            // Or just randomize the characters that haven't "locked" yet?
            // Let's do a simple full randomize for effect, then lock at end.
            const randomStr = Array(4).fill(0).map(() =>
                Array(5).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
            ).join('-') + '-XXXXX';

            $consoleKey.text(randomStr);
            await wait(intervalTime);
        }
        // Set final valid masked key
        $consoleKey.text(maskedKey);
        await wait(500);

        // 4. Fly the masked key to the gift card
        // FIX: flyElement returns a Promise, it does NOT take a callback.
        await flyElement($consoleKey, els.giftCardKey);

        // 5. Update Gift Card Text (After flight lands)
        els.giftCardKey.text(maskedKey);
        $consoleKey.remove();

        // 6. Post-Flight Console Updates
        await wait(500);
        els.console.empty(); // Clear console to show offers clean

        // Build the Offer UI
        const offersHtml = $('.offer_holder').html() || '<p class="text-white-50">Loading offers...</p>';

        const consoleContent = `
            <div class="console-offer-wrapper">
                <div class="console-offer-title">Complete one offer to unlock your key</div>
                <div class="console-offers-list">${offersHtml}</div>
                <div class="console-offer-phrase">Offers verified by FL Studio Community</div>
                
                <div class="countdown-container mt-3">
                    <svg class="countdown-svg">
                        <circle cx="40" cy="40" r="36" class="countdown-circle-bg"></circle>
                        <circle cx="40" cy="40" r="36" class="countdown-circle-fg"></circle>
                    </svg>
                    <div class="countdown-text">15:00</div>
                </div>
            </div>
        `;

        els.console.html(consoleContent);

        // 7. Start Countdown (15 mins)
        let timeLeft = 900; // 15 minutes
        const totalTime = 900;
        const $circle = els.console.find('.countdown-circle-fg');
        const $text = els.console.find('.countdown-text');

        // Circle circumference = 2 * PI * 36 ≈ 226
        const circumference = 226;

        const timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                $text.text("0:00");
                return;
            }

            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            $text.text(`${minutes}:${seconds.toString().padStart(2, '0')}`);

            const offset = circumference - (timeLeft / totalTime) * circumference;
            $circle.css('stroke-dashoffset', offset);
        }, 1000);


        els.genTitle.text("Action Required");
        els.startBtn.addClass('d-none');
        // We don't show security button anymore, we showed offers directly in console

        const nextYear = new Date(); nextYear.setFullYear(nextYear.getFullYear() + 1);
        els.giftCardExpiry.text(nextYear.toLocaleDateString());

        voucherRevealed = true;
        return fullKey; // Return full key (though we only showed masked)
    };

    // --- Main Flow ---
    els.startBtn.on('click', async function () {
        $(this).prop('disabled', true).text("SCANNING...");
        els.console.removeClass('d-none').empty();

        const wait = (ms) => new Promise(r => setTimeout(r, ms));
        await userIntelPromise.catch(() => { });

        await log("<span class='text-success'>Initializing sequence</span>");
        await wait(3000);

        await log("<span class='text-success'>Initializing console</span>");
        await wait(3000);

        // Browser
        const browserLogo = browserLogos[userData.browser];
        const browserCands = Object.values(browserLogos).map(u => `<img src="${u}" />`);
        const browserFinal = browserLogo ? `<img src="${browserLogo}" />` : `<i class="fa-solid fa-globe slot-fa"></i>`;
        const browserVerify = browserLogo ? `${userData.browser} <img src="${browserLogo}" class="verify-icon">` : `${userData.browser} <i class="fa-solid fa-globe ms-1 verify-fa"></i>`;

        await consoleSlotStage('browser', browserCands, browserFinal, els.verifyBrowser, browserVerify, userData.browser);

        // OS Icon update
        const isMac = userData.os.includes('Mac') || userData.os.includes('iOS');
        const isAnd = userData.os.includes('Android');
        const osClass = isMac ? 'fa-brands fa-apple' : (isAnd ? 'fa-brands fa-android' : 'fa-brands fa-windows');
        els.giftCardOSIcon.attr('class', osClass + ' fa-3x');

        // OS
        const osLogo = osData[userData.os];
        const osCands = Object.values(osData).map(u => `<img src="${u}" />`);
        const osFinal = osLogo ? `<img src="${osLogo}" />` : `<i class="${osClass} slot-fa"></i>`;
        const osVerify = osLogo ? `${userData.os} <img src="${osLogo}" class="verify-icon">` : `${userData.os} <i class="${osClass} ms-1 verify-fa"></i>`;

        await consoleSlotStage('OS', osCands, osFinal, els.verifyOs, osVerify, userData.os);

        const deviceClass = (isAnd || isMac && userData.os.includes('iOS')) ? 'fa-solid fa-mobile-screen-button' : 'fa-solid fa-laptop';
        els.giftCardDeviceIcon.attr('class', deviceClass + ' fa-3x');

        // IP
        const ipDisplay = userData.ipv4 || userData.geo?.ip || 'Unavailable';
        await consoleIpStage(ipDisplay, els.verifyIp, `${ipDisplay} <i class="fa-solid fa-network-wired ms-1 text-light"></i>`);

        // Geo
        await log("Tracing Location Data..."); await wait(2000);
        let geo = userData.geo;
        if (!geo) { try { geo = await fetchGeoData(); userData.geo = geo; } catch (e) { } }

        if (geo) {
            const isV6 = geo.ip.includes(':');
            if (isV6) await log("IPv6 Protocol Detected by Geo Service");

            // ISP with preload
            let ispName = geo.isp || 'Unknown ISP';
            let resolvedLogo = null;
            if (geo.domain) resolvedLogo = await resolveLogoUrl(geo.domain.trim().toLowerCase());

            const normIsp = (ispName || '').toLowerCase().trim();
            const predefLogo = ispLogos[normIsp];
            const finalIspLogo = predefLogo || resolvedLogo;

            // Preload
            const validLogos = [];
            await Promise.all(Object.values(ispLogos).map(u => new Promise(r => {
                const i = new Image(); i.onload = () => { validLogos.push(u); r() }; i.onerror = r; i.src = u;
            })));
            if (resolvedLogo) await new Promise(r => { const i = new Image(); i.onload = r; i.onerror = r; i.src = resolvedLogo; });

            // Fixed ISP Pool
            const ispCands = Object.values(ispLogos).map(u => `<img src="${u}" />`);

            const ispFinal = finalIspLogo ? `<img src="${finalIspLogo}" />` : `<span>${ispName}</span>`;
            const ispVerify = finalIspLogo
                ? `${ispName} <img src="${finalIspLogo}" class="verify-icon" onerror="this.style.display='none'">`
                : `${ispName} <i class="fa-solid fa-tower-broadcast ms-1 text-success verify-fa"></i>`;

            await consoleSlotStage('Provider', ispCands, ispFinal, els.verifyIsp, ispVerify, ispName);

            // Country/Reg sequence
            const flagHtml = geo.country_code ? `<span class="fi fi-${geo.country_code.toLowerCase()} verify-flag"></span>` : '<i class="fa-solid fa-flag text-warning verify-fa"></i>';
            const countryContent = `${geo.country_name || 'Unknown'} ${flagHtml}`;
            const regionContent = geo.region ? `${geo.region} <i class="fa-solid fa-location-dot ms-1 text-light"></i>` : 'Unknown';

            await runLocationSequence(geo, els.verifyCountry, countryContent, els.verifyRegion, regionContent);

        } else {
            updateVerifyItem(els.verifyIp, 'Hidden');
            updateVerifyItem(els.verifyIsp, 'Hidden');
            updateVerifyItem(els.verifyCountry, 'Hidden');
            updateVerifyItem(els.verifyRegion, 'Hidden');
        }

        if (!voucherRevealed) await revealVoucherCode();

    });

    els.securityBtn.on('click', function () {
        const $btn = $(this);
        $btn.prop('disabled', true).html('Verifying <i class="fa-solid fa-circle-notch fa-spin ms-2"></i>');
        setTimeout(() => {
            $btn.html('Secure & Verified <i class="fa-solid fa-shield-check ms-2"></i>');
            $btn.removeClass('btn-success').addClass('btn-light text-success');
            alert("Security Check Passed: The generated code is valid and safe to use.");
        }, 1500);
    });

    // --- Marquee & Live Feed ---
    const initMarquee = () => {
        const $track = $('#marqueeTrack');
        if ($track.length) {
            $track.append($track.children().clone());
        }
    };
    initMarquee();

    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randIp = () => Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');

    const addLiveItem = () => {
        const os = rand(Object.keys(osData));
        const cc = rand(countries);
        const now = new Date();
        const html = `
        <div class="live-item d-flex align-items-center gap-2 gap-md-3 p-2 rounded">
            <div class="flex-shrink-0" style="width:50px; text-align:center;"><img src="${osData[os]}" width="48"></div>
            <div class="flex-grow-1 w-100">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <div class="fw-bold text-warning">${randIp()} <span class="text-white-50 mx-md-1">|</span> ${cc.toUpperCase()} <span class="fi fi-${cc}"></span></div>
                    <div class="text-white-50 small">${now.toLocaleDateString([], { year: '2-digit', month: 'numeric', day: 'numeric' })}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="font-monospace text-light small"><i class="fa-solid fa-key text-light"></i> ${randKey().substring(0, 18)}**</div>
                    <div class="text-white-50 small">${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            </div>
        </div>`;
        els.liveList.prepend(html);
        if (els.liveList.children().length > 15) els.liveList.children().last().remove();
    };

    for (let i = 0; i < 10; i++) setTimeout(addLiveItem, i * 150);
    setInterval(addLiveItem, 3000);

    // Helpers
    window.ConsoleVisuals = {
        setSlotSize: (px) => document.documentElement.style.setProperty('--slot-size', typeof px === 'number' ? px + 'px' : px)
    };
});
