# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Command line

## Agenda
- Introduction to the Terminal
- Introduction to Git/GitHub
- JS in the Terminal with Node
- Final Questions & Exit Tickets

### Learning Objectives

- Use the most common commands to navigate and modify files / directories via the terminal window.
- Initialize a local Git repository and push/pull changes to a remote Git repository.
- Run basic JavaScript script on the command line using Node.

### Preparation

- Summarize the client-server model
- Explain the difference between interpreted and compiled languages
- Describe Object Oriented Programming
- Install and configure Node.js, npm, Git, and other command line tools.

We will be using node.js to interpret JS code in the class. Here's a bit more about Node.js.

The makers of Node.js made JavaScript (which normally runs only in the browser) available on the server side (and on your computer!). This allows you to build fast, scalable APIs and sites in JavaScript. JavaScript is already immensely popular; being able to use it on the back-end adds the option of using a single programming language throughout an entire full-stack application.

All this is helpful to engineers because it results in less context switching. Switching between JavaScript, HTML, CSS, and a back-end language (Ruby, Python, PHP, Java, etc.) is time consuming. Using a single language increases efficiency by cutting out all the back and forth.

Additionally, Javascript is designed to be event-driven and asynchronous. While other languages can perform only one task at a time, Javascript can send nearly everything to the background and keeps going.

## Introduction to the Terminal

We learned how to execute some scripts on the command line during Installfest. You will soon find that the command line is the heart of your operating system. Almost anything you can do from a GUI (Graphical User Interface), you can also do from the command line, but FASTER! We'll learn how to navigate computer files and folders using the terminal; this will help us begin pushing our projects to GitHub.  

#### Command Line Basics

Here are some important UNIX commands to know as you're working on the terminal.

| Command | Description | Command| Description |
| --- | --- | --- | --- |
| `ls` | **L**i**s**t the contents of the directory | `code` | Open VS Code|
| `cd` | **C**hange **d**irectories| `pwd`| **P**rint **w**orking **d**irectory |
| `mkdir` | **M**a**k**e **dir**ectory | `say`| Make your computer talk |
| `rmdir` | **R**e**m**ove empty **dir**ectories  | `open`| Open a particular file in their default application|
| `rm` | **R**e**m**ove files or directories | `./`  | The current folder|
| `touch` | Create an empty file | `../`| One folder above your current working directory
| `echo` | Return a string |  `~/` | The home folder  |

#### Command Line Codealong

