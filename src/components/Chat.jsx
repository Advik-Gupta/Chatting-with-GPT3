import React, { useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import db from '../firebase';
import './Chat.css'

const Chat = ({user, setUser}) => {
    const [message, setMessage] = React.useState('');
    const [gettingAns, setGettingAns] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    useEffect(() => {
        db.collection('users').doc(user.id).onSnapshot(snapshot => {
            const data = snapshot.data()
            setUser(data)
        })
    }, [])

    useEffect(() => {
        if (user.messages.length > 0) {
            const elements = document.querySelectorAll(".message ");
            if (elements.length > 0) {
                elements[elements.length - 3].scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [user])

    const sendMessage = async () => {
        setMessage('')

        db.collection('users').doc(user.id).update({
            messages: [...user.messages, {
                msg: message,
                gpt3: false
            }]
        })

        setGettingAns(true)
        setFailed(false)

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API,
        });

        const openai = new OpenAIApi(configuration);

        try {
            const response = await openai.createCompletion("text-davinci-002", {
                prompt: `${message}`,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
    
            setGettingAns(false)
            const gpt3Answer = response.data.choices[0].text.trim()

            db.collection('users').doc(user.id).update({
                messages: [...user.messages,{
                    msg: message,
                    gpt3: false
                }, {
                    msg: gpt3Answer,
                    gpt3: true
                }]
            })
        } catch (error) {
            console.log(error);
            setFailed(true)
            setGettingAns(false)
        }
    }    

    return (
        <div>
            <div class="container-fluid" style={{height: '100vh'}}>
                <h1 class="display-5" style={{height: '8vh'}}>You are chatting with GPT3</h1>
                <p class="lead" style={{height: '5vh', margin: '0'}}>Please ignore the styling of the website, This is a demo version, if people like it, I'll launch a proper finished version</p>
                <div className="container" style={{height: '70vh', overflowY: 'scroll', padding: '10px'}}>
                    {
                        user.messages && user.messages.map((message, index) => (
                            <div key={`message${index}`} className={`message ${message.gpt3 ? 'gpt3' : ''}`}>
                                <p className="msg_text">
                                    {message.msg}
                                </p>
                            </div>
                        ))
                    }
                    <div className={`message gpt3 ${gettingAns ? '' : 'hidden'}`}>
                        <p className="msg_text">
                            Typing...
                        </p>
                    </div>
                    <div className={`message gpt3 ${failed ? 'not_sent' : 'hidden'}`}>
                        <p className="msg_text">
                            Message was not sent
                        </p>
                    </div>
                </div>
                <div className="container" style={{height: '5vh', marginTop: '15px'}}>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Send message" aria-label="Send message" aria-describedby="button-addon2" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button class="btn btn-outline-primary" type="button" id="button-addon2" onClick={sendMessage}>Send</button>
                </div>
                </div>
                <p class="lead" style={{height: '5vh', margin: '20px 0 0 0', background: '#d1d1d1'}}>Made by Advik Gupta</p>
            </div>
        </div>
    )
}

export default Chat