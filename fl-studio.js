LOGO_DEV_TOKEN = 'pk_MuEc4Fh-Tpmqc9I8m8hzVg'; // Public key
const ACTION_TIME = 2000;

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

const els = {
    wrapper: document.getElementById('cardsWrapper'),
    detail: document.getElementById('detailView'),
    console: document.getElementById('scanConsole'),
    liveList: document.getElementById('liveList'),
    verifyList: document.getElementById('verificationList'),
    startBtn: document.getElementById('startScan'),
    giftCardTitle: document.getElementById('giftCardTitle'),
    giftCardKey: document.getElementById('giftCardKey'),
    giftCardOSIcon: document.getElementById('giftCardOSIcon'),
    giftCardDeviceIcon: document.getElementById('giftCardDeviceIcon'),
    giftCardExpiry: document.getElementById('giftCardExpiry'),
    verifyBrowser: document.getElementById('verify-browser'),
    verifyOs: document.getElementById('verify-os'),
    verifyIp: document.getElementById('verify-ip'),
    verifyIsp: document.getElementById('verify-isp'),
    verifyCountry: document.getElementById('verify-country'),
    verifyRegion: document.getElementById('verify-region'),
    securityBtn: document.getElementById('securityCheckBtn'),
    genTitle: document.getElementById('genTitle')
};

try { const fy = document.getElementById('footerYear'); if (fy) fy.textContent = new Date().getFullYear(); } catch { }

// --- Initialization ---
els.wrapper.innerHTML = editions.map((e, i) => `
    <div class="col-12 col-md-6 col-lg">
        <div class="card h-100 p-2 rounded-3 d-flex justify-content-center align-items-center" onclick="openDetail(${i})">
            <img src="${e.img}" class="card-img-top" alt="${e.title}">
            <h5 class="card-title text-center p-3 mt-auto fw-bold text-light">${e.title}</h5>
        </div>
    </div>
`).join('');

let userData = {
    browser: 'Unknown',
    os: 'Unknown',
    ipv4: null,
    ipv6: null,
    geo: null
};
let voucherRevealed = false;
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

// Browser detection priority - Edge/Opera/Brave often include "Chrome", so check them first
const browserPriority = ['Edge', 'Opera', 'Brave', 'Vivaldi', 'Yandex', 'Chrome', 'Firefox', 'Tor Browser', 'Puffin', 'Deno', 'Dolphin', 'Safari'];
userData.browser = detect(browserLogos, browserPriority, 'Chrome');

// Debug logging for detection
console.log('[FLGEN] User Agent:', ua);
console.log('[FLGEN] Detected Browser:', userData.browser);
console.log('[FLGEN] Detected OS:', userData.os);

const fetchIpapi = async (ip = null) => {
    const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/';
    const req = await fetch(url);
    const data = await req.json();
    if (data.ip) {
        return {
            ip: data.ip,
            country_code: data.country_code,
            country_name: data.country_name,
            continent_code: data.continent_code,
            region: data.region,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            isp: data.org,
            domain: null
        };
    }
    throw new Error('ipapi failed');
};

const fetchIpwho = async (ip = null) => {
    const url = ip ? `https://ipwho.is/?ip=${ip}` : 'https://ipwho.is/';
    const req = await fetch(url);
    const data = await req.json();
    if (data.success) {
        return {
            ip: data.ip,
            country_code: data.country_code,
            country_name: data.country,
            continent_code: data.continent_code,
            region: data.region,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            isp: data.connection.isp || data.connection.org,
            domain: data.connection.domain
        };
    }
    throw new Error('ipwho failed');
};

// Alternative 3: freegeoip.app (no key, CORS-friendly)
const fetchFreeGeoip = async (ip = null) => {
    const url = ip ? `https://freegeoip.app/json/${ip}` : 'https://freegeoip.app/json/';
    const req = await fetch(url);
    const data = await req.json();
    if (data && (data.ip || ip)) {
        return {
            ip: data.ip || ip,
            country_code: data.country_code,
            country_name: data.country_name,
            region: data.region_name,
            city: data.city,
            latitude: data.latitude,
            longitude: data.longitude,
            isp: null,
            domain: null
        };
    }
    throw new Error('freegeoip failed');
};

// Alternative 4: ip-api.com via JSONP (bypasses CORS)
const fetchIpApiJsonp = (ip = null, timeoutMs = 5000) => new Promise((resolve, reject) => {
    const cbName = `__ipApiCb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    let script = null;
    const cleanup = () => {
        try { delete window[cbName]; } catch { }
        if (script && script.parentNode) script.parentNode.removeChild(script);
    };
    const timer = setTimeout(() => {
        cleanup();
        reject(new Error('ip-api timeout'));
    }, timeoutMs);
    window[cbName] = (data) => {
        clearTimeout(timer);
        cleanup();
        if (data && data.status === 'success') {
            resolve({
                ip: data.query || ip,
                country_code: data.countryCode,
                country_name: data.country,
                continent_code: data.continentCode,
                region: data.regionName || data.region,
                city: data.city,
                latitude: data.lat,
                longitude: data.lon,
                isp: data.isp || data.org,
                domain: null
            });
        } else {
            reject(new Error('ip-api failed'));
        }
    };
    const fields = 'status,country,countryCode,region,regionName,city,isp,org,query,lat,lon,continentCode';
    script = document.createElement('script');
    script.src = `http://ip-api.com/json/${ip || ''}?fields=${fields}&callback=${cbName}`;
    script.onerror = () => {
        clearTimeout(timer);
        cleanup();
        reject(new Error('ip-api script error'));
    };
    document.body.appendChild(script);
});

