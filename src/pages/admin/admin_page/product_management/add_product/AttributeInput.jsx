import { Button, Grid, IconButton, MenuItem, Select, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormikContext } from "formik";

export default function AttributeInput() {
  const { 
    values
  } = useFormikContext();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            size="small"
            color="secondary"
            type="button"
            onClick={() => {}}
          >
            Click to add Attributes
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Select
            name={`attribute[].name`}
            variant="outlined"
            size="small"
            fullWidth
            // onChange=""
          >
            <MenuItem value="insurances">Insurances</MenuItem>
            <MenuItem value="origin">Origin</MenuItem>
            <MenuItem value="material">Material</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={8}>
          <Select
            name={`attribute[].value`}
            variant="outlined"
            size="small"
            fullWidth
          >
            
          </Select>
        </Grid>

        <Grid item xs={1}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <IconButton variant="outlined" onClick={() => {}}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
