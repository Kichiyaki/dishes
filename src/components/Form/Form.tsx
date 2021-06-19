import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  MenuItem,
  Slider,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';
import InputMask from 'react-input-mask';
import {
  DishType,
  TYPES,
  MIN_SPICINESS_SCALE,
  MAX_SPICINESS_SCALE,
  MARKS,
} from './constants';

const Form = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    preparation_time: '',
    type: DishType.Pizza,
    no_of_slices: '0',
    diameter: '0',
    spiciness_scale: 1,
    slices_of_bread: '0',
  });

  const handleKeyDownNumberField = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.name in values) {
      setValues(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSpicinessScaleChange = (
    e: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    setValues(prev => ({
      ...prev,
      spiciness_scale: Array.isArray(value) ? value[0] : value,
    }));
  };

  const defaultTextFieldProps: TextFieldProps = {
    required: true,
    fullWidth: true,
  };
  return (
    <form className={classes.form}>
      <Typography onChange={handleChange} variant="h1" align="center">
        Form
      </Typography>
      <TextField
        onChange={handleChange}
        value={values.name}
        name="name"
        label="Name"
        {...defaultTextFieldProps}
      />
      <InputMask
        onChange={handleChange}
        value={values.preparation_time}
        mask="99:99:99"
      >
        {() => {
          return (
            <TextField
              name="preparation_time"
              label="Preparation time"
              {...defaultTextFieldProps}
            />
          );
        }}
      </InputMask>
      <TextField
        name="type"
        value={values.type}
        select
        label="Dish type"
        onChange={handleChange}
        {...defaultTextFieldProps}
      >
        {TYPES.map(([name, value]) => {
          return (
            <MenuItem key={name} value={value}>
              {name}
            </MenuItem>
          );
        })}
      </TextField>
      {values.type === DishType.Pizza && (
        <Fragment>
          <TextField
            name="no_of_slices"
            label="Number of slices"
            type="number"
            inputProps={{ min: 0, step: 1 }}
            value={values.no_of_slices}
            onChange={handleChange}
            onKeyDown={handleKeyDownNumberField}
            {...defaultTextFieldProps}
          />
          <TextField
            name="diameter"
            label="Diameter"
            type="number"
            inputProps={{ min: 0, step: '0.01' }}
            value={values.diameter}
            onChange={handleChange}
            {...defaultTextFieldProps}
          />
        </Fragment>
      )}
      {values.type === DishType.Soup && (
        <div>
          <Typography>Spiciness scale</Typography>
          <Slider
            value={values.spiciness_scale}
            step={1}
            marks={MARKS}
            min={MIN_SPICINESS_SCALE}
            max={MAX_SPICINESS_SCALE}
            onChange={handleSpicinessScaleChange}
          />
        </div>
      )}
      {values.type === DishType.Sandwich && (
        <TextField
          name="slices_of_bread"
          label="Slices of bread"
          type="number"
          inputProps={{ min: 0, step: 1 }}
          value={values.slices_of_bread}
          onChange={handleChange}
          onKeyDown={handleKeyDownNumberField}
          {...defaultTextFieldProps}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    minHeight: '445px',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

export default Form;
