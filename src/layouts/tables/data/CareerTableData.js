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
  const [idCheckeados, setIdCheckeados] = useState([]);

  //Metodo para modificar la lista de los id checkeados
  const modificarCheckeados = (event) => {
    if (event.target.checked) {
      //Si esta checkeado agregarlo a la lista de checkeados
      idCheckeados.push(event.target.id);
    } else {
      //Si ya no esta checkeado quitarlo de la lista de checkeados
      idCheckeados.splice(idCheckeados.indexOf(event.target.id), 1);
    }
  };

  /**
   * Metodo para vaciar el hook al devolverse
   */
  const emptyIdCheckeados = () => {
    setIdCheckeados([]);
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
      username,
      careerCheckList: idCheckeados,
      emptyIdCheckeados,
    };
  }

  if (error) {
    return {
      columns: [],
      rows: [],
      username,
      careerCheckList: idCheckeados,
      emptyIdCheckeados,
    };
  }

  return {
    columns: [
      { Header: "Seleccionar", accessor: "Seleccionar", align: "right" },
      { Header: "Código", accessor: "Codigo", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "left" },
    ],

    rows: [
      {
        Seleccionar: (
          <MDBox ml={-1}>
            <Checkbox
              id={data.ins_getCareersOfStudent[0].career.code}
              onChange={modificarCheckeados}
            />
          </MDBox>
        ),
        Codigo: (
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
    username,
    careerCheckList: idCheckeados,
    emptyIdCheckeados,
  };
}
