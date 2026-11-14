---
title: "Upgrading a Kubernetes cluster with kubeadm"
date: 2026-02-20
draft: false
tags: ["Kubernetes", "K8s", "kubeadm"]
cover:
    image: "thumbnail.png"
    alt: "Upgrade a Kubernetes cluster with kubeadm"
    caption: ""
---

Studying for the CKA, I am upgrading my homelab Kubernetes cluster for the
first time and I though I should document the process for a better learning
experience.

## Useful links
- [The Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Changing the Kubernetes package repository](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/change-package-repository/)
- [Upgrading kubeadm clusters](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)

## Upgrading a Kubernetes cluster
Upgrading a Kubernetes cluster for the first time can seem scary. Going into
this I didn't really know what to expect. I knew that Kubernetes is complex and
has a lot of different parts holding everything together. I also
knew that it isn't as simple as just running an upgrade command.

But time would show that is wasn't really that much harder than running
something like ``upgrade kubernetes``. When setting up a Kubernetes cluster
with kubeadm, you install kubeadm, kubectl and kubelet. Then you configure the
cluster with kubeadm. Upgrading the cluster is pretty much the same thing: You
upgrade kubeadm with your package manager, then use the upgraded kubeadm to
upgrade all the parts of the cluster running in the cluster. Then upgrade
kubectl and kubelet with the package manager.

Note that I am still just starting my Kubernetes journey and my cluster is as
simple as it gets at the moment. I get that upgrading a big enterprise cluster
in prod with lots of critical apps running is a whole different game. Maybe
I'll get there some day. But for now:

Here is my step by step guide on how to upgrade a Kubernetes cluster with some
comments, following the Kubernetes documentation.

## Updating the package repository
First of all, here is my starting point. We're currently at version 1.33.2
```bash
$ k get nodes
NAME      STATUS   ROLES           AGE   VERSION
lenovo1   Ready    control-plane   58d   v1.33.2
lenovo2   Ready    <none>          58d   v1.33.2
pi5       Ready    <none>          58d   v1.33.2
```

