import React,{Component} from "react"
import AppBar from "../AppBar/appBar"
import {uploadAvatar} from "../UserFunction"

class Profil extends Component{

    state={
        selectedFile: null
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0]
          })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        const data = new FormData()
        data.append('myImage', this.state.selectedFile)
        uploadAvatar(localStorage.getItem("token"),data)
        .then(res=>{
            console.log(res)
        })
    }
    render(){
        return(
            <> 
{/*                 <AppBar/> */}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="file" name="myImage" onChange={this.onChangeHandler}/>
                        <button type="submit">Upload</button>
                    </form>
                    Profile
                </div>
            </>
        )
    }
}

export default Profil