import styles from './historiaclinica.module.scss';
import { Row, Col, Form, Button } from 'react-bootstrap';

const BuscadorPaciente = ({ valor, alCambiar, datos, onSeleccionar }) => {
  const paciente = datos.find(p =>
    p.nombre.toUpperCase().startsWith(valor.toUpperCase())
  );

  const handleChange = (evento) => {
    const nuevoValor = evento.target.value.toUpperCase();
    alCambiar(nuevoValor);

    // si el input queda vacío, reseteo la selección en el padre
    if (nuevoValor === "") {
      onSeleccionar("");
    }
  };

  return (
    <>
      <Row className="mb-4">
        <Col md={10}>
          <Form.Control
            type="text"
            placeholder="Buscar Paciente..."
            value={valor}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <p className={styles.filaInput}>
        Paciente:{" "}
        {valor !== "" && paciente && <span>{paciente.nombre}</span>}

        {valor !== "" && paciente && (
          <Button size="sm" onClick={() => onSeleccionar(paciente.id)}>
            Seleccionar
          </Button>
        )}
      </p>
    </>
  );
};

export default BuscadorPaciente;
