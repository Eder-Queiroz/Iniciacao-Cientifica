import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function DeleteModal(props: any) {
  return (
    <div>
      <Modal
        isOpen={props.open}
        toggle={props.close}
        modalTransition={{ timeout: 200 }}
      >
        <ModalHeader toggle={props.close}>Deletar</ModalHeader>
        <ModalBody>Deseja excluir esse {props.name}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={props.delete}>
            Sim
          </Button>
          <Button color="danger" onClick={props.close}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;
