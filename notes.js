const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return 'Your notes'
}

const addNote = (title, body) => {
    const notes = loadNote()

    const duplicateNotes = notes.filter((notes) => {
        return notes.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
    } else {
        console.log(chalk.red.bold('Note title taken'));
    }

}

const removeNote = (title) => {
    const notes = loadNote()
    const keepNotes = notes.filter((note) => {
        return  note.title !== title
    })

    if (notes.length > keepNotes.length) {
        saveNotes(keepNotes);
        console.log(chalk.green.inverse('Note removed'));
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const listNotes = () => {
    const notes = loadNote();
    
    const chalkList = chalk.magenta('Your Notes');
    console.log(chalkList);

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

module.exports = {
    'getNotes': getNotes,
    'addNote': addNote,
    'removeNote': removeNote,
    'listNote': listNotes
};