import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerList from "./CustomerList";

const style = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const CustomerManagement = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    array.pop();
    setData(array);
  };

  //Save import Data to JsonServer
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (file) {
  //     fileReader.readAsText(file);
  //     fileReader.onload = (event) => {
  //       const csvOutput = event.target.result;
  //       csvFileToArray(csvOutput);
  //     };
  //   }
  // };

  useEffect(() => {
    if (file) {
      fileReader.readAsText(file);
      fileReader.onload = (event) => {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };
    }
  }, [file]);

  return (
    <div>
      <Box sx={style.container}>
        <Typography variant="h4" fontWeight={400}>
          Customers Management
        </Typography>

        <Stack direction="row" spacing={1}>
          <Link to="/admin/customers/add">
            <Button variant="contained" color="secondary">
              Add New
            </Button>
          </Link>
          <form>
            <label htmlFor="import">
              <input
                type="file"
                id="import"
                accept=".csv"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <Button variant="contained" color="warning" component="span">
                Import
              </Button>
            </label>
          </form>
          <Button variant="contained" color="success">
            Save
          </Button>
        </Stack>
      </Box>

      <CustomerList data={data} />
    </div>
  );
};

export default CustomerManagement;
