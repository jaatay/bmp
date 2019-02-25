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

// test transformations
const testTransform = (colorArray) => {
    for(let i = 0; i < colorArray.length; i++){
        if(colorArray[i] === 0){
            colorArray[i] = 255;
        }
     }
}

const allTransform = (colorArray) => {
    for(let i = 0; i < colorArray.length; i++){
        colorArray[i] = 0;
    }
}

const allTransformWhite = (colorArray) => {
    for(let i = 0; i < colorArray.length; i++){
        colorArray[i] = 255;
     }
}

const reverseTransform = (colorArray) => {
    let reverseCounter = colorArray.length - 1;
    for(let i = 0; i < colorArray.length; i++){
        colorArray[i] = reverseCounter;
        reverseCounter --;
    }
}

const neonTransform = (colorArray) => {

    for(let i = 0; i < colorArray.length; i+=3){
        colorArray[i] = 0;
        colorArray[i + 1] = 191;
        colorArray[i + 2] = 255;
    }
}

const neonTransform2 = (colorArray) => {

    for(let i = 0; i < colorArray.length; i+=3){
        colorArray[i] = 255;
        colorArray[i + 1] = 0;
        colorArray[i + 2] = 191;
        colorArray[i + 3] = 0;
    }
}

//pixel array transform

const pixelTransform = (pixelArray) => {
    let reverseCounter = pixelArray.length - 1;
    for(let i = 0; i < pixelArray.length; i++){
        pixelArray[i] = reverseCounter;
        reverseCounter --;
    }
}


//file read
const readFile = (file, transformation) => {

    fs.readFile(file, function(err, data){
        if(err){
            throw err;
        }

        let newBitmap = new Bitmap(data);
    
     newBitmap.parse(data);


       console.log(newBitmap.offset);
      // console.log(newBitmap.colorArray);
      console.log(newBitmap.pixelArray);


      
        //color array
       let colorArray = data.slice(54, newBitmap.offset);
       console.log(colorArray);

       //pixel array
       let pixelArray = data.slice(newBitmap.pixelArray, 14068);
       console.log(pixelArray);


       transformation(colorArray);
        writeNewFile(data);

    
        
    });
    

}

readFile('./assets/baldy.bmp', neonTransform2);

