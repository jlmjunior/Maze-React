import React from 'react'
import * as Api from '../Api'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  alter: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#268FC8',
    },
  },
});

export const BlocoTools = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.alter}>
        <FormControl color="primary" component="fieldset">
          <FormLabel color="primary" component="legend"></FormLabel>
          <RadioGroup row aria-label="algoritmo" name="algoritmo1" value={value} onChange={handleChange}>
            <FormControlLabel value="depthSearch" control={<Radio color="primary" />} label="Depth Search" />
            <FormControlLabel value="teste" control={<Radio color="primary" />} label="Teste" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.root}>
        <Button onClick={() => Api.sendMaze()} variant="contained" color="primary">
          Start
        </Button>
        <Button variant="contained" color="default">
          Reset
        </Button>
      </div>
    </ThemeProvider>
  )
}
