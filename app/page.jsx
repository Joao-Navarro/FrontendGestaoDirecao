'use client'
import { useState, useEffect } from 'react';
import style from "@/app/page.module.css"
import Image from 'next/image';
const SignIn = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [msgError, setMsgError] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);



  
  const entrar = () => {
    // Definindo credenciais fixas
    const usuarioFixo = 'Gestão';
    const senhaFixa = '2024';

    // Verificar se os campos estão preenchidos
    if (!usuario || !senha) {
      setMsgError('Por favor, preencha todos os campos.');
      return;
    }

    // Comparar as credenciais inseridas com as fixas
    if (usuario === usuarioFixo && senha === senhaFixa) {
      const token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2) + "Amamos_DS_;-)";
      localStorage.setItem("token", token);
      localStorage.setItem("userLogado", JSON.stringify({ userCad: usuarioFixo, senhaCad: senhaFixa }));
      window.location.href = "../menu"; // Redirecionar após login
    } else {
      setMsgError('Usuário ou senha incorretos');
      setUsuario('');
      setSenha('');
    }
  };
  return (
    <div className={style.body}>
    
      <Image className={style.image} src='/FUNDOLOGIN.jpeg'  fill={true}/>

      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.p}>Login</h1>

          {msgError && <div id="msgError" style={{ color: 'red' }}>{msgError}</div>}

          <div className={style.labelFloat}>
            <input className={style.input}
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              placeholder='Digite seu usuario'
            />
          </div>

          <div className={style.labelFloat}>
            <input className={style.input}
              type={senhaVisivel ? 'text' : 'password'}
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder='Digite sua senha'
            />
            <i
              className={`fa fa-eye${senhaVisivel ? '' : '-slash'}`}
              aria-hidden="true"
              onClick={() => setSenhaVisivel(!senhaVisivel)} // Alternar visibilidade da senha
              style={{ cursor: 'pointer' }}
            ></i>
          </div>

          <div className={style.justifyCenter}>
            <button className={style.button} onClick={entrar}>Entrar</button>
          </div>

          <div className={style.justifyCenter}>
            <hr />
          </div>

          
        </div>
      </div>
    </div>
  );
};


export default SignIn;
