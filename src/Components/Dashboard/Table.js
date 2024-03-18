import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@mui/material";

import { success, warning, secondary, tableContent } from "./styles";
import './Table.css'

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key} sx={tableContent} >{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, email, product, price, date, city, status }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal" sx={tableContent}>{name}</TableCell>
            <TableCell sx={tableContent}>{email}</TableCell>
            <TableCell sx={tableContent}>{product}</TableCell>
            <TableCell sx={tableContent}>{price}</TableCell>
            <TableCell sx={tableContent}>{date}</TableCell>
            <TableCell sx={tableContent}>{city}</TableCell>
            <TableCell sx={tableContent}>
              <Chip label={status} style={status === "Sent" ? success : (status === "Pending" ? warning : secondary)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
