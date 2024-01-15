import image from './images/pricelessit.png';
import facar from './images/facar.png';
import todo from './images/todo.png';
import shopify from './images/shopify.png';

// links import
import {
  FaEnvelope,
  FaGithubSquare,
  FaLinkedin,
  FaCode,
  FaFacebook,
} from 'react-icons/fa';

const BackendContent = [
  {
    content: 'Expertise in Express.js and NestJS frameworks',
  },
  {
    content: 'Building RESTful APIs, GraphQL APIs and SSR servers',
  },
  {
    content: 'Building real time applications using Socket.io',
  },
  {
    content: 'Proficient in Unit testing and Integration testing',
  },
  {
    content: 'Basic knowledge of React.js principles and concepts',
  },
  {
    content:
      'Proficiency in database management systems such as MongoDB and PostgreSQL',
  },
];

// const Mobiledevelopment = [
//   {
//     content: 'Building crossplatform applications in flutter and dart',
//   },
//   {
//     content: 'Building native android applications in kotlin and java',
//   },
//   {
//     content: 'Designing mobile applications UI using adobe XD',
//   },
//   {
//     content: 'Intergrating android and web application with firebase',
//   },
// ];

const CloudContent = [
  {
    content: 'Experience in working on multiple cloud platforms',
  },
  {
    content: 'Certified AWS Cloud Practitioner',
  },
  {
    content: 'Docker and Kubernetes for containerization of applications',
  },
  {
    content:
      'Hosting and maintaining websites on virtual machine instances along with integration of databases',
  },
  {
    content:
      'Building CI/CD pipelines for automated testing & deployment using Github Actions and Render',
  },
];

const Experiences = [
  {
    company: 'CodSoft',
    image: image,
    position: 'Software Developer Intern',
    dates: 'September 2023 - Present',
    description:
      'I worked as a software developer focusing mainly on backend development but also involved in frontend development in React.js',
  },
  {
    company: 'Coding Samurai',
    image: image,
    position: 'Software Developer Intern',
    dates: 'September 2023 - October 2023',
    description:
      'I worked as a software developer focusing mainly on backend development but also involved in frontend development in React.js',
  },
];

const PersonalProjects = [
  {
    name: 'Facar',
    images: facar,
    description: 'A social network website made with Reactjs and GraphQL API.',
    link: 'https://facar-adel.netlify.app/',
    github: 'https://github.com/AhmedElbailey/Facar_v2',
  },
  {
    name: 'Shopify',
    images: shopify,
    description:
      'An Ecommerce onine shop built as a server-side rendering server using Restful API and EJS templates',
    link: 'https://shopify-cnnv.onrender.com',
    github: 'https://github.com/AhmedElbailey/Shopify',
  },
  {
    name: 'To-Do App',
    images: todo,
    description:
      'A fullstack website used for creating, reading, editing and deleting user todos, built with HTML5, CSS3 and REST API.',
    link: 'https://todo-list-adel.netlify.app/app',
    github: 'https://github.com/AhmedElbailey/Todo-List-App',
  },
];

const Links = [
  {
    icons: FaCode,
    url: '/codes',
    name: 'codes',
  },
  {
    icons: FaEnvelope,
    url: 'mailto:ahmedelbialy148@gmail.com',
    name: 'mail',
  },
  {
    icons: FaGithubSquare,
    url: 'https://github.com/AhmedElbailey',
    name: 'Github',
  },
  {
    icons: FaLinkedin,
    url: 'https://www.linkedin.com/in/ahmed-adel-285077217/',
    name: 'Linkedin',
  },
  {
    icons: FaFacebook,
    url: 'https://www.facebook.com/profile.php?id=100002511583928',
    name: 'Facebook',
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

export { BackendContent, CloudContent, Experiences, PersonalProjects, Links };
