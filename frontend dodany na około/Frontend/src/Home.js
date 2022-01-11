import React,{Component} from 'react';

export class Home extends Component{

    render(){
        console.log(process.env.INDEX);
        console.log(process.env.REACT_APP_API);
        return(
            <div className="mt-5 d-flex justify-content-left">
                This is Home page. index 
            </div>
        )
    }
}