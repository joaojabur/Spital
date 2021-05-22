import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import {
  IoInfiniteOutline
} from "react-icons/io5";

const useStyles = makeStyles({
  root: {
    width: "100%",
    justifyContent: "space-around",
    flex: 1,
    border: "none",
    outline: "none",
    marginTop: "3rem",
    borderRadius: "3rem",
  },
  button: {
    border: 0,
    outline: 0,
    borderRadius: "30%",
  },
});

function AppointmentStatus() {
  const classes = useStyles();
  const [value, setValue] = React.useState("active");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        className={classes.button}
        label={<span style={{ fontSize: "2rem" }}>Todas</span>}
        value="todas"
        icon={<IoInfiniteOutline size={30} />}
        style={{ border: "none", outline: "none" }}
      />
    </BottomNavigation>
  );
}

export default AppointmentStatus;
