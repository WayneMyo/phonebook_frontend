import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

function TableHeader(props) {
    const { headers, orderBy, order, handleSort } = props;
    const sortHandler = (property) => (event) => {
        handleSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {
                    headers.map((header, index) => (
                        <TableCell key={header.key} align={index > 0 ? "right" : "left"}>
                            <TableSortLabel
                                active={orderBy === header.key}
                                direction={orderBy === header.key ? order : "asc"}
                                onClick={sortHandler(header.key)}
                            >
                                {header.label}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;