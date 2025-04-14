INSERT INTO
  skills (name, icon, image, link, type)
VALUES
  -- Frontend Skills
  (
    'Vue.js',
    'mdi mdi-vuejs',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  (
    'Knockout.js',
    'mdi mdi-language-javascript',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  (
    'Angular',
    'mdi mdi-angular',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  (
    'Bootstrap',
    'mdi mdi-bootstrap',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  (
    'Vuetify',
    'mdi mdi-vuejs',
    NULL,
    'https://icon.icepanel.io/Technology/svg/Veutify.svg',
    'Frontend Skills'
  ),
  (
    'HTML5',
    'mdi mdi-language-html5',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  (
    'CSS3',
    'mdi mdi-language-css3',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  (
    'Sass',
    'mdi mdi-sass',
    NULL,
    NULL,
    'Frontend Skills'
  ),
  -- Backend Skills
  (
    'Node.js',
    'mdi mdi-nodejs',
    NULL,
    NULL,
    'Backend Skills'
  ),
  (
    'NestJS',
    'mdi mdi-nestjs',
    NULL,
    'https://icon.icepanel.io/Technology/svg/Nest.js.svg',
    'Backend Skills'
  ),
  (
    'Express.js',
    'mdi mdi-server',
    NULL,
    NULL,
    'Backend Skills'
  ),
  (
    'Sequelize',
    'mdi mdi-database',
    NULL,
    'https://icon.icepanel.io/Technology/svg/Sequelize.svg',
    'Backend Skills'
  ),
  (
    'Smile CDR',
    'mdi mdi-server',
    NULL,
    NULL,
    'Backend Skills'
  ),
  -- Databases
  (
    'PostgreSQL',
    'mdi mdi-database',
    NULL,
    'https://icon.icepanel.io/Technology/svg/PostgresSQL.svg',
    'Databases'
  ),
  (
    'MySQL',
    'mdi mdi-database',
    NULL,
    'https://icon.icepanel.io/Technology/svg/MySQL.svg',
    'Databases'
  ),
  (
    'MongoDB',
    'mdi mdi-database',
    NULL,
    'https://icon.icepanel.io/Technology/svg/MongoDB.svg',
    'Databases'
  ),
  (
    'SQL Server',
    'mdi mdi-database',
    NULL,
    'https://icon.icepanel.io/Technology/png-shadow-512/Microsoft-SQL-Server.png',
    'Databases'
  ),
  -- Programming Languages
  (
    'JavaScript',
    'mdi mdi-language-javascript',
    NULL,
    NULL,
    'Programming Languages'
  ),
  (
    'TypeScript',
    'mdi mdi-language-typescript',
    NULL,
    NULL,
    'Programming Languages'
  ),
  (
    'Java',
    'mdi mdi-language-java',
    NULL,
    NULL,
    'Programming Languages'
  ),
  (
    'C#',
    'mdi mdi-language-csharp',
    NULL,
    NULL,
    'Programming Languages'
  ),
  -- DevOps & Tools
  (
    'Nginx',
    'mdi mdi-nginx',
    NULL,
    'https://icon.icepanel.io/Technology/svg/NGINX.svg',
    'DevOps & Tools'
  ),
  (
    'Jenkins',
    'mdi mdi-jenkins',
    NULL,
    'https://icon.icepanel.io/Technology/svg/Jenkins.svg',
    'DevOps & Tools'
  ),
  (
    'Docker',
    'mdi mdi-docker',
    NULL,
    NULL,
    'DevOps & Tools'
  ),
  -- Testing
  (
    'Jest',
    'mdi mdi-test-tube',
    NULL,
    'https://icon.icepanel.io/Technology/svg/Jest.svg',
    'Testing'
  ),
  (
    'Cypress',
    'mdi mdi-test-tube',
    NULL,
    'https://icon.icepanel.io/Technology/png-shadow-512/Cypress.png',
    'Testing'
  ),
  (
    'Vitest',
    'mdi mdi-test-tube',
    NULL,
    NULL,
    'Testing'
  ),
  -- Miscellaneous
  (
    'Pinia',
    'mdi mdi-fruit-pineapple',
    NULL,
    NULL,
    'Miscellaneous'
  ),
  (
    'Vuex',
    'mdi mdi-vuejs',
    NULL,
    NULL,
    'Miscellaneous'
  ),
  (
    'FHIR',
    'mdi mdi-file-document',
    NULL,
    NULL,
    'Miscellaneous'
  ),
  (
    'Vite',
    'mdi mdi-lightning-bolt',
    NULL,
    NULL,
    'Miscellaneous'
  );

INSERT INTO
  projects (name, description, data)
VALUES
  (
    'Credit Request and Loans Approval System',
    jsonb_build_object (
      'en',
      'I played a key role in a Credit Request and Loans Approval System, where my responsibilities included the
maintenance, improvement, and development of new features.',
      'es',
      'Desempeñé un papel clave en un sistema de solicitud de crédito y aprobación de préstamos, donde mis responsabilidades incluían el mantenimiento, la mejora y el desarrollo de nuevas funciones.'
    ),
    jsonb_build_object (
      'en',
      'While my primary focus was on frontend
tasks, I also engaged in challenging full-stack work involving Java. Despite a gap of about three years since
my last Java coding experience, I successfully addressed tickets and delivered as required, making
valuable contributions to the team''s overall success mostly related with DB integrations and some tricky
calculations/derivations for the backend. Also did a bit of "DevOps" tasks working with Kibana metrics and
integration of our personal logs with alerts for business team. This project has a total of 26 repositories that
are connected with each other in some way.
',
      'es',
      'Aunque mi enfoque principal estaba en las tareas frontend, también participé en un desafiante trabajo full-stack con Java. A pesar de un lapso de aproximadamente tres años desde mi última experiencia en programación Java, atendí con éxito los tickets y entregué los trabajos según lo requerido, realizando valiosas contribuciones al éxito general del equipo, principalmente relacionadas con integraciones de bases de datos y algunos cálculos/derivaciones complejos para el backend. También realicé algunas tareas de "DevOps" trabajando con métricas de Kibana e integrando nuestros registros personales con alertas para el equipo de negocios. Este proyecto cuenta con un total de 26 repositorios conectados entre sí de alguna manera.'
    )
  ),
  (
    'Health Care System',
    jsonb_build_object (
      'en',
      'I worked on a project developing a web dashboard for a healthcare system tailored for Canadian hospitals.
Emphasizing a start-to-finish approach, our team built everything from scratch.',
      'es',
      'Trabajé en un proyecto para desarrollar un panel de control web para un sistema de salud, diseñado específicamente para hospitales canadienses.
Con un enfoque integral, nuestro equipo lo desarrolló todo desde cero.'
    ),
    jsonb_build_object (
      'en',
      ' While my primary focus was
on frontend development, I also engaged in full-stack tasks, including the creation of APIs, interfaces, and
the overall system architecture. The project aimed at seamlessly connecting the frontend with a
comprehensive application catering to both doctors tools to make their job easier, such as dashboards and
several metrics, and patients, addressing various aspects of healthcare, including disease management.
',
      'es',
      'Si bien mi enfoque principal fue el desarrollo frontend, también participé en tareas integrales, incluyendo la creación de API, interfaces y la arquitectura general del sistema. El proyecto buscaba conectar fluidamente el frontend con una aplicación integral que ofreciera herramientas tanto a médicos para facilitar su trabajo, como paneles de control y diversas métricas, como a pacientes, abordando diversos aspectos de la atención médica, incluyendo la gestión de enfermedades.'
    )
  ),
  (
    'Mercado Libre',
    jsonb_build_object (
      'en',
      'I led a project as a full-stack web software developer in my previous company, where clients wanted an integration between the ERP system our company provides and Mercado Libre.',
      'es',
      'Lideré un proyecto como desarrollador de software web full-stack en mi empresa anterior, donde los clientes querían una integración entre el sistema ERP que proporciona nuestra empresa y Mercado Libre.'
    ),
    jsonb_build_object (
      'en',
      'My partner and I built a comprehensive web application from scratch, aiming to streamline the management of all items in the ERP system and facilitate their mass upload to Mercado Libre. One notable challenge involved creating an initial synchronization between items listed on Mercado Libre and the ERP system''s database. We leveraged Mercado Libre''s API to avoid erasing existing publications, recognizing the importance of maintaining competitiveness on the platform. The project showcased our ability to handle end-to-end development and address specific client needs with a tailored architecture.',
      'es',
      'Mi socio y yo desarrollamos una aplicación web integral desde cero, con el objetivo de optimizar la gestión de todos los artículos en el sistema ERP y facilitar su carga masiva a Mercado Libre. Un desafío importante fue crear una sincronización inicial entre los artículos publicados en Mercado Libre y la base de datos del sistema ERP. Aprovechamos la API de Mercado Libre para evitar la eliminación de publicaciones existentes, reconociendo la importancia de mantener la competitividad en la plataforma. El proyecto demostró nuestra capacidad para gestionar el desarrollo integral y abordar las necesidades específicas de los clientes con una arquitectura a medida.'
    )
  ),
  (
    'Credit Request and Loans Approval System',
    jsonb_build_object (
      'en',
      'I played this role in the Credit Request and Loans Approval System for "Crédito Argentino," focusing
primarily on maintenance tasks for existing features. ',
      'es',
      'Desempeñé este rol en el Sistema de Solicitud de Crédito y Aprobación de Préstamos de Crédito Argentino, enfocándome principalmente en tareas de mantenimiento de las funcionalidades existentes.'
    ),
    jsonb_build_object (
      'en',
      'The project utilized Angular for frontend development
and C# for backend operations. My responsibilities here involved ensuring the smooth operation and
upkeep of the system, contributing to the ongoing stability and functionality of the application for the
company.',
      'es',
      'El proyecto utilizó Angular para el desarrollo frontend y C# para las operaciones backend. Mis responsabilidades consistieron en garantizar el correcto funcionamiento y el mantenimiento del sistema, contribuyendo a la estabilidad y funcionalidad continuas de la aplicación para la empresa.'
    )
  );

INSERT INTO
  resources (
    name,
    category,
    description,
    link,
    fromDate,
    toDate
  )
VALUES
  (
    'CloudX',
    'Job',
    'Full-stack developer',
    'https://cloudx.com/',
    '2024-04-01',
    '2025-04-30'
  ),
  (
    'Blanc Labs',
    'Job',
    'Full-stack developer',
    'https://blanclabs.com/',
    '2022-02-01',
    '2024-04-01'
  ),
  (
    'Crédito Argentino',
    'Job',
    'Full-stack developer',
    'https://www.creditoargentino.com.ar/',
    '2021-03-01',
    '2022-01-31'
  ),
  (
    'ETSOL',
    'Job',
    'Full-stack developer',
    'https://www.etsol.com.ar/',
    '2019-07-01',
    '2021-03-31'
  ),
  (
    'Mec Parts',
    'Job',
    'Frontend developer',
    'https://mecparts.com.ar/',
    '2018-10-01',
    '2019-06-30'
  ),
  (
    'Senior Programming Technician',
    'Education',
    'Universidad Nacional de Tecnología',
    NULL,
    '2016-01-01',
    '2019-12-31'
  ),
  (
    'Psychology Degree',
    'Education',
    'Universidad Autónoma de Entre Ríos, Facultad de Humanidades, Arte y Ciencias Sociales',
    NULL,
    '2013-01-01',
    '2015-12-31'
  ),
  (
    'Vue.js Course',
    'Course',
    '“Vue – The complete Guide (incl. Router &
Composition API)” as part of an advanced Vue
framework training.',
    NULL,
    '2022-10-01',
    NULL
  ),
   (
    'Angular 11+ Course',
    'Course',
    'Angular 11 Fundamentals: The Complete Guide to Angular 11+',
    NULL,
    '2021-06-01',
    NULL
  ),
  (
    'Testing Laboratories Course',
    'Course',
    'Hexacta Testing Laboratories',
    'https://www.globallogic.com/latam/',
    '2021-06-01',
    NULL
  );