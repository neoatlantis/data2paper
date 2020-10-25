import { EventEmitter } from "./EventEmitter.js";


class DropFileLoader extends EventEmitter {

    constructor (obj){
        super();
        const self = this;

        var dropZone = $(obj)[0];

        // Optional. Show the copy icon when dragging over. 
        // Seems to only work for chrome.
        dropZone.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        // Get file data on drop
        dropZone.addEventListener('drop', async function(e) {
            e.stopPropagation();
            e.preventDefault();
            var files = e.dataTransfer.files; // Array of all files

            for(let file of files){
                let data = await file.arrayBuffer()
                self.emit("load", new Uint8Array(data), {
                    type: file.type,
                    name: file.name,
                    size: file.size,
                });
                break;
            }

        });
    
    }

}

export { DropFileLoader };
