import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {d} from '../App';

export default function Nav() {
    const {alignment, setAlignment} = React.useContext(d);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
    <d.Provider value={alignment}>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="month">Last 1 Month</ToggleButton>
      <ToggleButton value="week2">Last 2 weeks</ToggleButton>
      <ToggleButton value="week1">Last 1 week</ToggleButton>
    </ToggleButtonGroup>
    </d.Provider>
    </>
  );
}
