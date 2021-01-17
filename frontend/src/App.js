import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }, formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function App() {
  const classes = useStyles();
  const [heating, setHeating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [displayColor, setDisplay] = useState(false);
  const [pattern, setPattern] = useState(0);

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  // add code for sending request to backend for type of heating
  useEffect(() => {
    if (!loading) {
      alert('heating changed to: ' + heating);
    }
  }, [heating]);

  useEffect(() => {
    if (!loading) {
      alert('pattern changed to: ' + pattern);
    }
  }, [pattern]);

  const heatUpdate = async (e) => {
    setHeating(e.target.value);
  };

  const handleClick = () => {
    setDisplay(!displayColor);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  const updatePattern = async (e) => {
    setPattern(e.target.value);
  }

  // add code for sending request to backend for color
  const handleChange = async (color) => {
    setColor(color.rgb);
  };

  if (loading) {
    return <h1>loading...</h1>
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={0} style={{ height: 'auto' }}>
          <div className={classes.root}>
            <h1>PieConsole Control Panel</h1>
          </div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Heat</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={heating}
              onChange={heatUpdate}
              label="Heat"
            >
              <MenuItem value={0}>Low</MenuItem>
              <MenuItem value={1}>Medium</MenuItem>
              <MenuItem value={2}>High</MenuItem>
            </Select>
          </FormControl>
          <Typography variant='h4'>
            Color:
            </Typography>
          <div style={styles.swatch} onClick={handleClick}>
            <div style={styles.color} />
          </div>
          {displayColor ? <div style={styles.popover}>
            <div style={styles.cover} onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
          </div> : null}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Color Patterns</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={pattern}
              onChange={updatePattern}
              label="Pattern"
            >
              <MenuItem value={0}>Rainbow</MenuItem>
              <MenuItem value={1}>Color Wipe</MenuItem>
              <MenuItem value={2}>Theater Chase</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default App;
