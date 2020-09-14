const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body

        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added!'))
    } else {
        console.log(chalk.inverse.red('Note title already taken!'))
    }
}

const removeNote = (title) =>{
    const notes = loadNotes()
    const exists = notes.filter((note)=>{
        return note.title !== title
    })

    if ( notes.length > exists.length ) {
        console.log(chalk.inverse.green('Note deleted'))
        saveNotes(exists)
    } else {
        console.log(chalk.inverse.red('The note doesnt exist'))
    }

}

const  listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('Your notes'))
    notes.forEach(element => {
        console.log(`${element.title}`)        
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    //notes works but note does not 
    //title is popping up as undefined
    if (note) {
        console.log(chalk.inverse.blue(`Title: ${note.title}`))
        console.log(chalk.blue(`Contents: ${note.body}`))
    } else {
        console.log(chalk.inverse.red(`There are no notes recorded with the title ${note.title}`))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []

    }
}

module.exports = {
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes, 
    readNote: readNote
}