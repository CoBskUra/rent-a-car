import React,{Component} from 'react';
import {
    Modal, ModalFooter, Label,
    ModalHeader, ModalBody, Button, Row, Col, Form, FormGroup, Input, Image
} from 'reactstrap';
import pic from "./returnForm.jpg";

export class ReturnForm extends Component {
    constructor(props) {
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

    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader>
                        <p id="contained-modal-title-vcenter">
                            Formularz zwrotu
                        </p>
                    </ModalHeader>
                    <ModalBody>


                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col sm={6}>
                                    <FormGroup controlId="SubmitDate">
                                        <Label>Data zwrotu</Label>
                                        <Input type="date" name="SubmitDate" required />
                                    </FormGroup>

                                    <FormGroup controlId="OdometerReading">
                                        <Label>Przebieg</Label>
                                        <Input type="number" min={0} name="OdometerReading" required />
                                    </FormGroup>


                                    <FormGroup controlId="CarConditon">
                                        <Label>Stan auta</Label>
                                        <Input size={10} type="text" name="CarConditon" required />
                                    </FormGroup>

                                    <FormGroup controlId="Protocol">
                                        <Label>Protokół</Label>
                                        <Input type="File" name="Protocol" onChange={this.uplodeProtocol} required />
                                    </FormGroup>
                                </Col>

                                <Col>

                                    <Row>
                                        <Col>
                                            <FormGroup controlId="Photo">
                                                <Label>Zdjęcie auta</Label>
                                                <Input type="File" name="Photo" onChange={this.handleFileSelected} required />
                                            </FormGroup>
                                            <img width="300px" height="300px" src={this.image} />
                                        </Col>

                                        

                                    </Row>

                                </Col>
                            </Row>
                            <FormGroup >
                                <Button variant="primary" type="success">
                                    Zwróć
                                </Button>
                            </FormGroup>
                        </Form>



                    </ModalBody>

                    <ModalFooter>
                        <Button variant="danger" onClick={this.props.onHide}>Zamnkij</Button>
                    </ModalFooter>

                </Modal>

            </div>
        )
    }

}