import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class ReturnForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    
    


    handleSubmit(event){

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
                            Formularz zwrotu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                
                                    <Form.Group controlId="CarConditon">
                                        <Form.Label>Stan auta</Form.Label>
                                        <Form.Control type="text" name="CarConditon" required/>
                                    </Form.Group>

                                    <Form.Group controlId="OdometerReading">
                                        <Form.Label>Przebieg</Form.Label>
                                        <Form.Control type="number" min={0} name="OdometerReading" required/>
                                    </Form.Group>

                                    <Form.Group controlId="CarConditon">
                                        <Form.Label>Stan auta</Form.Label>
                                        <Form.Control type="text" name="CarConditon" required/>
                                    </Form.Group>

                                    <Form.Group controlId="Photo">
                                        <Form.Label>Zaraz się ogarnie</Form.Label>
                                        <Form.Control type="text" name="Photo"/>
                                    </Form.Group>

                                    <Form.Group controlId="Protocol">
                                        <Form.Label>Zaraz się ogarnie</Form.Label>
                                        <Form.Control type="text" name="Protocol"/>
                                    </Form.Group>
                                    

                                    <Form.Group>
                                        <Button variant="primary" type="success">
                                            Zwróć 
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Zamnkij</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}