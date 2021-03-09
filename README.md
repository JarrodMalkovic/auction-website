<h1 align="center">A Full Stack Auction Website</h1>

![Tech logos](https://i.ibb.co/f4Qc3Fj/tech-info-auction-website.png)

## 📝 Table of contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Technologies](#-technologies)
- [About this Project](#-about-this-project)
- [Local Development](#-local-development)
- [License](#-license)

## ✨ Features

- Real-time bidding on auction listings between users using Socket.IO
- Server Side Rendering using React and Next.js
- Styled frontend using Tailwind CSS with Emotion Styled Components
- Automated testing suites for each microservice
- Handles payments using the Stripe API
- Shares common code among services using a custom [npm package](./src/common)


## 🏛️ Architecture 

### Diagram

<p align="center">
  <img src="https://i.ibb.co/X8sbvVt/auction-website-diagram.png" />
</p>

### Overview of services

| Service                             | Technologies               | Description             |
| ----------------------------------- | -------------------------- | ----------------------- |
| [Auth](./src/services/auth)         | TypeScript, MySQL          | Handles user regristration, logging in, signing out and resetting users passwords  |
| [Bids](./src/services/bid)          | TypeScript, MySQL          | Handles users placing bids on auction listings and allows for real-time bidding using Socket.io |
| [Email](./src/services/email)       | TypeScript                 | Allows other services to send emails to users by publishing EmailCreated events |
| [Expiration](./src/services/bid)    | TypeScript, Redis          | Expires auction listings once they have ran out of time remaining on the listing |
| [Frontend](./src/services/frontend) | TypeScript, React, Next.js | Handles serving the website to the user utilizing Server Side Rendering using React with Next.js |
| [Listings](./src/services/listings) | TypeScript, MySQL          | Allows users to create and delete auction listings |
| [Payments](./src/services/payments) | TypeScript, MySQL          | Allows users to pay for auction listings they have won   |
| [Profile](./src/services/profile)   | TypeScript, MySQL          | Allows users to get a users profile or update their own |

## 📸 Screenshots

![desktop-dashboard-page](https://i.ibb.co/m90KLbV/auction-website-dashboard-screenshot.png)
![desktop-settings-page](https://i.ibb.co/rvbxNw9/auction-website-profile-settings-screenshot.png)

## 💻 Technologies

### Back-end
- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MySQL](https://www.mysql.com/) -  An open-source relational database management system
- [Sequelize](https://sequelize.org/) - A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [Cloudinary](https://cloudinary.com/) - For image uploading and manipulation
- [Docker](https://www.docker.com/) - A platform for developing, shippinh and running applications
- [Kubernetes](https://kubernetes.io/) -  An open-source system for automating deployment, scaling, and management of containerized applications
- [Ingress NGINX](https://kubernetes.github.io/ingress-nginx/) - NGINX Ingress Controller for Kubernetes
- [Skaffold](https://skaffold.dev/) - Handles the workflow for building, pushing and deploying applications
- [Stripe](https://stripe.com/) - Online payment processing for internet businesses
- [Jest](https://jestjs.io/) - A JavaScript testing framework

### Front-end
- [ReactJS](https://reactjs.org/) - Frontend framework
- [Next.js](https://nextjs.org/) - React framework that enables server-side rendering
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Emotion](https://emotion.sh/) - CSS-in-JS library designed for high performance style composition
- [Formik](https://formik.org/) - React framework for building forms
- [Yup](https://github.com/jquense/yup) - A form validation library

## 📙 About this Project

This project is a rewrite of a previous monolithic auction website I wrote. The repository for my monolithic auction website can be found [here.](https://github.com/jarrodmalkovic/auction-website-monolith) The purpose of this rewrite was to gain experience utilizing a microservices architecture after completing [Stephen Griders course on Microservices](https://www.udemy.com/course/microservices-with-node-js-and-react/).

## 🚀 Local Development


### Clone the respository locally

```bash
git clone https://github.com/jarrodmalkovic/auction-website.git
```

### Install ingress-nginx

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
```

### Create the required kubernetes secrets

- Create the JWT_KEY secret

```bash
kubectl create secret generic jwt-key-secret --from-literal=JWT_KEY=<Your Secret Here>
```

- Create the MYSQL_ROOT_PASSWORD secret

```bash
kubectl create secret generic mysql-root-password-secret --from-literal=MYSQL_ROOT_PASSWORD=<Your Secret Here>
```

- Create the EMAIL secret

```bash
kubectl create secret generic email-secret --from-literal=EMAIL=<Your Secret Here>
```

- Create the EMAIL_PASSWORD secret

```bash
kubectl create secret generic email-password-secret --from-literal=EMAIL_PASSWORD=<Your Secret Here>
```

- Create the STRIPE_KEY secret

```bash
kubectl create secret generic stripe-key-secret --from-literal=STRIPE_KEY=<Your Secret Here>
```

- Create the CLOUDINARY_API_KEY secret

```bash
kubectl create secret generic cloudinary-api-key-secret --from-literal=CLOUDINARY_API_KEY=<Your Secret Here>
```

- Create the CLOUDINARY_CLOUD_NAME secret

```bash
kubectl create secret generic cloudinary-cloud-name-secret --from-literal=CLOUDINARY_CLOUD_NAME=<Your Secret Here>
```

- Create the CLOUDINARY_API_SECRET secret

```bash
kubectl create secret generic cloudinary-api-secret-secret --from-literal=CLOUDINARY_API_SECRET=<Your Secret Here>
```

### Start skaffold

```basb
skaffold dev
```

## ⚖️ License

This project is licensed under the Unlicense License

<hr>

<h3>
  <a href="https://github.com/jarrodmalkovic/auction-website/issues">Report Bug</a> |
  <a href="https://github.com/jarrodmalkovic/auction-website/issues">Request Feature</a> 
</h3>
