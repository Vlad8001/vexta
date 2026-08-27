# VEXTA - Website

Corporate website for VEXTA, a B2B sales outsourcing agency.
Live at: **[vexta.site](https://vexta.site)**

## Stack

- Plain HTML5 + CSS3 + Vanilla JS (no build step, no framework)
- [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Contact form via [FormSubmit.co](https://formsubmit.co) (no backend needed)
- Hosted on **GitHub Pages**

## Structure

```
/
├── index.html                (EN Home)
├── about.html                (EN About)
├── services.html             (EN Services)
├── process.html              (EN Process)
├── contacts.html             (EN Contacts)
├── thank-you.html            (post-form success)
│
├── ua/
│   ├── index.html            (UA Home)
│   ├── about.html
│   ├── services.html
│   ├── process.html
│   ├── contacts.html
│   └── thank-you.html
│
├── assets/
│   ├── css/styles.css        (design system + components)
│   ├── js/main.js            (header, mobile menu, animations, form)
│   └── images/
│       ├── logo-mark.svg          (for light backgrounds)
│       ├── logo-mark-white.svg    (for dark backgrounds)
│       └── og/               (Open Graph images - see below)
│
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── CNAME                     (vexta.site - for custom domain)
├── .nojekyll                 (disable Jekyll on GitHub Pages)
└── README.md
```

## Deployment on GitHub Pages

### 1. First-time setup

```bash
# 1. Create a new repository on GitHub (name: vexta-website, public)
# 2. Push all files to the main branch:
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/vexta-website.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to **Settings → Pages** in your repo.
2. Under **Source**, pick **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/ (root)`**. Save.
4. Wait ~1-2 minutes for GitHub to build.

### 3. Connect custom domain (vexta.site)

The `CNAME` file already contains `vexta.site`, so once you have DNS pointing at GitHub Pages, everything works automatically.

**All internal links and asset paths are RELATIVE** (e.g. `assets/css/styles.css`, not `/assets/css/styles.css`). This means the site works correctly BOTH at `https://vexta.site/` AND at `https://<username>.github.io/<repo-name>/` - no configuration needed. If you ever add new links or images, keep them relative:
- From root pages: `assets/...`, `about.html`, `ua/index.html`
- From `ua/*.html` pages: `../assets/...`, `../about.html`, `index.html`

At your DNS provider, add these records for `vexta.site`:

**A records (apex domain):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME record (for www):**
```
www  →  <YOUR-USERNAME>.github.io.
```

DNS can take up to 24 hours to propagate. Once done, GitHub will auto-issue an SSL certificate - check **Enforce HTTPS** in Pages settings.

---

## Updating content

### Text changes
All content is inline HTML. Open the relevant `.html` file, edit the text, commit, push. Your changes go live in ~1 minute.

**Rule:** if you change something in the EN version, also update the matching UA file in `/ua/` (and vice versa). Same for the site header/footer.

### Contact info

Search-and-replace across all HTML files for placeholders:

| Placeholder            | Where to update      |
|------------------------|----------------------|
| `vladkirilenko439@gmail.com`     | Email (form action + all footer/contact links) |
| `@vlad_vexta` / `https://t.me/vlad_vexta` | Telegram handle |
| `+380 97 110 83 94` / `https://wa.me/380971108394` | Phone & WhatsApp |
| `linkedin.com/company/vexta-b2b` | LinkedIn |

### Contact form (FormSubmit.co)

The form posts to `https://formsubmit.co/vladkirilenko439@gmail.com`.

**First submission** will trigger a confirmation email to `vladkirilenko439@gmail.com` from FormSubmit - click the link inside to activate. After that, all form submissions get emailed to you automatically. Fully free, no account needed.

To change the destination email, edit the `action=` attribute in `contacts.html` and `ua/contacts.html`.

### Enabling testimonials (once you have real ones)

The `Testimonials` section on the Home page is hidden by default:
```html
<section class="section" data-hidden="true">
```
Remove `data-hidden="true"` and replace the three `<!-- TODO -->` placeholder cards with real quotes.

### Replacing team placeholders

The `Meet the team` section on About uses gradient avatars with initials. To use real photos, in `about.html` and `ua/about.html` replace:
```html
<div class="team-avatar">A</div>
```
with:
```html
<img src="/assets/images/team/founder-1.jpg" alt="Name" class="team-avatar" style="object-fit:cover;">
```

### Open Graph images

Meta tags reference `assets/images/og/og-*.png`. Create 1200×630 PNGs (logo + page title on a navy→silver gradient background) and drop them in that folder. Recommended pages:
`og-home.png`, `og-about.png`, `og-services.png`, `og-process.png`, `og-contacts.png` and their `-ua.png` counterparts.

---

## Notes

- **No build step.** Just edit HTML/CSS/JS and push.
- **No cookies, no trackers.** Add analytics only if you decide to.
- **Accessibility:** semantic HTML, ARIA labels on interactive controls, 44×44 minimum touch targets.
- **Reduced motion** is respected via `prefers-reduced-motion`.

---

© VEXTA
