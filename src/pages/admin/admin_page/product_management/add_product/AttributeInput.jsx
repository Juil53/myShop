import React, { useEffect } from "react";
import { Button, Grid, IconButton, MenuItem, Stack } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actGetOptions } from "../../../../../store/admin_product/action";
import { selectAttributes } from "../../../../../store/admin_product/selector";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectInput from "./SelectInput";

export default function AttributeInput({ productInfo }) {
  const dispatch = useDispatch();
  const {
    values: { attributes },
  } = useFormikContext();

  useEffect(() => {
    dispatch(actGetOptions());
  }, []);

  const options = useSelector(selectAttributes);

  const attributeDetail = (attributeName) => {
    if (attributeName) {
      const { data = [] } =
        options.find((option) => option.name === attributeName) || {};
      return data.map((option, index) => (
        <MenuItem key={`attributeDetail_${index}`} value={option.value}>
          {option.value}
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
                    {/* Options */}
                    <Grid item xs={3}>
                      <SelectInput
                        name={`attributes.${index}.name`}
                        variant="outlined"
                        size="small"
                        label="Attribute"
                        fullWidth
                      >
                        {/* Add */}
                        {options.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}

                        {/* Edit */}
                        <MenuItem key={index} value={attribute.name} disabled>
                          {attribute.name}
                        </MenuItem>
                      </SelectInput>
                    </Grid>

                    {/* Detail options */}
                    <Grid item xs={8}>
                      <SelectInput
                        name={`attributes.${index}.value`}
                        variant="outlined"
                        size="small"
                        label="Detail"
                        fullWidth
                      >
                        {/* Add */}
                        {attributeDetail(attributes[index].name)}

                        {/* Edit */}
                        <MenuItem key={index} value={attribute.value} disabled>
                          {attribute.value}
                        </MenuItem>
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
