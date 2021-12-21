import React from "react";
import { Form } from "semantic-ui-react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import _ from "lodash";

import OutputField from "../OutputField/OutputField";
import SelectArea from "../SelectArea/SelectArea";
import InputField from "../InputField/InputField";
import TranslateBtn from "../Button/Button";

function Body() {
  const [inputText, setInputText] = useState("");
  const [debouncedState, setDebouncedState] = useState("");
  const [detectedLanguageKey, setDetectedLanguageKey] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [selectedLanguageKey, setSelectedLanguageKey] = useState("");
  const [outputText, setOutputText] = useState("");

  const inputFieldChange = (e) => {
    setInputText(e.currentTarget.value);
    debounce(e.currentTarget.value);
  };

  const debounce = useCallback(
    _.debounce((text) => {
      setDebouncedState(text);
      // send the server request here
    }, 1000),
    []
  );

  const getLanguageSource = () => {
    if (!inputText) {
      return;
    }

    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then((response) => {
        setDetectedLanguageKey(response.data[0].language);
      });
  };

  useEffect(() => {
    if (!debouncedState) {
      return;
    }

    axios
      .post(`https://libretranslate.de/detect`, {
        q: debouncedState,
      })
      .then((response) => {
        setDetectedLanguageKey(response.data[0].language);
      });
  }, [debouncedState]);

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguageList(response.data);
    });
  }, []);

  const languageKey = (selectedLanguage) => {
    setSelectedLanguageKey(selectedLanguage.target.value);
  };

  const translate = () => {
    if (!selectedLanguageKey) {
      alert("Select language");
      return;
    }

    getLanguageSource();

    let data = {
      q: debouncedState,
      source: detectedLanguageKey,
      target: selectedLanguageKey,
    };

    axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      setOutputText(response.data.translatedText);
    });
  };

  return (
    <div>
      <Form>
        <InputField
          onChange={inputFieldChange}
          value={inputText}
          detected={detectedLanguageKey}
        />
        <SelectArea
          list={languageList}
          value={selectedLanguageKey}
          onChange={languageKey}
        />
        <OutputField value={outputText} />
        <TranslateBtn onClick={translate} />
      </Form>
    </div>
  );
}

export default Body;
