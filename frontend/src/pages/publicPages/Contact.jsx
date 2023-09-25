import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import "../../styles/_global.css"

export default function Contact(){
    const [name ,setName] =useState('');
    const [email ,setEmail] =useState('');
    const [message, setMessage]=useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();

        console.log('Formulaire soumis');
        console.log('Nom',name);
        console.log('Email',email);
        console.log('Message',message);

        setName('');
        setEmail('');
        setMessage('');

    }
    return (
        <>
        <Helmet>
        <title>Contactez-nous Fanatics Super-héros</title>
        <meta name="description" content="Remplissez le formulaire de contact et rejoignez la communauté des Fanatics Superhéros" />
        <meta name="robots" content="noindex" />
        </Helmet>
        <div className="contactContainer">
            <h2 className="h2Contact">Contacter nous</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="formContact">
                    <label htmlFor="name">Nom:</label>
                    <input type="text" id="name"value={name}onChange={(e)=> setName(e.target.value)} required />
                </div>
                <div className="formContact">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email"value={email}onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="formContact">
                    <label htmlFor="message">Votre message:</label>
                    <textarea name="message" id="message" value={message} cols="30" rows="10" onChange={(e)=>setMessage(e.target.value)} required></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
        </>
    );
};

