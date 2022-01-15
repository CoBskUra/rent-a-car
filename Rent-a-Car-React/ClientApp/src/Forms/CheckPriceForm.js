import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'reactstrap';

export default class CheckPriceForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    GetPrice(event){
        fetch(process.env.REACT_APP_API +'/CarApi/GetPrice',{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DateofBecomingDriver:event.target.DateofBecomingDriver.value,
                Birthday:event.target.Birthday.value,
                City:event.target.City.value,
                Street:event.target.Street.value,
                StreetNumber:event.target.StreetNumber.value,
                NumberOfCurrentlyRentedCars:event.target.NumberOfCurrentlyRentedCars.value,
                NumberOfOverallRentedCars:event.target.NumberOfOverallRentedCars.value,
                CarDetalisID: this.props.cardetalisid
            })
        })
        .then(res=>res.json())
            .then((result) => {
                console.log(result);
                this.savePrice(this.props.cardetalisid, result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    
    savePrice(cardetalisid, Price) {
        if (this.props.isinlist(cardetalisid))
            this.props.removeitem(cardetalisid);

        this.props.additem(cardetalisid, Price);

    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target);
        this.GetPrice(event);
    }

    componentWillUnmount() {
        console.log("martwy");
    }
    
    render(){
        return (
            

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header >
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
                                    </Form.Group>

                                    <Form.Group controlId="StreetNumber">
                                        <Form.Control type="number" min={0} name="StreetNumber" required
                                            placeholder="Numer"/>
                                    </Form.Group>

                                    <Form.Group controlId="NumberOfCurrentlyRentedCars">
                                        <Form.Label>Ilość obecnie wyporzyczonych aut</Form.Label>
                                        <Form.Control type="number" min={0} name="NumberOfCurrentlyRentedCars"
                                        required />
                                    </Form.Group>

                                    <Form.Group controlId="NumberOfOverallRentedCars">
                                        <Form.Label>Ilość przetrzymanych aut</Form.Label>
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

            
        )
    }

}