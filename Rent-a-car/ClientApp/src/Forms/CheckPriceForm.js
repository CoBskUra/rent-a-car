import React,{Component} from 'react';
import {
    Modal, ModalFooter, Label,
    ModalHeader, ModalBody, Button, Row, Col, Form, FormGroup, Input} from 'reactstrap';
import authService from '../components/api-authorization/AuthorizeService';

export default class CheckPriceForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    async GetPrice(event) {
        event.persist();
        const token = await authService.getAccessToken();
        const user = await authService.getUser();
        const email = !!user ? user.name : '';
        const address = !!user ? process.env.REACT_APP_API + '/CarApiPrivate/FetchPriceAndCreateCustomerWithData' : process.env.REACT_APP_API + '/CarApi/GetPrice';
        fetch(address,{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Name: event.target.Name.value,
                Surname: event.target.Surname.value,
                Email: email,
                DateofBecomingDriver:event.target.DateofBecomingDriver.value,
                Birthday:event.target.Birthday.value,
                City:event.target.City.value,
                Street:event.target.Street.value,
                StreetNumber:event.target.StreetNumber.value,
                Poste_Code: event.target.PostalCode.value,
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
        this.props.onHide();
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
                                <FormGroup controlId="name">
                                    <Label>Imię</Label>
                                    <Input type="text" name="Name" required />
                                </FormGroup>
                                <FormGroup controlId="Surname">
                                    <Label>Nazwisko</Label>
                                    <Input type="text" name="Surname" required />
                                </FormGroup>
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

                                <FormGroup controlId="PostalCode">
                                    <Label>Kod pocztowy </Label>
                                    <Input type="text" min={0} name="PostalCode" required
                                        placeholder="Numer" />
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