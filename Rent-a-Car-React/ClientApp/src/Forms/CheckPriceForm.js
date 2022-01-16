import React,{Component} from 'react';
import {
    Modal, ModalFooter, Label,
    ModalHeader, ModalBody, Button, Row, Col, Form, FormGroup, Input} from 'reactstrap';

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
                    <ModalHeader >
                        <p id="contained-modal-title-vcenter">
                            Sprawdź cene
                        </p>
                    </ModalHeader>
                <ModalBody>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="DateofBecomingDriver">
                                        <Label>Data otrzymania prawa jazdy</Label>
                                    <Input type="date" name="DateofBecomingDriver" required/>
                                    </FormGroup>

                                    <FormGroup controlId="Birthday">
                                        <Label>Data urodzenia</Label>
                                    <Input type="date" name="Birthday" required/>
                                    </FormGroup>

                                    <FormGroup controlId="City">
                                        <Label>Miasto</Label>
                                        <Input type="text"  required name="City" 
                                        placeholder="Miasto"/>
                                    </FormGroup>

                                    <FormGroup controlId="Street">
                                        <Label>Ulica</Label>
                                        <Input type="text" name="Street" required
                                        placeholder="Ulica"/>
                                    </FormGroup>

                                    <FormGroup controlId="StreetNumber">
                                        <Input type="number" min={0} name="StreetNumber" required
                                            placeholder="Numer"/>
                                    </FormGroup>

                                    <FormGroup controlId="NumberOfCurrentlyRentedCars">
                                        <Label>Ilość obecnie wypożyczonych aut</Label>
                                        <Input type="number" min={0} name="NumberOfCurrentlyRentedCars"
                                        required />
                                    </FormGroup>

                                    <FormGroup controlId="NumberOfOverallRentedCars">
                                        <Label>Ilość przetrzymanych aut</Label>
                                        <Input type="number" min={0} name="NumberOfOverallRentedCars"
                                        required />
                                    </FormGroup>
                                    

                                    <FormGroup>
                                        <Button variant="primary" type="submit">
                                            Wyślij 
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </ModalBody>
                    
                    <ModalFooter>
                    <Button variant="danger" onClick={this.props.onHide}>Zamknij</Button>
                    </ModalFooter>

                </Modal>

            
        )
    }

}