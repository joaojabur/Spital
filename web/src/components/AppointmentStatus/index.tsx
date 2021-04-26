import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { IoSyncOutline, IoCheckmarkOutline } from "react-icons/io5";

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
    border: "none",
    outline: "none",
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
      />
      <BottomNavigationAction
        className={classes.button}
        label={<span style={{ fontSize: "2rem" }}>Finalizadas</span>}
        value="done"
        icon={<IoCheckmarkOutline size={30} />}
      />
    </BottomNavigation>
  );
}

export default AppointmentStatus;
