import styles from './historiaclinica.module.scss';
import { Row, Col, Form, Button } from 'react-bootstrap';

const BuscadorMedico = ({ valor, alCambiar, datos, onSeleccionar }) => {
  const medico= datos.find(p =>
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
            placeholder="Buscar Medico..."
            value={valor}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <p className={styles.filaInput}>
        Medico:{" "}
        {valor !== "" && medico && <span>{medico.nombre}</span>}

        {valor !== "" && medico && (
          <Button size="sm" onClick={() => onSeleccionar(medico.id)}>
            Seleccionar
          </Button>
        )}
      </p>
    </>
  );
};

export default BuscadorMedico;
