---
title: "Boost your terminal productivity with Emacs mode shortcuts"
date: 2025-12-28
draft: false
tags: ["Linux", "CLI", "Emacs", "productivity", "bash"]
cover:
    image: "thumbnail.png"
    alt: "emacs-mode"
    caption: ""
---

So whether you work as a developer, SRE or with devOps, a big part of your work
happens in the terminal. And what ever you do, if you do it a lot of times, you
will get faster. But repetition alone can only get you so far. And more often
than not, when only comparing one to one self without seeing what is possible,
you never evolve.

I don't know how many times i have hold down the left arrow key, watching the
cursor slowly move left because i need to switch out ``k get`` with
``k describe``, or add ``sudo``, or fix a typo in the beginning of the command.
At the same time thinking "I should really look up what the hotkey for jumping
to the beginning of the line is. But now I'm already half the way, so I'll just
keep holding down the left arrow key and look it up later."

If I just looked up key mappings and shortcuts when ever I wanted to do
something on my computer the first time around. I'd save myself from a ton of
bad habits. This is relevant for every software I use, but today I just want
to focus on the terminal. Bash, to be specific.

## Why do we use keyboard shortcuts?
When we work, we need to focus. The better focus, the more efficient work.
When ever your phone lights up, you hear something or you feel like eating
something with sugar, you get distracted and lose focus. This can happen for a
second or for hours.

When we need to do an action on the computer, and don't know the keyboard
shortcut, we're forced to work with this posts antagonist, the mouse. The mouse
is awesome, and really really practical, sometimes, but not for selecting
commands.

Let's say you are writing some sort of paper. You need to check a source you
have up in your browser. In less then a second, you ``alt+tab``, read your
source, then ``alt+tab`` back and continue writing, deep focus still intact.
Ok, same scenario with no keyboard shortcuts:

You're writing and need to check a source you know is up in the browser. Right
hand has to travel away from the keyboard over to the mouse. Then the eyes need
to find the browser on the status bar/dock. While looking you see
discord/teams/slack and click it without thinking. "I'll just check if so or so
has come online while I'm looking for the browser". They are, and after an hour
of chatting you finally remember that you are actually on a mission to find the
browser. Your eyes keeps scanning the screen, looking for the browser icon.
There! Something is blinking. No, that's just outlook. Why is it blinking?
Let's have a look...

I could go on forever. And this is a bit exaggerated, but the point is searching
for something with our eyes is very slow and super fragile for getting
distracted. And the same applies for other slow stuff we do. A simple harmless
looking thing like holding backspace to erase text is slow enough to make us
drop focus and give our dopamine addicted tiktok/SoMe loving brain enough time
to get distracted.

When running bash in the terminal, we have a lot of keyboard shortcuts at our
disposal. And they come from two of the arguably best text editors ever
created, Emacs and Vim.

## Vim vs Emacs
Emacs and Vim are text editors. Vim is an improved version of Vi, which was
created as early as 1976. Emacs was also released in 1976. Which means both of
these text editors will turn 50 years next year (2026). Over the years the
question of what text editor is the best has become a meme. And a lot of people
have very strong opinions about which one it is.

I'm only mentioning them quickly because whether you use bash, zsh, ksh, fish or
FreeBSD, you already have Emacs and Vi editing modes available by default for
command-line editing through GNU Readline. Readline is a library that provides
tools for the command-line. You get line editing, history recall and auto
completion. MacOs however uses NetBSD Editline, which is a licensed
alternative, but I'm getting derailed. The point is that when you type on the
command-line, you have the same tools, key mappings and macros as you do in the
Emacs editor or Vi available. With that said, let's go over some Emacs
shortcuts to make your day in the terminal more pleasant.

## Emacs mode
![emacs logo](emacs-logo.png)

So when you fire up a new shell you start off in emacs mode by default. To
check you can run ``set -o`` and see if emacs is listed as "on". This is also
the command used to switch to Vi mode ``set -o vi`` (and to switch back you run
``set -o emacs``).

Here are some of the most useful Emacs keyboard shortcuts for navigating and
editing the command-line:

### Movement

| Shortcut        | Action                          |
|-----------------|---------------------------------|
| `Ctrl + A`      | Move to the beginning of line    |
| `Ctrl + E`      | Move to the end of line          |
| `Alt + B`       | Move back one word               |
| `Alt + F`       | Move forward one word            |
| `Ctrl + B`      | Move back one character          |
| `Ctrl + F`      | Move forward one character       |

Notice how actions on a word use the ``Alt`` key, while on a character use the
``Ctrl`` key. (At least most of the time).

### Deletion

| Shortcut   | Action                                           |
|------------|--------------------------------------------------|
| `Alt + D`  | Cut the word after the cursor                    |
| `Ctrl + D` | Delete the character under cursor                |
| `Ctrl + H` | Delete the character before cursor               |
| `Ctrl + L` | Clear the screen. Like the command `clear`       |
| `Ctrl + W` | Cut the word before the cursor. (Same as in Vim) |
| `Ctrl + U` | Cut text from the cursor to beginning of line    |
| `Ctrl + K` | Cut text from the cursor to the end of line      |

### Editing and manipulation

| Shortcut        | Action                          |
|-----------------|---------------------------------|
| `Ctrl + Y`      | Paste the last cut text          |
| `Ctrl + T`      | Swap the character before cursor with the one under cursor |
| `Alt + T`       | Swap the word before cursor with the one after cursor |
| `Ctrl + _`      | Undo the last action             |
| `Alt + .`       | Insert the last argument of the previous command |

### History navigation
| Shortcut   | Action                                 |
|------------|----------------------------------------|
| `Ctrl + P` | Previous command in history            |
| `Ctrl + N` | Next command in history                |
| `Alt + R`  | Reverse search through command history |

### My favorite

| Shortcut              | Action                                                        |
|-----------------------|---------------------------------------------------------------|
| `Ctrl + X` `Ctrl + E` | Open the current command in the default text editor ($EDITOR) |

This is awesome when ever I need to paste in a multi-line command where I need
to fill in an argument or change parameters, for example a big curl command. I
simply paste it in, then press ``Ctrl + X``, ``Ctrl + E``. Actually I think I
just hold ``ctrl`` and press ``xe``. Then my command opens up in vim and I can
edit it using all my vim motions and shortcuts. And when you exit ``:wq``, the
command is run. So be a little care full with that. If you don't want to run
the command, delete all lines before you save and quit. ``:q!`` might run the
command, I've experienced it acting different depending on the shell.

## How to learn to use these shortcuts
Now comes the hard part. Learning the shortcuts. There isn't really any secret
to this, you just got to be patient and deal with being slower for a while
before you get faster then ever before. 

A good tip is when ever you realise you just did something the old way,
stop, go back and do it again the correct way. For example when trying to get
used to using ``ctrl+p``, when ever I pressed the ``up-arrow`` to get to an
older command, I forced myself to press ``down-arrow`` all the way back, then
use ``ctrl+p`` to find the command I was looking for.

It takes a lot of repetition to create new habits, but usually you will get
used to it it a week, and after two weeks it's a habit.

## Conclusion
That was my cheat sheet to emacs mode in bash. I hope you will start using the
shortcuts to save time and stay focused! If you want to get a list of all the
keybindings in bash, run ``bind -P``.

