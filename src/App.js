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
        this.onChanging = this.onChanging.bind(this)
        this.onSearching = this.onSearching.bind(this)
    }
    componentDidMount() {
       var repos = localStorage.getItem("Repositories")
       var d = JSON.parse(repos)
       if(d != null){
           this.setState({
               favor:d
           })
           
       }

    }
    
    onRemoving(key){
       
            const arrayCopy = this.state.favor.filter((row) => row.key !== key); // returns arrays that contains all the elements except the element with the key
            const element = this.state.data.find((row) => row.key === key) // returns element who has this key
            if(element != null){
                
                var i =  this.state.data.indexOf(element);
               const arrayCopy1 = this.state.data.filter((row) => row.key !== key);
               
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
               this.setState({data: arrayCopy1,favor: arrayCopy})
            }else{
                this.setState({favor:arrayCopy})
            }
            localStorage.setItem('Repositories', JSON.stringify(arrayCopy))
         
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
          localStorage.setItem('Repositories', JSON.stringify(arrayCopy1))

          
     
     }
     
     onSearching(){
        
        console.log(this.state.input)
        fetch("https://api.github.com/search/repositories?q="+this.state.input+"+language:all&sort=stars&order=desc")
        .then(res => res.json())
        .then(
          (result) => {
              var final = []
              for(var i = 0; i<result.items.length; i++){
                var repo = result.items[i]
                var e = this.state.favor.find((row) => row.key === repo.id)
                var isAdd = false
                if(e != null){
                    isAdd= true
                }
                
                var el = {
                    key:repo.id, 
                    name:repo.full_name,
                    Owner: repo.owner.login,
                    lang:repo.language,
                    Url:repo.html_url,
                    isAdded: isAdd
                }
                final.push(el);
              }
            
            this.setState({
                data:final
            })
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
           
          }
        )
        
    }
    onChanging(e){
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className="SearchDiv">
                    <input type="text"  onChange={this.onChanging}/>
                <button onClick={this.onSearching} >search</button>
                </div>
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
