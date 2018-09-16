Plinksaver
=============
A google chrome extension to save links locally with a description

## Features ##
- [x] Organise links in user created categories
- [x] Give description to a link
- [x] View all links in an organised way
- [x] Simple search

## SCREENSHOTS ##
![Popup](./screenshots/ex-popup.png?raw=true "Extension Popup (for saving a link)")
![Options](/screenshots/ex-options.png?raw=true "Extension Options (for viewing saved links)")


## Installation ##
1. Download zip file of this repo and unzip to desired location
2. In google chrome go to chrome://extensions/
3. Click on *Load Unpacked* tab and select the unzipped folder
4. The PlinkSaver Extension has now been added to your browser

## Extension Working Key Points ##
* All Data is stored in your browser ( using chrome.storage.local and unlimitedStorage permission )
* Data is stored the following format

  * ### Parent Object ###
    {
    
      categories : ["cat 1", "cat 2",...],
      
      cat 1: {

      }
      
      cat 2: {

      }
      
      .
      .
      .
      
    }
    
  * ### Cat object ###
    {
    
      linkObj 1: {
      
      }
      
      linkObj 2: {
      
      }
      
      .
      .
      .
      
    }  
    
  * ### linkObj object ###
    {
    
      link : "website url from browser",
      
      desc: "some description by user"
      
    }