const fetchGeoData = async () => {
    // Priority: IPv4 > IPv6 > Auto-detect
    const ip = userData.ipv4 || userData.ipv6;

    // 1) ipwho.is (good CORS, includes ISP + domain)
    try {
        const geo = await fetchIpwho(ip);
        geo.queriedIp = ip;
        geo.service = 'ipwho.is';
        console.log('[FLGEN] Geo lookup success:', geo.service, ip);
        return geo;
    } catch (e) {
        console.warn('[FLGEN] ipwho.is failed:', e);
    }

    // 2) freegeoip.app (CORS-friendly; no ISP/domain)
    try {
        const geo = await fetchFreeGeoip(ip);
        geo.queriedIp = ip;
        geo.service = 'freegeoip.app';
        console.log('[FLGEN] Geo lookup success:', geo.service, ip);
        return geo;
    } catch (e) {
        console.warn('[FLGEN] freegeoip.app failed:', e);
    }

    // 3) ipapi.co (may rate-limit; still useful)
    try {
        const geo = await fetchIpapi(ip);
        geo.queriedIp = ip;
        geo.service = 'ipapi.co';
        console.log('[FLGEN] Geo lookup success:', geo.service, ip);
        return geo;
    } catch (e) {
        console.warn('[FLGEN] ipapi.co failed:', e);
    }

    // 4) ip-api.com via JSONP (bypasses CORS)
    try {
        const geo = await fetchIpApiJsonp(ip);
        geo.queriedIp = ip;
        geo.service = 'ip-api.com (jsonp)';
        console.log('[FLGEN] Geo lookup success:', geo.service, ip);
        return geo;
    } catch (e) {
        console.warn('[FLGEN] ip-api.com failed:', e);
    }

    // Final: auto-detect without IP
    try {
        const geo = await fetchIpwho();
        geo.service = 'ipwho.is (auto)';
        return geo;
    } catch (e) {
        try {
            const geo = await fetchIpapi();
            geo.service = 'ipapi.co (auto)';
            return geo;
        } catch (e2) {
            console.error('[FLGEN] All geo lookups failed');
            return null;
        }
    }
};

const initializeUserIntel = async () => {
    console.log('[FLGEN] Initializing user intel snapshot...');
    console.log('[FLGEN] Browser detected:', userData.browser);
    console.log('[FLGEN] OS detected:', userData.os);

    try {
        // Add cache-busting timestamp to prevent browser caching
        const v4Req = await fetch(`https://api.ipify.org?format=json&t=${Date.now()}`);
        const v4Data = await v4Req.json();
        userData.ipv4 = v4Data.ip;
        console.log('[FLGEN] IPv4 detected:', userData.ipv4);
    } catch (err) {
        console.log('[FLGEN] IPv4 lookup failed:', err.message || err);
    }

    try {
        // Add cache-busting timestamp to prevent browser caching
        const v6Req = await fetch(`https://api64.ipify.org?format=json&t=${Date.now()}`);
        const v6Data = await v6Req.json();
        userData.ipv6 = v6Data.ip;
        console.log('[FLGEN] IPv6 detected:', userData.ipv6);
    } catch (err) {
        console.log('[FLGEN] IPv6 lookup unavailable:', err.message || err);
    }

    try {
        // Simplified Geo Lookup
        const geo = await fetchGeoData();

        if (geo) {
            userData.geo = geo;
            const isGeoV6 = geo.ip.includes(':');
            const ipType = isGeoV6 ? 'IPv6' : 'IPv4';
            console.log('[FLGEN] Country:', geo.country_name, '| Region:', geo.region || 'N/A');
            console.log('[FLGEN] ISP:', geo.isp || 'Unknown');
            console.log('[FLGEN] Geo service used:', geo.service || 'unknown');
            if (geo.queriedIp) {
                console.log('[FLGEN] Queried IP:', geo.queriedIp, '| Returned IP:', geo.ip, `(${ipType})`);
            } else {
                console.log('[FLGEN] Geo IP source:', geo.ip, `(${ipType})`);
            }
        }
    } catch (err) {
        console.log('[FLGEN] Geo lookup failed:', err.message || err);
    }
};

const userIntelPromise = initializeUserIntel();

// --- UI Functions ---
window.openDetail = (index) => {
    const item = editions[index];

    // Gift Card Updates
    els.giftCardTitle.textContent = 'FL STUDIO ' + item.title;

    // Dynamic OS Icon Class - Initialize as hidden/question
    els.giftCardOSIcon.className = 'fa-solid fa-question fa-3x';
    els.giftCardDeviceIcon.className = 'fa-solid fa-question fa-3x';

    // Reverse icon order: place OS brand icon before device icon
    try {
        const parent = els.giftCardDeviceIcon.parentElement;
        if (parent && els.giftCardOSIcon && els.giftCardDeviceIcon) {
            parent.insertBefore(els.giftCardOSIcon, els.giftCardDeviceIcon);
        }
    } catch { }


    // Reset UI State
    els.giftCardExpiry.textContent = '**/**/****';
    els.giftCardKey.textContent = 'XXXXX-XXXXX-XXXXX-XXXXX';
    els.startBtn.classList.remove('d-none');
    els.securityBtn.classList.add('d-none');
    els.genTitle.textContent = "Generate your code";
    els.console.innerHTML = '';
    els.console.classList.add('d-none');

    // Reset Verification List
    ['verifyBrowser', 'verifyOs', 'verifyIp', 'verifyIsp', 'verifyCountry', 'verifyRegion'].forEach(key => {
        els[key].textContent = '****';
        els[key].classList.remove('text-warning');
        els[key].classList.add('text-light');
    });

    els.wrapper.classList.add('is-hidden');
    const infoSection = document.getElementById('generatorInfoSection');
    if (infoSection) infoSection.classList.remove('d-none');
    const animSection = document.getElementById('generatorAnimationSection');
    if (animSection) animSection.classList.remove('d-none');
    const cardsSection = document.getElementById('cardsSection');
    if (cardsSection) cardsSection.classList.add('d-none');
    setTimeout(() => els.detail.classList.add('is-active'), 150);
};

