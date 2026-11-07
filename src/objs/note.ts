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

    private setTitle(title:string) {
        this.title = title
    }

    // text get and set
    getText(): string {
        return this.text
    }

    private setText(text: string) {
        this.text = text
    }

    updateNote(title: string = '', text: string = '') {
        if (title) {
            this.setTitle(title)
        }
        if (text) {
            this.setText(text)
        }
    }

    print() {
        console.log(`${this.title}:\n${this.text}`);
    }
};