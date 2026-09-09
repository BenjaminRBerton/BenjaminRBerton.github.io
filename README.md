# Benjamin R. Berton — Personal Website

Source code for my personal research and portfolio website:

**[benjaminrberton.github.io](https://benjaminrberton.github.io/)**

The site presents my work in human factors, cognitive engineering, human–autonomy teaming, research, and software development.

## Technical overview

- Built with [Hugo](https://gohugo.io/)
- Content written in Markdown
- Custom HTML templates and CSS
- Static assets served directly from the repository
- Built and deployed to GitHub Pages with GitHub Actions

## Local development

Install Hugo, then run:

```bash
hugo server
```

The development site is available at `http://localhost:1313/`.

To create a production build:

```bash
hugo --gc --minify
```

## Deployment

Commits pushed to `main` are automatically built and deployed to GitHub Pages by the workflow in `.github/workflows/hugo.yaml`.
