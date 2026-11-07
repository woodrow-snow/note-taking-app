/*
    This file contains the folder object and typing (interface)
*/
import { Note } from "./note.js";

export interface Folder {
    folderName: string;
    notes: Note[];
};

export class Folder {
    constructor(folderName: string, notes: Note[] | undefined = undefined){
        this.folderName = folderName
        if (notes) {
            this.notes = notes
        }
        else {
            this.notes = []
        }
    }

    // get, set, and add functions
    getNotes(): Note[] {
        return this.notes
    }

    getFolderName(): string {
        return this.folderName
    }

    setFolderName(folderName:string) {
        this.folderName = folderName
    }

    addNote(note: Note) {
        this.notes.push(note);
    }

    printNotes(current: number = 0) {
        /*
            this function uses recursion to print out all of the notes in a folder. First call should not have parameter. recursive calls will have parameter
        */
        const notesLen: number = this.notes.length - 1

        // working with 0 based index
        if (notesLen == -1) {
            console.log("There is nothing in this folder to display!")
        } else if (current <= notesLen) {
            // printing note
            this.notes[current]?.print()

            // adding new line if there are more items to print
            if (current != notesLen) {
                console.log()
            }

            // increasing counter and calling again
            current++
            this.printNotes(current)
        }
    }
}