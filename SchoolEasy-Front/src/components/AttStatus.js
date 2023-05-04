import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AttStatus(props) {
  const [showtext, setShowtext] = useState(false);
  useEffect(() => {
    setShowtext(null);
  }, [props.page]);
  const handleActive = async (id, flag, name) => {
    try {
      const response = await axios({
        method: "put",
        url: "http://localhost:8080/Absent/" + id,
        headers: {
          Accept: "application/json",
        },
        data: {
          flag: flag,
          name: name,
        },
      }).then((res) => {
        console.log("cdssdcs", res.data);
        setShowtext(res.data.stat);
      });
      // window.location.href = "/AllUsers";
    } catch (error) {
      console.log("error while calling gettinr user", error);
    }
  };

  return (
    <div>
      {!showtext && (
        <TableCell className="row">
          <Button
            className="col-md-4"
            variant="contained"
            color="primary"
            onClick={(e) =>
              handleActive(props.user._id, "Present", props.user.name)
            }
            style={{ marginRight: 10 }}
          >
            Present
          </Button>
          <Button
            className="col-md-4"
            variant="contained"
            color="secondary"
            onClick={(e) =>
              handleActive(props.user._id, "Absent", props.user.name)
            }
          >
            Absent
          </Button>
        </TableCell>
      )}{" "}
      {showtext && <p>{showtext}</p>}
    </div>
  );
}

export default AttStatus;
