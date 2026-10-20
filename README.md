# SPanditG: Online Pandit Booking Website

Multipage static website for SPanditG (puja, havan, wedding, Vastu and Jyotish bookings). Plain HTML, CSS and JavaScript. No build step, no framework.

## Pages
| Page | File |
|---|---|
| Landing | `index.html` |
| Services | `services.html` |
| Free Kundli (calculator + "Go deeper" cards) | `kundli.html` |
| About + Panditji | `about.html` |
| Reviews (Google rating, carousel, FAQ) | `reviews.html` |
| Gallery | `gallery.html` |
| Book appointment (3 steps + advance payment) | `book.html` |
| Contact | `contact.html` |
| Admin | `admin.html` |

## Features
- Glassmorphism cards, forms and navigation; rounded buttons and images
- Looping celestial background video plus a canvas star/galaxy effect; looping mandala video behind Contact
- Mandala backgrounds on every page, mouse spotlight, scroll-reveal animations
- 12 auto-scrolling testimonials, Google rating block, FAQ
- Booking in 3 steps (New Consultation, Follow Up, Reschedule), advance payment from Rs 500 with UPI QR
- Free Kundli, transits and dosha check (Lahiri, whole-sign houses)
- Admin page: change QR, UPI ID, minimum amount, contact and social links, and upload images

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```
Opening `index.html` directly also works.

## Admin (demo)
Open `admin.html`, passcode `admin123` (change it in Admin). After login, every image on every page shows an Upload button.

**Important:** admin login, settings, uploaded images and bookings are stored in the visitor's browser (localStorage / IndexedDB). They are not shared between devices and the passcode is visible in the code. Before going live, add a backend (database, real authentication, payment verification).

## Customising
- Default images: `assets/img/` (services, about, pandits, hero)
- Videos: replace `assets/video/celestial.mp4` and `mandala.mp4` (same names), or regenerate with `tools/make_videos.py`
- Text data (services, testimonials, FAQ, pandits): top of `assets/js/site.js`
- Colours and fonts: CSS variables at the top of `assets/css/site.css`
- Testimonials and the 4.9 Google rating are **placeholders**. Replace them with real reviews before launch.

## Performance notes
- No framework and no build step; pages load one CSS file and one or two JS files
- Page assets: images 1.4M, videos 580K, JS 44K, CSS 28K
- Background videos are small 640x360 loops; the canvas effect pauses when off-screen
- Respects `prefers-reduced-motion`
- Further ideas: convert images to WebP, serve fonts locally, add a service worker

## Deploy
Vercel: import the repo at vercel.com/new, Framework Preset "Other", leave Build Command and Output Directory empty. Every push to main redeploys automatically (config in `vercel.json`).

A GitHub Pages workflow is included (`.github/workflows/pages.yml`). In the repo go to Settings > Pages > Source: GitHub Actions.