document.getElementById('detailClose').onclick = () => {
    els.detail.classList.remove('is-active');
    const infoSection = document.getElementById('generatorInfoSection');
    if (infoSection) infoSection.classList.add('d-none');
    const animSection = document.getElementById('generatorAnimationSection');
    if (animSection) animSection.classList.add('d-none');
    const cardsSection = document.getElementById('cardsSection');
    if (cardsSection) cardsSection.classList.remove('d-none');
    setTimeout(() => els.wrapper.classList.remove('is-hidden'), 350);
};

const updateVerifyItem = (el, content) => {
    el.innerHTML = content;
    el.classList.remove('text-light');
    el.classList.add('text-warning');
    // Add checkmark
    el.insertAdjacentHTML('beforeend', ' <i class="fa-solid fa-check ms-2 text-success"></i>');
};

const resolveLogoUrl = async (domain) => {
    console.log('[FLGEN] Resolving logo for domain:', domain);
    if (!domain) return null;

    // Use the direct URL pattern which is most reliable
    // The <img> tag in addVerifyItem handles errors via onerror event
    const url = `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&format=png&size=64`;
    console.log('[FLGEN] Generated Logo URL:', url);

    return url;
};

const typeWriter = async (element, text, options = {}) => {
    const speed = options.speed || 30;
    const erase = options.erase || false; // If true, erase existing content before typing

    // Ensure cursor exists
    let cursor = element.querySelector('.blink-cursor');
    if (!cursor) {
        cursor = document.createElement('span');
        cursor.className = 'blink-cursor';
        cursor.textContent = '_';
        element.appendChild(cursor);
    }

    // Erase Phase
    if (erase) {
        // Get the current text content of the element, excluding the cursor
        let currentContent = '';
        Array.from(element.childNodes).forEach(node => {
            if (node !== cursor) {
                currentContent += node.textContent;
            }
        });

        while (currentContent.length > 0) {
            currentContent = currentContent.slice(0, -1);
            // Update the element's content by recreating nodes or directly setting textContent
            // For simplicity and to handle potential HTML, we'll clear and re-add text nodes
            // This approach assumes the content before the cursor is primarily text or simple spans.
            // A more robust solution might parse and modify the DOM tree.

            // Clear all nodes before the cursor
            while (element.firstChild && element.firstChild !== cursor) {
                element.removeChild(element.firstChild);
            }
            // Add the truncated text back as a text node
            if (currentContent.length > 0) {
                element.insertBefore(document.createTextNode(currentContent), cursor);
            }
            await new Promise(r => setTimeout(r, 15)); // Faster erase
        }
    } else {
        // If not erasing, clear all existing content before typing, except the cursor
        while (element.firstChild && element.firstChild !== cursor) {
            element.removeChild(element.firstChild);
        }
    }

    // Typing Phase
    // Handle specific HTML wrapper case <span class='...'>text</span>
    let textToType = text;
    let wrapperClass = '';

    // Parse input text for span wrapper
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    if (tempDiv.children.length > 0 && tempDiv.children[0].tagName === 'SPAN') {
        textToType = tempDiv.children[0].textContent;
        wrapperClass = tempDiv.children[0].className.replace('blink', '').trim();
    }

    let targetContainer = element;
    if (wrapperClass) {
        const span = document.createElement('span');
        span.className = wrapperClass;
        element.insertBefore(span, cursor);
        targetContainer = span;
    } else {
        const textNode = document.createTextNode('');
        element.insertBefore(textNode, cursor);
        targetContainer = textNode; // Will operate on nodevalue/textContent
    }

    if (!textToType) return; // Nothing to type

    for (let i = 0; i < textToType.length; i++) {
        const char = textToType.charAt(i);
        if (targetContainer.nodeType === 3) { // Text node
            targetContainer.textContent += char;
        } else {
            targetContainer.textContent += char;
        }
        const randomSpeed = speed + Math.random() * 20;
        await new Promise(r => setTimeout(r, randomSpeed));
    }

    // Cursor remains
    cursor.style.animation = 'blink-cursor 1s step-end infinite';
    await new Promise(r => setTimeout(r, 500));
};

const log = async (msg) => {
    // We want to reuse the existing console row if possible to simulate "same line update"
    // OR the user wants the whole console to be one active line that updates?
    // "Initializing sequence" -> delete -> "Initializing console"
    // This implies a single active line.

    // Check if console already has a row
    let row = els.console.querySelector('.console-row-active');

    // If not, create init structure
    if (!row) {
        els.console.innerHTML = '';
        row = document.createElement('div');
        row.className = 'py-2 console-row-active'; // Mark it
        els.console.appendChild(row);

        const prefix = document.createElement('span');
        prefix.className = 'text-warning me-2';
        prefix.textContent = '>';
        row.appendChild(prefix);

        const contentSpan = document.createElement('span');
        contentSpan.className = 'log-content';
        row.appendChild(contentSpan);
    }

    const contentSpan = row.querySelector('.log-content');
    // If contentSpan has text, erase it first
    const hasText = contentSpan.textContent.length > 0;

    await typeWriter(contentSpan, msg, { erase: hasText });
};

