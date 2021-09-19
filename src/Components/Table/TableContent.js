import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableBody, TableCell, TableRow, TablePagination } from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import styled from 'styled-components';
import TableHeader from './TableHeader';

function TableContent(props) {
    const { apiEndpoint, headers } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(headers[0].key);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const getData = () => {
        var queryStr = `?page=${page + 1}&items=${rowsPerPage}&orderBy=${orderBy}&order=${order}`;
        axios.get(apiEndpoint + queryStr).then(
            res => {
                setRows(res.data.data);
                setTotal(res.data.count);
            }
        );
    };

    useEffect(() => {
        getData();
    }, [order, orderBy, page, rowsPerPage]);

    const handleSort = (event, property) => {
        const isAscending = (orderBy === property && order === 'asc');
        setOrderBy(property);
        setOrder(isAscending ? 'desc' : 'asc');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    return (
        <TableContentStyled>
            <TableContainer className='contentTableContainer' component={Paper}>
                <Table className='contentTable'>
                    <TableHeader
                        headers={headers}
                        orderBy={orderBy}
                        order={order}
                        handleSort={handleSort}
                    />
                    <TableBody>
                        {
                            rows.map((rowEles, index) => (
                                <TableRow key={rowEles[0]}>
                                    {
                                        rowEles.map((element, eleIndex) => {
                                            if (eleIndex === rowEles.length - 1) {
                                                return (
                                                    <TableCell key={element} align="right">
                                                        {element}
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={element} component="th" scope="row">
                                                        {element}
                                                    </TableCell>
                                                )
                                            }
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className="contentTablePagination"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContentStyled>
    );
}

const TableContentStyled = styled.div`
    width: 100%;
`;

export default TableContent;