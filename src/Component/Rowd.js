import React from "react"
class Rowd extends React.Component{
    
   
     render(){
     
         return(
            
             <tr>
                <td>{this.props.datakey}</td>
                <td><a href={this.props.Url}>{this.props.name}</a></td> 
                <td>{this.props.Owner}</td> 
                <td>{this.props.lang}</td>
                
                <td><button onClick={() => this.props.remove(this.props.datakey)}>remove</button></td>            
                           
             </tr>
         )
     }
}
export default Rowd
