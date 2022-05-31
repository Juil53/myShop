import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field, FieldArray, useFormikContext, useField } from "formik";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { actGetOptions } from "../../../../../store/admin_product/action";

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select {...field} {...props} label={label} />
    </FormControl>
  );
};

export default function AttributeInput() {
  const dispatch = useDispatch();
  const {
    values: { attributes },
  } = useFormikContext();

  useEffect(() => {
    dispatch(actGetOptions());
  }, []);

  const optionsData = useSelector((state) => state.adminProduct.options);
  const detailAttribute = (attributeName) => {
    if (attributeName) {
      const { data = [] } =
        optionsData.find((option) => option.id == attributeName) || {};
      return data.map((option, index) => (
        <MenuItem key={`detailAttribute_${index}`} value={option.value}>
          {option.key}
        </MenuItem>
      ));
    } else {
      return <MenuItem></MenuItem>;
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <FieldArray name="attributes">
          {({ insert, remove, push }) => (
            <>
              <Grid item xs={12}>
                <Button
                  size="small"
                  color="secondary"
                  type="button"
                  onClick={() => push({ name: "", value: "" })}
                >
                  Click to add Attributes
                </Button>
              </Grid>

              {attributes.length > 0 &&
                attributes.map((attribute, index) => (
                  <React.Fragment key={`attribute_${index}`}>
                    <Grid item xs={3}>
                      <SelectInput
                        name={`attributes.${index}.name`}
                        variant="outlined"
                        size="small"
                        label="Attribute"
                        fullWidth
                      >
                        {optionsData.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </SelectInput>
                    </Grid>

                    <Grid item xs={8}>
                      <SelectInput
                        name={`attributes.${index}.value`}
                        variant="outlined"
                        size="small"
                        label="Detail"
                        fullWidth
                      >
                        {detailAttribute(attributes[index].name)}
                      </SelectInput>
                    </Grid>

                    <Grid item xs={1}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                      >
                        <IconButton
                          variant="outlined"
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </React.Fragment>
                ))}
            </>
          )}
        </FieldArray>
      </Grid>
    </>
  );
}
