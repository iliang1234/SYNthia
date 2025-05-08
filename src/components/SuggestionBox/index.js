import React, { useState, useEffect, memo } from 'react';
import { Container, CopiedText, Prompter, Row, SubmitButton, SuggestedWord, SuggestionGrid, TitleText } from './styles';
import XIcon from '../../assets/close.png';
import OpenAI from "openai";
import { v4 as uuidv4 } from 'uuid'; // Import a unique ID generator

export let data = [];

function addEntry(id, wordPrompted, contextsGiven, wordChosen) {
    const existingEntryIndex = data.findIndex(entry => entry.id === id);
    if (existingEntryIndex !== -1) {
        // Update the existing entry
        data[existingEntryIndex] = {
            id,
            word_prompted: wordPrompted,
            context_given: contextsGiven,
            word_chosen: wordChosen,
        };
    } else {
        // Add a new entry
        data.push({
            id,
            word_prompted: wordPrompted,
            context_given: contextsGiven,
            word_chosen: wordChosen,
        });
    }
}

const SuggestionBox = ({ word, numSuggestions, onActivityChange, onTyping }) => {
    const initPrompt = `From now on, give me ${numSuggestions} distinct synonyms for the word ${word}. You MUST format your response as an array, for example: ["word1", "word2", "word3", "word4"]. Do not include any other information in your response. If you cannot come up with ${numSuggestions}, provide as many as you can. All of my future messages will provide extra context for the word, you should incorporate them into your suggestions. The words you respond with should ALWAYS be synonyms for ${word} and match the additional context.`;

    const [suggestions, setSuggestions] = useState([]);
    const [messages, setMessages] = useState([{ role: "user", content: initPrompt }]);
    const [newMessage, setNewMessage] = useState("");
    const [visible, setVisible] = useState(true);
    const [copied, setCopied] = useState(false);
    const [logged, setLogged] = useState(false); // Track if the entry has been logged

    const boxId = React.useMemo(() => uuidv4(), []); // Generate a unique ID for this instance
    const [isFocused, setIsFocused] = useState(false);

    let wordPrompted = word;
    let wordChosen = "";
    let contextsGiven = messages.filter(msg => msg.role === "user").map(msg => msg.content);

    useEffect(() => {
        onActivityChange(true); // Notify Main when SuggestionBox opens

        return () => {
            onActivityChange(false); // Notify Main when SuggestionBox closes
        };
    }, [onActivityChange]);

    const handleInputChange = (e) => {
        const isTyping = e.target.value.trim().length > 0;
        setNewMessage(e.target.value);

        // Notify Main about typing activity
        onTyping(isTyping);
    };

    useEffect(() => {
        if (!logged && wordPrompted) {
            addEntry(boxId, wordPrompted, contextsGiven, wordChosen);
            setLogged(true); // Ensure the initial log happens only once
        }
    }, [logged, wordPrompted, contextsGiven, boxId]);

    useEffect(() => {
        const openai = new OpenAI({
            organization: 'org-x7LE1EOortseNW98HPCIMzye',
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const generateText = async () => {
            let attempts = 0;
            while (attempts < 3) {
                try {
                    const response = await openai.chat.completions.create({
                        model: 'gpt-4',
                        temperature: 0.9,
                        max_tokens: 50,
                        messages: messages,
                    });

                    setSuggestions(JSON.parse(response.choices[0].message.content));
                    break; // Exit the loop if parsing is successful
                } catch (err) {
                    attempts++;
                    if (attempts === 3) {
                        setSuggestions(['No suggestions available']);
                    }
                }
            }
        };

        generateText();
    }, [messages]);

    const handleCopy = (suggestion) => {
        navigator.clipboard.writeText(suggestion);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        wordChosen = suggestion;
        addEntry(boxId, wordPrompted, contextsGiven, wordChosen); // Update entry when word is chosen
    };

    const handleSubmit = () => {
        if (newMessage.trim()) {
            setSuggestions([]);
            setMessages(prevMessages => [...prevMessages, { role: "user", content: newMessage }]);
            setNewMessage("");
            addEntry(boxId, wordPrompted, [...contextsGiven, newMessage], wordChosen); // Update entry when context is added
        }
    };

    return (
        visible && (
            <Container
                onFocus={() => setIsFocused(true)} // Detect when SuggestionBox is focused
                onBlur={() => setIsFocused(false)} // Detect when SuggestionBox loses focus
            >
                <Row>
                    <TitleText style={{ fontWeight: 'bold' }}>{word}</TitleText>
                    <img
                        style={{ cursor: 'pointer', height: '20px', width: '20px' }}
                        src={XIcon}
                        onClick={() => setVisible(false)}
                        alt="Close"
                    />
                </Row>
                {copied && <CopiedText>Copied!</CopiedText>}
                <SuggestionGrid style={{ marginTop: copied ? '5px' : '23px' }}>
                    {suggestions.length > 0 ? (
                        suggestions.map(s => <SuggestedWord onClick={() => handleCopy(s)} key={s}>{s}</SuggestedWord>)
                    ) : (
                        'Loading...'
                    )}
                </SuggestionGrid>
                <Row>
                    <Prompter
                        value={newMessage}
                        onChange={handleInputChange}
                        placeholder='Add additional context...'
                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    />
                    <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </Row>
            </Container>
        )
    );
};

export default memo(SuggestionBox);
