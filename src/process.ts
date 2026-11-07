/*
This file contains process functions for the application
*/
import { Directory } from "./objs/directory.js";
import { displayMenu } from "./utils.js";
import { rl } from "./utils.js";

export async function start() {
    // creating directory
    const dict: Directory = new Directory();

    while (true) {
        const end = await displayMenu(dict)
        if (end) {
            break;
        }
    }
    // closing readline to allow program to end
    rl.close()
}