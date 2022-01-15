import React,{Component} from 'react';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody} from 'reactstrap';

import CarDetalis from './CarDetalis';


export default class CarDetalisWindow extends Component{
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
                <ModalHeader >
                    <p id="contained-modal-title-vcenter">
                        Firmy które posiadają rządane auto
                    </p>
                </ModalHeader>
                <ModalBody>
                        <CarDetalis id={this.props.id} ></CarDetalis>
        
                </ModalBody>

                <ModalFooter>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </ModalFooter>

                </Modal>

            </div>
        )
    }
}