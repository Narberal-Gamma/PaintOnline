import { FC, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import canvasState from "../store/canvasState";

const ModalWindow: FC = () => {

    const usernameRef = useRef<HTMLInputElement>(null)

    const [show, setShow] = useState<boolean>(true)

    const connectionHandler = () => {
        if (usernameRef.current){
            canvasState.setUsername(usernameRef.current.value)
        }
        setShow(false)
    }

    return (
        <Modal show={show} onHide={() => { }}>
            <Modal.Header closeButton>
                <Modal.Title>Write your name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" ref={usernameRef}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => connectionHandler()}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWindow