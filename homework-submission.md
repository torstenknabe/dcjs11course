# ONE TIME ONLY

### Fork the Course Materials repo

- Follow Instructor on screen
- Forking will create a new repository under your own username in Github. You'll need to clone this repo to your development machine. This cloned repo will be the repo you work in for the remainder of the course.

### Create a new directory in Sites and clone the forked repo into it

```bash
cd ~/Sites
mkdir jsdc11
cd jsdc11
git clone git@git.generalassemb.ly:<username>/course-materials.git
cd course-materials
```

### Add the original Course Materials repo as an upstream remote

You'll want to be able to pull in any changes that I make to the Course Materials repository into your own forked repository. We achieve that by make the Course Materials repository an "upstream" repository.

```bash
git remote add upstream git@git.generalassemb.ly:DCJS11/course-materials.git
git remote -v
```

### Set the `master` branch to track the origin/master branch

```bash
git branch -u origin/master
```

# EACH HOMEWORK ASSIGNMENT

From the root directory of your forked repo, in the terminal, pull the upstream changes from the class repo:

```bash
git pull upstream master
```

When you pull from upstream, you might get a weird looking screen in your terminal. This is a text-editor called vim, and git is asking you to write a merge message. You don't actually need to do this, because a default message is written for you. Simply type `:x` to exit and save vim. **REMEMBER THIS COMMAND!!!!**

Do your homework in the `homework` folder, typically in a file or folder called `starter`

When finished, save your work, then check your git status:

```bash
git status
```

Next, stage all the changes:

```bash
git add .
```

Next, commit that changes to your local repository:

```bash
git commit -m "<enter a commit message here>"
```

Lastly, push those changes to your forked repository in GitHub:

```bash
git push origin master
```

Go to github.com and submit a Pull Request from the master branch of your forked repo against the master branch of the original JSDC11 Course Materials repo

- Please name the PR with _the name of the class folder of the lesson the homework was assigned in_, with the word 'homework' at the end. For example, today's homework is part of the `02-data_and_operators` lesson, so you would name your PR `02-data_and_operators homework`.
