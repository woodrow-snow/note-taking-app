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

    addFolder(newFolder: Folder) {
        this.folders.push(newFolder);
    }

    createFolder(name: string, notes: Note[] | undefined = undefined) {
        const newFolder = new Folder(name, notes)
        this.addFolder(newFolder);
    }
}