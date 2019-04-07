# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) InstallFest

## Agenda
- Opening & Introductions
- [Structure](#Structure) | Structure & Benchmarks |
- Install
- [Fundamentals](#fundamentals) | Fundamentals of JS & Web Development |
- [Conclusion](#conclusion) |Final Questions & Exit Tickets|

### Learning Objectives

* Get to know your classmates, instructors, and staff members.
* Understand how the World Wide Web works.
* Summarize the client-server model.
* Explain the structure of the course and tools that will be used.
* Discuss the benchmarks for assessments in terms of class participation, homework, and unit projects.
* Install and configure Node.js, npm, Git, and other command line tools.
* Identify common issues that might arise and solutions that will be used during the course.

### Preparation

*Before this lesson, students should be able to:*

- Complete the JS Onboarding Task.
- Accept your Slack invitation.
- Make an account on Github Enterprise.

## Structure

This course has 20 classes. It will begin with the fundamentals of JavaScript, including programming concepts such as data types, variables, and loops—the core concepts of programming. We'll then move into OOP and learn how to exchange information and functionality within our programs. From there, we'll learn how JavaScript can be used to manipulate websites and applications.

## Install

Open up the `install.md` file and follow the directions. We'll walk through this whole process together in class. 


## Fundamentals

### How Websites and Web Applications Work

The World Wide Web, or "Web" for short, is a massive collection of digital documents in the form of HTML pages. The Web is viewed using clients, such as a Web browser. The Web is based on hypertext transfer protocol (HTTP), the language which allows us to "jump" from one public Web page to another via links. There are more than 65 billion public Web pages on the Web today.

The World Wide Web is, in essence, the conduit through which most of us access information over the Internet. It is software that runs on top of the Internet, enabling us to access HTML content.

So what happens when you go to your favorite website? 

Communication between a host (such as a computer) and a client (a requesting program, such as a browser) occurs via a request/response pair. The client initiates an HTTP request message, which is serviced through an HTTP response message. Simply put, the client makes a request and the server responds accordingly. [This is a good summary video of how the request process works.](https://www.youtube.com/watch?v=DuSURHrZG6I)

The client, in most casses a web browser, is built to only understand a few languages – HTML, CSS, and JavaScript. JavaScript is used to handle user interactions with the web site. When you click a button to hide, or show content, it's the JavaScript the tells the browser what to do.
[This is a more in-depth video about how Browsers actually work and render content](https://www.youtube.com/watch?v=WjDrMKZWCt0). 

The server can be written in a wide variety of languages, such as a JavaScript, PHP, and Python. Its main job is to handle incomming HTTP requests and send the proper HTTP response. In this class, we'll learn Node.js, the most popular server-side JavaScript runtime. With Node, we can write a simple HTTP server in just a few lines of code.

### What Is JavaScript

JavaScript was created by Brandon Eich in 1995, who worked for Netscape at the time. Netscape was in a deeply contested war with Microsoft to dominate the browser market. Netscape wanted to include a scripting language in order to make a more rich client-side experience, so JavaScript was born. It took Brandon just 10 days to create the initial release. [This is a 5 minute video summary of the history of JavaScript.](https://www.youtube.com/watch?v=1H2v5QVBQDQ)

JavaScript is an *interpreted* language, meaning the code is run, through an interpreter, from top to bottom and the result is immediately returned. Your web browser has a JavaScript interpreter built into it. *Compiled* languages, on the other hand, are transformed from source code into another form, sometimes called a binary file, before the file is run by the computer. The advantage of interpreted languages is that they are more flexible and forgiving, at the cost of being slower and more costly to run.

JavaScript is an *object-oriented* language which you might have heard of before, and can be a confusing topic to wrap your head around. Historically, a computer program was viewed as a logical procedure that took some input, processed that input, and produced an output. In OOP, we're not necessarily concerned with the logicical procedure, we're more concerned with the objects that the procedures are performed on. There are 4 principles to OOP – Encapsulation, Abstraction, Inheritance, and Polymorphism. We'll get in depth with these concepts in a few classes from now, but if you want to read more about them, [this is a good start](https://medium.freecodecamp.org/object-oriented-programming-concepts-21bb035f7260).


## Conclusion

Make sure the lesson objectives have been met.

* Summarize the client-server model.
* Explain how the World Wide Web works.
* What questions do you have about the course or the specific tools we installed today?
