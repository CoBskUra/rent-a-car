import React,{Component} from 'react';
import {
    Modal, ModalFooter, Label,
    ModalHeader, ModalBody, Button, Row, Col, Form, FormGroup, Input
} from 'reactstrap';

export default class RentMeForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API +'/CarApiPrivate/Rent',{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                carDetailsID: this.props.carDetalisID,
                expectedReturnDate: this.addDays(event.target.DaysNumber.value)
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert("error");
        })
    }

    addDays = function (days) {
        const date = new Date();
        date.setDate(date.getDate() + Number(days));
        return date;
      }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="sm"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <ModalHeader clooseButton>
        <p id="contained-modal-title-vcenter">
            Wynajmij Auto
        </p>
    </ModalHeader>
    <ModalBody>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup controlId="DaysNumber">
                        <Label>Wprowadź na ile dni chcesz wynająć auto</Label>
                        <Input type="number" min={1} name="DaysNumber" required
                        placeholder="liczba dni"/>
                    </FormGroup>

                    

                    <FormGroup>
                        <Button variant="primary" type="submit">
                            Potwierdź Wynajem
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

            </div>
        )
    }

}