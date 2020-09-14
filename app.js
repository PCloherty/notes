const notes = require("./notes.js")
const yargs = require('yargs')
const chalk = require("chalk")

//customise version
yargs.version(`1.1.0`)


//create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
       
    }
})

// command is the command typed into the commandline
// describe is the description of the command we are creating
// builder allows us to add more commands like in this case --Title
//      title is the new command we create by giving them unique identifiers
//          describe is the discription of the command
//          demandOption is used to tell the user that the secondary arguement for argv is needed 
//          type string is used to say that we will only accept a string as the argv arguement


//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
                notes.removeNote(argv.title)
            }
        })

//create list command
yargs.command({
    command: 'list',
    describe: ' Lists all current notes ',
    handler(argv) {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read selected note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()

