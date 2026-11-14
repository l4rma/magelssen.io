[![AWS S3 sync](https://github.com/l4rma/magelssen.io/actions/workflows/upload-to-s3.yaml/badge.svg)](https://github.com/l4rma/magelssen.io/actions/workflows/upload-to-s3.yaml)
# magelssen.io
My blog written in markdown with Hugo automatically uploaded to S3 where it's hosted as a static website at [magelssen.io](https://magelssen.io)

## Stack

| Part | Tool | What it does |
|---|---|---|
| Content | Markdown | Posts and talks, written in `content/` |
| Site generator | [Hugo](https://gohugo.io/) 0.140.0 | Builds the Markdown into a static site |
| Theme | [PaperMod](https://github.com/adityatelange/hugo-PaperMod) | Layout and styling, included as a git submodule |
| CI/CD | GitHub Actions | Builds on every pull request, builds and deploys on merge to `main` |
| AWS login | GitHub OIDC + IAM role | Short-lived credentials for the deploy, no stored keys |
| Hosting | Amazon S3 | Stores and serves the built site (static website hosting) |
| CDN | Amazon CloudFront | HTTPS, caching and security headers in front of S3 |
| Certificate | AWS Certificate Manager | TLS certificate for the domain |
| DNS | Amazon Route 53 | Points `magelssen.io` to CloudFront |

## License

The code in this repository (templates, styles, scripts and workflows) is licensed under the [MIT License](LICENSE).

The content (blog posts, talks, slides and images in `content/` and `assets/`) is © Lars Magelssen, all rights reserved. It may not be reused without permission.
