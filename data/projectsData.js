const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const projectsData = [
  {
    id: 1,
    title: "Flashee",
    date: "October 15th, 2023",
    videoSrc: "https://storage.googleapis.com/jaeungkim/flashee.mov",
    url: "flashee",
    category: "Full Stack",
    img: "/images/flashee_1.png",
    ProjectHeader: {
      title: "Flashee",
      publishDate: "October 15th, 2023",
      tags: "Full Stack",
    },
    ProjectImages: [
      {
        id: generateId(),
        title: "Flashee_1",
        img: "/images/flashee_1.png",
      },
      {
        id: generateId(),
        title: "Flashee_2",
        img: "/images/flashee_2.png",
      },
      {
        id: generateId(),
        title: "Flashee_3",
        img: "/images/flashee_3.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: generateId(),
          title: "Name",
          details: "Flashee",
        },
        {
          id: generateId(),
          title: "Services",
          details: "Web Development",
        },
        {
          id: generateId(),
          title: "Website",
          details: "https://flashee.app",
        },
        {
          id: generateId(),
          title: "Phone",
          details: "N/A",
        },
      ],
      ObjectivesHeading: "Objective",
      ObjectivesDetails:
        "To architect and launch Flashee's e-commerce platform, a visionary project aimed at elevating online shopping experiences through a multi-vendor marketplace. The goal was to deliver a seamless, secure, and accessible shopping platform using the MERN stack complemented by Next.js. My focus was on crafting a user-centric interface, integrating cutting-edge technologies for robust performance, and laying the foundation for a marketplace where security and ease-of-use are paramount.",
      Technologies: [
        {
          title: "Tools & Technologies",
          techs: [
            "React",
            "Next.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Supabase",
            "AWS",
            "Fly.io",
            "Shopify Payments",
          ],
        },
      ],
      ProjectDetailsHeading: "Summary",
      ProjectDetails: [
        {
          id: generateId(),
          details:
            "Flashee emerged as an innovative e-commerce platform with a mission to offer a diverse, multi-vendor marketplace. As the Full Stack Developer, I orchestrated the development of Flashee, transforming the initial concept into a dynamic and scalable online marketplace. This platform served as a conduit for vendors to seamlessly onboard and connect with customers, facilitated by the integration of Shopify Payments.",
        },
        {
          id: generateId(),
          details:
            "In crafting Flashee's architecture, I utilized a robust stack comprising React and Next.js for the frontend, coupled with Node.js and Express.js for server-side operations, and MongoDB for database management. The authentication process was strengthened using Supabase, resulting in a notable reduction in security incidents, while AWS and Fly.io provided a cost-effective and reliable infrastructure.",
        },
        {
          id: generateId(),
          details:
            "The launch strategy was executed with meticulous attention to detail, leading to a successful soft launch that attracted a significant number of merchants, which was critical to early revenue streams. The integration of Shopify Payments was key in decreasing cart abandonment rates and enhancing user trust.",
        },
        {
          id: generateId(),
          details:
            "Focused UI/UX improvements were implemented to enhance user satisfaction and retention, resulting in a notable increase in engagement and return users. The Flashee platform was developed with the dual goals of performance and user experience in mind, setting a strong foundation for future growth and success.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "WebGL Playground",
    date: "July 26th, 2022",
    videoSrc: "https://storage.googleapis.com/jaeungkim/jaeungkim.ca.mp4",
    url: "webgl-playground",
    category: "Full Stack",
    img: "/images/webGL_project_main.png",
    ProjectHeader: {
      title: "WebGL Playground",
      publishDate: "July 26th, 2022",
      tags: "UI / Frontend",
    },
    ProjectImages: [
      {
        id: generateId(),
        title: "WebGL Playground_1",
        img: "/images/webGL_project_main.png",
      },
      {
        id: generateId(),
        title: "WebGL Playground_2",
        img: "/images/webGL_project_main.png",
      },
      {
        id: generateId(),
        title: "WebGL Playground_3",
        img: "/images/webGL_project_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: generateId(),
          title: "Name",
          details: "Personal Project",
        },
        {
          id: generateId(),
          title: "Services",
          details: "Web Development",
        },
        {
          id: generateId(),
          title: "Website",
          details: "https://github.com/jaeungkim/webGL-playground",
        },
        {
          id: generateId(),
          title: "Phone",
          details: "",
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
          id: generateId(),
          details:
            "This project is a web-based implementation of a 3D room model created in Blender, using React, GSAP, and Three.js. The goal of the project is to create a visually engaging and interactive experience for the user, allowing them to explore the room in a 3D environment.",
        },
        {
          id: generateId(),
          details:
            "Using Blender, I designed and modeled the room, incorporating realistic textures and lighting to achieve a high level of visual detail. The model was then exported into Three.js, a popular JavaScript library for 3D graphics on the web. The Three.js library was integrated with React, a JavaScript library for building user interfaces, to create a dynamic and interactive web application.",
        },
        {
          id: generateId(),
          details:
            "GSAP, a JavaScript animation library, was also used to add engaging animations and transitions to the user experience. These animations and transitions help to guide the user through the room and highlight important features and details.",
        },
        {
          id: generateId(),
          details:
            "Overall, this project showcases the power and versatility of web-based 3D graphics and the potential for creating immersive and engaging user experiences using modern web technologies.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "iClinic Systems",
    date: "October 16th, 2022",
    videoSrc: "https://storage.googleapis.com/jaeungkim/aiclinic.ca.mp4",
    url: "iclinic-systems",
    category: "Full Stack",
    img: "/images/iclinic_main.png",
    ProjectHeader: {
      title: "iClinic Systems",
      publishDate: "October 16th, 2022",
      tags: "Full Stack",
    },
    ProjectImages: [
      {
        id: generateId(),
        title: "iClinic Systems",
        img: "/images/iclinic_main.png",
      },
      {
        id: generateId(),
        title: "iClinic Systems",
        img: "/images/iclinic_main.png",
      },
      {
        id: generateId(),
        title: "iClinic Systems",
        img: "/images/iclinic_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: generateId(),
          title: "Name",
          details: "iClinic Systems Inc.",
        },
        {
          id: generateId(),
          title: "Services",
          details: "Full Stack Development",
        },
        {
          id: generateId(),
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
          id: generateId(),
          details:
            "iClinic offers smart, innovative, and intuitively designed end-to-end eHealth solutions with shared patient records at the core, achieving the 'One Patient, One Record' concept. The company provides a network of clinicians and hospitals with multiple specialties in the treatment of complex diseased patients, facilitating healthcare providers with improved accuracy and efficiency leading to improved patient care and outcomes.",
        },
        {
          id: generateId(),
          details:
            "I built a full-stack web application using the MEAN stack, which served as a human resources management tool for an EMR start-up company. The tool facilitated employee management, including vacation requests, and also featured a marketing web app for the company's eHealth solutions. The project aimed to improve the company's internal HR processes and streamline employee requests, while also promoting their eHealth solutions to potential clients. Technologies used in the project include Angular, JavaScript, TypeScript, TailwindCSS, Node.Js, MongoDB, and AWS. The completed application provided the company with a more efficient and organized system for managing their workforce and enabled them to better showcase their eHealth solutions to potential clients.",
        },
        {
          id: generateId(),
          details:
            "As the sole developer on this project, I was responsible for a wide range of tasks, including designing the user interface, implementing complex microservices on AWS, handling dev ops, and maintaining the software.",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Catalyx.io",
    date: "January 18, 2021",
    videoSrc: "https://storage.googleapis.com/jaeungkim/catalyx.mov",
    url: "catalyx",
    category: "Full Stack",
    img: "/images/catalyx_main.png",
    ProjectHeader: {
      title: "Catalyx.io",
      publishDate: "January 18, 2021",
      tags: "UI / Frontend",
    },
    ProjectImages: [
      {
        id: generateId(),
        title: "catalyx",
        img: "/images/catalyx_main.png",
      },
      {
        id: generateId(),
        title: "catalyx",
        img: "/images/catalyx_main.png",
      },
      {
        id: generateId(),
        title: "Catalyx",
        img: "/images/catalyx_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: generateId(),
          title: "Name",
          details: "Catalyx.io",
        },
        {
          id: generateId(),
          title: "Services",
          details: "UI Design & Frontend Development",
        },
        {
          id: generateId(),
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
          id: generateId(),
          details:
            "During my time at Catalyx, I served as a front-end developer and worked on a variety of tasks that helped improve the company's web applications. One of my responsibilities was identifying and fixing software defects in React single-page apps. I ensured that the code quality was high and that the user experience was seamless. This involved collaborating with the development team and constantly testing the application to identify and address any issues before they impacted the user experience.",
        },
        {
          id: generateId(),
          details:
            "Another task I worked on was assisting with the migration of the company's legacy REST API to GraphQL with Apollo. This allowed for a more efficient and reliable backend connection, resulting in improved app performance. I also refactored and optimized the frontend codebase to increase website performance by 70% while adhering to SEO principles. This involved reducing page load times, minimizing server requests, and ensuring that the site was easily crawlable by search engines.",
        },
        {
          id: generateId(),
          details:
            "Additionally, I was responsible for integrating custom global components and frontend libraries to support the development of future company products. I also developed comprehensive unit tests using JEST and React Testing Library to ensure the reliability of the frontend codebase. This included identifying and fixing any issues with the code and ensuring that it worked as intended.",
        },
        {
          id: generateId(),
          details:
            "Another key task I worked on was implementing a serverless architecture using AWS Lambda Edge to dynamically inject headers for Facebook's open graph. This enabled the company's web applications to display rich media when shared on social media platforms. I also integrated multiple third-party systems, including Mobilum, which allowed customers to use credit cards to purchase cryptocurrencies.",
        },
        {
          id: generateId(),
          details:
            "Throughout this project, I worked closely with UI/UX teams to produce visually stunning web applications that were seamless and intuitive. I also practiced Agile/Scrum methodologies, delivering high-quality software that met business needs and exceeded user expectations. Overall, my work at Catalyx helped improve the performance, reliability, and user experience of the company's web applications.",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Lost Ark Discord Bot",
    date: "February 23rd, 2022",
    // videoSrc: "/images/lostark_bot_main.png",
    url: "lostark-discord",
    category: "Back End",
    img: "/images/lostark_bot_main.png",
    ProjectHeader: {
      title: "Lost Ark Discord Bot",
      publishDate: "February 23rd, 2022",
      tags: "Back End",
    },
    ProjectImages: [
      {
        id: generateId(),
        title: "Lost Ark Discord Bot",
        img: "/images/lostark_bot_main.png",
      },
      {
        id: generateId(),
        title: "Lost Ark Discord Bot",
        img: "/images/lostark_bot_main.png",
      },
      {
        id: generateId(),
        title: "Lost Ark Discord Bot",
        img: "/images/lostark_bot_main.png",
      },
    ],
    ProjectInfo: {
      ClientHeading: "About Client",
      CompanyInfo: [
        {
          id: generateId(),
          title: "Name",
          details: "Personal Project",
        },
        {
          id: generateId(),
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
          id: generateId(),
          details:
            "I am thrilled to share one of my latest projects, a Discord bot that I created using Discord.js during my free time. The main objective of this bot is to help users on the Discord server look for groups for parties and raids in a popular video game called 'Lost Ark' created by SmileGate.",
        },
        {
          id: generateId(),
          details:
            "In addition to helping users find groups, the bot also has some exciting features such as calculating profits for looted items and providing information about how much profit one can earn by buying auctioned loot. These features were added to enhance the overall user experience and provide valuable information to gamers who want to make informed decisions about their in-game transactions.",
        },
        {
          id: generateId(),
          details:
            "I am proud to say that the bot has been actively used by more than 500 users to date, which is a testament to its usefulness and effectiveness. This project allowed me to hone my technical skills in Discord bot development and gave me an opportunity to create a practical tool that provides value to the gaming community.",
        },
        {
          id: generateId(),
          details:
            "Overall, I am thrilled with the results of this project, and I believe that it demonstrates my ability to create practical and useful tools that can benefit a large user base. I look forward to continuing to develop and improve this bot and to take on more exciting projects in the future.",
        },
      ],
    },
  },
];
