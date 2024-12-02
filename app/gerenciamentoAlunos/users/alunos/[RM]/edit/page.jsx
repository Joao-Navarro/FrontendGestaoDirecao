'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o useRouter
import styles from './page.module.css';
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
      }, [fetchUser]); // Adicione fetchUser como dependência
      

    const fetchUser = async () => {
        const res = await fetch(`http://localhost:3001/alunos/${params.RM}`);
        const data = await res.json();
        setUser(data);
    };

    const updateUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/alunos/${params.RM}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário');
            }

            // Limpar os valores do formulário
            setUser({
                Ano: '',
                Turma: '',
                NomeAluno: '',
                RM: ''
            });

            // Redirecionar para outra página após a atualização
            router.push('/gerenciamentoAlunos/users'); // Substitua pelo caminho desejado
        } catch (error) {
            setMsgErro('Erro ao carregar tabela')
            setTimeout(() => setMsgErro(''), 3000)
        }
    };

    return (
        <>

            {msgErro && (
                <div className={styles.msgErro}>
                    {msgErro}
                </div>)}

            <Header />

            <div className={styles.container}>
                <h1 className={styles.text}>Editar Aluno</h1>
                <form onSubmit={updateUser} className={styles.form}>

                    <label for='NomeALuno'>Nome do Aluno</label>
                    <input
                        id='NomeALuno'
                        type="Text"
                        placeholder="Nome do Aluno"
                        value={user.NomeAluno}
                        onChange={(e) => setUser({ ...user, NomeAluno: e.target.value })}
                        className={styles.input}
                    />

                    <label for='Turma'></label>
                    <select
                        id='Turma'
                        className={styles.input}
                        value={user.Turma}
                        onChange={(e) => setUser({ ...user, Turma: e.target.value })}
                    >                            <option value="">Turma</option>
                        <option value="1%25E.F">1 Ano</option>
                        <option value="2%25E.F">2º Ano</option>
                        <option value="3%25E.F">3º Ano</option>
                        <option value="4%25E.F">4º Ano</option>
                        <option value="5%25E.F">5º Ano</option>
                        <option value="6%25A%25">6º Ano A</option>
                        <option value="6%25B%25">6º Ano B</option>
                        <option value="7%25A%25">7º Ano A</option>
                        <option value="7%25B%25">7º Ano B</option>
                        <option value="8%25A%25">8º Ano A</option>
                        <option value="8%25B%25">8º Ano B</option>
                        <option value="9%25A%25">9º Ano A</option>
                        <option value="9%25B%25">9º Ano B</option>
                        <option value="1%25A%25">1º Ano EM A</option>
                        <option value="1%25B%25">1º Ano EM B</option>
                        <option value="2%25E.M">2º Ano EM</option>
                        <option value="3%25E.M">3º Ano EM</option>

                    </select>


                    <label for='Ano'>Ano</label>
                    <input
                        id='ANo'
                        type="Number"
                        placeholder="Ano"
                        value={user.Ano}
                        onChange={(e) => setUser({ ...user, Ano: e.target.value })}
                        className={styles.input}
                    />

                    <button type="submit" className={styles.button}>Salvar</button>
                </form>
            </div>

        </>
    );
}