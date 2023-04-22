import { Button, Row, Col } from "reactstrap";

function Grade() {
  return (
    <div className="px-4">
      <Col className="d-flex gap-3 flex-responsive">
        <Button
          color="primary"
          outline
          onClick={() => window.location.reload()}
        >
          Recarregar
        </Button>
        <Button color="primary" outline>
          Mostrar Resultado
        </Button>
      </Col>
    </div>
  );
}

export default Grade;
