- How to create a Auto-Scaling-group in AWS

1. Create an EC-2 instance.
2. Install node or whatever tool you wanna use.
3. Create an AMI with your image.
4. Create a security group.
5. Create a Launch template.
   // Launch template

```bash
#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.0.0/bin/
echo "hi there before"
echo "hi there after"
npm install -g pm2
cd /home/ubuntu/week-22
pm2 start index.js
pm2 save
pm2 startup
```

6. Create the ASG group.
7. Create the load balancer that you want to attach to.

- Add an HTTPS Listener from your domain, request a certificate from ACM.

8.  Target group - Attach the target group to the ASG.

                            OR

    Just create using the elastic beanstalk if you don't want to do all this stuff.
