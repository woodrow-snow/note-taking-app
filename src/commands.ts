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
            dict.getFolders().forEach((f) => {
                console.log(f.getFolderName())
            })

            // getting user input
            console.log('(Please type out the name of the folder)')
            const selectedFolder = await (await rl.question('> ')).toLowerCase().trim()
            let selectedIndex: number = -1;

            // getting 0 based index for selected folder
            dict.getFolders().forEach((f) => {
                let counter = 0;
                if (f.getFolderName().toLowerCase() == selectedFolder) {
                    selectedIndex = counter
                    return
                } else {
                    counter++
                }
            })

            // adding note and reporting to user
            dict.getFolders()[selectedIndex]?.addNote(newNote)
            const folderName: string = String(dict.getFolders()[selectedIndex]?.getFolderName())
            reportSavedNote('title', folderName)
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
    }
}