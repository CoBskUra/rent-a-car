import React,{Component} from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { ReturnForm } from '../Forms/ReturnForm'

export class Worker extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            ReadyShow:false,
            ReadyToReturn:[],
            ShowHistory:false,
            History: [],
            ShowReturnForm: false,
            EmployerID:1
        }
    }

    dowlandReadyToReturn(){
        if(this.state.ReadyShow)
        {
            fetch(process.env.REACT_APP_API +'/CarApi/ReadyToReturn')
            .then(response=>response.json())
                .then(data => {
                this.setState({ReadyToReturn:data});
            });
        }
    }

    dowlandHistory(){
        if(this.state.ShowHistory)
        {
            fetch(process.env.REACT_APP_API +'/CarApi/History')
            .then(response=>response.json())
            .then(data=>{
                this.setState({ History:data});
            });
        }
    }

    refreshList() {
        this.dowlandHistory();
        this.dowlandReadyToReturn();
    }

    componentDidMount(){
        this.refreshList();
        this.interval = setInterval(() => this.refreshList(), 2000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const { ReadyToReturn, History } = this.state;
        let CloseReturnForm = () => this.setState({ ShowReturnForm: false });
        return(
            <div>
                <ButtonToolbar>
                    <Button onClick={()=>this.setState({ReadyShow:!this.state.ReadyShow})}>
                        Pokaż auta gotowe do zwrotu
                    </Button>

                    <Button onClick={() => this.setState({ ShowHistory:!this.state.ShowHistory})}>
                        Pokaż historie
                    </Button>

                </ButtonToolbar>
                <div>
                { this.state.ReadyShow &&
                    <div>
                        <label aria-setsize={40} color="violet"> Gotowe do zwrotu</label>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marka</th>
                                <th>Model</th>
                                <th>ID klienta</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ReadyToReturn.map(r=>
                                <tr key={r.rentID}>
                                    <td>{r.rentID}</td>
                                    <td>{r.brand}</td>
                                    <td>{r.model}</td>
                                    <td>{r.customerID}</td>
                                    <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="dark" 
                                        onClick={()=>{
                                            this.setState({
                                                ShowReturnForm:true
                                            })
                                        }}>
                                            Zwróć
                                        </Button>

                                            <ReturnForm show={this.state.ShowReturnForm}
                                                onHide={CloseReturnForm}
                                                rentedcarid={r.carID}
                                                employerid={this.state.EmployerID}
                                                returnfileid={r.rentID}
                                                />
                                        
                                    </ButtonToolbar>
                                    </td>
                                </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    }
                </div>
                <div>
                    { this.state.ShowHistory &&
                    <div>
                        <label aria-setsize={40} color="violet"> historia wyporzyczeń</label>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Car ID</th>
                                <th>Data zwrotu</th>
                                <th>Stan auta</th>
                            </tr>
                            </thead>
                            <tbody>
                            {History.map(r=>
                                <tr key={r.returnFileID}>
                                    <td>{r.returnFileID}</td>
                                    <td>{r.RentedCarID}</td>
                                    <td>{r.ReturnDate}</td>
                                    <td>{r.CarConditon}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button> Szczegóły</Button>
                                        
                                    </ButtonToolbar>
                                    </td>
                                </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    }
                </div>
            </div>
        )
    }
}