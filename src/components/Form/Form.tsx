import React, { useState, Fragment } from 'react';
import { omit } from 'lodash';
import { useAPI, APIError } from 'libs/api';
import {
  DishType,
  TYPES,
  MIN_SPICINESS_SCALE,
  MAX_SPICINESS_SCALE,
  MARKS,
} from './constants';

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
import { useSnackbar } from 'notistack';

const Form = () => {
  const api = useAPI();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [values, setValues] = useState({
    name: '',
    preparation_time: '',
    type: DishType.Pizza,
    no_of_slices: '0',
    diameter: '0',
    spiciness_scale: 1,
    slices_of_bread: '1',
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

    if (e.target.name in errors) {
      setErrors(prev => omit(prev, [e.target.name]));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      setErrors({});
      await api.createDish({
        ...values,
        no_of_slices: parseFloat(values.no_of_slices),
        diameter: parseFloat(values.diameter),
        slices_of_bread: parseFloat(values.slices_of_bread),
      });
      enqueueSnackbar('The dish has been successfully created.', {
        variant: 'success',
      });
    } catch (e) {
      if (e instanceof APIError && Object.keys(e.objWithErrors).length > 0) {
        setErrors(e.objWithErrors);
      } else {
        enqueueSnackbar(e.message, {
          variant: 'error',
        });
      }
    }
    setIsSubmitting(false);
  };

  const defaultTextFieldProps: TextFieldProps = {
    required: true,
    fullWidth: true,
    disabled: isSubmitting,
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Typography onChange={handleChange} variant="h1" align="center">
        Form
      </Typography>
      <TextField
        onChange={handleChange}
        value={values.name}
        name="name"
        label="Name"
        error={!!errors['name']}
        helperText={errors['name']}
        {...defaultTextFieldProps}
      />
      <InputMask
        onChange={handleChange}
        value={values.preparation_time}
        mask="99:99:99"
        disabled={isSubmitting}
      >
        {() => {
          return (
            <TextField
              name="preparation_time"
              label="Preparation time"
              error={!!errors['preparation_time']}
              helperText={errors['preparation_time']}
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
        error={!!errors['type']}
        helperText={errors['type']}
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
            error={!!errors['no_of_slices']}
            helperText={errors['no_of_slices']}
            {...defaultTextFieldProps}
          />
          <TextField
            name="diameter"
            label="Diameter"
            type="number"
            inputProps={{ min: 0, step: '0.01' }}
            value={values.diameter}
            error={!!errors['diameter']}
            helperText={errors['diameter']}
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
            disabled={isSubmitting}
            onChange={handleSpicinessScaleChange}
          />
        </div>
      )}
      {values.type === DishType.Sandwich && (
        <TextField
          name="slices_of_bread"
          label="Slices of bread"
          type="number"
          inputProps={{ min: 1, step: 1 }}
          value={values.slices_of_bread}
          onChange={handleChange}
          onKeyDown={handleKeyDownNumberField}
          error={!!errors['slices_of_bread']}
          helperText={errors['slices_of_bread']}
          {...defaultTextFieldProps}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
        disabled={isSubmitting}
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