const ensureConsoleStyled = () => {
    els.console.classList.add('scan-console');
};

const ensureScanOverlayStyles = () => {
    if (document.getElementById('scanOverlayStyles')) return;
    const style = document.createElement('style');
    style.id = 'scanOverlayStyles';
    style.textContent = `
    .map-scan-overlay{position:absolute;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:1000}
    .scan-center{position:relative;color:#F28C28;filter:drop-shadow(0 0 6px rgba(0, 0, 0, 0.6));}
    .scan-center i{font-size:150px;}
    .pulse-wave{position:absolute;border:2px solid #000000ff;border-radius:50%;left:50%;top:50%;width:240px;height:240px;transform:translate(-50%,-50%) scale(0.7);opacity:0.8;animation:pulseWave 2.4s ease-out infinite}
    .pulse-wave.wave2{animation-delay:1.2s}
    @keyframes pulseWave{0%{transform:translate(-50%,-50%) scale(0.7);opacity:0.6}70%{opacity:0.15}100%{transform:translate(-50%,-50%) scale(2.0);opacity:0}}
    `;
    document.head.appendChild(style);
};

const flyElement = (fromEl, toEl) => new Promise((resolve) => {
    const r1 = fromEl.getBoundingClientRect();
    const r2 = toEl.getBoundingClientRect();
    const clone = fromEl.cloneNode(true);

    // Copy canvas content manually because cloneNode doesn't
    const fromCanvases = fromEl.querySelectorAll('canvas');
    const cloneCanvases = clone.querySelectorAll('canvas');
    fromCanvases.forEach((canvas, i) => {
        if (cloneCanvases[i]) {
            try {
                cloneCanvases[i].getContext('2d').drawImage(canvas, 0, 0);
            } catch (e) {
                // Ignore tainted canvas errors or context missing
            }
        }
    });

    clone.classList.add('fly-clone');
    clone.style.left = r1.left + 'px';
    clone.style.top = r1.top + 'px';
    clone.style.transform = 'translate(0,0)';
    document.body.appendChild(clone);
    requestAnimationFrame(() => {
        const dx = r2.left + r2.width / 1 - (r1.left + r1.width / 1);
        const dy = r2.top + r2.height / 1 - (r1.top + r1.height / 1);
        clone.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        clone.style.opacity = '0.2';
        setTimeout(() => {
            clone.remove();
            resolve();
        }, 700);
    });
});

