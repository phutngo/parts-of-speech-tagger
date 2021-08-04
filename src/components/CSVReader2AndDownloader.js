import React from "react";
import { CSVReader, CSVDownloader } from "react-papaparse";
import { useState } from "react";

const Tag = require("en-pos").Tag;

const CSVReader2AndDownloader = () => {
  const [myData, setMyData] = useState(null);

  const handleOnDrop = (data) => {
    //console.log(data);
    //console.log(data[0]["data"][0]);
    setMyData(data);
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
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    skipEmptyLines: true,
  };


  //!transform myData here to an array of words
  const transform = myData? (_myData) => {
    let words = [];
    for (let i = 0; i < _myData.length; i++) {
      words.push(_myData[i]["data"][0]);
    }
    let tags = new Tag(words)
      .initial() // initial dictionary and pattern based tagging
      .smooth().tags; // further context based smoothing

    console.log(words);
    console.log(tags);

    return {};
  } : console.log("NOTHING");

  if (myData) transform(myData);



  // console.log("🟣 ~ file: CSVReader2AndDownloader.js ~ line 8 ~ myData", myData);
  // myData ? console.log(myData[0]["data"][0]) : console.log("no myData yet");

  //then use postag to return the transformed myData for download.
  const postag = () => {
    return myData;
  };

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
