import { FormControl, InputLabel, Select } from "@mui/material";
import { useField } from "formik";

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl sx={{ width: "100%"}}>
      <InputLabel id="demo-simple-select-standard-label" sx={{top:'-4px'}}>{label}</InputLabel>
      <Select {...field} {...props} label={label} />
    </FormControl>
  );
};

export default SelectInput;