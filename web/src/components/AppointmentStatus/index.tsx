import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import {
  IoSyncOutline,
  IoCheckmarkOutline,
  IoInfiniteOutline,
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
        label={<span style={{ fontSize: "2rem" }}>Ativas</span>}
        value="active"
        icon={<IoSyncOutline size={30} />}
        style={{ border: "none", outline: "none" }}
      />
      <BottomNavigationAction
        className={classes.button}
        label={<span style={{ fontSize: "2rem" }}>Todas</span>}
        value="todas"
        icon={<IoInfiniteOutline size={30} />}
        style={{ border: "none", outline: "none" }}
      />
      <BottomNavigationAction
        className={classes.button}
        label={<span style={{ fontSize: "2rem" }}>Finalizadas</span>}
        value="done"
        icon={<IoCheckmarkOutline size={30} />}
        style={{ border: "none", outline: "none" }}
      />
    </BottomNavigation>
  );
}

export default AppointmentStatus;
