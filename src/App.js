import React from "react"

import Row from "./Component/Row"
import Rowd from "./Component/Rowd"


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            input: "",
            data: [],
            favor : []
        }
        this.onRemoving = this.onRemoving.bind(this)
        this.onAdding = this.onAdding.bind(this)
    }
    
      onRemoving(index){
       
            const arrayCopy = this.state.favor.filter((row) => row.key !== index);
            const element = this.state.data.find((row) => row.key === index)
             var i =  this.state.data.indexOf(element);
            const arrayCopy1 = this.state.data.filter((row) => row.key !== index);
            
             var isAdd = false
             if(element.isAdded === false){
                isAdd = true
            }
            const newelm = {
                key:element.key,
                name: element.name,
                Owner: element.Owner,
                lang:element.lang,
                Url: element.Url,
                isAdded: isAdd
            }
           
            arrayCopy1.splice(i, 0, newelm)
            this.setState({data: arrayCopy1,favor: arrayCopy});
         
        }
     onAdding(index){
        const element = this.state.data.find((row) => row.key === index)
        
        var i =  this.state.data.indexOf(element);
        const arrayCopy = this.state.data.filter((row) => row.key !== index)
        const arrayCopy1 = this.state.favor.slice();

       
         var isAdd = false
        if(element.isAdded === false){
            isAdd = true
        }
         const newelm = {
              key:element.key,
              name: element.name,
              Owner: element.Owner,
              lang:element.lang,
              Url: element.Url,
              isAdded: isAdd
         }
        
         arrayCopy.splice(i, 0, newelm)
         arrayCopy1.push(element)
          this.setState({data: arrayCopy,
          favor:arrayCopy1});
       
     
     }
     
     
    render() {
        return (
            <div>
               
                <div  className="TabContainer">
                    <table className="ResultTab"> 
                        <tbody>
                            <tr>
                            <th>key</th>
                                <th>Name</th>
                                <th>Owner</th>
                                <th>Language</th>
                                <th></th>
                            </tr>
                            {this.state.favor.map(data => <Rowd remove={this.onRemoving} datakey={data.key} Owner={data.Owner} key={data.key} name ={data.name} lang = {data.lang} Url={data.Url}/>)}
                        </tbody>
                    </table>
                    
                    <table className="FavoriteTab">
                        <tbody>
                            <tr>
                                <th>key</th>
                                <th>Name</th>
                                <th>Owner</th>
                                <th>Language</th>
                                <th></th>
                            </tr>
                            {this.state.data.map(data => <Row Add={this.onAdding} datakey={data.key} key={data.key} Owner={data.Owner} name ={data.name} lang = {data.lang} Url={data.Url} isAdded={data.isAdded}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default App
