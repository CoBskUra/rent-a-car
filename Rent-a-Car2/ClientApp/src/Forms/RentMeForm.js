import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class RentMeForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API +'/CarApi/Rent',{
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
    <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
            Wynajmij Auto
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="DaysNumber">
                        <Form.Label>Wprowadź na ile dni chcesz wynająć auto</Form.Label>
                        <Form.Control type="number" min={1} name="DaysNumber" required
                        placeholder="liczba dni"/>
                    </Form.Group>

                    

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Potwierdź Wynajem
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Zamknij</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}