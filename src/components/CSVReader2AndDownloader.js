import React from "react";
import { CSVReader, CSVDownloader } from "react-papaparse";
import { useState } from "react";

const CSVReader2AndDownloader = () => {
  const [myData, setMyData] = useState(null);

  const handleOnDrop = (data) => {
    console.log(data);
    console.log(data[0]["data"][0]);
    setMyData(data);

    //console.log(JSON.parse(data));
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
    header: false,
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
    const taggedArray = myData;

    return taggedArray;
  };

  console.log("🟣 ~ file: CSVReader2AndDownloader.js ~ line 8 ~ myData", myData);

  return (
    <>
      <h5>
        Upload a single column CSV file, and this parse it, and append a second column with Parts of Speech that you can
        download.
      </h5>
      <CSVReader
        config={config}
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>

      <CSVDownloader data={postag} type='button' filename={"filename"}>
        Download
      </CSVDownloader>
    </>
  );
};

export default CSVReader2AndDownloader;
