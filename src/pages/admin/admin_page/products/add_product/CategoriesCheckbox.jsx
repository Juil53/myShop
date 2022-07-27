import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { useFormikContext } from "formik";

const CategoriesCheckBox = ({ subCate }) => {
  const {
    values: { categories },
    setFieldValue,
  } = useFormikContext();

  const [categoriesClone, setCategoriesClone] = useState(categories);
  // console.log("categoriesClone",categoriesClone)

  useEffect(() => {
    setFieldValue("categories", categoriesClone);
  }, [categoriesClone]);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    let arr = [];

    if (e.target.checked) {
      arr = [value, ...categories];
    } else {
      arr = categories.filter((item) => item !== value);
    }

    setCategoriesClone(arr);
  };

  return (
    <FormGroup>
      <Stack direction="row" spacing={1}>
        {subCate.map((cate, index) => (
          <FormControlLabel
            key={`subCate_${index}`}
            control={
              <Checkbox
                value={cate.id}
                checked={categoriesClone.includes(cate.id)}
                onChange={handleChange}
              />
            }
            label={cate.name}
          />
        ))}
      </Stack>
    </FormGroup>
  );
};

export default CategoriesCheckBox;
