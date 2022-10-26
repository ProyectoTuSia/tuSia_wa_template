import MDBox from "components/MDBox";
import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Checkbox } from "@mui/material";
import { useQuery } from "urql";
import jwtDecode from "jwt-decode";

const DATA_QUERY_CAREER = `
query Ins_getCareersOfStudent($username: String!) {
  ins_getCareersOfStudent(username: $username) {
    career {
      code
      name
    }
  }
}`;

export default function CareerData() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(jwtDecode(token).email.split("@")[0]);

  //Hook para saber los id de los checkbox seleccionados

  const [idCheckeados, setidCheckeados] = useState([]);

  //Metodo para modificar la lista de los id checkeados
  const modificarCheckeados = (event) => {
    //Si ya estaba en la lista de checkeados, quitarlo
    if (idCheckeados.includes(event.target.id)) {
      idCheckeados.splice(idCheckeados.indexOf(event.target.id), 1);
    } else {
      //Si no estaba, agregarlo a la lista
      idCheckeados.push(event.target.id);
    }

    console.log(idCheckeados)
  };

  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_CAREER,
    variables: {
      username,
    },
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return {
      columns: [],
      rows: [],
      carrer: false,
      careerCheckList: idCheckeados,
    };
  }

  if (error) {
    return {
      columns: [],
      rows: [],
      carrer: false,
      careerCheckList: idCheckeados,
    };
  }

  return {
    columns: [
      { Header: "Check:", accessor: "Check", align: "right" },
      { Header: "Id", accessor: "Id", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "left" },
    ],

    rows: [
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox
              id={data.ins_getCareersOfStudent[0].career.code}
              onChange={modificarCheckeados}
            />
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {data.ins_getCareersOfStudent[0].career.code}
          </MDTypography>
        ),
        Nombre: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {data.ins_getCareersOfStudent[0].career.name}
          </MDTypography>
        ),
      },
    ],
    carrer: data.ins_getCareersOfStudent[0].career.code,
    careerCheckList: idCheckeados,
  };
}
