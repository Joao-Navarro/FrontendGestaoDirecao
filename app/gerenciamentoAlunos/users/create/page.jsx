'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import styles from './createUser.module.css';
import Link from 'next/link';

export default function CreateUserPage() {
    const [NomeAluno, setNomeAluno] = useState('');
    const [RM, setRM] = useState('');
    const [Turma, setTurma] = useState('');
    const [Ano, setAno] = useState('');
    const [msgSucesso, setMsgSucesso] = useState('');
    const [msgErro, setMsgErro] = useState('');


    const createUser = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch('http://localhost:3001/alunos/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ RM, Turma, Ano, NomeAluno })
    
    
          });
    
          // Verifica se a resposta não foi bem-sucedida
          if (!res.ok) {
            setMsgErro('Erro ao criar usuário. Usuário já existente')
          setTimeout(() => setMsgErro(''), 3000)
    
          setAno('');
          setRM('');
          setTurma('');
          setNomeAluno(''); 
        } else {
          setMsgSucesso('Usuário carregado com sucesso!');
          setTimeout(() => setMsgSucesso(''), 3000)
    
          setAno('');
          setRM('');
          setTurma('');
          setNomeAluno('');
        }
         
        } catch (error) {
          console.log('error', error)
        }
    
      };


    const handleEnsinoTurmaChange = (e) => {
        console.log('etapa changed:', e.target.value);
        setTurma(e.target.value);
    }



    return (

        <div className={styles.container}>
            <Header />

            {msgSucesso && (
        <div className={styles.msgSucesso}>
          {msgSucesso}
        </div>)}
      {msgErro && (
        <div className={styles.msgErro}>
          {msgErro}
        </div>)}

            <h1 className={styles.h1}>Criar Novo Aluno</h1>
            <form onSubmit={createUser} className={styles.form}>

                <div className={styles.create}>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={NomeAluno}
                        onChange={(e) => setNomeAluno(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="RM"
                        value={RM}
                        onChange={(e) => setRM(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Ano"
                        value={Ano}
                        onChange={(e) => setAno(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.filtro}>
                    <label>
                        <select className={styles.button} name="ensino" value={Turma} onChange={handleEnsinoTurmaChange}>
                            <option value="">EF I</option>
                            <option value="1%25E.F">1 Ano</option>
                            <option value="2%25E.F">2º Ano</option>
                            <option value="3%25E.F">3º Ano</option>
                            <option value="4%25E.F">4º Ano</option>
                            <option value="5%25E.F">5º Ano</option>
                        </select>
                    </label>




                    <label>
                        <select className={styles.button} name="ensino" value={Turma} onChange={handleEnsinoTurmaChange}>
                            <option value="">EF II</option>
                            <option value="6%25A%25">6º Ano A</option>
                            <option value="6%25B%25">6º Ano B</option>
                            <option value="7%25A%25">7º Ano A</option>
                            <option value="7%25B%25">7º Ano B</option>
                            <option value="8%25A%25">8º Ano A</option>
                            <option value="8%25B%25">8º Ano B</option>
                            <option value="9%25A%25">9º Ano A</option>
                            <option value="9%25B%25">9º Ano B</option>
                        </select>
                    </label>


                    <label>
                        <select className={styles.button} name="ensino" value={Turma} onChange={handleEnsinoTurmaChange}>
                            <option value="">EM</option>
                            <option value="1%25A%25">1º Ano A</option>
                            <option value="1%25B%25">1º Ano B</option>
                            <option value="2%25E.M">2º Ano</option>
                            <option value="3%25E.M">3º Ano</option>
                        </select>
                    </label>
                </div>


                <button type="submit" className={styles.createButton}>Criar</button>

                <Link className={styles.back} href= '/gerenciamentoAlunos'>  Voltar</Link>
            </form>

        </div>

    );
}