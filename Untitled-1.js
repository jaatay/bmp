'use strict';

const fs = require('fs');

//quokka test 

//bitmap class
class Bitmap{
    constructor(filepath){
        this.filepath = filepath;
    }

    parse(buffer){
        this. buffer = buffer;
        this.type = buffer.toString('utf-8', 0, 2);
        this.size = buffer.readInt32LE(2);
        this.offset = buffer.readInt32LE(10);
        this.headerSize = buffer.readInt32LE(14);
        this.width = buffer.readInt32LE(18);
        this.height = buffer.readInt32LE(22);
        this.bitsPerPixel = buffer.readInt16LE(28);
        this.colorArray = buffer.slice(54, this.offset);
        this.pixelArray = buffer.slice(1078);
    
    }
}


//make something into a buffer
const bufferize = file => {
    return Buffer.from(file);
}

//convert to JSON
const convertToJSON = buffer => {
    return buffer.toJSON();
}

//write file 
//write file 
const writeNewFile = inputFile => {

    fs.writeFile('./assets/testFile.bmp', inputFile, (err) => {
        if(err){
            throw err;
        }
        console.log('Status 200');
    });
}

//file read
const readFile = file => {

    fs.readFile(file, function(err, data){
        if(err){
            throw err;
        }

        let newBitmap = new Bitmap(data);
       // console.log(newBitmap);

    
     newBitmap.parse(data);


        // console.log(newBitmap);
       // console.log(newBitmap.offset);
       //console.log(newBitmap.colorArray);

       let colorArrayJson = convertToJSON(newBitmap.colorArray);

       console.log(colorArrayJson.data);

        for(let i = 0; i < colorArrayJson.data; i++){
           if(colorArrayJson.data[i] == 0){
               colorArrayJson.data[i] = 255;
           }
        }

        console.log(colorArrayJson.data);
        newBitmap.colorArray = colorArrayJson;
        writeNewFile(data);

    
        
    });
    

}

readFile('./assets/baldy.bmp');