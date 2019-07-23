![terminal](https://badgen.net/badge/icon/terminal?icon=terminal&label)
[![Build Status](https://travis-ci.com/Yash-Handa/pbiny.svg?branch=master)](https://travis-ci.com/Yash-Handa/pbiny)
[![Build status](https://ci.appveyor.com/api/projects/status/7de453rlc04hadye/branch/master?svg=true)](https://ci.appveyor.com/project/Yash-Handa/pbiny/branch/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4565b0ecde96478b908bda84bdc2887f)](https://app.codacy.com/app/yashhanda7/pbiny?utm_source=github.com&utm_medium=referral&utm_content=Yash-Handa/pbiny&utm_campaign=Badge_Grade_Dashboard)
[![Known Vulnerabilities](https://snyk.io//test/github/Yash-Handa/pbiny/badge.svg?targetFile=package.json)](https://snyk.io//test/github/Yash-Handa/pbiny?targetFile=package.json)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Yash-Handa/pbiny.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Yash-Handa/pbiny/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Yash-Handa/pbiny.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Yash-Handa/pbiny/context:javascript)
![GitHub top language](https://img.shields.io/github/languages/top/Yash-Handa/pbiny.svg)
![David](https://img.shields.io/david/Yash-Handa/pbiny.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Yash-Handa/pbiny.svg)
![NPM](https://img.shields.io/npm/l/pbiny.svg)
![npm](https://img.shields.io/npm/v/pbiny.svg)
![node](https://img.shields.io/node/v/pbiny.svg)
![lines](https://badgen.net/lgtm/lines/g/Yash-Handa/pbiny/javascript.svg)

# pbiny

A npm package to interact with Pastebin directly from the terminal

## Installation

```shell
$ npm install -g pbiny
```

This is a platform agnostic, command line interface for pastebin.com. We recommend it to be installed globally for accessing the tool from anywhere.

## Usage

This is a **zero-configuration**, **ready to use** CLI tool.

It has 4 main commands:

- `up ( upload )`
- `dn ( download )`
- `usr ( user )`
- `config ( configuration )`

And 2 options (flags):

- `-h ( --help )`
- `-v ( --version )`

*note: These 2 options (-h and -v) are available to all the commands as well*

### up [alias: upload]

The **upload** command is used to upload content (file or text) to pastebin and produces a link to the created paste.

It has 2 Data options and 3 Configurational options:

- Data Options
  - `-f ( --file )`
  - `-t ( --text )`
- Configurational Options
  - `-n ( --name )`
  - `-e ( --extension )`
  - `-g ( --guest )`

**Notes:**
  - The **Configurational Options** can be used with both the **Data Options** but are completely optional
  - Only one of the 2 Data Options should be passed to the **up command**
  - The **up command** can be used without any options. (More about it below)

## Sample pics

### up -f

<div>
  <img alt="up -f" title="Demo of up command with -f option" src="/Readme_Content/pbin_up_f.png">
</div><br>

### up -t

<div>
  <img alt="up -t" title="Demo of up command with -t option" src="/Readme_Content/pbin_up_t.png">
</div><br>

### up

Launches an instance of the users preferred editor on a temporary file. Once the user exits their editor, the contents of the temporary file are read in as the result. The editor to use is determined by reading the $VISUAL or $EDITOR environment variables. If neither of those are present, notepad (on Windows) or vim (Linux or Mac) is used.

Works great with cli test editors like **nano** and **vim**

<div><br>
  <img alt="up" title="Demo of up command without options" src="/Readme_Content/pbin_up.png">
</div><br>

### up -t (if editor didn't work)

If the editor does not work or returns nothing to create a paste then an option of entering data (multi-line) will pop-up.

**Note:** you cannot edit the previous lines in this option.

<div>
  <img alt="up" title="Demo of up command when editor does not work" src="/Readme_Content/pbin_up_err.png">
</div><br>

### todo v1.0.2

- Add badge for package size and no.of downloads
- Write the complete readme.md
- modify index.js (for welcome message)