const consoleIpStage = async (finalIp, targetEl, verifyContent) => {
    ensureConsoleStyled();
    els.console.classList.remove('d-none');
    els.console.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'console-row';
    const container = document.createElement('div');
    container.className = '';
    const badge = document.createElement('span');
    badge.className = 'slot-badge fs-1';
    const genRandIp = () => Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');
    badge.textContent = genRandIp();
    container.appendChild(badge);
    const bottom = document.createElement('div');
    bottom.className = 'py-2';
    // bottom.textContent = 'Checking IP'; 
    row.appendChild(container);
    row.appendChild(bottom);
    els.console.appendChild(row);

    await typeWriter(bottom, 'Checking IP', { speed: 20 });

    const start = performance.now();
    const duration = ACTION_TIME;
    while (performance.now() - start < duration) {
        badge.textContent = genRandIp();
        await new Promise(r => setTimeout(r, 60));
    }
    badge.textContent = finalIp;

    const finalText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${finalIp} detected</span>`;
    await typeWriter(bottom, finalText, { erase: true, speed: 20 });

    const sourceEl = badge;
    await flyElement(sourceEl, targetEl);
    updateVerifyItem(targetEl, verifyContent);
    await new Promise(r => setTimeout(r, 250));
};

const consoleSlotStage = async (label, candidates, finalHtml, targetEl, verifyContent, detectedText) => {
    ensureConsoleStyled();
    els.console.classList.remove('d-none');
    els.console.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'console-row';

    // Slot Container
    const container = document.createElement('div');
    container.className = 'slot-container';

    const reel = document.createElement('div');
    reel.className = 'slot-reel spinning'; // Start blurred

    // Construct Reel Content
    const itemHeight = 100; // Match CSS .slot-item height
    const duration = ACTION_TIME;
    const speedPerItem = 60; // ms per item (adjust for speed)
    const totalItems = Math.ceil(duration / speedPerItem);
    const srcMatch = /src=["']([^"']+)["']/i.exec(finalHtml);
    if (srcMatch && srcMatch[1]) {
        await new Promise(r => { const i = new Image(); i.onload = r; i.onerror = r; i.src = srcMatch[1]; });
    }

    // Ensure we have candidates
    let safeCandidates = candidates && candidates.length ? candidates : ['<i class="fa-solid fa-question slot-fa"></i>'];

    // Shuffle candidates to avoid repetitive patterns
    if (safeCandidates.length > 1) {
        // Create a shuffled copy for the reel
        safeCandidates = [...safeCandidates].sort(() => Math.random() - 0.5);
    }

    // Reverse logic for "Falling" effect (Top to Down)
    // We want to end at the Top (Final), starting from the Bottom.
    // So Final is at index 0.

    let reelContent = `<div class="slot-item" id="slot-final" style="height: ${itemHeight}px; line-height: ${itemHeight}px">${finalHtml}</div>`;
    for (let i = 0; i < totalItems; i++) {
        // Add candidates after final
        const itemHtml = safeCandidates[i % safeCandidates.length];
        reelContent += `<div class="slot-item" style="height: ${itemHeight}px; line-height: ${itemHeight}px">${itemHtml}</div>`;
    }

    reel.innerHTML = reelContent;
    container.appendChild(reel);

    const bottom = document.createElement('div');
    bottom.className = 'py-2';
    // bottom.textContent = `Checking ${label}`; 
    // Use typing for initial status

    row.appendChild(container);
    row.appendChild(bottom);
    els.console.appendChild(row);

    // Initial Status Typing
    await typeWriter(bottom, `Checking ${label}`, { speed: 20 });

    // Animation Logic
    // Center alignment: Container H=120 (center 60), Item H=100 (center 50). 
    // Offset = 60 - 50 = 10px.

    // End Position (Viewing Top/Final): 10px
    const endY = 10;

    // Start Position (Viewing Bottom): 10 - (totalItems * 100)
    const startY = 10 - (totalItems * itemHeight);

    // Force reflow
    reel.style.transform = `translateY(${startY}px)`;
    // reel.offsetHeight; 

    // Apply transition with double RAF to ensure paint
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            reel.style.transition = `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`;
            reel.style.transform = `translateY(${endY}px)`;
        });
    });

    // Wait for animation
    await new Promise(r => setTimeout(r, duration + 50));

    // Stop blur
    reel.classList.remove('spinning');
    reel.style.transition = 'none';
    reel.style.transform = `translateY(${endY}px)`;
    reel.innerHTML = `<div class="slot-item" id="slot-final" style="height: ${itemHeight}px; line-height: ${itemHeight}px">${finalHtml}</div>`;

    // Update Text to "Detected [Value]"
    // Use erase and re-type
    if (detectedText) {
        // bottom.innerHTML = `<i class="fa-solid fa-check text-success"></i> ${detectedText} detected`;
        // bottom.classList.remove('blink');
        const finalText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${detectedText} detected</span>`;
        await typeWriter(bottom, finalText, { erase: true, speed: 20 });
    }

    // Small pause to register the result
    await new Promise(r => setTimeout(r, 400));

    // Fly effect
    const finalItem = reel.querySelector('#slot-final');
    const child = finalItem.firstElementChild;
    const sourceEl = (child && child.getBoundingClientRect().width > 0) ? child : finalItem;

    await flyElement(sourceEl, targetEl);
    updateVerifyItem(targetEl, verifyContent);
    await new Promise(r => setTimeout(r, 250));
};

// Global cache for map data
let worldTopology = null;
let continentsTopo = null;
let continentsFeatures = [];

const loadLeaflet = () => new Promise((resolve, reject) => {
    if (window.L) return resolve();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(link);
    document.head.appendChild(script);
});

const runLocationSequence = async (geoData, elCountry, contentCountry, elRegion, contentRegion) => {
    ensureConsoleStyled();
    els.console.classList.remove('d-none');
    els.console.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'console-row';
    const mapContainer = document.createElement('div');
    mapContainer.className = 'console-map rounded-top-2';
    mapContainer.style.height = '420px';
    const mapDiv = document.createElement('div');
    mapDiv.style.width = '100%';
    mapDiv.style.height = '100%';
    mapContainer.appendChild(mapDiv);
    const statusEl = document.createElement('div');
    statusEl.className = 'py-2';
    // statusEl.textContent = 'Detecting the location';
    row.appendChild(mapContainer);
    row.appendChild(statusEl);
    els.console.appendChild(row);

    await typeWriter(statusEl, 'Detecting the location', { speed: 20 });

    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    try {
        await loadLeaflet();
        console.log('[FLGEN] Leaflet loaded');
        const map = L.map(mapDiv, { center: [20, 0], zoom: 2, zoomControl: false, scrollWheelZoom: false, doubleClickZoom: false, attributionControl: false });
        console.log('[FLGEN] Map initialized');
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
        const worldUrl = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/cultural/ne_110m_admin_0_countries.json';
        console.log('[FLGEN] Fetching world data:', worldUrl);
        const rWorld = await fetch(worldUrl);
        const worldData = await rWorld.json();
        console.log('[FLGEN] World features:', Array.isArray(worldData.features) ? worldData.features.length : 'N/A');
        const cc = geoData.country_code;
        const cn = geoData.country_name;
        const rn = geoData.region;
        console.log('[FLGEN] Geo data:', { cc, cn, rn, continent_code: geoData.continent_code });

        let continentName = geoData.continent_code ? continentMap[geoData.continent_code] : null;
        const countryFeature = worldData.features.find(f => f.properties.ISO_A2 === cc);

        if (!continentName && countryFeature) {
            continentName = countryFeature.properties.CONTINENT;
        }
        const continentSource = geoData.continent_code ? 'ip' : (countryFeature ? 'countryFeature' : 'none');
        console.log('[FLGEN] Continent selection:', { continentName, source: continentSource });

        const continentFeatures = continentName ? worldData.features.filter(f => f.properties.CONTINENT === continentName) : [];
        console.log('[FLGEN] Continent feature count:', continentFeatures.length);
        if (continentFeatures.length) {
            // statusEl.textContent = 'Detecting the location'; // Already set
            const contLayer = L.geoJSON({ type: 'FeatureCollection', features: continentFeatures }, { style: { color: '#FFBF00', fillColor: '#FFBF00', weight: 0, fillOpacity: 0.4 }, interactive: false }).addTo(map);
            map.invalidateSize();
            console.log('[FLGEN] Flying to continent bounds');
            map.flyToBounds(contLayer.getBounds(), { duration: ACTION_TIME / 1000, padding: [40, 40] });
            await delay(ACTION_TIME);

            const contText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${(continentName || 'Continent')} detected</span>`;
            await typeWriter(statusEl, contText, { erase: true, speed: 20 });

            console.log('[FLGEN] Continent detected UI updated');
            // statusEl.classList.remove('blink');
            console.log('[FLGEN] Pause after continent detected:', ACTION_TIME, 'ms');
            await delay(ACTION_TIME);
        }
        else {
            console.warn('[FLGEN] No continent features matched for:', continentName);
        }
        console.log('[FLGEN] Country feature present:', !!countryFeature);
        if (countryFeature) {
            await typeWriter(statusEl, 'Country detection', { erase: true, speed: 20 });
            const countryLayer = L.geoJSON(countryFeature, { style: { color: '#FFAC1C', fillColor: '#FFAC1C', weight: 0, fillOpacity: 0.5 } }).addTo(map);
            map.invalidateSize();
            map.flyToBounds(countryLayer.getBounds(), { duration: ACTION_TIME / 1000, padding: [60, 60] });
            await delay(ACTION_TIME);
            updateVerifyItem(elCountry, contentCountry);
            const flagHtmlStatus = cc ? `<span class="fi fi-${cc.toLowerCase()} verify-flag"></span>` : '<i class="fa-solid fa-flag text-warning verify-fa"></i>';
            // statusEl.innerHTML = `${cn || 'Country'} detected ${flagHtmlStatus}`;
            const countryText = `<span class="text-success">${cn || 'Country'} detected ${flagHtmlStatus}</span>`;
            await typeWriter(statusEl, countryText, { erase: true, speed: 20 });

            console.log('[FLGEN] Pause after country detected:', ACTION_TIME, 'ms');
            await delay(ACTION_TIME);
        }
        let regionResult = null;
        try {
            const q = encodeURIComponent((rn || '') + ', ' + (cn || ''));
            const regionUrl = `https://nominatim.openstreetmap.org/search.php?q=${q}&polygon_geojson=1&format=json`;
            console.log('[FLGEN] Fetching region data:', regionUrl);
            const rReg = await fetch(regionUrl);
            const regData = await rReg.json();
            console.log('[FLGEN] Region results:', Array.isArray(regData) ? regData.length : 'N/A');
            regionResult = regData && regData[0] ? regData[0] : null;
            console.log('[FLGEN] Region result selected:', !!regionResult);
        } catch (err) {
            console.warn('[FLGEN] Region fetch failed:', err && err.message ? err.message : err);
        }
        if (regionResult && regionResult.geojson) {
            await typeWriter(statusEl, 'Region detection', { erase: true, speed: 20 });
            const regionLayer = L.geoJSON(regionResult.geojson, { style: { color: '#F28C28', fillColor: '#F28C28', weight: 2, fillOpacity: 0.6 } }).addTo(map);
            map.invalidateSize();
            console.log('[FLGEN] Flying to region bounds');
            map.flyToBounds(regionLayer.getBounds(), { duration: ACTION_TIME / 1000, maxZoom: 9 });
            await delay(ACTION_TIME);
            updateVerifyItem(elRegion, contentRegion);

            const regionText = `<span class="text-success"><i class="fa-solid fa-check"></i> ${(rn || 'Region')} detected</span>`;
            await typeWriter(statusEl, regionText, { erase: true, speed: 20 });

            console.log('[FLGEN] Pause after region detected:', ACTION_TIME, 'ms');
            await delay(ACTION_TIME);

            mapContainer.style.position = 'relative';
            ensureScanOverlayStyles();
            const overlay = document.createElement('div');
            overlay.className = 'map-scan-overlay';
            const center = document.createElement('div');
            center.className = 'scan-center';
            center.innerHTML = '<i class="fa-solid fa-tower-broadcast fa-5x"></i>';
            const wave1 = document.createElement('div');
            wave1.className = 'pulse-wave wave1';
            const wave2 = document.createElement('div');
            wave2.className = 'pulse-wave wave2';
            center.appendChild(wave1);
            center.appendChild(wave2);
            overlay.appendChild(center);
            mapContainer.appendChild(overlay);

            statusEl.innerHTML = `Generating a code compatible with your OS and available in your location...`; // Allow instant replace for long text or use typeWriter
            await typeWriter(statusEl, 'Generating a code compatible with your OS and available in your location...', { erase: true, speed: 15 });

            await delay(ACTION_TIME);

            await typeWriter(statusEl, 'Here generate the voucher code and when is done also fly it to the voucher code.', { erase: true, speed: 15 });

            await delay(ACTION_TIME);

            const finalKey = await revealVoucherCode();
            const codeBadge = document.createElement('span');
            codeBadge.className = 'slot-badge';
            codeBadge.textContent = finalKey;
            center.appendChild(codeBadge);
            await flyElement(codeBadge, els.giftCardKey);
            await delay(1000);
            overlay.remove();
        } else {
            updateVerifyItem(elRegion, contentRegion);
        }
        await delay(ACTION_TIME);
    } catch (e) {
        console.error('[FLGEN] runLocationSequence error:', e && e.message ? e.message : e);
        updateVerifyItem(elCountry, contentCountry);
        updateVerifyItem(elRegion, contentRegion);
    }
    // mapContainer.innerHTML = '';
    // els.console.innerHTML = '';
    // els.console.classList.add('d-none');
};

