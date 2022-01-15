import React,{Component} from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import pic from "./returnForm.jpg";

export class ReturnForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
        this.uplodeProtocol = this.uplodeProtocol.bind(this);
    }

    image = pic;
    photo = null;
    protocol = null;

    handleFileSelected(event) {
        event.preventDefault();
        this.image = URL.createObjectURL(event.target.files[0]);
        this.photo = event.target.files[0];
    }

    uplodeProtocol(event) {
        event.preventDefault();
        this.protocol = event.target.files[0];
    }
    


    handleSubmit(event) {
        event.preventDefault();
        const form = new FormData();
        form.append("ReturnFileID", this.props.returnfileid);
        form.append("RentedCarID", this.props.rentedcarid);
        form.append("ReturnDate", event.target.SubmitDate.value);
        form.append("CarConditon", event.target.CarConditon.value);
        form.append("OdometerReading", event.target.OdometerReading.value);
        form.append("Photo", this.photo);
        form.append("ReturnProocol", this.protocol);
        form.append("EmployerID", this.props.employerid);
        fetch(process.env.REACT_APP_API + '/CarApi/AddReturnFile', {
            method: 'Post',
            body: form
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
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
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Formularz zwrotu
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                           
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                               <Col sm={6}>
                                        <Form.Group controlId="SubmitDate">
                                            <Form.Label>Data zwrotu</Form.Label>
                                        <Form.Control type="date" name="SubmitDate" required/>
                                        </Form.Group>

                                        <Form.Group controlId="OdometerReading">
                                            <Form.Label>Przebieg</Form.Label>
                                            <Form.Control type="number" min={0} name="OdometerReading" required/>
                                        </Form.Group>
                                
                                        
                                        <Form.Group controlId="CarConditon">
                                        <Form.Label>Stan auta</Form.Label>
                                        <Form.Control size={10 } type="text" name="CarConditon" required />
                                    </Form.Group>

                                    <Form.Group controlId="Protocol">
                                        <Form.Label>Protokół</Form.Label>
                                        <Form.Control type="File" name="Protocol" onChange={this.uplodeProtocol } required />
                                    </Form.Group>
                               </Col>
                                   
                                <Col>
                                          
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Photo">
                                                <Form.Label>Zdjęcie auta</Form.Label>
                                                <Form.Control type="File" name="Photo" onChange={this.handleFileSelected} required />
                                            </Form.Group>
                                        </Col>
                                        
                                        <img width="256px" height="256px" src={this.image} />
                                        
                                    </Row>
                                    
                                </Col>
                                </Row>
                                    <Form.Group >
                                        <Button variant="primary" type="success">
                                            Zwróć 
                                        </Button>
                                    </Form.Group>
                                </Form>
                            
                        
                        
                    </Modal.Body>
                    
                    <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Zamnkij</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}