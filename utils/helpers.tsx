"use client";
import axios, { AxiosResponse } from "axios";
import Jimp from "jimp";

export function isGettyID(input: string) {
  // Regex to match a Getty Images ID, which consists of 10 digits
  const gettyIDRegex = /^\d{8,10}$/;
  return gettyIDRegex.test(input);
}

export function idFromURL(link: string) {
  const id = link.split("/")[4].split("?")[0];
  if (!isGettyID(id)) {
    console.log(`Invalid URL: ${link}`);
  }
  return id;
}

async function downloadJpg(url: string) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    try {
      return await Jimp.read(response.data);
    } catch (err) {
      console.log("Could not read the image data");
    }
  } catch (err) {
    console.log("Could not download the image");
  }
}

async function mergeImages(imageOne: Jimp, imageTwo: Jimp) {
  const x = imageOne.bitmap.width;
  const y = imageOne.bitmap.height;

  const rectOne = { x: 0, y: 0, width: x, height: (y / 5) * 3 };
  const rectTwo = { x: 0, y: (y / 5) * 3, width: x, height: y };

  const newImage = new Jimp(x, y);

  const { x: srcx1, y: srcy1, width: srcw1, height: srch1 } = rectOne;
  newImage.blit(imageOne, 0, 0, srcx1, srcy1, srcw1, srch1);

  const { x: srcx2, y: srcy2, width: srcw2, height: srch2 } = rectTwo;
  newImage.blit(imageTwo, 0, (y / 5) * 3, srcx2, srcy2, srcw2, srch2);

  return newImage;
}

export async function getty(id: string) {
  const urlOne = `https://media.gettyimages.com/photos/-id${id}?s=2048x2048&w=5`;
  const urlTwo = `https://media.gettyimages.com/photos/-id${id}?s=2048x2048&w=125`;

  const imageOne = await downloadJpg(urlOne);
  const imageTwo = await downloadJpg(urlTwo);

  const newImage = await mergeImages(imageOne!, imageTwo!);

  const imageBuffer = await newImage.getBufferAsync(Jimp.MIME_JPEG);
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(
    new Blob([imageBuffer], { type: Jimp.MIME_JPEG })
  );
  a.download = `${id}.jpg`;
  a.click();
}
