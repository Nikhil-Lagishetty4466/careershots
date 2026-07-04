# Career Shots

A premium multi-page static website for a career guidance platform, built with HTML5, CSS3, and vanilla JavaScript.

## Highlights

- Mobile-first responsive layout
- Premium startup-inspired visual design
- Shared design tokens with CSS variables
- Sticky navigation with mobile menu
- Dark mode with preference persistence
- Scroll reveal animations and animated stats
- Semantic HTML and SEO-ready metadata
- Lightweight SVG illustrations and favicon

## Pages

- `index.html`
- `about.html`
- `resources.html`
- `blog.html`
- `contact.html`

## Project Structure

```text
career-shots/
├── index.html
├── about.html
├── resources.html
├── blog.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── components/
│   ├── navbar.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── variables.css
│   │   ├── utilities.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── navbar.js
│   │   ├── animations.js
│   │   └── theme.js
│   ├── images/
│   ├── icons/
│   └── fonts/
└── README.md
```

## Local Preview

Use any static file server. One easy option:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- Update the placeholder domain `https://careershots.example` before production launch.
- Replace placeholder social links and contact email addresses with real values.
- The `components/` directory contains reusable navbar and footer snippets for future templating or include workflows.
