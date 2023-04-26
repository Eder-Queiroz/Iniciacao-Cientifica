import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

function InsertModal(props: any) {
  return (
    <div>
      <Modal
        isOpen={props.open}
        toggle={props.close}
        modalTransition={{ timeout: 200 }}
      >
        <ModalHeader
          toggle={props.close}
        >{`Adicionar ${props.name}`}</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column gap-2">
            {props.dados.map((value: any) => value.component)}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Cadastrar</Button>{" "}
          <Button color="secondary" onClick={props.close}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default InsertModal;
