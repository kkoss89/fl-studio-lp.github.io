# FL Studio Landing Page

![Project Banner](https://placehold.co/1200x300?text=FL+Studio+Landing+Page)
> *Note: Replace the image URL above with your own banner.*

# [👉 ENTER NOW 👈](https://fl-studio-lp.github.io/)

A high-converting, animated landing page template styled for FL Studio campaigns. Built with HTML5, Bootstrap 5, and jQuery.

## 🚀 Features

*   **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop.
*   **Dynamic Animations**: 
    *   Matrix-style "decoding" text animations.
    *   Smooth "Slot Machine" scanning effects for Browser, OS, and Region detection.
    *   Flying element animations for key generation.
*   **Interactive Console**: Simulates a terminal environment for generating codes, building trust with the user.
*   **Geo-Location Detection**: Automatically detects and displays the user's Country and Region using `IP-API`, `IPWho`, and other fallbacks.
*   **Failover System**: Robust offer fetching system that rotates through multiple domains (`rileymarker.com`, `motifiles.com`, etc.) to bypass AdBlockers.
*   **Countdown Timer**: Custom circular SVG countdown timer to create urgency.

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3, JavaScript (jQuery)
*   **Styling**: Bootstrap 5.3, FontAwesome 6.5
*   **Mapping**: Leaflet.js (for location visualization)
*   **3D Elements**: Three.js (for background effects)

## 📦 Installation

Simply clone the repository and open `index.html` in your browser.

```bash
git clone https://github.com/kkoss89/fl-studio-lp.github.io.git
cd fl-studio-lp.github.io
# Open index.html
```

## ⚙️ Configuration

### Changing Offer Feed
Edit `index.html` and modify the `domains` array or the CPA Grip URL parameters:
```javascript
var domains = ['rileymarker.com', 'motifiles.com', ...];
var userId = '7004';
var pubKey = '...';
```

### Changing Text
All text content is directly editable in `index.html`.

## 📄 License
This project is for educational purposes. All trademarks belong to their respective owners.
