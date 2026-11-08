/*
This file contains an object that holds all of the command function for the options users have to interact with the system
*/
// ---------- Imports ----------
import type { Directory } from "./objs/directory.js";
import { Folder } from "./objs/folder.js";
import { Note } from "./objs/note.js";
import { checkFolders, reportSavedNote, rl } from "./utils.js";

export const commands = {
    async createNewNote(dict: Directory) {
        // getting Note information
        // title
        console.log('What is the title of your new note?')
        const title = await rl.question('> ')

        // text
        console.log('What would you like your note to say?')
        const text = await rl.question('> ')

        // creating new note object
        const newNote = new Note(title, text)

        // getting folders from directory and checking them, if only the default, note will be saved in default
        if (checkFolders(dict.getFolders())) {
            dict.folders[0]?.addNote(newNote);

            reportSavedNote(title, "default")
        } else {
            // asking user which folder note should be saved in
            console.log("Which folder would you like to save your new note in?")

            // printing list of folders
            this.displayFolders(dict)

            // getting user input
            console.log('(Please type out the name of the folder)')
            const selectedFolder = String(await rl.question('> ')).toLowerCase().trim()

            // getting 0 based index for selected folder
            let counter = 0;
            dict.getFolders().forEach((f) => {
                if (f.getFolderName().toLowerCase().trim() === selectedFolder) {
                    // adding note and reporting to user
                    dict.getFolders()[counter]?.addNote(newNote)
                    const folderName: string = String(dict.getFolders()[counter]?.getFolderName())
                    reportSavedNote(title, folderName)
                    return
                } else {
                    counter++
                }
            })
            console.log()
        }
    },

    async createNewFolder(dict: Directory) {
        // getting folder information
        console.log("What is the name of the new folder?")
        const name = await rl.question('> ')

        // creating new folder
        const newFolder = new Folder(name)

        // saving folder
        dict.addFolder(newFolder)

        // reporting to user
        console.log(`Your new folder ${name} has been added to the directory!\n`)
    },

    async editNote(dict: Directory) {
        // printing all folders and their notes
        console.log("Please select the folder and note number for the note you would like to edit")
        this.displayNoteAndFolderTitles(dict)
        
        // getting folder and note numbers
        console.log('Which folder is the note in?')
        const folderNum = Number(await rl.question('> ')) -1

        console.log('What is the number for the note?')
        const noteNum = Number(await rl.question('> ')) - 1
        
        // getting new title and text for note
        console.log('What would you like to update the title to?')
        console.log("(If you don't want to update the title, hit enter)")
        const updatedTitle = await rl.question('> ')

        console.log('What would you like to update the text to?')
        console.log("(If you don't want to update the text, hit enter)")
        const updatedText = await rl.question('> ')

        // finding note in dict
        dict.getFolder(folderNum)?.updateNote(noteNum, updatedTitle, updatedText)
        
        console.log('Your note has been updated\n')
    },

    displayNoteAndFolderTitles(dict: Directory) {
        dict.printFolderAndNoteTitles()
        console.log()
    },

    displayFolders(dict: Directory) {
        dict.printFolders()
        console.log()
    },

    async displayAllNotesInFolder(dict: Directory) {
        // getting folder from user
        console.log('Please select a folder from the following selection')
        console.log('(Please enter in the number for the folder)')
        this.displayFolders(dict)

        const selectedFolderNum = await rl.question('> ');
        console.log()

        // getting folder from all folders
        const folder = dict.getFolder(Number(selectedFolderNum) - 1)

        // displaying all notes in folder
        console.log(`All notes in the folder ${folder?.getFolderName()}`)
        folder?.printNotes()
        console.log()
    },

    displayHelp() {
        console.log(`Here is a brief description of what each command does!
            1. Creating a new note:
                - running this command will allow you to create a new note and choose the folder you want it in!
            2. Edit existing note:
                - running this command will allow you to edit any existing note you have
            3. View note:
                - running this command will allow you to view a single note of your choice
            4. Move note to a new folder:
                - running this command will allow you to move a note from its current folder to a new one
            5. Create a new folder:
                - running this command will allow you to create a new folder to store notes in
            6. View all folders:
                - running this command will allow you to view all folders that you have created
            7. View all folder and note titles:
                - running this command will allow you to view all folders and the notes they contain (only their titles)
            8. View all note titles:
                - running this command will allow you to view all note titles within one folder
            9. Help:
                - running this command will allow you to see this information again
            10. Exit:
                - running this command will allow you to exit the program`)
    },

    async moveNote(dict:Directory) {
        // move note
        // notify user

        // getting OG folder and note id and new folder
        console.log("Here are the names and titles of all folders and notes:")
        this.displayNoteAndFolderTitles(dict)

        console.log('What is the id for the orginial folder?')
        const ogFolder = await rl.question('> ')

        console.log('What is the number for the note you want to move?')
        const noteIndex = await rl.question('> ')

        console.log("Which folder would you like to move the note to?")
        const newFolder = await rl.question('> ')

        // moving note
        dict.moveNote(Number(ogFolder)-1,Number(noteIndex)-1,Number(newFolder)-1)
        
        // notifying user
        console.log("The requested note has been moved!\n")
    },

    async viewNote(dict: Directory) {
        this.displayNoteAndFolderTitles(dict)

        // getting note and folder
        console.log('Which note would you like to view?')
        const folder = await rl.question('What is the number for the folder the note is in?\n> ')
        const note = await rl.question('What is the number of the note you want to view?\n> ')

        console.log()
        dict.getFolder(Number(folder)-1)?.printNote(Number(note)-1)
        console.log()
    },
}