**For Macs**:
  * Open the "Terminal" app (Applications > Utilities > Terminal)
  * Optionally, download and install [iTerm 2](https://www.iterm2.com/), which is a replacement for the terminal app that is more configurable.

**For Windows**:
 * Open  "git bash".


**Get familiar with the basic commands on the terminal!**


1.  Navigate to your root directory, then create a Sites directory. 

```bash
cd ~
mkdir Sites
cd Sites
```

2. Create a directory named temp-project.
```bash
mkdir temp-project
cd temp-project
```

3. Create a file named "index.html" using the touch command.
```bash
touch index.html
```

4. Open "index.html" in VS Code Text from the terminal. [Refer here for troubleshooting.](https://vscode.readthedocs.io/en/latest/editor/command-line/)
```bash
code .
```

5. Create an empty directory within the temp-project folder and remove it. 
```bash
mkdir temp
rmdir temp
```

6. Change directories back to Sites and then try to remove the temp-project directory. What happens?
```bash
cd ~/Sites
rmdir temp-project
```

8. Try removing the directory this way
```bash
rm -rf temp-project
```


#### Independent Practice

Complete the following instructions below in the Terminal application.

1. Create a directory in `~/Sites/` called `temp-project`. This is going to be a personal website that you are going to host (for free) through github. This is now you're `root` directory. 

2. Once inside your `root directory`, create three empty files using the `touch` command in your terminal:
  - about.html
  - contact.html
  - index.html

3. Open your `root directory` in your code editor. From the command line, you can try 

```
$ code .
```

If that doesn't work, open your editory and navigate to File -> Open in the menu.

In the `about.html` file, paste the following:

```html
<html>
<head></head>
  <body>
    <h1>About</h1>
  </body>
</html>
```

In the `contact.html` file, paste the following: 

```html
<html>
<head></head>
  <body>
    <h1>Contact</h1>
  </body>
</html>
```
In the `index.html` file, paste the following:

```html
<html>
<head></head>
<body>
  <a href="about.html"><img src="http://i.imgur.com/dosK05U.gif" /></a>
  <br>
  <a href="contact.html"><img src="http://i.imgur.com/2s0HwpM.gif" /></a>
</body>
</html>
```

4. Open index.html with your browser and make sure you see links on the page. Make sure those links work.


### Keyboard Navigation Shortcuts 

Being able the navigate a file and through lines of code quickly and efficiently is a key skill that good developers have. Here are some shortcuts that you can use (keep in mind this is specifically aimed for VS Code).

- Command + Right Arrow: Jump to end of line
- Command + Left Arrow: Jump to beginning of line
- Shift + Arrow Key: Highlights one unit in the direction of the arrow
- Shift + Command + Arrow Key: Highlights max units possible in the directon of the arrow
- Option + Right Arrow: Jump to beginning of next word
- Option + Left Arrow: Jump to beginning of previous word
- Option + Shift + Right Arrow: Highlight to beginning of next word
- Option + Up/Down Arrow: Move current line (or selected lines if multiple lines) up/down
- Option + Shift + Up/Down Arrow: Move current line (or selected lines if multiple lines) up/down
- Option + Shift + Up/Down Arrow: Copy selected line and paste it directly below
- Option + Shift + Up/Down Arrow: Copy selected line and paste it directly below

For a full list of shortcuts for VSCode: 

[VSCode Windows Shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

[VSCode Mac Shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)

#### Independent Practice
Spend 10 minutes reviewing and trying out some of the keyboard shortcuts included in the above links. Being comfortable with these shortcuts will save you a lot of time.

---

## Introduction to Git/GitHub

#### What is Git?

Git is a tool that:
* Primarily stores code, but can also store files, like Dropbox or Google Drive
* Maintains each file’s history, including all document changes (like Apple's Time Machine software)
* Is now commonplace in any company that employs engineers

#### Why is Git So Popular with Developers?

* Because Git stores a history of the code, it allows developers to “go back in time” if something breaks
* Git tracks changes so you can see who worked on what

#### What is GitHub?
GitHub is a platform that:
* Facilitates the sharing and managing of code, making it easy for multiple engineers to collaborate on the same project.
* Hosts files on the Web so you can share the finished product with other people

We setup our GitHub account and _SSH Key_ in the last lesson.

#### Why is GitHub So Popular with Developers?

* Much like Dropbox or Google Drive lets multiple people collaborate on the same document; GitHub allows this for code
* GitHub allows team members to provide feedback on the code, which potentially increases code quality

#### How Does GitHub Work in a Collaborative Environment?

GitHub's collaborative process can work many different ways, but this is the most common:

1. Each GitHub project has a Git _repository_, or _repo_. Engineers joining a team start by "cloning" the repo. That is, they copy the Git repo from GitHub's cloud and save it in a local folder.
2. The main, stable version of the codebase is on the default "branch" in Git, which is called `master`.
- Engineers typically create new branches for certain features or portions of the code they will work on, but we won't be creating branches in this class.
3. As engineers work on a project, they "add" and "commit" their changes. This establishes a saved version of a project and creates a history of the previous iteration. With these saved versions, engineers are able to revert to an earlier version if an issue arises that cannot be fixed.
4. If multiple engineers are working on a project, other engineers can review the committed code and provide feedback. For this class, the instructors will be reviewing and providing feedback on your code.
- We will be working with our own default `master` branch for each of our projects.

#### Git/GitHub Vocabulary

* **Repository** - A central location in which data—typically project-related—is stored and managed
* **Clone** - To download data from the cloud to your local machine (laptop, computer, etc.)
* **Fork** - To create a copy of someone else's repository as your own
* **Commit** - To save a version of your project to Git

### GitHub Exercise

In this codealong, students will create their first GitHub repository and push to it.

**Creating and pushing to your first repository**

1. Create a new repository on github.com titled "username.github.io" (where "username" is your GitHub username).
2. Change into the Sites directory in your Terminal
```
cd ~/Sites
```
3. Clone the repository and change into it the newly created directory.
```
git clone git@github.com:<username>/<username>.github.io.git
cd <username>.github.io.git
```
4. Move the files that we created in the first independent practice exercise from their current directory into your current directory.

```bash
mv ~/Sites/temp-project/* ./
```

5. Add all files in the ```~/Sites/username.github.io``` folder to the Git stage.

```bash
git add .
```

6. Commit your changes in Git with the message "Initial commit."

```
git commit -m "initial commit"
```

7. Push your changes to GitHub and verify that the changes were received in the Web interface

```
git push origin master
```

8. Try visiting https://username.github.io/goals (where "username" is your actual GitHub username)
---

## JS in the Terminal

You may be more familiar with JS in the browser, but in order to get used to working with the terminal—and thinking like a programmer—we’ll be using JS on the command line during the first unit of this class. Remember when we installed Node and npm? We'll be using these tools to make scripts run in the terminal.

### Executing a JS program: Codealong

Starting next class, we'll be creating our own JavaScript files and building out from it. Before we dive in, though, we need to explore the power of the terminal and run JavaScript inside of it.

The terminal is to a programmer what a Swiss Army knife is to a survivalist. It’s a multi-faceted tool that we will always be using to move our projects forward. And, for now, it helps us focus our learning. The computer has always had a text-only interface. Some of you may remember DOS or the early text-only games before complex graphical interfaces. The terminal is a tool from that era that professional developers still use every day.

#### Part 1: Write and execute some code!

1. In your working directory, start the Node console by typing in ```node```

2. Now we can type in some JavaScript and see what happens.
Let's start off with a classic programming exercise, printing 'Hello World'.

  ```javascript
  console.log('Hello World')
  ```

You should see Hello World printed. Underneath you will see that it outputs `undefined`. This means that after it has completed the output, there is no further value to return. We just wrote our first bit of Node / JavaScript!

3. Now we can take it to the next level. Let's drop in some variables:

  ```javascript
  let x = 5;
  let y = 2;
  ```

4. We can also print these variables to our console by typing ```console.log(x)```. We do not include quotes around variables like we do with 'Hello World'.

#### Part 2: Let's do some basic math!

  1. What happens if you do:
  ```javascript
  x + y;
  // 7
  y * 4;
  // 8
  ```

  2. We can even update the variable like this:
  ```javascript
  x = 9
  ```

  3. Now if we add x and y together we get a different result.
  ```javascript
  x + y
  // 11
  ```

  4. While this is only the tip of the iceberg, it starts to lay the foundation for us in terms of what we will be able to accomplish in the near future.

    To exit the console hit CTRL + c + c.

#### Review

Make sure the lesson objectives have been met.

* Understand what GitHub does and why we'll be using it.
* Understand how we will be using Node in the class.

#### The Developer Mentality

Here are some tips that you'll want to keep in mind as you continue coding!

  * Choose the right OS, editors and tools for your projects. Remember to do your research.
  * Leverage the online community's vast libraries and documentation.
  * Be efficient: Use the keyboard as much as possible instead of the mouse.
  * If you find yourself doing the same thing repeatedly, automate it.

#### Further Resources

* [iTerm2](http://iterm2.com/)
* [Review Git](https://www.codeschool.com/courses/try-git)
