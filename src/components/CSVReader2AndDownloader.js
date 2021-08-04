import React from "react";
import { CSVReader, CSVDownloader } from "react-papaparse";
import { useState } from "react";

const Tag = require("en-pos").Tag;

const CSVReader2AndDownloader = () => {
  const [myData, setMyData] = useState(null);

  const handleOnDrop = (data) => {
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

  return (
    <>
      <h4>Step 1: Upload a single column CSV file.</h4>
      <h4>Step 2: Wait for processing to complete.</h4>
      <h4>
        Step 3: Download the processed file. This file has an additional column that specifies the POS - Parts of Speech
        of each word.
      </h4>
      <h4>
        Step 4: Refer to this link to understand the keys.
        <a href='https://github.com/finnlp/en-pos#annotation-specification'>See here for tags meanings</a>
      </h4>
      <h4>Step 5: PROFIT</h4>
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
