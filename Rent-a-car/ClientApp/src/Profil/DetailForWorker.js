import React, { Component } from 'react';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from 'reactstrap';

import 'antd/dist/antd.css';
import { Comment, Avatar } from 'antd';


export default class DetailWorker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protocol: null
        }
    }

    dowlandFile() {
        fetch(process.env.REACT_APP_API + '/CarApi/DowlandProtocol/' + this.props.id)
            .then(data => {

                this.setState({ protocol: data });
            });
    }

    render() {
        return (
                <Modal
                    {...this.props}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader >
                        <p id="contained-modal-title-vcenter">
                            Szczegóły zamówienia
                        </p>
                    </ModalHeader>
                    <ModalBody>
                    <Comment
                        author={<a>{this.props.workername}</a>}
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                        content={
                            <p>
                                {this.props.carcondition}
                            </p>
                        }
                    />

                    <Button onClick={this.dowlandFile}>
                        Pobierz protokół
                    </Button>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant="danger" onClick={this.props.onHide}>Zamknij</Button>
                    </ModalFooter>

                </Modal>
        )
    }
}