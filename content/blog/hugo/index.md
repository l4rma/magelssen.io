---
title: "Generating a website with Hugo"
date: 2024-12-21
draft: false
tags: ["hugo", "web development"]
cover:
    image: "thumbnail.svg"
    alt: "hugo logo"
    caption: ""
---
## Creating a blog

The first blog page I created I wrote the frontend in react and styled it with CSS. I spend 90% of my time writing code and 10% writing actual posts. Which was fine since the whole reason I created the site was to practice writing code. I wrote posts in markdown and used [pandoc](https://pandoc.org/) to convert them to html and then fixing whatever I was unhappy with manually. But later when I actually wanted to create some content documenting the things I learn or things that interests me I wanted to find a framework where I could just create my notes and posts in markdown (as I already was doing) and have everything else automatically generated.

## What is Hugo?

[Hugo](https://gohugo.io/) is a framework for generating static websites. Its written in [Go](https://go.dev/) and is blazingly fast and easy to use. 
The content is generated from markdown files and converted to html and rendered from templates and file structure.
This makes it perfect for creating a blog since using markdown is an excellent way to write posts.
From the [hugo website](https://themes.gohugo.io/) you can download a theme to style your page making design yet another thing you don't have to think about.


## Generating a website with Hugo

The only thing you need to get started is Git, then you're ready to download Hugo.
On debian I found that the version I got from the package manager was too old for many of the features. But the newest version can be downloaded from the [hugo github page](https://github.com/gohugoio/hugo/releases). 

```bash
# Linux (Ubuntu/Debian based)
sudo apt install hugo

# Mac
brew install hugo

# Windows (Chocolatey)
choco install hugo-extended
```

- To create a new site simply use the command ``hugo new site <name>``
- Run it locally with the command ``hugo server``
- To add posts you can use the build in command ``hugo new content <content/posts/markdownfile.md>``

For more information take a look at the [documentation](https://gohugo.io/documentation/)

I highly recomment checking out [Hugo](https://gohugo.io/)
