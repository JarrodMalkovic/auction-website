<h1 align="center">A Full Stack auction website created using microservices</h1>

<h3 align="center">
  <a href="https://github.com/jarrodmalkovic/auction-website/issues">Report Bug</a> |
  <a href="https://github.com/jarrodmalkovic/auction-website/issues">Request Feature</a> 
</h3>

![Tech logos](https://i.ibb.co/f4Qc3Fj/tech-info-auction-website.png)

## 📝 Table of contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Local Development](#-local-development)
- [Technologies](#-technologies)
- [License](#-license)

## ✨ Features

- Real-time bidding on auction listings between users using Socket.IO
- Server Side Rendering on the front end using React and Next.js
- Automated testing suites for each microservice


## 🏛️ Architecture 

### Diagram

<p align="center">
  <img src="https://i.ibb.co/Jnw6XfL/Microservice-Architecture.png" />
</p>

### Overview of services

| Service                             | Technologies               | Description             |
| ----------------------------------- | -------------------------- | ----------------------- |
| [Auth](./src/services/auth)         | TypeScript, MySQL          | Description coming soon |
| [Bids](./src/services/bid)          | TypeScript, MySQL          | Description coming soon |
| [Email](./src/services/email)       | TypeScript                 | Description coming soon |
| [Expiration](./src/services/bid)    | TypeScript, Redis          | Description coming soon |
| [Frontend](./src/services/frontend) | TypeScript, React, Next.js | Description coming soon |
| [Listings](./src/services/listings) | TypeScript, MySQL          | Description coming soon |
| [Payments](./src/services/payments) | TypeScript, MySQL          | Description coming soon |
| [Profile](./src/services/profile)   | TypeScript, MySQL          | Description coming soon |

## 📸 Screenshots

<table>
  <tr>
    <td>Browse Listings Page</td>
     <td>Listing Page</td>
  </tr>
  <tr>
    <td valign="top"><img src="https://i.ibb.co/WD3ncrf/auction-website-browse-listings-screenshot.png"/></td>
    <td  valign="top"><img src="https://i.ibb.co/MV8b6wv/auction-website-listing-page-screenshot.png"/></td>
  </tr>
   <tr>
    <td>Dashboard Page</td>
    <td>Settings Page</td>
  </tr>
  <tr>
    <td valign="top"><img src="https://i.ibb.co/m90KLbV/auction-website-dashboard-screenshot.png"/></td>
    <td  valign="top"><img src="https://i.ibb.co/rvbxNw9/auction-website-profile-settings-screenshot.png"/></td>
  </tr>
 </table>

## 🚀 Local Development


### Clone the respository locally

```bash
git clone https://github.com/jarrodmalkovic/auction-website.git
```

## 💻 Technologies

Project is created with:

- TypeScript, MySQL, Node.js, Express.js, Docker, Kubernetes, Ingress Nginx, Skaffold, Next.js, React, Tailwind CSS, Styled Components, Jest, Stripe, 

## ⚖️ License

This project is licensed under the Unlicense License


<hr>

<h3>
  <a href="https://github.com/jarrodmalkovic/auction-website/issues">Report Bug</a> |
  <a href="https://github.com/jarrodmalkovic/auction-website/issues">Request Feature</a> 
</h3>