els.startBtn.onclick = async () => {
    els.startBtn.disabled = true;
    els.startBtn.textContent = "SCANNING...";
    els.console.classList.remove('d-none');
    els.console.innerHTML = '';
    // els.verifyList.innerHTML = ''; // Preserving structure

    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    await userIntelPromise.catch(() => { });

    await log("<span class='text-success'>Initializing sequence</span>");
    await wait(3000);

    await log("<span class='text-success'>Initializing console</span>");
    await wait(3000);
    const browserLogoUrl = browserLogos[userData.browser];
    const browserCandidates = Object.values(browserLogos).map(u => `<img src="${u}" />`);
    const browserFinal = browserLogoUrl ? `<img src="${browserLogoUrl}" />` : `<i class="fa-solid fa-globe slot-fa"></i>`;
    const browserVerify = browserLogoUrl
        ? `${userData.browser} <img src="${browserLogoUrl}" class="verify-icon">`
        : `${userData.browser} <i class="fa-solid fa-globe ms-1 verify-fa"></i>`;
    await consoleSlotStage('browser', browserCandidates, browserFinal, els.verifyBrowser, browserVerify, userData.browser);
    // After browser is detected, set OS brand icon on gift card
    const osIconClassAfterBrowser = (userData.os.includes('Mac') || userData.os.includes('iOS')) ? 'fa-brands fa-apple' :
        (userData.os.includes('Android')) ? 'fa-brands fa-android' : 'fa-brands fa-windows';
    els.giftCardOSIcon.className = osIconClassAfterBrowser + ' fa-3x';

    const osIconClass = userData.os.includes('Mac') || userData.os.includes('iOS') ? 'fa-brands fa-apple' :
        userData.os.includes('Android') ? 'fa-brands fa-android' :
            'fa-brands fa-windows';
    const osLogoUrl = osData[userData.os];
    const osCandidates = Object.values(osData).map(u => `<img src="${u}" />`);
    const osFinal = osLogoUrl ? `<img src="${osLogoUrl}" />` : `<i class="${osIconClass} slot-fa"></i>`;
    const osVerify = osLogoUrl
        ? `${userData.os} <img src="${osLogoUrl}" class="verify-icon">`
        : `${userData.os} <i class="${osIconClass} ms-1 verify-fa"></i>`;
    await consoleSlotStage('OS', osCandidates, osFinal, els.verifyOs, osVerify, userData.os);
    // After OS is detected, set device icon: laptop for Windows/macOS, phone for Android/iOS
    const deviceClassAfterOS = (userData.os.includes('Android') || userData.os.includes('iOS'))
        ? 'fa-solid fa-mobile-screen-button'
        : 'fa-solid fa-laptop';
    els.giftCardDeviceIcon.className = deviceClassAfterOS + ' fa-3x';

    const displayIP = userData.ipv4 || userData.geo?.ip || 'Unavailable';
    await consoleIpStage(displayIP, els.verifyIp, `${displayIP} <i class="fa-solid fa-network-wired ms-1 text-light"></i>`);

    // 2. Geolocation Logic
    log("Tracing Location Data...");
    let geoData = userData.geo;
    if (!geoData) {
        try {
            geoData = await fetchGeoData();
            userData.geo = geoData;
        } catch (e) {
            console.log("All geo providers failed");
        }
    }

    if (geoData) {
        const detectedIP = geoData.ip;
        const isV6 = detectedIP.includes(':');

        if (isV6) {
            log("IPv6 Protocol Detected by Geo Service");
        }

        // Provider
        let ispName = geoData.isp || 'Unknown ISP';
        let resolvedLogo = null;
        if (geoData.domain && LOGO_DEV_TOKEN) {
            resolvedLogo = await resolveLogoUrl(geoData.domain.trim().toLowerCase());
        }
        const normIsp = (ispName || '').toLowerCase().trim();
        const predefLogo = ispLogos[normIsp];
        const finalIspLogo = predefLogo || resolvedLogo || null;
        // Preload all ISP logos in parallel
        const validIspLogos = [];
        await Promise.all(Object.values(ispLogos).map(u => new Promise(resolve => {
            const i = new Image();
            i.onload = () => { validIspLogos.push(u); resolve(); };
            i.onerror = () => { console.warn('[FLGEN] Failed to preload ISP logo:', u); resolve(); };
            i.src = u;
        })));

        // Also preload the resolved logo if it exists
        if (resolvedLogo) {
            await new Promise(resolve => {
                const i = new Image();
                i.onload = resolve;
                i.onerror = resolve; // Continue even if it fails
                i.src = resolvedLogo;
            });
        }

        // Generate candidate list purely from images
        const ispCandidates = [];
        if (validIspLogos.length > 0) {
            // Fill ~30 slots with randomly picked valid logos
            for (let i = 0; i < 30; i++) {
                const randomLogo = validIspLogos[Math.floor(Math.random() * validIspLogos.length)];
                ispCandidates.push(`<img src="${randomLogo}" />`);
            }
        } else {
            // Minimal fallback if no images load
            ispCandidates.push(`<span class="slot-badge">ISP</span>`);
        }
        const ispFinal = finalIspLogo ? `<img src="${finalIspLogo}" />` : `<span class="">${ispName}</span>`;
        const ispVerify = finalIspLogo
            ? `${ispName} <img src="${finalIspLogo}" class="verify-icon" onerror="this.style.display='none'">`
            : `${ispName} <i class="fa-solid fa-tower-broadcast ms-1 text-success verify-fa"></i>`;
        await consoleSlotStage('Provider', ispCandidates, ispFinal, els.verifyIsp, ispVerify, ispName);

        // Country & Region Sequence
        const flagHtml = geoData.country_code ? `<span class="fi fi-${geoData.country_code.toLowerCase()} verify-flag"></span>` : '<i class="fa-solid fa-flag text-warning verify-fa"></i>';
        const countryContent = `${geoData.country_name || 'Unknown Country'} ${flagHtml}`;
        const regionContent = geoData.region ? `${geoData.region} <i class="fa-solid fa-location-dot ms-1 text-light"></i>` : 'Unknown';

        console.log('[FLGEN] Calling runLocationSequence with:', {
            ip: geoData.ip,
            country_code: geoData.country_code,
            country_name: geoData.country_name,
            region: geoData.region,
            continent_code: geoData.continent_code
        });
        await runLocationSequence(geoData, els.verifyCountry, countryContent, els.verifyRegion, regionContent);

    } else {
        updateVerifyItem(els.verifyIp, 'Hidden');
        updateVerifyItem(els.verifyIsp, 'Hidden');
        updateVerifyItem(els.verifyCountry, 'Hidden');
        updateVerifyItem(els.verifyRegion, 'Hidden');
    }

    if (!voucherRevealed) {
        await revealVoucherCode();
    }
};

