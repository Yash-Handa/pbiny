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

- [`up ( upload )`](#up-alias-upload)
- [`dn ( download )`](#dn-alias-download)
- [`usr ( user )`]()
- [`config ( configuration )`](#config-alias-configuration)

And 2 options (flags):

- [`-h ( --help )`]()
- [`-v ( --version )`]()

*note: These 2 options (-h and -v) are available to all the commands as well*

<hr>

### up [alias: upload]

The **upload** command is used to upload content (file or text) to pastebin and produces a link to the created paste.

It has 2 Data Options and 3 Configurational Options:

- Data Options
  - [`-f ( --file )`](#up--f-alias---file)
  - [`-t ( --text )`](#up--t-alias---text)
- Configurational Options
  - [`-n ( --name )`](#up---f---t---n-alias---name)
  - [`-e ( --extension )`](#up---f---t---e-alias---extension)
  - [`-g ( --guest )`](#up---f---t---g-alias---guest)

**Notes:**

  - The **Configurational Options** can be used with both the **Data Options** but are completely optional
  - Only one of the 2 Data Options should be passed to the **up command**
  - The **up command** can be used without any options. (More about it [below](#up-without-any-option))

### up -f [alias: --file]

```shell
$ pbiny up -f "./pbiny_test/sample.txt"
```

The **-f** option of the **up** command is used to provide the relative or absolute path to the file which needs to be uploaded, it also supports the `~/` notation for the bash terminals.

The maximum file size is **512 KB for Guest and Normal users** and **10 MB for PRO users**. See Pastebin specifications [here](https://pastebin.com/faq#9).

If some or all the Configurational Options ([`-n`](up---f---t---n-alias---name), [`-e`](#up---f---t---e-alias---extension), [`-g`](#up---f---t---g-alias---guest)) are not provided then the defaults are used. The default options / settings can be seen and modified by the [`config`](#config-alias-configuration) command.

Initial Defaults:

- Paste Title: undefined / untitled
- Paste Format: text
- Paste Expiration: N (Never)
- Paste Privacy: 0 (Public)

This command should produce a pastebin url which points to the Paste just been created with the file contents.

**Example:**

### up -t [alias: --text]

Single line text:

```shell
$ pbiny up -t "This is a sample post ^_^" -n "Sample Post" -e "text"
```

Multi Line text:

```shell
$ pbiny up  -n "Quote" -e "text" -t "\
The difference between stupidity and genius
is that genius has its limits.
--Albert Einstein"
```

The **-t** option of the **up** command is used to provide the text which will be uploaded to pastebin.

If some or all the Configurational Options ([`-n`](up---f---t---n-alias---name), [`-e`](#up---f---t---e-alias---extension), [`-g`](#up---f---t---g-alias---guest)) are not provided then the defaults are used. The default options / settings can be seen and modified by the [`config`](#config-alias-configuration) command.

Initial Defaults:

- Paste Title: undefined / untitled
- Paste Format: text
- Paste Expiration: N (Never)
- Paste Privacy: 0 (Public)

This command should produce a pastebin url which points to the Paste just been created with your text.

**Example:**

### up < -f | -t > -n [alias: --name]

```shell
$ pbiny up -t "This is a sample post ^_^" -n "Sample Post"
```

The **-n** option of the **up** command is optional and can be passed to both the [**-f**](#up--f-alias---file) and [**-t**](#up--t-alias---text). This option takes a string as argument which will be used to create the name / title of the paste.

If **-n** is not provided then the title of the paste is set to **untitled**.

### up < -f | -t > -e [alias: --extension]

```shell
$ pbiny up -t "This is a sample post ^_^" -e "text"
```

The **-e** option of the **up** command is optional and can be passed to both the [**-f**](#up--f-alias---file) and [**-t**](#up--t-alias---text). This option takes a string as argument which will be used to set the extension / formate (syntax highlighting) of the paste.

All the valid values for **-e** can be found at pastebin api specifications [here](https://pastebin.com/api#5).

If **-e** is not provided then the formate of the paste is set to the value defined in [config](#config-alias-configuration).

### up < -f | -t > -g [alias: --guest]

```shell
$ pbiny up -t "This is a sample post ^_^" -e "text" -g
```

You can very easily login to your pastebin account using the [`usr`]() command. While you are logged in, you may want to create a paste as **Guest User** (anonymously). The **-g** flag is used for this purpose only

The **-g** options takes a boolean i.e., it is a flag / switch and no argument is require for it.

*Note: The **-g** flag has it's effect only when a user is logged in otherwise it has no effect.*

**Example:**

### up (without any option)

```shell
$ pbiny up
```

If you run the **up** command without any options then an interactive Paste builder will start. The paste builder will allow you to set the values for different parameter like:

- Which type of user to use: Logged in / Guest User
- Paste Title
- Paste Format / Extension
- Paste Expiration
- Paste Privacy

After setting the parameters you will be taken to your preferred text editor to create the content of the paste. This editor options is made with the help of [inquirer.js editor input](https://github.com/SBoudrias/Inquirer.js/#editor---type-editor) and works as:

Launches an instance of the users preferred editor on a temporary file. Once the user saves and exits their editor, the contents of the temporary file are read. The editor to use is determined by reading the **$VISUAL** or **$EDITOR** environment variables. If neither of those are present, notepad (on Windows) or vim (Linux or Mac) is used.

Works great with cli test editors like [**nano**](https://www.nano-editor.org/) and [**vim**](https://www.vim.org/)

**Example:**


If the editor does not work or returns nothing to create a paste then a prompt for entering data (multi-line) will be displayed.

**Note:** you cannot edit the previous lines in this mode.

**Example:**

<hr>

### dn [alias: download]

The **download** command is used to download content of a paste from pastebin and either display it or save it to a file. It also supports retrieval of private pastes of a logged in user.

It has 1 Required Option and 2 Configurational Options:

- Required Option
  - [`-u ( --url )`](#dn--u-alias---url)
- Configurational Options
  - [`-f ( --file )`](#dn--u--f-alias---file)
  - [`-p ( --private )`](#dn--u--p-alias---private)

### dn -u [alias: --url]

```shell
$ pbiny dn -u "pastebin.com/xxxxxxx"
```

The **-u** option of the **dn** command is a **required** option and is used to fetch the raw content of the paste to whom the url (-u) points

The -u option takes a string as an argument. The string can be of the following formate:

- "https://pastebin.com/xxxxxxx"
- "pastebin.com/xxxxxxx"
- "xxxxxxx"

where xxxxxxx is the key of the paste.

If the [`-f ( --file )`](#dn--u--f-alias---file) option is not provided the fetched data is simply displayed to the command line.

**Example:**

### dn -u -f [alias: --file]

```shell
$ pbiny dn -u "pastebin.com/xxxxxxx" -f "./pbiny_test/sample_out.txt"
```

The **-f** option of the **dn** command is used for providing the relative path to the file to which the fetched data is to be stored.

If the file extension is not provided then the default option will be used. The default options / settings can be seen and modified by the [`config`](#config-alias-configuration) command.

**Note:** The provided file path should not be taken i.e., it will not over write an already existing file.

**Example:**

### dn -u -p [alias: --private]

```shell
$ pbiny dn -u "pastebin.com/xxxxxxx" -f "./pbiny_test/sample_out.txt" -p
```

Pastebin provides an option of creating a private bin i.e., only the user who created the post can view it.

the **-p** option of **dn** command allows a **logged in** user to view his/her private pastes by pbiny. It throws an error if the user is not logged in, the paste does not belongs to the logged in user or the paste is not private. 

The **-p** option takes a boolean i.e., it is a flag / switch and no argument is require for it.

*You can very easily login to your pastebin account using the [`usr`]() command.*

**Example:**

<hr>

### config [alias: configuration]

```shell
$ pbiny config
```

The **config** command is used to see the defaults set for the application. You can change all the default values by passing in the following options:

- Upload Config:
  - `--ext ( --extension or --format )`
  - `--exp ( --expiration )`
  - `--priv ( --privacy )`
- Download Config:
  - `--f_ext ( --file_extension )`

All these options take a boolean i.e., they are a flag / switch and no argument is require for them.

- `--ext` [aliases: --extension, --format ] option is used to provide the default formate of the paste created by the [**up command**](#up-alias-upload). It is used when the up command do not provide the optional [`-e`](#up---f---t---e-alias---extension) option. The complete list of valid extensions / format / Syntax is given [here](https://pastebin.com/api#5).

- `--exp` [alias: --expiration ] option is used to provide the default expiration for the paste created by the [**up command**](#up-alias-upload). The complete list of valid expiration values is given [here](https://pastebin.com/api#6).

- `--priv` [alias: --privacy ] option is used to provide the default privacy for the paste created by the [**up command**](#up-alias-upload). The complete list of valid privacy values is given [here](https://pastebin.com/api#7).

- `--f_ext` [alias: --file_extension ] option is used to provide the default file extension for the file created by the [**dn command**](#dn-alias-download) passing [`-f`](#dn--u--f-alias---file) option. It can take any valid file extension like txt, js, json, py.

**Syntax Example:**

```shell
$ pbiny config --ext --priv --f_ext
```

**Example:**

<hr>

### usr [alias: user]

### todo v1.0.2

- Add badge for package size and no.of downloads
- Write the complete readme.md
- modify index.js (for welcome message)
- Add keywords
