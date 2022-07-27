import { FormControl, InputLabel } from "@mui/material";
import { useField } from "formik";
import { CustomSelect } from "../../../../../styles/styled_components/styledComponent";

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl sx={{ width: "100%"}}>
      <InputLabel id="demo-simple-select-standard-label" sx={{top:'-7px'}} >{label}</InputLabel>
      <CustomSelect {...field} {...props} label={label} />
    </FormControl>
  );
};

export default SelectInput;