import OpenAI from "openai";

export const openai = new OpenAI({
    organization: 'org-x7LE1EOortseNW98HPCIMzye', 
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
})

export const genInitPrompt = (word) => {
    return `Give me 4 synonyms for the word ${word}. Format your response as an array, for example: ["word1", "word2", "word3", "word4"]. Do not include any other information in your response. All future messages will provide extra context for the word.`
}

export const generateText = async (word, messages) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',  
        temperature: 0.9,
        max_tokens: 50,
        messages: [{"role": "user", "content": genInitPrompt(word)}, ...messages]
    });
    // Return the generated text from the response
    return JSON.parse(response.choices[0].message.content)
}

export const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
  ];