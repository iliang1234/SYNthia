import styled from 'styled-components';

export const Container = styled.div`
    min-height: 250px;
    width: 400px;
    border: 1px solid #CED4DA;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const TitleText = styled.p`
    font-weight: bold;
    font-size: 24px;
    margin: 0px;
    margin-bottom: 5px;
    color: #495057;
`;

export const SuggestedWord = styled.p`
    background-color: #2274A5;
    padding: 8px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #18547B;
        transform: translateY(-3px);
    }
`;

export const SuggestionGrid = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 0px;
    margin-bottom: auto;
    gap: 5px;
`;

export const Prompter = styled.input`
    border-radius: 10px;
    border: 1px solid #CED4DA;
    height: 35px;
    width: 75%;
    font-size: 16px;
    padding-left: 10px;
    background-color: #F8F9FA;
    color: #495057;
    transition: border-color 0.3s ease;

    &::placeholder {
        font-style: italic;
        color: #6C757D;
    }

    &:focus {
        border-color: #2274A5;
        outline: none;
    }
`;

export const SubmitButton = styled.button`
    border-radius: 10px;
    padding: 8px 16px;
    background-color: #28A745;
    color: white;
    font-weight: bold;
    border: none;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #218838;
        transform: translateY(-3px);
    }

    &:active {
        transform: translateY(1px);
    }
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const CopiedText = styled.p`
    font-style: italic;
    margin-bottom: 0px;
    transition: background-color 0.75s linear;
    background-color: #E9F7EF;
    color: #155724;
    border-radius: 5px;
    width: fit-content;
    margin-top: 0px;
    padding: 5px 10px;
    border: 1px solid #C3E6CB;
`;