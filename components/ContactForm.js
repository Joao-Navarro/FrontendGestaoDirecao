// components/ContactForm.js
'use client'

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from "../app/suporte/page.module.css"

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
            .then((result) => {
                console.log(result.text);
                setStatus('Mensagem enviada com sucesso!');

                // Resetar o formulário
                form.current.reset(); // Adicione esta linha para resetar o formulário
            }, (error) => {
                console.log(error.text);
                setStatus('Erro ao enviar a mensagem, tente novamente.');
            });
    };



    return (

        <div className={styles.body}>

            <div className={styles.container}>


            <div className={styles.card}>

                <h1>CENTRAL DE ATENDIMENTO</h1>


                <form ref={form} onSubmit={sendEmail}>

                    <div className={styles.labelFloat}>
                            <input className={styles.input}  placeholder='Nome' type="text" name="user_name" required />
                    </div>


                    <div className={styles.labelFloat}>
                        <input  className={styles.input}  placeholder='Email' type="email" name="user_email" required />
                    </div>


                    <div className={styles.labelFloat}>
                        <textarea  className={styles.input} placeholder='Mensagem' name="message" required />
                    </div>

                    <div className={styles.justifyCenter}>
                    <button className={styles.button} type="submit">Enviar</button>

                        {status && <p>{status}</p>}

                    </div>



                </form>

            </div>

            </div>

        </div>

    );
};

export default ContactForm;