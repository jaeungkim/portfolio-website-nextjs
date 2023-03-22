import { v4 as uuidv4 } from "uuid";

export const projectsData = [
  {
    id: 1,
    title: "WebGL Playground",
    url: "webgl-playground",
    category: "Web Application",
    img: "/images/webGL_project_main.png",
    ProjectHeader: {
      title: "WebGL Playground",
      publishDate: "July 26th, 2022",
      tags: "UI / Frontend",
    },
    ProjectImages: [
      {
        id: uuidv4(),
        title: "WebGL Playground_1",
        img: "/images/webGL_project_main.png",
      },
      {
        id: uuidv4(),
        title: "WebGL Playground_2",
        img: "/images/webGL_project_main.png",
      },
      {
        id: uuidv4(),
        title: "WebGL Playground_3",
        img: "/images/webGL_project_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: uuidv4(),
          title: "Name",
          details: "Personal Project",
        },
        {
          id: uuidv4(),
          title: "Services",
          details: "Web Development",
        },
        {
          id: uuidv4(),
          title: "Website",
          details: "https://jaeungkim.ca",
        },
        {
          id: uuidv4(),
          title: "Phone",
          details: "778-581-3502",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "Create a 3D model of a roomusing Blender, and use three.js to render it in a web browser. Explore different textures, materials, and lighting techniques to bring the room to life, and add interactivity through mouse controls to allow users to explore the room from different angles. Finally, optimize the model and code to ensure smooth performance and compatibility across different devices and browsers.",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Three.js",
            "Blender",
            "GSAP",
            "WebGL",
          ],
        },
      ],
      ProjectDetailsHeading: "Summary",
      ProjectDetails: [
        {
          id: uuidv4(),
          details:
            "This project is a web-based implementation of a 3D room model created in Blender, using React, GSAP, and Three.js. The goal of the project is to create a visually engaging and interactive experience for the user, allowing them to explore the room in a 3D environment.",
        },
        {
          id: uuidv4(),
          details:
            "Using Blender, I designed and modeled the room, incorporating realistic textures and lighting to achieve a high level of visual detail. The model was then exported into Three.js, a popular JavaScript library for 3D graphics on the web. The Three.js library was integrated with React, a JavaScript library for building user interfaces, to create a dynamic and interactive web application.",
        },
        {
          id: uuidv4(),
          details:
            "GSAP, a JavaScript animation library, was also used to add engaging animations and transitions to the user experience. These animations and transitions help to guide the user through the room and highlight important features and details.",
        },
        {
          id: uuidv4(),
          details:
            "Overall, this project showcases the power and versatility of web-based 3D graphics and the potential for creating immersive and engaging user experiences using modern web technologies.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "iClinic Systems",
    url: "iclinic-systems",
    category: "Web Application",
    img: "/images/iclinic_main.png",
    ProjectHeader: {
      title: "iClinic Systems",
      publishDate: "October 16th, 2022",
      tags: "Web Application",
    },
    ProjectImages: [
      {
        id: uuidv4(),
        title: "iClinic Systems",
        img: "/images/iclinic_main.png",
      },
      {
        id: uuidv4(),
        title: "iClinic Systems",
        img: "/images/iclinic_main.png",
      },
      {
        id: uuidv4(),
        title: "iClinic Systems",
        img: "/images/iclinic_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: uuidv4(),
          title: "Name",
          details: "iClinic Systems Inc.",
        },
        {
          id: uuidv4(),
          title: "Services",
          details: "Full Stack Development",
        },
        {
          id: uuidv4(),
          title: "Website",
          details: "https://aiclinic.ca",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "This project is to develop a full-stack web application using the MEAN stack that serves as a marketing website for an EMR startup company while also including a Human Resources Management tool to manage employee requests, such as vacation requests.",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: [
            "Angular",
            "JavaScript",
            "TypeScript",
            "TailwindCSS",
            "Node.Js",
            "MongoDB",
            "AWS",
          ],
        },
      ],
      ProjectDetailsHeading: "Summary",
      ProjectDetails: [
        {
          id: uuidv4(),
          details:
            "iClinic offers smart, innovative, and intuitively designed end-to-end eHealth solutions with shared patient records at the core, achieving the 'One Patient, One Record' concept. The company provides a network of clinicians and hospitals with multiple specialties in the treatment of complex diseased patients, facilitating healthcare providers with improved accuracy and efficiency leading to improved patient care and outcomes.",
        },
        {
          id: uuidv4(),
          details:
            "I built a full-stack web application using the MEAN stack, which served as a human resources management tool for an EMR start-up company. The tool facilitated employee management, including vacation requests, and also featured a marketing web app for the company's eHealth solutions. The project aimed to improve the company's internal HR processes and streamline employee requests, while also promoting their eHealth solutions to potential clients. Technologies used in the project include Angular, JavaScript, TypeScript, TailwindCSS, Node.Js, MongoDB, and AWS. The completed application provided the company with a more efficient and organized system for managing their workforce and enabled them to better showcase their eHealth solutions to potential clients.",
        },
        {
          id: uuidv4(),
          details:
            "As the sole developer on this project, I was responsible for a wide range of tasks, including designing the user interface, implementing complex microservices on AWS, handling dev ops, and maintaining the software.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Catalyx.io",
    url: "catalyx",
    category: "Web Application",
    img: "/images/catalyx_main.png",
    ProjectHeader: {
      title: "Catalyx.io",
      publishDate: "January 18, 2021",
      tags: "UI / Frontend",
    },
    ProjectImages: [
      {
        id: uuidv4(),
        title: "catalyx",
        img: "/images/catalyx_main.png",
      },
      {
        id: uuidv4(),
        title: "catalyx",
        img: "/images/catalyx_main.png",
      },
      {
        id: uuidv4(),
        title: "Catalyx",
        img: "/images/catalyx_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: uuidv4(),
          title: "Name",
          details: "Catalyx.io",
        },
        {
          id: uuidv4(),
          title: "Services",
          details: "UI Design & Frontend Development",
        },
        {
          id: uuidv4(),
          title: "Website",
          details: "https://catalyx.io",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "This project aimed to utilize my skills as a front-end developer at Catalyx, where I contributed to the development, optimization, and integration of multiple features and technologies, while ensuring high-quality code and user experience.",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: ["React", "JavaScript", "TypeScript", "Bootstrap", "Sketch"],
        },
      ],
      ProjectDetailsHeading: "Summary",
      ProjectDetails: [
        {
          id: uuidv4(),
          details:
            "During my time at Catalyx, I served as a front-end developer and worked on a variety of tasks that helped improve the company's web applications. One of my responsibilities was identifying and fixing software defects in React single-page apps. I ensured that the code quality was high and that the user experience was seamless. This involved collaborating with the development team and constantly testing the application to identify and address any issues before they impacted the user experience.",
        },
        {
          id: uuidv4(),
          details:
            "Another task I worked on was assisting with the migration of the company's legacy REST API to GraphQL with Apollo. This allowed for a more efficient and reliable backend connection, resulting in improved app performance. I also refactored and optimized the frontend codebase to increase website performance by 70% while adhering to SEO principles. This involved reducing page load times, minimizing server requests, and ensuring that the site was easily crawlable by search engines.",
        },
        {
          id: uuidv4(),
          details:
            "Additionally, I was responsible for integrating custom global components and frontend libraries to support the development of future company products. I also developed comprehensive unit tests using JEST and React Testing Library to ensure the reliability of the frontend codebase. This included identifying and fixing any issues with the code and ensuring that it worked as intended.",
        },
        {
          id: uuidv4(),
          details:
            "Another key task I worked on was implementing a serverless architecture using AWS Lambda Edge to dynamically inject headers for Facebook's open graph. This enabled the company's web applications to display rich media when shared on social media platforms. I also integrated multiple third-party systems, including Mobilum, which allowed customers to use credit cards to purchase cryptocurrencies.",
        },
        {
          id: uuidv4(),
          details:
            "Throughout this project, I worked closely with UI/UX teams to produce visually stunning web applications that were seamless and intuitive. I also practiced Agile/Scrum methodologies, delivering high-quality software that met business needs and exceeded user expectations. Overall, my work at Catalyx helped improve the performance, reliability, and user experience of the company's web applications.",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Architecture Portfolio",
    url: "suh-architecture",
    category: "UI/UX Design",
    img: "/images/namju_portfolio_main.png",
    ProjectHeader: {
      title: "Namju Suh",
      publishDate: "Jul 26, 2021",
      tags: "UI / Frontend",
    },
    ProjectImages: [
      {
        id: uuidv4(),
        title: "Namju Suh",
        img: "/images/namju_portfolio_main.png",
      },
      {
        id: uuidv4(),
        title: "Namju Suh",
        img: "/images/namju_portfolio_main.png",
      },
      {
        id: uuidv4(),
        title: "Namju Suh",
        img: "/images/namju_portfolio_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: uuidv4(),
          title: "Name",
          details: "Nam Ju Suh",
        },
        {
          id: uuidv4(),
          title: "Services",
          details: "UI Design & Frontend Development",
        },
        {
          id: uuidv4(),
          title: "Website",
          details: "https://www.suhnamju.com/",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "As the creator of the architecture portfolio website for my friend, my objective was to provide a platform for my friend to showcase their work and skills to potential clients or employers. I aimed to design a visually appealing and user-friendly website that highlights my friend's portfolio, experience, and achievements in the field of architecture. ",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: [
            "React",
            "Next",
            "JavaScript",
            "TypeScript",
            "TailwindCSS",
            "Dribble",
          ],
        },
      ],
      ProjectDetailsHeading: "Summary",
      ProjectDetails: [
        {
          id: uuidv4(),
          details:
            "Creating the architecture portfolio website for my friend was an exciting project that allowed me to showcase my expertise in web development and project management. Utilizing my knowledge of React, Next.js, and Tailwind, I was able to deliver a visually appealing and user-friendly platform that met the client's requirements for an 'artsy' look.",
        },
        {
          id: uuidv4(),
          details:
            "In addition to demonstrating my technical skills, this project also allowed me to practice my project management abilities. Through effective goal setting, scope definition, and timeline management, I was able to deliver the website on time and within budget, while also ensuring that it met the client's expectations.",
        },
        {
          id: uuidv4(),
          details:
            "My primary objective for creating this website was to help my friend establish a strong online presence and promote their work to a wider audience. By developing a professional website, I enabled my friend to attract potential clients and employers and establish themselves as a credible and trustworthy professional in the field of architecture.",
        },
        {
          id: uuidv4(),
          details:
            "Overall, this project provided an opportunity for me to demonstrate my ability to create high-quality websites that meet client requirements, improve their online presence, and hone my technical and project management skills.",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Lost Ark Discord Bot",
    url: "lostark-discord",
    category: "Mobile Application",
    img: "/images/lostark_bot_main.png",
    ProjectHeader: {
      title: "Lost Ark Discord Bot",
      publishDate: "February 23rd, 2022",
      tags: "Mobile Application",
    },
    ProjectImages: [
      {
        id: uuidv4(),
        title: "Lost Ark Discord Bot",
        img: "/images/lostark_bot_1.png",
      },
      {
        id: uuidv4(),
        title: "Lost Ark Discord Bot",
        img: "/images/lostark_bot_1.png",
      },
      {
        id: uuidv4(),
        title: "Lost Ark Discord Bot",
        img: "/images/lostark_bot_1.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: uuidv4(),
          title: "Name",
          details: "Personal Project",
        },
        {
          id: uuidv4(),
          title: "Services",
          details: "Discord Application",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "The objective of creating the Discord bot was to provide a practical tool that helps users on the Discord server to find groups for parties and raids in the 'Lost Ark' video game, while also providing features like calculating profits for looted items and auctioned loot. The bot has been actively used by more than 500 users and demonstrates the creator's ability to develop practical tools that provide value to the gaming community.",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: ["Discord.js", "Node.js", "Heroku"],
        },
      ],
      ProjectDetailsHeading: "Summary",
      ProjectDetails: [
        {
          id: uuidv4(),
          details:
            "I am thrilled to share one of my latest projects, a Discord bot that I created using Discord.js during my free time. The main objective of this bot is to help users on the Discord server look for groups for parties and raids in a popular video game called 'Lost Ark' created by SmileGate.",
        },
        {
          id: uuidv4(),
          details:
            "In addition to helping users find groups, the bot also has some exciting features such as calculating profits for looted items and providing information about how much profit one can earn by buying auctioned loot. These features were added to enhance the overall user experience and provide valuable information to gamers who want to make informed decisions about their in-game transactions.",
        },
        {
          id: uuidv4(),
          details:
            "I am proud to say that the bot has been actively used by more than 500 users to date, which is a testament to its usefulness and effectiveness. This project allowed me to hone my technical skills in Discord bot development and gave me an opportunity to create a practical tool that provides value to the gaming community.",
        },
        {
          id: uuidv4(),
          details:
            "Overall, I am thrilled with the results of this project, and I believe that it demonstrates my ability to create practical and useful tools that can benefit a large user base. I look forward to continuing to develop and improve this bot and to take on more exciting projects in the future.",
        },
      ],
    },
  },
  {
    id: 6,
    title: "Circle Market",
    url: "circle-market",
    category: "Web Application",
    img: "/images/circlemarket_main.png",
    ProjectHeader: {
      title: "Circle Market",
      publishDate: "January 4th, 2023",
      tags: "Web Application",
    },
    ProjectImages: [
      {
        id: uuidv4(),
        title: "Circle Market",
        img: "/images/circlemarket_main.png",
      },
      {
        id: uuidv4(),
        title: "Circle Market",
        img: "/images/circlemarket_main.png",
      },
      {
        id: uuidv4(),
        title: "Circle Market",
        img: "/images/circlemarket_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: uuidv4(),
          title: "Name",
          details: "Personal Project with Friend",
        },
        {
          id: uuidv4(),
          title: "Services",
          details: "UI Design & Full Stack Development",
        },
        {
          id: uuidv4(),
          title: "Website",
          details: "https://www.circlemarket.ca/",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, natus! Quibusdam enim quod in esse, mollitia molestias incidunt quas ipsa accusamus veniam.",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: [
            "React",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "Firebase",
          ],
        },
      ],
      ProjectDetailsHeading: "Challenge",
      ProjectDetails: [
        {
          id: uuidv4(),
          details:
            "Circle Market is an innovative online marketplace where users can buy and sell second-hand items with ease. My friend and I worked on this project using cutting-edge technologies to deliver a superior user experience.",
        },
        {
          id: uuidv4(),
          details:
            "To make the website more dynamic and responsive, we employed a range of tools such as React, CSS, and JavaScript. These technologies allowed us to create a user-friendly interface that adapts to the user's preferences, enhancing the overall experience.",
        },
        {
          id: uuidv4(),
          details:
            "One of the essential features we integrated was a robust and secure login system that provides users with a fast and efficient sign-in process. We implemented industry-standard protocols that guarantee user privacy and data security, ensuring that all user information is protected against unauthorized access.",
        },
        {
          id: uuidv4(),
          details:
            "We also used MongoDB and Firebase to store and retrieve data, ensuring that users can access their account information and transaction history anytime, anywhere. This required good knowledge of database management and query optimization, which we acquired through research and experimentation.",
        },
        {
          id: uuidv4(),
          details:
            "Overall, Circle Market was a challenging yet rewarding project that allowed us to hone our skills in web development and familiarize ourselves with industry-standard tools and technologies. We are proud of the result and look forward to expanding the platform with new features and functionalities in the future.",
        },
      ],
    },
  },
];
