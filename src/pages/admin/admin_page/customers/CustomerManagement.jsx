import { Box, Button, Stack, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authInstance, db } from "../../../../service/auth";
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

  //get File
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Import file csv, setData
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

  // Save import Data to firebase cloudstore and auth (if dont have collection use addDoc,collection first)
  const handleSaveImportData = async (newData) => {
    for (let item of newData) {
      // Add import Data to Authen
      const res = await createUserWithEmailAndPassword(authInstance, item.email, item.password);
      // Add import Data to collection with id doc from auth
      await setDoc(doc(db, "customers", res.user.uid), { ...item, id: res.user.uid });
    }
  };

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
            <Button variant="contained">Add New</Button>
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
          <Button variant="contained" color="success" onClick={() => handleSaveImportData(data)}>
            Save
          </Button>
        </Stack>
      </Box>

      <CustomerList data={data} />
    </div>
  );
};

export default CustomerManagement;
