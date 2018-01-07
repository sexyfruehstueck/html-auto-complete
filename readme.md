# Javasscript Auto Complete Tool
## Versionnumber 1.0.0 (2018-01-07)
(***Documentation last update 2018-01-07 18:00***)  

Small Javascript Auto Complete Tool  
![Small Javascript Auto Complete Tool](https://raw.githubusercontent.com/sexyfruehstueck/html-auto-complete/master/readme/screenshot.png "Small Javascript Auto Complete Tool")

[Mini Demo](https://rawgit.com/sexyfruehstueck/html-auto-complete/master/index.html)

## Features
* Auto Complete Tool function for Input Fields
* _ArrowKeys_ (Up and Down) to select an Item
* _Enter / Tab_ Key auto select current Item
* _Escape_ Key to cancel Auto Complete
* Mouse select
* seperate Stylesheet

## Roadmap / Future Features
* none

## Known Bugs
* none

## Usage

## SourceControl Link & Information
git@github.com:sexyfruehstueck/html-auto-complete.git

## Documentation

### Example

    /* Some Array with data, if objects, the object should have a *value* property */
    var data = [1,2,3,4];
    /* Get the input Tag, that should use the auto complete function. */
    var searchInput = document.querySelector("#search");
    /* Initialize the elements */
    AutoComplete.init(searchInput);
    /* loads data for the auto complete */
    searchInput.loadData(data);


### File / Folder Structure

    +-- readme.md (this document)
    +-- index.html ( example File )
    +-- autocomplete.js   (auto complete functions)
    +-- autocomplete.css  (styling for the auto complete popup)
    +-- LICENSE
