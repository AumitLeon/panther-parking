import React from 'react';
import 'date-fns';
import PropTypes from 'prop-types';

// Material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import logo from '../static/Panther_Parking_logo-removebg-preview.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

// Define styles for material-ui components
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  root: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 50,
    transform: 'rotate(-30deg)'
  }
}));

// Dropdown Menu styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const users = [
  'Admin',
  'Visitor',
  'Faculty',
  'Student-sPass',
  'Student-ePass',
  'Student-pPass',
  'Student-tPass',
  'Student-uPass'
];

const Form = ({
  userType,
  setUser,
  timeIn,
  setTimeIn,
  timeOut,
  setTimeOut,
  landing,
  update
}) => {
  // Instantiate style classes
  const classes = useStyles();
  // Testing
  // console.log("permit type:", permitType);
  // console.log("user type:", userType);
  // console.log("timein:", timeIn);
  // console.log("timeout:", timeOut);

  // Define handlers for date and timeIn and timeOut changes.
  const handleTimeInChange = time => {
    if (Object.prototype.toString.call(time) === '[object Date]') {
      setTimeIn(time);
    }
  };

  const handleTimeOutChange = time => {
    if (Object.prototype.toString.call(time) === '[object Date]') {
      setTimeOut(time);
    }
  };
  if (landing) {
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="inherit">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around" spacing={1}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>User type</InputLabel>
                    <Select
                      value={userType === 'initial' ? '' : userType}
                      onChange={event => {
                        setUser(event.target.value);
                        update(true);
                      }}
                      input={<Input />}
                      MenuProps={MenuProps}
                    >
                      {users.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <KeyboardDateTimePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy hh:mm a"
                    margin="normal"
                    label="TimeIn"
                    value={timeIn}
                    onChange={handleTimeInChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                  <KeyboardDateTimePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy hh:mm a"
                    margin="normal"
                    label="Time Out"
                    value={timeOut}
                    onChange={handleTimeOutChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar variant="dense">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around" spacing={1}>
                <Toolbar>
                  <img src={logo} alt="logo" className={classes.logo} />
                </Toolbar>
                <FormControl className={classes.formControl}>
                  <InputLabel>User type</InputLabel>
                  <Select
                    value={userType === 'initial' ? '' : userType}
                    onChange={event => {
                      setUser(event.target.value);
                    }}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {users.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <KeyboardDateTimePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy hh:mm a"
                  margin="normal"
                  label="Time In"
                  value={timeIn}
                  onChange={handleTimeInChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <KeyboardDateTimePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy hh:mm a"
                  margin="normal"
                  label="Time Out"
                  value={timeOut}
                  onChange={handleTimeOutChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

Form.propTypes = {
  userType: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  setTimeIn: PropTypes.func.isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  setTimeOut: PropTypes.func.isRequired
};

export default Form;
