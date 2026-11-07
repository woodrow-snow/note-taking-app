/*
    This file contains the directory object and typing (interface)
*/
import { Folder } from "./folder.js";
import { Note } from "./note.js";

export interface Directory {
    folders: Folder[]
}

export class Directory {
    constructor(folders: Folder[] | undefined = undefined) {
        if (folders) {
            this.folders = folders;
        } else {
            const defaultFolder = new Folder("default")
            this.folders = [defaultFolder]
        }
    }

    getFolders(): Folder[] {
        return this.folders
    }

    getFolder(folderId:number) {
        return this.folders[folderId]
    }

    addFolder(newFolder: Folder) {
        this.folders.push(newFolder);
    }

    createFolder(name: string, notes: Note[] | undefined = undefined) {
        const newFolder = new Folder(name, notes)
        this.addFolder(newFolder);
    }

    printFolderAndNoteTitles() {
        let folderCount = 1
        this.folders.forEach((f) => {
            // printing folder name
            console.log(`${folderCount}: ${f.getFolderName()}`)

            // printing each not title
            let noteCount = 1
            f.notes.forEach((n) => {
                console.log(`   ${noteCount}: ${n.getTitle()}`)
                noteCount++
            })
            folderCount++
        })
    }

    printFolders() {
        let counter = 1
        this.folders.forEach((f) => {
            console.log(`${counter}. ${f.getFolderName()}`)
            counter++
        })
    }

    moveNote(oldF: number, noteIndex: number, newF: number) {
        // getting note and adding to temp storage
        const tempNote = this.folders[oldF]?.getNote(noteIndex);

        // removing note from old folder
        this.folders[oldF]?.removeNote(noteIndex)

        // adding to new folder
        this.folders[newF]?.addNote(tempNote)
    }
}