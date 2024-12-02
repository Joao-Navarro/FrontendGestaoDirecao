'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o useRouter
import styles from './editUser.module.css';
import Header from '@/components/Header';

export default function EditUserPage({ params }) {
  const router = useRouter(); // Inicializa o useRouter
  const [msgErro, setMsgErro] = useState('');
  const [user, setUser] = useState({
    etapa: '',
    ano: '',
    tipoprova: params.tipoprova || '',
    notaExt: '',
    rm: ''
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3001/avalia/${params.rm}/${params.ano}`);
    const data = await res.json();
    setUser(data);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/avalia/${params.rm}/${params.ano}/${user.tipoprova}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
      }

      // Limpar os valores do formulário
      setUser({
        etapa: '',
        ano: '',
        tipoprova: '',
        notaExt: '',
        rm: ''
      });

      // Redirecionar para outra página após a atualização
      router.push('/avaliacaoExterna/avalia'); // Substitua pelo caminho desejado
    } catch (error) {
      setMsgErro('Erro ao atualizar aluno')
      setTimeout(() => setMsgErro(''), 3000)
    }
  };

  return (
    <>

{ msgErro && (
        <div className={styles.msgErro}>
          {msgErro}
          </div>)}

<Header/>

    <div className={styles.container}>
      <h1 className={styles.text}>Editar Nota</h1>
      <form onSubmit={updateUser} className={styles.form}>

        <label for='etapa'>Etapa</label>
        <input
          id='etapa'
          type="number"
          placeholder="etapa"
          value={user.etapa}
          onChange={(e) => setUser({ ...user, etapa: e.target.value })}
          className={styles.input}
        />

        <label for='tipoprova'>Tipo de prova</label>
        <select
          disabled
          id='tipoprova'
          className={styles.input}
          value={user.tipoprova}
          onChange={(e) => setUser({ ...user, tipoprova: e.target.value })}
        >
          <option value="">Tipo de Prova</option>
          <option value="SARESP">SARESP</option>
          <option value="DESBRAVA">DESBRAVENEM</option>
        </select>


        <label for='nota'>Nota</label>
        <input
          id='nota'
          type="number"
          placeholder="Nota"
          value={user.notaExt}
          onChange={(e) => setUser({ ...user, notaExt: e.target.value })}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Salvar</button>
      </form>
    </div>

    </>
  );
}