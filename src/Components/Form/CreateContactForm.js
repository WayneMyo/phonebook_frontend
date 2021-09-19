import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { TextField, Button, Alert } from '@mui/material';
import styled from 'styled-components';

function CreateContactForm(props) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState([]);
    const [phoneNum, setPhoneNum] = useState('');
    const [phoneNumErr, setPhoneNumErr] = useState([]);
    const [createResponse, setCreateResponse] = useState('');
    const [alert, setAlert] = useState(0);

    const handleNameInput = (event) => {
        if (event.target.value.replace(/\s/g, '') === '') setNameErr(['Name cannot be empty!']);
        else {
            setNameErr([]);
            setName(event.target.value.trim());
        }
    };

    const handlePhoneNumInput = (event) => {
        // assumptions
        // enforce country code
        // min and max valid phone number digits - https://www.quora.com/What-is-maximum-and-minimum-length-of-any-mobile-number-across-the-world
        if (event.target.value.replace(/ /g, '').match(/\+([0-9]{7,15}$)/)) {
            setPhoneNumErr([]);
            setPhoneNum(event.target.value.trim())
        } else if (event.target.value.replace(/\s/g, '') === '') setPhoneNumErr(['Phone number cannot be empty!'])
        else setPhoneNumErr(['Please enter a valid phone number!']);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name !== '' && phoneNum !== '') {
            const createContactApiEndpoint = 'https://6dwlo3q5bb.execute-api.us-east-1.amazonaws.com/createContact';
            axios.post(createContactApiEndpoint, {
                name: name,
                phoneNum: phoneNum
            }).then(res => {
                setCreateResponse(res.data);
                setAlert(1);
                setTimeout(() => {
                    setAlert(0);
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = '')
                    );
                }, 2000);
            }).catch(err => {
                setCreateResponse(err.response.data);
                setAlert(2);
                setTimeout(() => {
                    setAlert(0);
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = '')
                    );
                }, 2000);
            });
        }
        if (name === '') setNameErr(['Name cannot be empty!']);
        if (phoneNum === '') setPhoneNumErr(['Phone number cannot be empty!'])
    };

    return (
        <CreateContactFormStyled onSubmit={handleSubmit} preve>
            <TextField
                className='formField'
                label='Full Name'
                error={nameErr.length}
                helperText={nameErr.length ? nameErr[0] : ''}
                onChange={handleNameInput}
            />
            <TextField
                className='formField'
                label='Phone Number'
                error={phoneNumErr.length}
                helperText={phoneNumErr.length ? phoneNumErr[0] : ''}
                onChange={handlePhoneNumInput}
            />
            <Button className='formButton' variant="contained" color="success" type="submit">Submit</Button>
            <Button className='backButton' variant="contained" color="info" onClick={() => history.push('/')} >Back</Button>
            <div className="alert">
                {alert === 1 && <Alert varient="outlined" severity="success">{createResponse}</Alert>}
                {alert === 2 && <Alert varient="outlined" severity="error">{createResponse}</Alert>}
            </div>
        </CreateContactFormStyled>
    );
}

const CreateContactFormStyled = styled.form`
    width: 100%;
    .formField {
        width: 80%;
        margin: 1em auto;
        input{
            height: 2.5em;
            padding: .5em 1em;
        }
    }
    .alert {
        width: 60%;
        margin: .5em auto;
    }
    .formButton {
        width: 25%;
        height: 2rem;
        margin: 1em 1em;
        border-radius: .4em;
        background-color: green;
    }
    .backButton {
        width: 15%;
        height: 2rem;
        margin: 1em 1em;
        border-radius: .4em;
        background-color: gray;
    }
`;

export default CreateContactForm;