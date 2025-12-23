# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based static site for publishing an annual family Christmas card. It leverages GitHub Pages' native Jekyll support for zero-build-tool deployment. The design philosophy is **minimal complexity**: write markdown, push to GitHub, and you're done.

## Development Commands

### Local Preview (Optional)
```bash
# Install Jekyll if needed
gem install bundler jekyll

# Serve locally at http://localhost:4000
jekyll serve
```

**Note:** Local testing is optional. GitHub Pages builds are fast enough to push and preview live.

### No Build Process
There is no npm, webpack, or build toolchain. GitHub Pages handles Jekyll compilation automatically on push.

## Architecture

### Content Flow
The site uses Jekyll's front matter + include system to compose pages:

1. **Entry point** (`index.html` or `YYYY.html`):
   - Contains YAML front matter defining `year`, `content_file`, `menu_file`, and optional `pdf_file`
   - Uses `{% include_relative %}` to pull in markdown content
   - Example: `index.html` → loads `content/2025.md` via front matter

2. **Layout** (`_layouts/default.html`):
   - Single HTML template that wraps all content
   - Uses Liquid template variables like `{{ page.year }}` and `{{ content }}`
   - Contains header, navigation, footer, CSS snowflakes animation
   - Conditionally shows menu and PDF download links based on front matter

3. **Content files** (`content/YYYY.md`):
   - Pure markdown for the Christmas card story
   - Supports HTML for image positioning (see below)
   - Gets compiled to HTML and injected into `{{ content }}` in layout

4. **Menu files** (`content/menu-YYYY.md`):
   - Optional markdown for holiday menus or recurring content
   - Loaded via `{% include_relative {{ page.menu_file }} %}` in layout

### Image Positioning Patterns

Content markdown files use HTML classes for image layout:

```html
<!-- Full width hero image -->
<span class="image main"><img src="/images/2025/photo.jpg" alt="..." /></span>

<!-- Float right with text wrap -->
<span class="image right"><img src="/images/2025/photo.jpg" alt="..." /></span>

<!-- Float left with text wrap -->
<span class="image left"><img src="/images/2025/photo.jpg" alt="..." /></span>

<!-- Grid layout (2-6 images) -->
<div class="image grid three">
  <span class="image"><img src="/images/2025/photo1.jpg" alt="..." /></span>
  <span class="image"><img src="/images/2025/photo2.jpg" alt="..." /></span>
  <span class="image"><img src="/images/2025/photo3.jpg" alt="..." /></span>
</div>
```

Grid classes: `grid two`, `grid three`, `grid four`, `grid five`, `grid six`

Images in grids are height-constrained (40vh) and support lightbox functionality via `assets/js/lightbox.js`.

### Directory Structure

```
├── _layouts/
│   └── default.html          # Main template (header, nav, footer, snowflakes)
├── content/
│   ├── YYYY.md               # Annual Christmas card story
│   ├── menu-YYYY.md          # Optional menu content
│   └── YYYY.pdf              # Optional PDF download
├── images/
│   └── YYYY/                 # Year-specific photo folders
├── assets/
│   ├── css/main.css          # Compiled styles (from sass/)
│   ├── sass/                 # SASS source files
│   └── js/                   # jQuery, main.js, lightbox.js
├── index.html                # Current year entry point (front matter + include)
├── YYYY.html                 # Previous year archives (same structure)
└── _config.yml               # Jekyll configuration
```

## Annual Update Workflow

To publish a new year's card:

1. **Create content files:**
   - `content/2026.md` (required)
   - `content/menu-2026.md` (optional)
   - `content/2026.pdf` (optional)

2. **Create image folder:**
   - `images/2026/` with optimized photos

3. **Update entry point:**
   Edit `index.html` front matter:
   ```yaml
   ---
   layout: default
   year: 2026
   content_file: content/2026.md
   menu_file: content/menu-2026.md
   pdf_file: content/2026.pdf
   ---
   ```

4. **Update layout text (optional):**
   Edit `_layouts/default.html` line 42 to change "What a year 2026 was!" if desired.

5. **Archive previous year (optional):**
   - Copy current `index.html` to `2025.html` for permanent archive
   - Update navigation in layout to link to archived years if desired

6. **Push to GitHub** - site rebuilds automatically

## Design Credits

- Template: **Dimension** by [HTML5 UP](https://html5up.net) (CCA 3.0 license)
- CSS snowflakes: Inspired by [CSSnowflakes](https://github.com/pajasevi/CSSnowflakes)
- Tree icon: ka reemov from Noun Project (CC BY 3.0)

## Configuration Notes

- **Jekyll version**: GitHub Pages uses Jekyll 3.9+ with safe mode
- **Markdown processor**: kramdown with GFM (GitHub Flavored Markdown)
- **Domain**: Configured via `CNAME` file (mckennafam.com)
- **Excluded files**: README.md, LICENSE, .gitignore (see `_config.yml`)

## Styling

- Main stylesheet: `assets/css/main.css` (compiled from `assets/sass/`)
- Edit SASS files in `assets/sass/` for style changes
- Snowflake animation is inline CSS in `_layouts/default.html` (lines 137-286)
- Responsive breakpoints handled via `assets/js/breakpoints.min.js`

## JavaScript

- **jQuery**: Required for main template functionality
- **main.js**: Handles navigation, article overlays, and UI interactions
- **lightbox.js**: Provides click-to-zoom for images (custom implementation)
- **Unused feature**: Contact form (commented out in layout, lines 295-324)
