export default function thisWebsite() {
  return(
    <>
      <h1 className="article-header">Dev log</h1>
      <hr />
      <div className="article-text">
        <p>
          This project started because I wanted to create a website.
          Just for fun, to do some recreational coding and learn some new 
          stuff. I also wanted to start writing articles or blog posts.
          If for nothing else just to learn stuff better by pretending to 
          explain it to someone else. And to be honest, I wanted to improve my 
          english as well. This website as well as this article is a work 
          still in progress..
        </p>

        <h3 className="article-sub-header">Choosing languanges and frameworks</h3>
        <p>
          I originally started to build the backend with Rust as a
          way to practice and learn Rust. I created an example page
          using Actix and Yew resulting in full stack Rust using WASM.
          I later decided that I'd gain more from using a language
          I also use for work. To still have some fun with stuff I
          knew nothing about I chose Micronaut as a framwork,
          since I've never used it before. I kinda wanted to try out 
          SQLite after hearing some good stuff about it, but chose to use 
          Postgres instead, which I have some more experience with.
          I'll probably use flyway for db migration.
        </p>

        <p>
          For the frontend I considered alot of options. At first the plan
          was web assembly, but when I scratched the full stack rust project
          I thought i'd go for something basic, like just static html, and 
          keep all the coding on the backend (SSR). I considered JSF 
          (Java Server Faces) just for fun, and I also had a quick look at 
          Thymeleaf. I ended up choosing React, since it was something I 
          had some experience with, but wanted to learn more since it's so 
          commen to come across. I also havn't seen any tutorials with 
          web sites serving React from a java backend so I wanted to try 
          it out.
        </p>

        <p>
        <strong>The stack:</strong><br />
        PostgreSQL, Micronaut, React, NodeJS <br />
        Languages: Java and Javascript (sql, sh, yaml, md, json)<br />
        </p>

        <h3 className="article-sub-header">Hello, world</h3>
        <p>
          I first threw together a React project using webpack to run a dev
          server, and to build the project for deployment. I created a navbar
          at the top, and routing with react-router-dom. I did some simple
          styling with basic css, (I'm thinking about checking out tailwind,
          maybe later) and used some pretty colors from the gruvbox color 
          scheme. For now, just black, white, yellow and orange.
        </p>

        <p>
          For the backend I created a server in Java using the micronaut 
          framework. I created an endpoint for serving static files, so that 
          I could serve the React app from the same server I was going to 
          use as a rest api. After some trial and error, I was finally able
          to serve the frontend from the backend at localhost:8080.
        </p>

        <h3 className="article-sub-header">Early bumps in the road</h3>
        <p>
          I had some problems connecting to a database. And even more trouble 
          persisting data in said database. As I kinda knew, at the time when
          everything was crashing, it all came down to fixing my dependencies
          (which feels like programming in a nut shell). After adding and 
          removing different dependencies for annotations and jpa, it all 
          finally fell in to place, and I was able to persist data in a 
          postgres database.
        </p>

        <h3 className="article-sub-header">Task manager</h3>
        <p>
          After getting everything up and running as an absolut minimal 
          viable product. My first thought was to fix version controll and
          get some propper ci/cd so it would be as easy as pushing a commit
          to deploy an update the site. For this to be done I also needed to 
          fix some other stuff, and soon I was looking at a small todo list.
          Since this whole project is more about the journey than the 
          destination, the new plan was to create a task manager. In stead of
          just writing down a todo list, i'll use the rest api to create tasks,
          store them in the database, and fetch them and render the result 
          in the frontend.
        </p>

        <p>
          For now though, I'll have to make use of a simple hard coded todo 
          list. I'll keep updating the dev log as I'm able to check items 
          of the list.
        </p>

        <h3 className="article-sub-header">Dockerising</h3>
        <p>
          To make life simpler i created a docker-compose file including the 
          website service as an image and a postgres image. Now all I need to 
          do to deploy is building and pushing a docker image of the website 
          service, SSHing into the server, pulling the image and running 
          docker-compose up. Next step is to automate that process with a 
          github action script. Then I can set it to trigger whenever I push
          to main.
        </p>
<hr />
        <ul className="todo-list"> 
        <h3 className="article-sub-header">Todo list:</h3>
          Create a task manager for handling this todo list:
          <li><input type="checkbox" /> Set up multiple application.yaml files (dev/test/prod)</li>
          <li><input type="checkbox" /> Create unit tests</li>
          <li><input type="checkbox" /> Call the task api from the frontend to render all the tasks</li>
          <li><input type="checkbox" /> Set up some sort of authorization to secure post/patch/delete requests.</li>
          <li><input type="checkbox" /> ...</li>
          <li><input type="checkbox" /> Implement the task manager in a kanban board gui.</li>
          <br />
          Website editing:
          <li><input type="checkbox" /> Run a spell checker</li>
          <li><input type="checkbox" /> Add "pass all tests" deployment condition</li>

        <h3 className="article-sub-header">Done:</h3>
          <li><input type="checkbox" checked /> Create a sample restapi endpoint</li>
          <li><input type="checkbox" checked /> Add a website dev log</li>
          <li><input type="checkbox" checked /> Choose database</li>
          <li><input type="checkbox" checked /> Set up database migration with flyway</li>
          <li><input type="checkbox" checked /> Structure backend layers: Repo, Server, Controller.</li>
          <li><input type="checkbox" checked /> Implement full CRUD to db</li>
          <li><input type="checkbox" checked /> Dockerising with docker-compose</li>
          <li><input type="checkbox" checked /> Put the frontend and backend together in one project with version control.</li>
          <li><input type="checkbox" checked /> Create github action script to build frontend and dockerise the full stack.</li>
          <li><input type="checkbox" checked /> Add deployment to the github action script.</li>
        </ul>
      </div>
    </>
  );
}

