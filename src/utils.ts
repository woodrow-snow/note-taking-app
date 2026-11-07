/* 
This file contains utility functions to be used through the application
*/
// ---------- import statements ----------
import * as readline from "node:readline/promises";
import { Folder } from "./objs/folder.js";
import { Note } from "./objs/note.js";
import { Directory } from "./objs/directory.js";
import { commands } from "./commands.js";

// ---------- exported functions ----------
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function checkFolders(folderList: Folder[]): boolean{
    const allfolderTitles = folderList.map((folder) => {
        return folder.getFolderName()
    })

    const isOnlyDefault = () => { // function that filters out the default folder name and check if there is anything left
        const remainingNames = allfolderTitles.filter((name) => {
            if (name != 'default') {
                return name
            }
        })

        if (remainingNames.length > 0) {
            return false
        } else {
            return true
        }
    }

    return isOnlyDefault();
}

export async function displayMenu(dict: Directory) {
    console.log("Please choose an action from the list below!");
    console.log("1. Create new note\n2. Edit existing note\n3. Move note to a new folder\n4. Create a new folder\n5. View all folders\n6. View all folder and note titles\n7. View all note titles in folder\n8. Help\n9. Exit")

    // getting user input
    const userInput = await rl.question('> ')
    console.log()

    if (userInput == '9') {
        return true;
    } else {
        await processMenuOption(dict, userInput)
    }
};

export function reportSavedNote(title:string, folderName:string) {
    console.log(`Your new note "${title}" has been saved to the ${folderName} folder`)
}

async function processMenuOption(dict:Directory, option: string) {
    /* 
        This function receives one parameter which is user input for the menu options. Then it compares the option selected with each item in the list.
    */
    const optNum = Number(option); // converting received response from str to int

    if (optNum == 1) {
        // Create New Note
        await commands.createNewNote(dict);
    } else if (optNum == 2) {
        // edit existing note
        await commands.editNote(dict);
    } else if (optNum == 3) {
        // Move Note to different folder
        commands.moveNote(dict)
    } else if (optNum == 4) { 
        // Create a new folder
        await commands.createNewFolder(dict)
    } else if (optNum == 5) {
        // view all folders
        commands.displayFolders(dict)
    } else if (optNum == 6) {
        // view all folder and note titles
        await commands.displayNoteAndFolderTitles(dict)
    } else if (optNum == 7) {
        // view all note titles in folder
        await commands.displayAllNotesInFolder(dict)
    } else if (optNum == 8) {
        // help
        commands.displayHelp()
    } else {
        // catch everything else
    }
}