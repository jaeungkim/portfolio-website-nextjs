---
title: "Deploying Node.Js app to AWS"
date: "2023-03-07"
summary: "Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life. In JavaScript, an object is a standalone entity, with properties and type. Compare it with a cup, for example. A cup is an object, with properties."
---

# Create instance in EC2

```js
chmod 400 "your-key.pem"

ssh -i /path/my-key-pair.pem my-instance-user-name@my-instance-public-dns-name

ssh -i "you-key.pem" ubuntu@ec2-xx-xx-xxx xx.region.compute.amazonaws.com
```

# Installing Node/NPM

```js

STEPS

sudo apt update
sudo apt upgrade

sudo apt install -y curl

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

sudo apt install -y nodejs
```

At this point, you should be all set. Just to be certain, you can run node to figure out what version you’re currently running:

```js
$ node --version
v16.1.0
```

should return something like this

# Cloning your project from Github

need to connect through ssh

Step 1. Generate a new SSH Key

```
ssh-keygen -t rsa -b 4096 -C "email@gmail.com
```

use your email that is linked with GitHub Account

Step 2. Adding your SSH key to ssh-agent

```
eval "$(ssh-agent -s)"
```

```
ssh-add ~/.ssh/id_rsa
```

Step 3. Add your key to GitHub

```
cat ~/.ssh/id_rsa.pub
```

Step 4. Store configuration

```
git config --global credential.helper store
```

Github
Settings -> Accoutn Settings -> SSH and GPG Keys -> new SSH Key

# Installing all the dependencies

Go to your folder containing package.json and run
```
npm install
```
# Setting up PM2 Process Manager

**Why use Pm2?**

> PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

Refer more: https://pm2.keymetrics.io/

```
# Install PM2 using NPM
sudo npm i pm2 -g
```

# Setting up NGINX

Based on the assumption that we are using this EC2 instance just for one particular Node.js/MERN app and not having multiple different Node.js/MERN apps.

We will be editing the “default config” if you want to deploy multiple apps on a single instance. I will follow up with a post and update a link to it.

Nginx is a high-performance web server and a reverse proxy server.

A web server is a software that serves web content through the HTTP protocol. Content can be static or dynamic.

A reverse proxy is a service that takes a client request, sends the request to one or more proxied servers, fetches the response, and delivers the server’s response to the client.

Load Balancing
Backend Routing
Caching

Installation

```
sudo apt install nginx
```

Now, we need to change the default configuration.

```
cd /etc/nginx/sites-available/
sudo vim default
```

We need to modify the below section,

```
server_name _;
location / {
  # First attempt to serve request as file, then
  # as directory, then fall back to displaying a 404.
  try_files $uri $uri/ =404;
 }
```

Add the following snippet replacing the section in the default config
```
server_name yourdomain.com www.yourdomain.com;
location / {
        proxy_pass http://localhost:8000; # App's port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
# Setting up Custom Domain

# Adding SSL for HTTPS
