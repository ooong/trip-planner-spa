Hey everyone - you’ll often see myself and Kate entering some shortcuts in our command line (like `ga` instead of `git add`). These are `aliases`, and they’re just like what they sound like - you can give a nickname to a command or series of commands that you use often to speed up your workflow! It’s easy to make your own! Here’s how:

1. Open your `.bash_profile` (on OSX) with your code editor of choice
  * On Linux (ex. Ubuntu) this may be called `.bashrc`
 * If you use zsh, it may be called `.zshrc`
 * In any case, this file will be located in your home directory (`~`). If it doesn’t exist, simply create it (`touch .bash_profile`)
  * Extra note: to open it with your code editor from the command line, if you’re using VSC, you can use the `code` command like so: `code .bash_profile`/`code .bashrc`/`code .zshrc`, as appropriate)

2. In your `.bash_profile`, you can write an alias anywhere you want. Here’s what one might look like:

```bash
alias l='ls -l'
```


This alias will make it so that typing `l` into your command line and hitting return/enter will actually execute `ls -l` (listing all directories, including extra details).

Some things to note about the syntax:
  * You can use single or double quotes
  * It is important that there there are no spaces on either side of the = operator (i.e. alias l = 'ls -l' is *not* valid)

3. Save your `.bash_profile` and `source` it

Once you save the changes, they won’t take effect in your _current_ terminal session unless you “source” your profile (that is, execute it again). Every time you start a new terminal session, your bash profile is executed. This means that all subsequent terminal sessions you start will have your alias, but not your current one. To be able to start using your alias in your current terminal, you can enter the following command:

```source .bash_profile
```


This tells bash to execute your bash profile again for the current session.

Here are some useful operators that you can use in your aliases:

`&&`: The `&&` operator says, “Do the command to the left until that command exits - if it exits with a 0 exit code (everything successful), then execute the command to the right. If the command fails with a non-zero exit code, stop executing.
  * This is useful for doing a series of commands one after another. For example, to alias going to your home directory and then clearing the terminal, you may write: `alias home='cd ~ && clear'`

`&`: The `&` operator says, “Do the command on the left and put it in the background. Then move on to the command on the right”
  * This is useful for performing two tasks that need to happen in parallel (for example, running your server with nodemon and running webpack in watch mode)

`$1, $2, etc...`: These are placeholders that you can put into your commands to represent the place of arguments that you give to that command (remember that in the context of the command line, “arguments” are space-separated words that you type after the name of the program). For example, say you want to alias the process of git adding all files with changes and then committing them with a message:

```bash
alias gac='git add -A && git commit -m $1'
```


Then, you can use this command by typing:

```gac "Made some changes"
```


The argument “Made some changes” will be interpolated in the space where you defined the `$1`.
