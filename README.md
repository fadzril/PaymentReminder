Payment Reminder
================

####Simple RN App with Gin Middleware#####

Some learning curve for React-Native application with Gin (Golang HTTP Middleware). I'm opted to use mobx as state management platform. Please refer to respective tools for build and run on your local.

There's a lot of works and set of instruction to be update. In a mean while, I've just posted a starter and initial points. And please be gentle, this code really need to re-factor especially for middleware and db queries.

### Client ###
Will add further instruction...

##### Dependencies #####
 * React-Native CLI
 * NodeJS/NPM
 * xcode

##### React-Native Packages #####
 * 'react-native'
 * 'react-native/material-kit'
 * 'mobx'
 * 'mobx-react'

Run
 ```
    $ cd client/
 	$ react-native run-ios
 ```


### Server ###
Will add further instruction...

##### Dependencies: #####
 * SQL (mysql, postgres)
 * Golang (go1.7)

##### Go Packages: #####
 * upper.io/db.v2
 * github.com/gin-gonic
 * github.com/itsjamie/gin-cors

Run
 ```
    $ cd server/
 	$ go run *.go
 ```
