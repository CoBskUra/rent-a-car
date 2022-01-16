import React,{Component} from 'react';
import {Table, Button, ButtonToolbar} from 'reactstrap';
import CheckPriceForm from './Forms/CheckPriceForm';
import RentMeForm from './Forms/RentMeForm';

export default class CompanysCars extends Component{

    constructor(props){
        super(props);
        this.state={
            details:[],
            checkPrice:false,
            PriceShower:[],
            Rent:false

        };
    }

    refreshList()
    {
        if(this.props.show)
        {
            fetch(process.env.REACT_APP_API +'/JsonCars/GetCompanysCars/'+this.props.companyID +'?carID='+this.props.carID)
            .then(response=>response.json())
            .then(data=>{
                this.setState({details:data});
            });
        }
    }

    componentDidMount() {
        this.refreshList();
        this.interval = setInterval(() => this.refreshList(), 2000);
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    

      show_price(i){
          var price = -1;
          this.state.PriceShower.map(s=>{
            if(s.Key===i)
            {
                price = s.Price;
            }});
            if(price===-1)
                return null;
            else
                return price;
      }





    render(){

        if(this.props.show)
        {
            const {details}=this.state;

            let ModalCheckPriceClose=()=>this.setState({checkPrice:false});
            let ModalRentClose=()=>this.setState({Rent:false});


            let isinlist = (i)=>{
                var should_be_show = false;
                this.state.PriceShower.map( s =>{
                    if(s.Key===i)
                    {
                        should_be_show = true;
                    }
                });
                return should_be_show;
              };

            let additem = (id, price) => {
                this.setState(state => {
                    var item = { Key: id, Price:price};
                    const PriceShower = state.PriceShower.concat(item);
            
                  return {
                      PriceShower
                  };
                });
              };

            let removeItem = i => {
                this.setState(state => {
                    const PriceShower = state.PriceShower.filter(item => item.Key !== i);
              
                    return {
                        PriceShower,
                    };
                  });
                };
            
                
            
            return(
                    <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Rok Produkcji</th>
                            <th>Opis</th>
                            <th>Cena za dzień</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(detal=>
                            <tr key={detal.carDetailsID}>
                                <td>{detal.yearOfProduction}</td>
                                <td>{detal.description}</td>
                                <td>{this.show_price(detal.carDetailsID)}</td>
                                <td> 
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                                onClick={()=>this.setState(
                                                {
                                                    checkPrice:true
                                                })}>
                                                    Sprawdź cene 
                                        </Button> 

                                        
                                        {
                                            this.show_price(detal.carDetailsID)!=null && 
                                            <Button className="mr-2" variant="success" 
                                                onClick={()=> this.setState({Rent:detal.carDetailsID})}> 
                                                Wynajmij mnie
                                            </Button>
                                        }
                                        

                                        <CheckPriceForm isOpen={this.state.checkPrice}
                                            onHide={ModalCheckPriceClose}
                                        cardetalisid={detal.carDetailsID}
                                        isinlist={isinlist}
                                        removeitem={removeItem}
                                        additem={additem}/>

                                        <RentMeForm isOpen={this.state.Rent}
                                            onHide={ModalRentClose}
                                        cardetalisid={detal.carDetailsID}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        ) }
                    </tbody>
                    </Table>
                
            )
        }
        else
            return(null)
    }
}