All my nodes are running Ubuntu-Server 24. This can be checked by running
the command ``cat /etc/*release*``. This matters because it is debian based and
means that I use the package manager apt.

First thing the documentation tells us to do is to run
```bash
sudo apt update
sudo apt-cache madison kubeadm
```

This command does not install anything or modify the system. ``apt-cache
madison`` lists all available versions of a package (in this case kubeadm) from
your configured repositories. I only see versions 1.33.x. To fix this I needed
to update my ``/etc/apt/sources.list.d/kubernetes.list`` to point at the
correct minor version. So change ``1.33`` to ``1.34``, easy peasy. Running the
same command again shows me all the 1.34.x versions. I'm going to to do this on
all my nodes. For more information see the documentation [Changing the
Kubernetes package repository](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/change-package-repository/).

The version I will be updating to is the latest of the 1.34, which is ``1.34.4-1.1``.

## Upgrading the control plane nodes
We start by upgrading the control plane node. First we update kubeadm, installing the wanted version.
```bash
sudo apt-mark unhold kubeadm && \
sudo apt-get update && sudo apt-get install -y kubeadm='1.34.4-1.1' && \
sudo apt-mark hold kubeadm
```

The reason for the ``apt-mark unhold`` and ``apt-mark hold`` is to tell the
package manager to stay at this version. If we didn't do this, it would try to
upgrade kubeadm then next time we run ``sudo apt upgrade``. This can be done
for any application installed with apt.

Confirming with ``kubeadm version`` shows the upgrade was a success.
```
$ kubeadm version
kubeadm version: &version.Info{Major:"1", Minor:"34", EmulationMajor:"", EmulationMinor:"", MinCompatibilityMajor:"", MinCompatibilityMinor:"", GitVersion:"v1.34.4", GitCommit:"14507e2fb33b11d2712ccbaed0bc282c27a4a04a", GitTreeState:"clean", BuildDate:"2026-02-10T12:55:46Z", GoVersion:"go1.24.12", Compiler:"gc", Platform:"linux/amd64"}
```

Next up is running ``sudo kubeadm upgrade plan`` to take a look at what will be
upgraded and to what versions in the cluster. This command does not actually
upgrade anything. Only checks if that the cluster can be upgraded.

```
_____________________________________________________________________

Components
COMPONENT                 NODE      CURRENT    TARGET
kube-apiserver            lenovo1   v1.33.7    v1.34.4
kube-controller-manager   lenovo1   v1.33.7    v1.34.4
kube-scheduler            lenovo1   v1.33.7    v1.34.4
kube-proxy                          1.33.7     v1.34.4
CoreDNS                             v1.12.0    v1.12.1
etcd                      lenovo1   3.5.21-0   3.6.5-0

You can now apply the upgrade by executing the following command:

Components that must be upgraded manually after you have upgraded the control plane with 'kubeadm upgrade apply':
COMPONENT   NODE      CURRENT   TARGET
kubelet     lenovo1   v1.33.2   v1.34.4
kubelet     lenovo2   v1.33.2   v1.34.4
kubelet     pi5       v1.33.2   v1.34.4

Upgrade to the latest stable version:

COMPONENT                 NODE      CURRENT    TARGET
kube-apiserver            lenovo1   v1.33.7    v1.34.4
kube-controller-manager   lenovo1   v1.33.7    v1.34.4
kube-scheduler            lenovo1   v1.33.7    v1.34.4
kube-proxy                          1.33.7     v1.34.4
CoreDNS                             v1.12.0    v1.12.1
etcd                      lenovo1   3.5.21-0   3.6.5-0

You can now apply the upgrade by executing the following command:

        kubeadm upgrade apply v1.34.4

_____________________________________________________________________
```

Looking at this we can notice that not everything will be upgraded
automatically. The kubelets on each node must be upgraded manually. This is
because kubelet isn't running in a pod in the cluster like all the other parts
from the list. So just like we upgraded kubeadm (or installed the new version),
the same must be done for kubelet (and kubectl).

A few minutes after running ``kubeadm upgrade apply `` we get the message:
```bash
[upgrade] SUCCESS! A control plane node of your cluster was upgraded to "v1.34.4".
```

If we now run ``k get nodes`` again to verify, we interestingly don't see the
updated version. This is because it is the kubelet that is responsible for
dealing with the API. And the kubelet is still the old version.

Let's upgrade kubelet and kubectl. Before doing this we should drain the node
first to not affect anything running on the node. Draining the node means we
disable scheduling on the node and evict all pods. As long as pods aren't
created directly with ``kubectl run/create ...`` they will be moved to another
node.

Or to be more precise: If a pod is for example managed by a deployment, the
replicaSet will be one less, i.e. 2/3, then the scheduler will create a new one
on another node.

```bash
kubectl drain <node> --ignore-daemonsets
```

Then upgrade the kubelet and kubectl
```bash
sudo apt-mark unhold kubelet kubectl && \
sudo apt-get update && sudo apt-get install -y kubelet='1.34.4-1.1' kubectl='1.34.4-1.1' && \
sudo apt-mark hold kubelet kubectl
```

Then we can restart the kubelet process
```bash
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

And finally uncordon the node, which means enabling scheduling on the node.
```bash
kubectl uncordon <node>
```

And that was it. Now over to the worker nodes. We need to do everything again
on them. One at the time.

## Upgrading the worker nodes
Current status:
```bash
$ k get nodes
NAME      STATUS                     ROLES           AGE   VERSION
lenovo1   Ready                      control-plane   58d   v1.34.4
lenovo2   Ready,SchedulingDisabled   <none>          58d   v1.33.2
pi5       Ready                      <none>          58d   v1.33.2
```

1. Upgrade kubeadm
```bash
sudo apt-mark unhold kubeadm && \
sudo apt-get update && sudo apt-get install -y kubeadm='1.34.4-1.1' && \
sudo apt-mark hold kubeadm
```
2. Upgrade the kubelet configuration 
```bash
sudo kubeadm upgrade node
```

3. Drain the node. (This is done from the control plane node)
```bash
kubectl drain <node> --ignore-daemonsets
```

I got error since some pods use local storage. How ever in this case it is just
for caching, so it is safe to delete.
```bash
kubectl drain <node> --ignore-daemonsets --delete-emptydir-data
```

4. Upgrade kubelet and kubectl
```bash
sudo apt-mark unhold kubelet kubectl && \
sudo apt-get update && sudo apt-get install -y kubelet='1.34.4-1.1' kubectl='1.34.4-1.1' && \
sudo apt-mark hold kubelet kubectl
```

5. Restart the kubelet
```bash
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

6. Uncordon the node. (This must be done from the control plane node)
```bash
kubectl uncordon <node>
```

And that is is. After doing the same thing on my other worker node as well,
this is the current status:
```bash
$ k get nodes
NAME      STATUS   ROLES           AGE   VERSION
lenovo1   Ready    control-plane   58d   v1.34.4
lenovo2   Ready    <none>          58d   v1.34.4
pi5       Ready    <none>          58d   v1.34.4
```

## Conclusion
Upgrading a Kubernetes cluster administrated by kubeadm is fast and easy (at
least when you have next to nothing running in your cluster..). Next thing we
should do is confirming that everything is running as it should in the cluster
after the update.

This was a great experience for me. The Kubernetes documentation was very clear
and easy to use and follow. And after doing this once I felt I got a better
overview and understanding of the whole upgrading process. I am now ready to do
it all again going from 1.34 to 1.35, following my own notes.

