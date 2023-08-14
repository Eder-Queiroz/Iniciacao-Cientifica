import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

function InsertModal(props: any) {
  return (
    <div>
      <Modal
        isOpen={props.open}
        toggle={props.close}
        modalTransition={{ timeout: 200 }}
      >
        <ModalHeader toggle={props.close}>
          {props.id ? `Editar ${props.name}` : `Adicionar ${props.name}`}
        </ModalHeader>
        <ModalBody>
          <form
            id="form"
            className="d-flex flex-column gap-2"
            onSubmit={(e) => props.submit(e)}
          >
            {props.dados.map((value: any) => value.component)}
            <div className="d-flex flex-row justify-content-end gap-1">
              <Button color="primary" sub>
                Cadastrar
              </Button>
              <Button color="secondary" onClick={props.close}>
                Cancelar
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default InsertModal;
