import React, { useState } from "react";
import { CSVReader, CSVDownloader } from "react-papaparse";

const CSVReader2AndDownloader = () => {
  const [dataPackage, setDataPackage] = useState([]);

  const handleOnDrop = (data) => {
    console.log(data);
    console.log(JSON.parse(data));
    // setDataPackage(data);
    // console.log("🟥 ~ file: CSVReader2AndDownloader.js ~ line 6 ~ dataPackage", dataPackage);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("file removed, data is: ", data);
  };

  const config = {
    delimiter: "", // auto-detect
    newline: "", // auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,

    skipEmptyLines: true,
  };

  const postag = () => {
    //takes in the data and tag it here and return the data array
    //put this function in the data for download
    const taggedArray = [
      {
        "Column 1": "1-1",
        "Column 2": "1-2",
        "Column 3": "1-3",
        "Column 4": "1-4",
      },
      {
        "Column 1": "2-1",
        "Column 2": "2-2",
        "Column 3": "2-3",
        "Column 4": "2-4",
      },
      {
        "Column 1": "3-1",
        "Column 2": "3-2",
        "Column 3": "3-3",
        "Column 4": "3-4",
      },
      {
        "Column 1": 4,
        "Column 2": 5,
        "Column 3": 6,
        "Column 4": 7,
      },
    ];

    return taggedArray;
  };

  return (
    <>
      <h5>
        Upload a single column CSV file, and this parse it, and append a second column with Parts of Speech that you can
        download.
      </h5>
      <CSVReader onDrop={handleOnDrop} onError={handleOnError} addRemoveButton onRemoveFile={handleOnRemoveFile}>
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>

      <CSVDownloader data={postag} type='button' filename={"filename"}>
        Download
      </CSVDownloader>
    </>
  );
};

export default CSVReader2AndDownloader;
