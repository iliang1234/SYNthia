import React, { useState, useRef, useEffect } from 'react';
import { InstructText, MainInput, Container, SideMenu, Column, Header } from './styles';
import SuggestionBox from '../../components/SuggestionBox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { marks } from '../../utils';
import { data } from '../../components/SuggestionBox/index';

const downloadJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "p19_novice_helen";
    link.click();
    URL.revokeObjectURL(url);
};

const Main = () => {
    const inputRef = useRef(null);
    const [sugList, setSugList] = useState([]);
    const [numSuggestions, setNumSuggestions] = useState(5);
    const [wordCount, setWordCount] = useState(0);
    const prevTxt = useRef('');

    const [timerAt, setTimerAt] = useState(0);
    const [timerNotAt, setTimerNotAt] = useState(0);
    const [activeSuggestionBoxes, setActiveSuggestionBoxes] = useState(0); // Count of active SuggestionBoxes
    const [activeTypingInSuggestionBox, setActiveTypingInSuggestionBox] = useState(false); // Typing in SuggestionBox

    const intervalRef = useRef(null);

    const updateTimers = () => {
        if (activeTypingInSuggestionBox || inputRef.current.innerText.includes('@')) {
            setTimerAt((prev) => prev + 1);
        } else {
            setTimerNotAt((prev) => prev + 1);
        }
    };

    useEffect(() => {
        clearInterval(intervalRef.current); // Clear previous interval
        intervalRef.current = setInterval(updateTimers, 1000);
        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, [activeTypingInSuggestionBox, activeSuggestionBoxes]);

    const handleSuggestionBoxActivity = (isActive) => {
        setActiveSuggestionBoxes((prev) => (isActive ? prev + 1 : Math.max(prev - 1, 0)));
    };

    const handleTypingInSuggestionBox = (isTyping) => {
        setActiveTypingInSuggestionBox(isTyping);
    };

    const handleTextBoxFocus = () => {
        setActiveTypingInSuggestionBox(false); // User is now typing in the text box
    };

    const handleTextBoxBlur = () => {
        // Optionally handle when the text box loses focus
    };

    const handleKeyPress = (event) => {
        const txt = inputRef.current.innerText;

        if (event.key === '@') {
            const dif = txt.split(" ").filter(x => !prevTxt.current.split(" ").includes(x))[0];
            if (dif && dif[dif.length - 1] === '@' && dif[dif.length - 2] !== '\\') {
                setSugList([...sugList, dif.slice(0, -1)]);
            }
        }

        // Check if @ is removed
        const previouslyContainedAt = prevTxt.current.includes('@');
        const currentlyContainsAt = txt.includes('@');

        if (previouslyContainedAt && !currentlyContainsAt) {
            setTimerNotAt((prev) => prev + 1); // Update timerNotAt manually
        }

        prevTxt.current = txt; // Update the previous text reference
        setWordCount(txt.split(' ').length);
    };

    return (
        <Container>
            <Header>SYNthia: Your Personal Thesaurus</Header>
            <Column>
                <div style={{ position: 'absolute', top: 70, left: 0, padding: '10px', color: 'black', zIndex: 100 }}>
                    <div style={{ fontSize: '7px' }}>Time SYNthia: {timerAt} secs</div>
                    <div style={{ fontSize: '7px' }}>Time Writing: {timerNotAt} secs</div>
                </div>
                <InstructText>
                    Enter your text here. End a word with an '@' to request suggestions. For example, "nice@".
                    <div style={{ fontSize: '9px' }}>
                    You woke up in a motel room with a strange item in your hand. What do you do? Where do you go? 
                    Choose between a) a cell phone that can only call one specific number, b) a GPS to a mystery location 
                    1 mile away, or c) a sticky note with a list of seemingly random items, written in dried blood.
                    </div>
                </InstructText>
                <MainInput 
                    ref={inputRef} 
                    onKeyUp={handleKeyPress} 
                    onFocus={handleTextBoxFocus} 
                    onBlur={handleTextBoxBlur} 
                    contentEditable 
                    id={'inputArea'} 
                />
                <br/>
                <div style={{ textAlign: 'left' }}>Word Count: {wordCount}</div>
                <a href="#" onClick={downloadJSON} className="download-link" style={{ marginTop: '80px' }}>Download JSON</a>
            </Column>
            <SideMenu>
                <Box sx={{ width: 500 }}>
                    <InstructText>Number of suggestions per generation</InstructText>
                    <Slider
                        aria-label="Number of suggestions"
                        defaultValue={5}
                        getAriaValueText={(v) => v}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={10}
                        onChange={(e) => setNumSuggestions(e.target.value)}
                    />
                    <InstructText>Click a suggestion to copy it to your clipboard</InstructText>
                </Box>
                {sugList.map((suggestion) => (
                    <SuggestionBox 
                        key={suggestion} 
                        word={suggestion} 
                        numSuggestions={numSuggestions} 
                        onActivityChange={handleSuggestionBoxActivity} 
                        onTyping={handleTypingInSuggestionBox} 
                    />
                ))}
            </SideMenu>
        </Container>
    );
};

export default Main;
