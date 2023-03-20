---
title: "Deploying Node.Js app to AWS"
subtitle: "deploying-nodejs-to-aws"
date: "2023-03-07"
summary: "Creating a Node.Js Application to AWS using EC2, PM2, NGINX, Load Balancers, and etc."
tags: ["AWS", "PM2", "NGINX", "Node.Js"]
---

## Create instance in EC2

**Access EC2 Instance from Mac Terminal**

1.  chmod 400 "your-key.pem" - change permission of _your-key_ to readonly
2.  ssh -i "you-key.pem" ubuntu@ec2-xx-xx-xxx xx.region.compute.amazonaws.com - Navigate to _your-key_ and

## Installing Node/NPM

When you first open up Ubuntu server on EC2, you need to install dependencies and packages that allow you to run needed

1.  `sudo apt update` - this command will update installed packages in Ubuntu
2.  `sudo apt upgrade` - this command will upgrade installed packages in Ubuntu
3.  `sudo apt install -y curl` - this command will install curl
4.  `curl  -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -` - this command will curl node version 16
5.  `sudo apt install -y nodejs` - this command will install node version 16 (curled)

At this point, you should be all set.
Just to be certain, you can run node to figure out what version you’re currently running:

7. `node  --version` - this will output **v16.x.x**

## Cloning your project from Github

Now with packages and dependcies installed, you are ready to clone your Node.js project from GitHub directly to your Ubuntu server.

Here are the steps.

1. You ened to Generate a new SSH key.

- `ssh-keygen -t rsa -b 4096 -C "email@gmail.com`
  use your email that is linked with GitHub Account

2. Adding your SSH key to ssh-agent

- `eval "$(ssh-agent -s)"`
- `ssh-add ~/.ssh/id_rsa`

3. Add your key to GitHub

- `cat ~/.ssh/id_rsa.pub` - copy your key
- go to Github.com
- Settings -> Account Settings -> SSH and GPG Keys -> new SSH Key
- paste your key

4. You can store your git configuration to prevent the system from asking passphrase everytime

- `git config --global credential.helper store`

## Installing dependencies from Node.js Proejct

1.  Go to your folder containing package.json and run - `npm install`

## Setting up PM2 Process Manager

**Why use Pm2?**

> PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

_Refer more: https://pm2.keymetrics.io/_

**Install PM2 using NPM**

`sudo npm i pm2 -g`

## Setting up NGINX

Based on the assumption that we are using this EC2 instance just for one particular Node.js/MERN app and not having multiple different Node.js/MERN apps.

We will be editing the “default config” if you want to deploy multiple apps on a single instance. I will follow up with a post and update a link to it.

Nginx is a high-performance web server and a reverse proxy server.

A web server is a software that serves web content through the HTTP protocol. Content can be static or dynamic.

A reverse proxy is a service that takes a client request, sends the request to one or more proxied servers, fetches the response, and delivers the server’s response to the client.

1. `sudo apt install nginx`

Now, we need to change the default configuration.

2. `cd /etc/nginx/sites-available/` Navigate to this route then run `sudo vim default`

3. We need to modify the below section,

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

**Explanation of the above Code Snippet**

In the default NGINX configuration, Nginx listens on port 80 as indicated by the line listen 80 of the server block.

**proxy_pass** forwards all requests to the given proxy URL. Here the proxy URL is http://localhost:8000.

**proxy_http_version** sets the HTTP protocol for proxying. By default, version 1.0 is used. For WebSockets and keepalive connections you need to use the version 1.1.

**proxy_set_header Upgrade $http_upgrade** and **proxy_set_header Connection 'upgrade'** header fields are required to switch the connection to an enhanced protocol if available.

**proxy_set_header Host $host** is used to set the host to $proxy_host.

**proxy_cache_bypass $http_upgrade** we include this directive to not send cached responses to clients.

_Refer to link for more detailed info on the Nginx proxy module: http://nginx.org/en/docs/http/ngx_http_proxy_module.html_

_NGINX Section References: https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896#8-install-nginx-and-configure_

After adding the above code snippet, check NGINX config for errors and restart Nginx.

4. Run this to check NGINX config - `sudo nginx -t`

- Output

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok

nginx: configuration file /etc/nginx/nginx.conf test is
successful
```

5. Restart NGINX service- `sudo service nginx restart`

6. check NGINX status - `sudo systemctl status nginx`

7. If you get this output then success!

```
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

1. Issue an SSL Certificate (Certificate Manager)

```
*.example.com
api.example.com
```

2. Create Load Balancer

- Choose “Application Load Balancer”
- Name: Give the load balancer a name
- Scheme: Internet Facing
- IP Address Type: IPv4
- VPC: Default
- Mappings: Select two Availability Zones
- Security Groups: Select the configured security group from above
- Listeners and routers: Add Two listeners, one for HTTP (port 80) and one for HTTPS (port 443)
- Secure listener settings: Select the certificate that we recently created from the certificate manager. You can only select it after it has been issued.

3. Before saving, you need to create a Traget Group

- Basic Configuration: Select “instances”
- Name: Give the target group a name
- Protocol: HTTP
- Port: 8080
- Click “Next”

4.  Add a Record to the Load Balancer in Route 53

- Record Name: default
- Record Type: A
- Alias: Select “Alias” — After clicking alias you should see an option that says “Route Traffic to”
- Route Traffic To: Choose “Alias to Application and Classic Load Balancer”
- Choose Region: Choose which region your load balancer is in.
- Choose a load balancer: Select the LB that you recently created.
- Create the Record

4. Add rules to load balancers

- Https: 443 and Http: 80
