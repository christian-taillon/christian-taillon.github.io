---
layout: page
title: Simple Guide to Python3 Virtual Environments
permalink: /pyhon3virt/

---

# A Simple Guide to Python3 Virtual Environments on Debian-based Linux

Python3 virtual environments are a helpful tool in the development and usage of Python-based tools. They enable developers to work with specific versions of Python and its packages without causing conflicts, particularly with the rest of your Operating System. This guide will take you through the basics of creating, using, and managing Python3 virtual environments on a Linux system. We will be using Python3's built-in `venv` module to create our virtual environments.

Grab a cup of delicious coffee and open your terminal, and you are ready to start. ☕

## Installing Python3 and venv

Before we can create a Python3 virtual environment, we need to ensure that Python3 and the venv module are installed on your system. Here is how you do that:

1. Update your package list:

    ```bash
    sudo apt update
    ```

2. Install Python3 and venv:

    ```bash
    sudo apt install python3 python3-venv
    ```

## Creating a Virtual Environment

To create a virtual environment, choose a directory where you want to place it and run the `venv` module as a script with the directory path.

For example, to create a virtual environment named `env` in your home directory, you would:

```bash
python3 -m venv ~/env
```

This will create a new directory `~/env` if it does not already exist. Inside this directory, it will install a local version of Python and a local version of `pip`, Python's package manager.

## Activating the Virtual Environment

To use the virtual environment, you need to activate it:

```bash
source ~/env/bin/activate
```

Your shell prompt will change to show the name of the activated environment. While the environment is activated, any Python commands you use will come from and be installed into the environment.

## Installing Packages

With the environment activated, you can now install packages locally. For example, to install the `requests` library, you would do:

```bash
pip install threatconnect
```

This will install the package into the activated environment, isolated from the global Python environment.

## Deactivating the Virtual Environment

When you are done working in the virtual environment, you can deactivate it:

```bash
deactivate
```

This will put you back to the system’s default Python interpreter with all its installed libraries.

## Removing the Virtual Environment

To remove a virtual environment, just deactivate it and then delete the environment folder with the `rm` command:

```bash
rm -rf ~/env
```

**Note:** Be very careful with the `rm -rf` command. It will delete the specified directory and all its contents without confirmation.

## Conclusion

That's it! You've learned the basics of working with Python3 virtual environments on a Linux system. If you have finished your coffee by now, do your self a favor and grab another. Now put your new knowledge to work! 

☕ Remember to stay caffeinated 😊
