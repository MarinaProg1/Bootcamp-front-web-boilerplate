import { Container, Table, Placeholder } from "react-bootstrap";

const ListSkeleton = ({ rows = 5 }) => {
  return (
    <Container className="py-4">
      {/* Header Skeleton */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Placeholder animation="glow" style={{ width: "200px" }}>
          <Placeholder xs={12} size="lg" />
        </Placeholder>
        <Placeholder.Button variant="primary" style={{ width: "160px" }} />
      </div>

      {/* Tabla Skeleton */}
      <Table
        responsive
        className="align-middle mb-0"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0 12px",
        }}
      >
        <thead>
          <tr className="text-muted border-0">
            <th className="border-0 ps-4">Nombre y Apellido</th>
            <th className="border-0">Especialidad</th>
            <th className="border-0 text-end pe-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr
              key={index}
              className="shadow-sm bg-white"
              style={{ borderRadius: "8px" }}
            >
              {/* Celda Nombre */}
              <td
                className="ps-4 py-3 border-0"
                style={{
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  borderLeft: "5px solid #0d6efd",
                }}
              >
                <Placeholder animation="glow">
                  <Placeholder xs={7} />
                </Placeholder>
              </td>

              {/* Celda Especialidad */}
              <td className="py-3 border-0">
                <Placeholder animation="glow">
                  <Placeholder xs={5} />
                </Placeholder>
              </td>

              {/* Celda Botones de Acción */}
              <td
                className="text-end pe-4 py-3 border-0"
                style={{
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              >
                <div className="d-inline-flex gap-2 justify-content-end w-100">
                  <Placeholder.Button
                    variant="primary"
                    size="sm"
                    style={{ width: "90px" }}
                  />
                  <Placeholder.Button
                    variant="success"
                    size="sm"
                    style={{ width: "70px" }}
                  />
                  <Placeholder.Button
                    variant="danger"
                    size="sm"
                    style={{ width: "75px" }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListSkeleton;
