import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline } from '@material-ui/core';
import Form from './components/Form/Form';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container maxWidth="sm">
        <Form />
      </Container>
      <CssBaseline />
    </div>
  );
}

const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2, 0),
    },
  };
});

export default App;
