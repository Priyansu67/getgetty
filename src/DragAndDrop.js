import React,{useState} from 'react';
import axios from "axios";
import Jimp from "jimp";
const client = axios.create();


const DragAndDrop = () => {

  const [inputUrl, setInputUrl] = useState('');


  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();  };

  const handleDragLeave = e => {
    e.preventDefault();
    
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async e => { 
    e.preventDefault();
    if(inputUrl === '') {
      alert('Please enter a URL');
    }
    else if(!inputUrl.includes('media.gettyimages.com/')){
      alert('Please enter a Getty Images URL');
    }
    else{
      let id = idFromURL(inputUrl);
    await getty(id);
    }
  };

  const handleDrop = async e => {
    e.preventDefault();
    var imageUrl = e.dataTransfer.getData('text/html');
    var rex = /src="?([^"\s]+)"?\s*/;
    var url;
    url = rex.exec(imageUrl);
    let id = url[1].split("/")[4].split("?")[0];

    await getty(id);
    
    
  };

  return (
    <>
    <form className='form' onSubmit={e => handleSubmit(e)}>
      <input type='text' name='inputurl' value={inputUrl} onChange={e => setInputUrl(e.target.value)} placeholder='Enter Getty Image URL' />
      <button type='submit'>Download</button>
    </form>
    <div className='drag-drop-zone inside-drag-area'
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      >
      <p>Drag Image Here To Download</p>
    </div>
      </>
  );
};

export default DragAndDrop;





function isGettyID(input) {
    // Regex to match a Getty Images ID, which consists of 10 digits
    const gettyIDRegex = /^\d{8,10}$/;
    return gettyIDRegex.test(input);
}

function idFromURL(link) {
    const id = link.split("/")[4].split("?")[0];
    if (!isGettyID(id)) {
        console.log(`Invalid URL: ${link}`);
        process.exit(1);
    }
    return id;
}


async function downloadJpg(url) {
    try {
        const { data } = await client.get(url, { responseType: "arraybuffer" });
        return await Jimp.read(data);
    } catch (err) {
        console.log("Could not download the image");
        process.exit(1);
    }
}

async function mergeImages(imageOne, imageTwo) {
    const x = imageOne.bitmap.width;
    const y = imageOne.bitmap.height;

    const rectOne = { x: 0, y: 0, width: x, height: y / 5 * 3 };
    const rectTwo = { x: 0, y: y / 5 * 3, width: x, height: y };


    const newImage = new Jimp(x, y);

    const {x: srcx1, y: srcy1, width: srcw1, height: srch1} = rectOne;
    newImage.blit(imageOne, 0, 0, srcx1, srcy1, srcw1, srch1);

    const {x: srcx2, y: srcy2, width: srcw2, height: srch2} = rectTwo;
    newImage.blit(imageTwo, 0, y / 5 * 3, srcx2, srcy2, srcw2, srch2);

    return newImage;
}


async function getty(id) {
    const urlOne = `https://media.gettyimages.com/photos/-id${id}?s=2048x2048&w=5`;
    const urlTwo = `https://media.gettyimages.com/photos/-id${id}?s=2048x2048&w=125`;

    const imageOne = await downloadJpg(urlOne);
    const imageTwo = await downloadJpg(urlTwo);

    const newImage = await mergeImages(imageOne, imageTwo);

    const imageBuffer = await newImage.getBufferAsync(Jimp.MIME_JPEG);
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([imageBuffer], { type: Jimp.MIME_JPEG }));
    a.download = `${id}.jpg`;
    a.click();
}
