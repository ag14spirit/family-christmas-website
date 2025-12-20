# Family Christmas E-Card (Jekyll + GitHub Pages)

A super lightweight setup for publishing an annual family Christmas card website. Write your content in markdown, push to GitHub, and you're done. No build tools, no npm, no fuss.

## Why This Exists

Every year we wanted to share a family Christmas card online without:
- Dealing with bloated blog frameworks
- Running local build scripts
- Managing hosting infrastructure
- Rewriting the entire site from scratch

This uses GitHub Pages' native Jekyll support to convert markdown files into a beautiful single-page site. Update two markdown files each year, change a couple lines in `index.html`, and push. That's it.

## How It Works

The site has three main pieces:

1. **Layout** (`_layouts/default.html`) - Your HTML template with all the styling
2. **Content** (`content/YYYY.md`) - Your Christmas card story for each year
3. **Menu** (`content/menu-YYYY.md`) - Optional holiday menu (or any other recurring content)

Jekyll automatically builds these into a static site when you push to GitHub.

## Quick Start

1. Fork this repo
2. Enable GitHub Pages in Settings → Pages → Source: `main` branch
3. Update `index.html` with your year and content files:
   ```yaml
   ---
   layout: default
   year: 2025
   content_file: content/2025.md
   menu_file: content/menu-2025.md  # optional
   ---
   ```
4. Create your content files in the `content/` folder
5. Push to GitHub

Your site will be live at `https://yourusername.github.io/your-repo-name`

## Annual Update Process

Each year, just:

1. Create `content/2026.md` with your new Christmas card content
2. (Optional) Create `content/menu-2026.md` if you have a menu
3. Update `index.html` front matter:
   ```yaml
   year: 2026
   content_file: content/2026.md
   menu_file: content/menu-2026.md
   ```
4. Update the header text in `_layouts/default.html` if you want to change "What a year 2025 was!" to the new year
5. Commit and push

GitHub Pages rebuilds automatically. Done.

## Markdown Tips

- Use regular markdown for paragraphs, headings, links, etc.
- For image positioning, use HTML: `<span class="image right"><img src="..." /></span>`
- Position options: `image left`, `image right`, `image main` (full width)
- HTML tags work fine in markdown files

## Customization

- Edit `_layouts/default.html` to change the overall structure
- Modify `assets/css/main.css` for styling changes
- Update meta tags in the layout for SEO/social sharing
- The snowflakes are CSS-based (at the bottom of `default.html`)

## Testing Locally (Optional)

Want to preview before pushing?

```bash
gem install bundler jekyll
jekyll serve
```

Visit `http://localhost:4000`

But honestly, GitHub Pages builds so fast you can just push and check the live site.

## Credits

Based on **Dimension** by [HTML5 UP](https://html5up.net), free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license) by [ajlkn](https://github.com/ajlkn/).

CSS snowflakes inspired by [CSSnowflakes](https://github.com/pajasevi/CSSnowflakes).

## License

The template is CCA 3.0. Your content is yours. Use this however you want for your own family cards!