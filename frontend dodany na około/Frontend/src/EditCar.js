import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

export class EditCar extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:27116/JsonCars/Edit',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CarID:event.target.CarID.value,
                Brand:event.target.Brand.value,
                Model:event.target.Model.value,
                HorsePower:event.target.HorsePower.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Car
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="CarID">
                        <Form.Label>carID</Form.Label>
                        <Form.Control type="text" name="CarID" required
                        disabled
                        defaultValue={this.props.carid} 
                        placeholder="CarID"/>
                    </Form.Group>

                    <Form.Group controlId="Brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="Brand" required
                        defaultValue={this.props.carbrand}
                        placeholder="Brand"/>
                    </Form.Group>

                    <Form.Group controlId="Model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="Model" required
                        defaultValue={this.props.carmodel}
                        placeholder="Model"/>
                    </Form.Group>

                    <Form.Group controlId="HorsePower">
                        <Form.Label>HorsePower</Form.Label>
                        <Form.Control type="number" min={0} required name="HorsePower" 
                        defaultValue={this.props.carhorsePower}
                        placeholder="HorsePower"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Zapisz zmiany
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}