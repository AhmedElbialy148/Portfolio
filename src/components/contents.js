import image from "./images/pricelessit.png";
import facar from "./images/facar.png";
import todo from "./images/todo.png";
import shopify from "./images/shopify.png";

// links import
import {
  FaEnvelope,
  FaGithubSquare,
  FaLinkedin,
  FaCode,
  FaFacebook,
} from "react-icons/fa";

const FullstackContent = [
  {
    content: "Building RESTful APIs in Express.js and Nest.js",
  },
  {
    content: "Building GraphQL APIs in Express.js and Nest.js",
  },
  {
    content:
      "Building Server-Side Rendering (SSR) servers in Express.js and Nest.js",
  },
  {
    content: "Building responsive fullstack websites in Node.js and React.js",
  },
];

// const Mobiledevelopment = [
//   {
//     content: "Building crossplatform applications in flutter and dart",
//   },
//   {
//     content: "Building native android applications in kotlin and java",
//   },
//   {
//     content: "Designing mobile applications UI using adobe XD",
//   },
//   {
//     content: "Intergrating android and web application with firebase",
//   },
// ];

const CloudContent = [
  {
    content: "Experience of working on multiple cloud platforms",
  },
  {
    content: "Certified AWS Cloud Practitioner",
  },
  {
    content:
      "Hosting and maintaining websites on virtual machine instances along with integration of databases",
  },
  {
    content:
      "Building CI/CD pipelines for automated testing & deployment using Github Actions and Render",
  },
];

const Experiences = [
  {
    company: "CodSoft",
    image: image,
    position: "Software Developer Intern",
    dates: "September 2023 - Present",
    description:
      "I worked as a software developer focusing mainly on backend development but also involved in frontend development in React.js",
  },
  {
    company: "Coding Samurai",
    image: image,
    position: "Software Developer Intern",
    dates: "September 2023 - October 2023",
    description:
      "I worked as a software developer focusing mainly on backend development but also involved in frontend development in React.js",
  },
];

const PersonalProjects = [
  {
    name: "Facar",
    images: facar,
    description: "A social network website made with Reactjs and GraphQL API.",
    link: "https://facar-adel.netlify.app/",
    github: "https://github.com/AhmedElbailey/Facar_v2",
  },
  {
    name: "Shopify",
    images: shopify,
    description:
      "An Ecommerce onine shop built as a server-side rendering server using Restful API and EJS templates",
    link: "https://shopify-cnnv.onrender.com",
    github: "https://github.com/AhmedElbailey/Shopify",
  },
  {
    name: "To-Do App",
    images: todo,
    description:
      "A fullstack website used for creating, reading, editing and deleting user todos, built with HTML5, CSS3 and REST API.",
    link: "https://todo-list-adel.netlify.app/app",
    github: "https://github.com/AhmedElbailey/Todo-List-App",
  },
];

const Links = [
  {
    icons: FaCode,
    url: "/codes",
    name: "codes",
  },
  {
    icons: FaEnvelope,
    url: "mailto:aa5707139@gmail.com",
    name: "mail",
  },
  {
    icons: FaGithubSquare,
    url: "https://github.com/AhmedElbailey",
    name: "Github",
  },
  {
    icons: FaLinkedin,
    url: "https://www.linkedin.com/in/ahmed-adel-285077217/",
    name: "Linkedin",
  },
  {
    icons: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=100002511583928",
    name: "Facebook",
  },
  // {
  //   icons: FaInstagram,
  //   url: "https://www.instagram.com/a0x001/",
  //   name: "Instagram",
  // },
  // {
  //   icons: FaTwitterSquare,
  //   url: "https://twitter.com/a0x001",
  //   name: "Twitter",
  // },
  // {
  //   icons: FaMedium,
  //   url: "https://medium.com/@allanmuturi",
  //   name: "Medium",
  // },
];

export { FullstackContent, CloudContent, Experiences, PersonalProjects, Links };
