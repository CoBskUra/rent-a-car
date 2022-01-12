import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class CheckPriceForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    savePrice(Price){
        this.props.onAddItem(1, Price);
    }

    handleSubmit(event){
        event.preventDefault();
        alert("Asdad");
        this.props.savePrice(12.10);

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
                            Sprawdż cene
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="DateofBecomingDriver">
                                        <Form.Label>Data otrzymanai prawa jazdy</Form.Label>
                                        <Form.Control type="date" name="DateofBecomingDriver" required/>
                                    </Form.Group>

                                    <Form.Group controlId="Birthday">
                                        <Form.Label>Data urodziny</Form.Label>
                                        <Form.Control type="date" name="Birthday" required/>
                                    </Form.Group>

                                    <Form.Group controlId="City">
                                        <Form.Label>Miasto</Form.Label>
                                        <Form.Control type="text"  required name="City" 
                                        placeholder="Miasto"/>
                                    </Form.Group>

                                    <Form.Group controlId="Street">
                                        <Form.Label>Ulica</Form.Label>
                                        <Form.Control type="text" name="Street" required
                                        placeholder="Ulica"/>
                                        <Form.Control type="number" min={0} name="StreetNumber" required
                                        placeholder="Numer"/>
                                    </Form.Group>

                                    <Form.Group controlId="NumberOfCurrentlyRentedCars">
                                        <Form.Label>Ilość obecnie wyporzyczonych aut</Form.Label>
                                        <Form.Control type="number" min={0} name="NumberOfCurrentlyRentedCars"
                                        required />
                                    </Form.Group>

                                    <Form.Group controlId="NumberOfOverallRentedCars">
                                        <Form.Label>Ilość obecnie wyporzyczonych aut</Form.Label>
                                        <Form.Control type="number" min={0} name="NumberOfOverallRentedCars"
                                        required />
                                    </Form.Group>
                                    

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Wyślij 
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