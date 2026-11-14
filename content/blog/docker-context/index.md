---
title: "Docker Context"
date: 2025-03-14
draft: false
tags: ["Docker", "Linux"]
cover:
    image: "thumbnail.png"
    alt: "Docker Context"
    caption: ""
---

tl;dr: After installing docker-desktop, I needed to use sudo to run commands even though my user is in the docker group.  
**Fix:** Change docker context back to default.

## Introduction - The problem
After installing docker-desktop, running docker commands only returns errors. How did this happened? It was working just fine earlier. Let me start from the beginning:

Recently I've been thinking about learning Kubernetes. And I've started doing some research also thinking about completing some of the Kubernetes certifications.

I've been using docker and docker-compose a bit in the past, but I am by no means an expert. So I looked up some guides trying to learn some new stuff.

The guide was using docker-desktop which I don't have much experience with since I've mostly just used the CLI version. After installing docker-desktop, I ran into some trouble: I could no longer run docker commands without sudo. Here is how I fixed it.

## Story time
After installing docker-desktop I suddenly got an error when running docker commands.

```bash
$ docker ps
Cannot connect to the Docker daemon at unix:///home/USERNAME/.docker/desktop/docker.sock. Is the docker daemon running?
```
To check if the docker daemon was running i tried checking the status in systemctl

```bash
$ systemctl status docker.service
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; preset: enabled)
     Active: active (running) since Thu 2025-03-06 08:49:04 CET; 49min ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 1660 (dockerd)
      Tasks: 17
     Memory: 101.0M
        CPU: 921ms
     CGroup: /system.slice/docker.service
             └─1660 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

Warning: some journal files were not opened due to insufficient permissions.
```

Looks good as far as I can tell. (I did not I was supposed to run ``systemctl --user status docker-desktop``. It would've given the same result anyways). Maybe installing docker-desktop recreated the docker group which means my user is no longer in the group? 

(Btw, if you don't know how to add your user to the docker group it's done with the command: ``sudo usermod -aG docker $USER`` source: [Docker documentation](https://docs.docker.com/engine/install/linux-postinstall/))

A quick google search tells me that you can find linux groups in ``/etc/group``. Let's take a look.

 ```bash
$ cat /etc/group | grep docker
docker:x:995:USERNAME
```
Okay, so I'm still in the group. The problem has to be somewhere else. 

## The fix
After a few more google search I find the solution. Apparently in Docker there is this thing called context. It's used to to manage Docker daemons from a single client.

Each context has a name, description and TLS info (Docker Endpoint) so that a user can configure multiple context and switch between them for running locally and remote.

Docker-desktop creates it's own context, and also changes to that context which affects the CLI. This can all be checked and fixed from the CLI.

```bash
$ docker context ls
NAME              DESCRIPTION                               DOCKER ENDPOINT                                  ERROR
default           Current DOCKER_HOST based configuration   unix:///var/run/docker.sock
desktop-linux *   Docker Desktop                            unix:///home/USERNAME/.docker/desktop/docker.sock
```
Aha! So there is two contexts, and the default is no longer selected. Now I just need to change the context back to default.
```bash
$ docker context use default
default
Current context is now "default"
```

And now I can run docker commands without sudo again. Yay!
