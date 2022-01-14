import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';

import {CarDetalis} from './CarDetalis';


export class CarDetalisWindow extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container">

    <Modal
    {...this.props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Firmy które posiadają rządane auto
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
            <CarDetalis id={this.props.id} ></CarDetalis>
        
    </Modal.Body>

    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

    </Modal>

            </div>
        )
    }
}