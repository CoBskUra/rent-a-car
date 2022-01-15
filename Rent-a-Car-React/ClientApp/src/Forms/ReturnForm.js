import React,{Component} from 'react';
import { Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export default class ReturnForm extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }

    photofilename = "returnForm.jpg";
    imagesrc = "../../public/returnForm.jpg";

    handleFileSelected(event) {
        event.preventDefault();
        this.photofilename = event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'Employee/SaveFile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then((result) => {
                this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
            },
                (error) => {
                    alert('Failed');
                })

    }
    


    handleSubmit(event) {
        event.preventDefault();
        console.log(this.imagesrc);
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
                                        <Form.Control type="File" name="Protocol" required />
                                    </Form.Group>
                               </Col>
                                   
                                <Col>
                                          
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Photo">
                                                <Form.Label>Zdjęcie auta</Form.Label>
                                                <Form.Control  type="File" name="Photo" required />
                                            </Form.Group>
                                        </Col>
                                        
                                        <Image width="256px" height="256px" src={this.imagesrc} />
                                        
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