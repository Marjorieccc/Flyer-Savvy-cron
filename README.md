<a name="readme-top"></a>

<div align="center">
  
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

</div>


<div align="center">

  <h3 align="center">Flyer Savvy cron</h3>

  <p align="center">
    A automated weekly scheduler to fetch and store the latest flyer details
    <br />
    ·
    <a href="https://github.com/Marjorieccc/Flyer-Savvy-cron/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Marjorieccc/Flyer-Savvy-cron/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



## About The Project

<a href="https://github.com/Marjorieccc/Flyer-Savvy">Flyer-Savvy</a> is a web application aggregates grocery flyers from No Frills that enables users accessing up-to-date deals and product information.

Ths project is the cron job  of Flyer Savvy to periodically fetch the latest flyer data, extract relevant product information, and update a MySQL database using Drizzle ORM. Flyer Savvy Cron is structured to ensure robust error handling and efficient data processing, making it a reliable tool for managing and tracking promotional data over time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

| Framework / Library   | Purpose |
| -------- | ------- |
| [![Node.js][Node.js]][Node-url]  | Backend runtime environment   |
| [![Express.js][Express.js]][Express-url]  | Node.js web application framework   |
| [![MySQL][MySQL]][MySQL-url]| Store flyer details   |
| [![Drizzle][Drizzle]][Drizzle-url]  | ODM for MySQL and Node.js    |
| [![Docker][Docker]][Docker-url]  | Containerization platform   |
| [![Firebase][Firebase]][Firebase-url]  | Application hosting platform  |

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
### Getting Started 

To get a local copy of this project up and running, follow these steps:

1. **Clone the Repository**
   ```
   git clone https://github.com/Marjorieccc/Flyer-Savvy-cron.git
   ```

2. **Install Dependencies**

   Navigate to the project directory:
   ```
   cd Flyer-Savvy-cron
   ```
   
   Install dependencies:
   ```
   npm install
   ```

3. **Set up MongoDB**

   This project uses MySQL for data storage. For a local setup, [install](https://dev.mysql.com/downloads/installer/) and starts a [MySQL client](https://www.mysql.com/products/workbench/).


4. **Set up Environment Variables**
   
   Create a `.env` file in the root directory and add the following environment variables, This project uses Cloudinary for image hosting which we also store relevant data in `.env` file
   ```
    DATABASE_URL=your-mysql-database-url
    DB_HOST=your-mysql-database-host
    DB_USER=your-mysql-database-user
    DB_PASSWORD=your-mysql-database-password
    DB_NAME=your-mysql-database-name
    CLOUDINARY_URL=your-cloudinary-url
    CLOUDINARY_CLOUD=your-cloudinary-cloud-name
    CLOUDINARY_KEY=your-cloudinary-key
    CLOUDINARY_SECRET=your-cloudinary-secret
   ```

   Create a `drizzle.config.ts` file in the root directory and add the following environment variables:
   ```
    import { defineConfig } from 'drizzle-kit'
    export default defineConfig({
        dialect: 'mysql',
        schema: './src/drizzle/schema', // or other locations you wish to put schema files for 
        out: './src/drizzle/migrations', // or other locations you wish to put sql script files for
        dbCredentials:{
            url: process.env.DATABASE_URL as string
        },
        verbose:true,  // which can tell us what will be changes
        strict: true   // which need confirmation before changes apply to database schema
      })
   ```

5. **Start the Application**

   Navigate back to the root directory:
   ```
   cd ..
   ```
   
   Start the application:
   ```
   npm start
   ```

   The application should now be running locally.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- WORKFLOW DOCUMENTATION -->
### Workflow

For detailed workflows and an in-depth explanation of file interactions, please refer to the documentation [here][workflow-url].

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [here][license-url] for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

* Dan WONG - [Email](mailto:wdwong13@gmail.com)  |  [Github](https://github.com/Dan-Wong56004)  |  [Linkedin](https://www.linkedin.com/in/danwongwt/)
* Marjorie CHEUNG  - [Email](mailto:marjorie.cc.cheung@gmail.com)  |  [Github](https://github.com/Marjorieccc)  |  [Linkedin](https://www.linkedin.com/in/marjoriecheung/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [GitHub Pages](https://pages.github.com)
* [Img Shields](https://shields.io)




<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/Marjorieccc/Flyer-Savvy-cron.svg?style=for-the-badge
[contributors-url]: https://github.com/Marjorieccc/Flyer-Savvy-cron/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Marjorieccc/Flyer-Savvy-cron.svg?style=for-the-badge
[forks-url]: https://github.com/Marjorieccc/Flyer-Savvy-cron/fork
[issues-shield]: https://img.shields.io/github/issues/Marjorieccc/Flyer-Savvy-cron.svg?style=for-the-badge
[issues-url]: https://github.com/Marjorieccc/Flyer-Savvy-cron/issues
[license-shield]: https://img.shields.io/github/license/Marjorieccc/Flyer-Savvy-cron?style=for-the-badge
[license-url]: https://github.com/Marjorieccc/Flyer-Savvy-cron/blob/main/LICENSE
[workflow-url]: https://github.com/Marjorieccc/Flyer-Savvy-cron/blob/main/workflow.md
[Drizzle]:https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black
[Drizzle-url]: https://orm.drizzle.team/
[Docker]:https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]:https://www.docker.com/
[Express.js]:https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]:https://expressjs.com/
[Firebase]:https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[MySQL]:https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]:https://www.mysql.com/
[Node.js]:https://img.shields.io/badge/node.js-99CC7D?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]:https://nodejs.org/en

