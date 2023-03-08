---
title: "Deploying Node.Js app to AWS"
date: "2023-03-07"
summary: "Creating a Node.Js Application to AWS using EC2, PM2, NGINX, Load Balancers, and etc."
---

### Create instance in EC2

```js
chmod 400 "your-key.pem"

ssh -i /path/my-key-pair.pem my-instance-user-name@my-instance-public-dns-name

ssh -i "you-key.pem" ubuntu@ec2-xx-xx-xxx xx.region.compute.amazonaws.com
```

### Installing Node/NPM

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

### Cloning your project from Github

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

### Installing all the dependencies

Go to your folder containing package.json and run

```
npm install
```

### Setting up PM2 Process Manager

**Why use Pm2?**

> PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

Refer more: https://pm2.keymetrics.io/

```
# Install PM2 using NPM
sudo npm i pm2 -g
```

### Setting up NGINX

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
server_name yourdomain.com www.yourdomain.com; #your api domain
location / {
        proxy_pass http://localhost:8000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```

Explanation of the above Code Snippet
In the default NGINX configuration, Nginx listens on port 80 as indicated by the line listen 80 of the server block.

proxy_pass forwards all requests to the given proxy URL. Here the proxy URL is http://localhost:8000.
proxy_http_version sets the HTTP protocol for proxying. By default, version 1.0 is used. For WebSockets and keepalive connections you need to use the version 1.1.
proxy_set_header Upgrade $http_upgrade and proxy_set_header Connection 'upgrade' header fields are required to switch the connection to an enhanced protocol if available.
proxy_set_header Host $host is used to set the host to $proxy_host.
proxy_cache_bypass $http_upgrade we include this directive to not send cached responses to clients.
Refer to link for more detailed info on the Nginx proxy module: http://nginx.org/en/docs/http/ngx_http_proxy_module.html

NGINX Section References: https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896#8-install-nginx-and-configure

After adding the above code snippet, check NGINX config for errors and restart Nginx.

```
# Run this to check NGINX config
sudo nginx -t
# Output
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
# Restart NGINX service
sudo service nginx restart
```

check NGINX status,

```
sudo systemctl status nginx
# If you get this output then success!
● nginx.service - A high performance web server and a reverse proxy server
Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
Active: active (running) since DAY YYYY-MM-DD HH:M:SS UTC; X days ago
Docs: man:nginx(8)
Main PID: xxxx (nginx)
Tasks: 2 (limit: 1160)
Memory: X M
CGroup: /system.slice/nginx.service
├─ xxxx nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
└─xxxx nginx: worker process
```

Now, You will be able to view your app on Instance’s Public IP with no port (port 80) EC2 Instance's Public IP Address eg: 231.112.123.12

### Setting up Custom Domain / LoadBalancer

Step 1. Issue an SSL Certificate (Certificate Manager)

```
*.example.com
api.example.com
```

Step 2. Create Load Balancer

Choose “Application Load Balancer”

1. Name: Give the load balancer a name
2. Scheme: Internet Facing
3. IP Address Type: IPv4
4. VPC: Default
5. Mappings: Select two Availability Zones
6. Security Groups: Select the configured security group from above
7. Listeners and routers: Add Two listeners, one for HTTP (port 80) and one for HTTPS (port 443)
8. Secure listener settings: Select the certificate that we recently created from the certificate manager. You can only select it after it has been issued.

Step 3. Before saving, you need to create a Traget Group

1. Basic Configuration: Select “instances”
2. Name: Give the target group a name
3. Protocol: HTTP
4. Port: 8080
5. Click “Next”

Step 4. Add a Record to the Load Balancer in Route 53

1. Record Name: default
2. Record Type: A
3. Alias: Select “Alias” — After clicking alias you should see an option that says “Route Traffic to”
4. Route Traffic To: Choose “Alias to Application and Classic Load Balancer”
5. Choose Region: Choose which region your load balancer is in.
6. Choose a load balancer: Select the LB that you recently created.
7. Create the Record

Step 5. Add rules to load balancers

Https: 443 and Http: 80

### Adding SSL for HTTPS