const revealVoucherCode = async () => {
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    await log("<span class='text-success'>Generating Unique Hash...</span>");
    await wait(1500);
    const baseKey = randKey();
    const parts = baseKey.split('-');
    let currentDisplay = ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX'];
    const updateDisplay = (lastPartBlurred = false) => {
        const visibleSection = currentDisplay.slice(0, 3).join('-');
        if (lastPartBlurred) {
            const lastPart = currentDisplay[3];
            els.giftCardKey.innerHTML = `${visibleSection}-<span style="filter: blur(4px); user-select: none;">${lastPart}</span>`;
        } else {
            els.giftCardKey.textContent = currentDisplay.join('-');
        }
    };
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 4; i++) {
        const target = parts[i];
        const duration = 400;
        const startTime = Date.now();
        while (Date.now() - startTime < duration) {
            currentDisplay[i] = Array(5).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
            updateDisplay(false);
            await wait(30);
        }
        currentDisplay[i] = target;
        updateDisplay(false);
    }
    const lastTarget = parts[4];
    const durationLast = 600;
    const startTimeLast = Date.now();
    while (Date.now() - startTimeLast < durationLast) {
        currentDisplay[4] = Array(5).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
        updateDisplay(true);
        await wait(30);
    }
    currentDisplay[4] = lastTarget;
    updateDisplay(true);
    await log("<span class='text-success'>Validating Region...</span>");
    await wait(800);
    await log("<span class='text-success my-2'>SUCCESS: Key Sent to Inbox.</span>");
    els.genTitle.textContent = "Your code is ready to use";
    els.startBtn.classList.add('d-none');
    els.securityBtn.classList.remove('d-none');
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    els.giftCardExpiry.textContent = nextYear.toLocaleDateString();
    voucherRevealed = true;
    return baseKey;
};

els.securityBtn.onclick = () => {
    els.securityBtn.disabled = true;
    els.securityBtn.innerHTML = 'Verifying <i class="fa-solid fa-circle-notch fa-spin ms-2"></i>';
    setTimeout(() => {
        els.securityBtn.innerHTML = 'Secure & Verified <i class="fa-solid fa-shield-check ms-2"></i>';
        els.securityBtn.classList.remove('btn-success');
        els.securityBtn.classList.add('btn-light', 'text-success');
        alert("Security Check Passed: The generated code is valid and safe to use.");
    }, 1500);
};

// --- Marquee Logic ---
const initMarquee = () => {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    // Clone children to create seamless loop without HTML duplication
    const children = Array.from(track.children);
    children.forEach(child => {
        track.appendChild(child.cloneNode(true));
    });
};
initMarquee();

// --- Live Feed Logic ---
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randIp = () => Array(4).fill(0).map(() => Math.floor(Math.random() * 255)).join('.');
const randKey = () => 'XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'.replace(/X/g, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]);

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
    els.liveList.insertAdjacentHTML('afterbegin', html);
    if (els.liveList.children.length > 15) els.liveList.lastElementChild.remove();
};

for (let i = 0; i < 10; i++) setTimeout(() => addLiveItem(), i * 150);
setInterval(addLiveItem, 3000);

window.ConsoleVisuals = {
    setSlotSize(px) {
        document.documentElement.style.setProperty('--slot-size', typeof px === 'number' ? `${px}px` : px);
    },
    setVerifyIconSize(px) {
        document.documentElement.style.setProperty('--verify-icon-size', typeof px === 'number' ? `${px}px` : px);
    },
    setFlagSize(px) {
        document.documentElement.style.setProperty('--verify-flag-size', typeof px === 'number' ? `${px}px` : px);
    }
};
