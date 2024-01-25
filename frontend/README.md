# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the  mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run prod`
It runs the Production build at default port 3000.

# Nginx use to manupulate same ip with 2 domains ( main and api).
### few use full commands
- sudo nginx -t (test nginx server)
- sudo systemctl restart nginx  ( restart nginx server)
- sudo cat /var/log/nginx/error.log ( to check nginx server logs)

### config files

- sudo nano /etc/nginx/conf.d/domain.com.conf
- sudo nano /etc/nginx/conf.d/api.domain.com.conf
- sudo nano /etc/nginx/nginx.conf