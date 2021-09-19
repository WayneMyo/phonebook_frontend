import React from 'react';
import styled from 'styled-components';
import CreateContactForm from '../Components/Form/CreateContactForm';
import Slide from 'react-reveal/Slide';

function CreateContact(props) {
    return (
        <Slide left>
            <CreateContactStyled>
                <h1>Create Contact</h1>
                <CreateContactForm />
            </CreateContactStyled>
        </Slide>
    );
}

const CreateContactStyled = styled.div`
    display: block;
    text-align: center;
    max-width: 900px;
    margin: auto;
`;

export default CreateContact;