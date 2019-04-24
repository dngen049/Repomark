import React from "react"

class Row extends React.Component{
  
     render(){
         return(
            
             <tr>
                <td>{this.props.datakey}</td>
                <td><a href={this.props.Url}>{this.props.name}</a></td> 
                <td>{this.props.Owner}</td> 
                <td>{this.props.lang}</td>
                
                
                <td><button style={{display: this.props.isAdded ? 'none' : 'block' }}onClick={() => this.props.Add(this.props.datakey)}>ADD</button></td>            
                           
             </tr>
         )
     }
}
export default Row
