---
layout: page
title: "Git Cheatsheet"
permalink: /git-cheatsheet
---

## What is Git?
Git is a widely-used version control system. In the context of Information Technology, Git allows multiple developers to work on the same project without stepping on each other's toes. It can keep track of changes to your files (known as commits), so you can always recall specific versions of your project at any point in the future.

Developers can use it for collaborative programming and for those in IT to manage configs collaboratively or to preserve your sanity when working with configurations across multiple devices.

If you're looking for something specific, `Ctrl + F` and search for it. If you're just here to learn, grab a coffee, sit back, and let's learn together.

I'd normally add a joke in this opening, but I am afraid you might not `git` it.

## Git Commands

### Setup

**Configure your Git username (to be used for every commit)**

```bash
git config --global user.name "Your Name"
```

**Configure your Git email (to be used for every commit)**

```bash
git config --global user.email "your-email@domain.com"
```

### Create & Clone Repositories

**Initialize a new repository**
```bash
git init "coffee-app"
```

**Clone an existing repository**
```bash
git clone https://github.com/username/coffee-app.git
```

### Local Changes

**Check the status of your repository**
```bash
git status
```

**Add all current changes to the next commit**
```bash
git add .
```

**Commit all local changes in tracked files**
```bash
git commit -m "Added new coffee types"
```

**Change the last commit**
_Don’t amend published commits!_
```bash
git commit --amend
```

### Branches

**List all existing branches**
```bash
git branch
```

**Switch to a specific branch and update the working directory**
```bash
git checkout "espresso-branch"
```

**Create a new branch based on your current HEAD**
```bash
git branch "new-latte-feature"
```

**Create a new tracking branch based on a remote branch**
```bash
git checkout --track <remote>/<branch>
```

**Delete a local branch**
```bash
git branch -d "unwanted-coffee-feature"
```

### Update & Publish

**List all currently configured remotes**
```bash
git remote -v
```

**Show information about a remote**
```bash
git remote show "origin"
```

**Add new remote repository, named "origin"**
```bash
git remote add "origin" https://github.com/username/coffee-app.git
```

**Download all changes from "origin", but don't integrate into HEAD**
```bash
git fetch "origin"
```

**Download changes and directly merge/integrate into HEAD**
```bash
git pull "origin" master
```

**Publish local changes on a remote**
```bash
git push "origin" master
```

### Merge & Rebase

**Merge "branch" into your current HEAD**
```bash
git merge "coffee-feature-branch"
```

**Rebase your current HEAD onto "branch"**
_Don't rebase published commit!_
```bash
git rebase "master"
```

### Undo

**Discard all local changes in your working directory**
```bash
git reset --hard HEAD
```

**Discard local changes in a specific file**
```bash
git checkout HEAD coffee-list.txt
```

**Revert a commit (by producing a new commit with contrary changes)**
```bash
git revert "commitId"
```

**Reset your HEAD pointer to a previous commit and discard all changes since then**
```bash
git reset --hard "commitId"
```

This should cover most of the basic and intermediate usage of Git. As always, be mindful of your current branch and the state of your local changes before using commands that modify your history, like `commit`, `merge`, `rebase`, and `reset`.

Soon, I'll publish a guide about signing your commits in Git, which we should all be doing!!

I hope you enjoy and benefit from this resoruce.
