import React, {Component} from 'react';

export default class ChartRoom extends Component{
    constructor(){
        super();
        this.state = {
            message: '',
            messages : [
                //
            ]
        }
    }

    componentDidMount(){
        window.firebase.database().ref('messages/').on('value',snap=>{
            const currentmessages = snap.val();
            if(currentmessages!==null){
                this.setState({
                    messages: currentmessages
                })
            }

        })
    }

    updateMessage(e){

        this.setState({
            message: e.target.value    
        })
        console.log(''+this.state.message);
    }
    handleSubmit(e){
        e.preventDefault();
        const list = this.state.messages;
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.message
        }
        //list.push(newMessage);
        /*this.setState({
            messages: list
        })*/
        window.firebase.database().ref(`messages/${newMessage.id}`)
        .set(newMessage);
        this.setState({
            message: ''
        })

    }
    render(){
        const { messages } = this.state
        const messageList = messages.map(message=>{
            return <li key = {message.id}>{message.text}</li>
        })
        return(
            <div>
                <ul>
              {messageList}  
              </ul>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <button type="submit">Agregar</button>
                <input type="text" value={this.state.message} onChange={this.updateMessage.bind(this)}/>
              </form>
            </div>
        )
    }
}