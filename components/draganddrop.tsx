"use client";
import React, { useState } from "react";
import { getty,idFromURL } from "@/utils/helpers";



const DragAndDrop = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [dragevent, setDragEvent] = useState<React.DragEvent<HTMLDivElement>>();
  const [dndloading, setDndLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEvent(e);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEvent(e);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEvent(e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputUrl === "") {
      alert("Please enter a URL");
    } else if (!inputUrl.includes("media.gettyimages.com/")) {
      alert("Please enter a Getty Images URL");
    } else {
        setBtnLoading(true);
      let id = idFromURL(inputUrl);
      await getty(id).finally(() => setBtnLoading(false));
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDndLoading(true);
    var imageUrl = e.dataTransfer.getData("text/html");
    var rex = /src="?([^"\s]+)"?\s*/;
    var url;
    url = rex.exec(imageUrl);
    let id = url![1].split("/")[4].split("?")[0];

    await getty(id).finally(() => setDndLoading(false));
  };

  return (
    <>
      <form 
      className="w-full mx-auto mt-10"
      onSubmit={(e) => handleSubmit(e)}>
<span className="w-full text-center text-lg text-red-500">Alert: Recently, GettyImages patched their code and there is no more solution to bypass the code.I'm sorry😢</span>
        <div
            className="flex flex-col sm:flex-row gap-2 mb-4"
        >
        <input
          type="text"
          name="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter Getty Image URL"
          className="w-full h-10 px-3 text-base text-gray-100 placeholder-gray-400 border border-gray-500 rounded-lg focus:outline-none focus:border-white bg-transparent"
          />
        <button 
        disabled={btnloading || dndloading}
         className="sm:w-1/3 h-10 text-base border border-gray-500 rounded-lg hover:bg-gray-200 hover:text-black bg-transparent"
         type="submit">
            {btnloading ? "Downloading..." : "Download"}
         </button>
         </div>
      </form>
      <div
        className={`flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-400 rounded-lg ${
          dragevent?.type === "dragover" ? "bg-gray-200/10" : ""
        }`}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="font-medium ">
                {dndloading ? "Loading..." : "Drag and Drop Getty Images"}
            </span>
        </span>
      </div>
    </>
  );
};

export default DragAndDrop;
