import React from 'react';
import { useHistory } from "react-router-dom";
import TableContent from '../Components/Table/TableContent';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styled from 'styled-components';
import Slide from 'react-reveal/Slide';

function ViewContacts(props) {
    const history = useHistory();
    const headers = [
        { key: "name", label: "Name" },
        { key: "phone_num", label: "Phone Number" }
    ];

    return (
        <Slide left>
            <ViewContactsStyled>
                <h1>View Contacts</h1>
                <div className="buttonGrp">
                    <IconButton color="primary" aria-label="create contact" onClick={() => history.push('/create')}>
                        <AddCircleIcon className="icon" />
                    </IconButton>
                </div>
                <TableContent
                    apiEndpoint={"https://6dwlo3q5bb.execute-api.us-east-1.amazonaws.com/getContacts"}
                    headers={headers}
                />
            </ViewContactsStyled>
        </Slide>
    );
}

const ViewContactsStyled = styled.div`
    display: block;
    text-align: center;
    max-width: 900px;
    margin: auto;
    .buttonGrp{
        width: 100%;
        margin-bottom: 1rem;
        text-align: right;
    }
    .icon{
        font-size: 2rem;
    }
`;

export default ViewContacts;