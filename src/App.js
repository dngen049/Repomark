import React from "react"

import Row from "./Component/Row"
import Rowd from "./Component/Rowd"


class App extends React.Component {
    
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
