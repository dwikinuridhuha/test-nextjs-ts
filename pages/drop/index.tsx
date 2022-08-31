import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";

export default function DropdownIndex() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, data) => {
    e.preventDefault();
    console.log(e, data);
    console.log("test");
  };

  function Validator(e) {
    // console.log(e);
    const test = document.getElementById(e);
    test.click();
    // console.log(test);
  }

  return (
    <>
      <form id="test" onSubmit={(e, data) => handleSubmit(e, data)}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Age</InputLabel>
          <Select labelId="demo-select-small" id="demo-select-small">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                // console.log(e);
                JavaScript: return Validator("satu");
              }}
            >
              <input type="submit" style={{ width: "100%" }} value="satu" />
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                // console.log(e);
                JavaScript: return Validator("dua");
              }}
            >
              <input type="submit" style={{ width: "100%" }} value="dua" />
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          sx={{ visibility: "hidden" }}
          variant="outlined"
          id="satu"
        ></Button>
        <Button
          type="submit"
          sx={{ visibility: "hidden" }}
          variant="outlined"
          id="dua"
        ></Button>
      </form>
    </>
  );
}
