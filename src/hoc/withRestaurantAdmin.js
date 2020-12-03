import React,{Component} from "react"

const withRestaurantAdmin = WrappedComponent =>( 
    class HOC extends Component{
        state={
            type:[],
            nameRestaurant:"",
            address:"",
            rating:0,
            types:[]
         }
    
        handleChange = (event) =>{  // function handle change the state dependind the fiel update
            const {name,value} = event.target
            this.setState({[name]:value})    
        }
    
        handleClick=()=>{  // add a input tag
            let myType = [...this.state.type]
            myType.push("input")
            this.setState({type:myType})
        }
    
        handleDelete=(key)=>{ // delete a input type tag
            let myType = [...this.state.type]
            myType.splice(key,1)
            //console.log(myType)
            this.setState({type:myType})
        }
    
        handleSubmit=(event)=>{
            event.preventDefault()
            let typesRestaurants = [...this.state.types]
            let myTypes = document.getElementsByClassName('typeRestaurant')
            Object.keys(myTypes)
            .forEach(key=>{
                typesRestaurants.push(myTypes[key].value)
            })
            this.setState({types:typesRestaurants})
    
        }
        render(){
            return(
                <WrappedComponent
                    type={this.state.type}
                    nameRestaurant={this.state.nameRestaurant}
                    address={this.state.address}
                    rating={this.state.rating}
                    types={this.state.types}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                    {...this.props}
                />
            )
        }
    }
)

export default withRestaurantAdmin