import styled from 'styled-components';

export const InstructText = styled.p`
    color: #495057;
    font-size: 16px;
    font-style: italic;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: center;
    line-height: 1.6;
`;

export const MainInput = styled.div`
    width: 50vw;
    height: 65vh;
    padding: 15px;
    border: 1px solid #CED4DA;
    border-radius: 12px;  
    background-color: #F8F9FA;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  
    font-size: 16px;
    color: #495057; 
    line-height: 1.6;
    font-family: 'Roboto', sans-serif; 
    word-wrap: break-word;
    margin-top: 20px;
    overflow: auto;
`;

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    background-color: #E9ECEF;
    padding-top: 80px;  /* Increased padding to avoid header overlap */
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    align-items: center;
    width: 60vw;
    padding: 20px;
`;

export const SideMenu = styled.div`
    width: 35vw;  /* Slightly reduced size for a balanced look */
    border-left: 1px solid #CED4DA;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background-color: #FFFFFF;
    box-shadow: -2px 0 12px rgba(0, 0, 0, 0.05); /* Softer shadow */
    padding: 20px;
`;

export const WritingOutput = styled.p`
    width: 90%;  /* Increased width for better alignment */
    word-wrap: break-word;
    margin-bottom: 40px;
    min-height: 40%;
    border: 2px solid #CED4DA;
    border-radius: 10px;
    padding: 15px;
    background-color: #FFFFFF;
    color: #495057;
    font-size: 16px;
    line-height: 1.6;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  /* Softer shadow */
`;

export const Header = styled.div`
    width: 100%;
    background-color: #F4F4F4;
    color: #333;
    text-align: center;
    font-size: 28px;  /* Increased font size for better prominence */
    font-weight: bold;
    padding: 20px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* Light shadow to separate header from content */
`;
