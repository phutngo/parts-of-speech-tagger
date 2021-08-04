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

  if (myData) {
    let words = [];
    for (let i = 0; i < myData.length; i++) {
      words.push(myData[i]["data"][0]);
    }
    let tags = new Tag(words)
      .initial() // initial dictionary and pattern based tagging
      .smooth().tags; // further context based smoothing

    var final = [];
    for (let i = 0; i < myData.length; i++) {
      final.push({
        ORIGINAL: words[i],
        POSTAGS: tags[i],
      });
    }
    //setMyData(final);
    // console.log(words);
    // console.log(tags);
    // console.log(myData);
    // console.log(final)
  }

  // console.log("🟣 ~ file: CSVReader2AndDownloader.js ~ line 8 ~ myData", myData);
  // myData ? console.log(myData[0]["data"][0]) : console.log("no myData yet");

  //then use postag to return the transformed myData for download.

  return (
    <>
      <h5>
        Upload a single column CSV file, and this parse it, and append a second column with Parts of Speech that you can
        download.
      </h5>
      <h5>
        <a href='https://github.com/finnlp/en-pos#annotation-specification'>See here for tags meanings</a>
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
      <div>After uploading file, wait for parse to complete then click download.</div>
      <CSVDownloader data={() => final} type='button' filename={"filename"}>
        Download
      </CSVDownloader>
    </>
  );
};

export default CSVReader2AndDownloader;
