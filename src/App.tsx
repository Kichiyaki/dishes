import { Container, CssBaseline } from '@material-ui/core';
import Form from './components/Form/Form';

function App() {
  return (
    <div>
      <Container maxWidth="sm">
        <Form />
      </Container>
      <CssBaseline />
    </div>
  );
}

export default App;
