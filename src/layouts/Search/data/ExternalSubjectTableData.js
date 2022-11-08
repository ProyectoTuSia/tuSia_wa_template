/* eslint-disable react/prop-types */
import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Checkbox, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useQuery } from "urql";
import soap from "soap";

// const DATA_QUERY_SUBJECTS = `
// query GetSubject {
//   getSubject {
//     Id_subject
//     Name_subject
//     Typology
//     Credits
//     Description
//     Id_career
//     Id_condition
//   }
// }`;

function SubjectsData(searchid, searchname) {
  const url = "https://interfaceSOAPSIA2B.crvargasm.repl.co/wsdl?wsdl";
  const [externalData, setExternalData] = useState();

  // Create client
  soap.createClient(url, function (err, client) {
    if (err) {
      throw err;
    }
    /*
     * Parameters of the service call: they need to be called as specified
     * in the WSDL file
     */

    var args = {
      id: 10,
    };

    // call the service
    client.Documents(args, function (err, res) {
      if (err) throw err;
      // print the service returned result
      console.log(res);
      setExternalData(res);
    });
  });

  // const [result, reexecuteQuery] = useQuery({
  //   query: DATA_QUERY_SUBJECTS,
  //   requestPolicy: "network-only",
  // });

  // const { data, fetching, error } = result;

  if (!externalData) {
    return {
      columns: [],
      rows: [],
    };
  }

  if (error) {
    return {
      columns: [],
      rows: [],
    };
  }

  // const listSubject =
  //   !searchid && !searchname
  //     ? data.getSubject
  //     : data.getSubject.filter(
  //         (dato) =>
  //           (dato.id.toString().includes(searchid) && searchid) ||
  //           (dato.nombre.toLowerCase().includes(searchname.toLocaleLowerCase()) && searchname)
  //       );

  //listSchedulesOfGroup.map((element) => props.selectedSchedules.push(element.schedule.id));

  return {
    columns: [
      { Header: "ID", accessor: "id", align: "right" },
      { Header: "Nombre Materia", accessor: "nombre", align: "center" },
      { Header: "Creditos", accessor: "creditos", align: "left" },
      { Header: "Typologia", accessor: "tipologia", align: "left" },
      { Header: "Sede", accessor: "sede", align: "left" },
      { Header: "Nivel de estudio", accessor: "nivelestudio", align: "left" },
      { Header: "Facultad", accessor: "facultad", align: "left" },
      { Header: "Descripcion", accessor: "descripcion", align: "left" },
      { Header: "Pre-Requisitos", accessor: "prerequisitos", align: "left" },
      { Header: "Codigo", accessor: "codigo", align: "left" },
    ],
    rows: listSubject.map((element) => ({
      id: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.id}
        </MDTypography>
      ),
      creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.creditos}
        </MDTypography>
      ),
      tipologia: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.tipologia}
        </MDTypography>
      ),
      sede: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.sede}
        </MDTypography>
      ),
      nivelestudio: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.nivelestudio}
        </MDTypography>
      ),
      facultad: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.facultad}
        </MDTypography>
      ),
      descripcion: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.descripcion}
        </MDTypography>
      ),
      prerequisitos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.prerequisitos}
        </MDTypography>
      ),
      code: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.code}
        </MDTypography>
      ),
    })),
  };
}

export default SubjectsData;
