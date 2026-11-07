import { log } from "node:console";

/*
    This file contains the note object and typing (interface)
*/
export interface Note {
    title: string;
    text: string;
};

export class Note {
    constructor(title:string = "",text:string = "") {
        this.title = title
        this.text = text
    }
    
    // title get and set
    getTitle(): string {
        return this.title
    }

    setTitle(title:string) {
        this.title = title
    }

    // text get and set
    getText(): string {
        return this.text
    }

    setText(text: string) {
        this.text = text
    }

    print() {
        console.log(`${this.title}:\n${this.text}`);
    }
};