import React from 'react';
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


//#region MATRIZ
const matrizInicial = () => {
  const resp = [[0, 1, 1, 1, 1, 1, 1, 1, 0, 1]
              ,[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
              ,[1, 1, 1, 0, 1, 1, 1, 1, 1, 0]
              ,[0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
              ,[0, 1, 1, 0, 1, 1, 0, 1, 1, 1]
              ,[0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
              ,[0, 1, 1, 1, 1, 1, 0, 1, 0, 0]
              ,[0, 1, 0, 0, 0, 0, 0, 0, 1, 1]
              ,[0, 1, 1, 1, 1, 1, 1, 0, 0, 0]
              ,[0, 0, 0, 0, 0, 0, 0, 0, 1, 1]]

  return resp
} 
//#endregion                    

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

export const Bloco = () => {
  const classes = useStyles();

  const [matriz, setMatriz] = React.useState(matrizInicial())
  const [contador, setContador] = React.useState(0)
  const [value, setValue] = React.useState('depthSearch');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const selecionaBloco = (y, x) => {
    if (contador < 2) {
      let tempMatriz = matriz
      tempMatriz[y][x] = contador+2
      setMatriz(tempMatriz)
      setContador(contador+1)
    }
  }

  const tipoBloco = (y, x, id) => {
    if (matriz[y][x] === 0) {
      return <div className="bloco" onClick={() => selecionaBloco(y, x)} key={id}></div>
    } else if (matriz[y][x] === 1){
      return <div className="bloco-disable" key={id}></div>
    } else {
      return <div className="bloco-selected" key={id}></div>
    }
  }

  const send = async () => {

    const url = (value === 'depthSearch' ? 'BuscaProfundidade' : 'BuscaHeuristica')

    const resp = await Api.sendMaze(matriz, url)

    if (resp !== null) {
      resp.data.forEach(item => {
        matriz[item.posY][item.posX] = 4
      })
  
      setContador(contador+1)
    }    
  }

  const clear = () => {
    setMatriz(matrizInicial())
    setContador(0)
  }

  return (
    <>
      {
      contador >= 0 ?
      matriz.map((line, y) => (
        <div>
          {line.map((colum, x) => (
            tipoBloco(y, x, y.toString()+x.toString())
          ))}
        </div>
      ))
      :
      ""
      }

      <ThemeProvider theme={theme}>
        <div className={classes.alter}>
          <FormControl color="primary" component="fieldset">
            <FormLabel color="primary" component="legend"></FormLabel>
            <RadioGroup row aria-label="algoritmo" name="algoritmo1" value={value} onChange={handleChange}>
              <FormControlLabel value="depthSearch" control={<Radio color="primary" />} label="Depth Search" />
              <FormControlLabel value="astar" control={<Radio color="primary" />} label="A Star Search" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.root}>
          <Button onClick={() => send()} variant="contained" color="primary">
            Start
          </Button>
          <Button onClick={() => clear()} variant="contained" color="default">
            Reset
          </Button>
        </div>
      </ThemeProvider>
    </>
  )
}
