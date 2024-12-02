"use client";
import React, { useState } from 'react';
import style from "./page.module.css";
import Header from '@/components/Header';
import Link from 'next/link';

const Home = () => {
  const [Turma, setTurma] = useState('');
  const [etapa, setEtapa] = useState('');
  const [ano, setAno] = useState('');
  const [tipoprova, setTipoprova] = useState('');
  const [msgSucesso, setMsgSucesso] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [data, setData] = useState([]);

  const getFilter = async () => {
    if (Turma && etapa && ano && tipoprova) {
      const url = `http://localhost:3001/avalia/${etapa}/${Turma}/${ano}/${tipoprova}`;
      console.log(`Constructed URL: ${url}`);
      console.log('Current state:', etapa, Turma, ano, tipoprova);

      try {
        const response = await fetch(url);
        const resData = await response.json();
        console.log(resData);

        if (Array.isArray(resData) && resData.length === 0) {
          setMsgErro('Erro ao carregar tabela');
          setTimeout(() => setMsgErro(''), 3000);
          setData([]); // Limpa os dados se não houver resultados
        } else {
          setMsgSucesso('Tabela carregada com sucesso!');
          setTimeout(() => setMsgSucesso(''), 3000);
          setData(resData); // Armazena os dados recebidos
        }

      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log('Please select all options');
    }
  }


  // add event handlers for each select
  const handleTurmaChange = (e) => {
    console.log('etapa changed:', e.target.value);
    setTurma(e.target.value);
  }


  const handleEtapaChange = (e) => {
    console.log('ensinoTurma changed:', e.target.value);
    setEtapa(e.target.value);
  }


  const handleAnoChange = (e) => {
    console.log('ano changed:', e.target.value);
    setAno(e.target.value);
  }

  const handleTipoprovaChange = (e) => {
    console.log('tipo prova changed:', e.target.value);
    setTipoprova(e.target.value);
  }


  return (
    <>
      {msgSucesso && (
        <div className={style.msgSucesso}>
          {msgSucesso}
        </div>)}
      {msgErro && (
        <div className={style.msgErro}>
          {msgErro}
        </div>)}

      <div className={style.body}>
        <Header />
        
        <h1 className={style.text}>Listar Avaliações</h1>
        
        <div className={style.filtro}>
          <label>
            <select className={style.button} name="ensino" value={Turma} onChange={handleTurmaChange}>
              <option value="">EF I</option>
              <option value="3%25E.F">3º Ano</option>
              <option value="4%25E.F">4º Ano</option>
              <option value="5%25E.F">5º Ano</option >
            </select>
          </label>




          <label>
            <select className={style.button} name="ensino" value={Turma} onChange={handleTurmaChange}>
              <option value="">EF II</option>
              <option value="6%25A%25">6º Ano A</option>
              <option value="6%25B%25">6º Ano B</option>
              <option value="7%25A%25">7º Ano A</option>
              <option value="7%25B%25">7º Ano B</option>
              <option value="8%25A%25">8º Ano A</option><option value="8%25B%25">8º Ano B</option>
              <option value="9%25A%25">9º Ano A</option>
              <option value="9%25B%25">9º Ano B</option>
            </select>
          </label>


          <label>
            <select className={style.button} name="ensino" value={Turma} onChange={handleTurmaChange}>
              <option value="">EM</option>
              <option value="1%25A%25">1º Ano A</option>
              <option value="1%25B%25">1º Ano B</option>
              <option value="2%25E.M">2º Ano</option>
              <option value="3%25E.M">3º Ano</option>
            </select>
          </label>




          <label>
            <select className={style.button} name="etapa" onChange={handleEtapaChange} value={etapa}>
              <option value="">Etapa</option>
              <option value="1S">1</option>
              <option value="2S">2</option>
              <option value="3S">3</option>
            </select>
          </label>

          <label>
            <select className={style.button} name="etapa" onChange={handleTipoprovaChange} value={tipoprova}>
              <option value="">Tipo de Prova</option>
              <option value="SARESP">SARESP</option>
              <option value="DESBRAVA">DESBRAVENEM</option>
            </select>
          </label>


          <input placeholder='Ano' value={ano} type='number' onChange={handleAnoChange} name="ano" />






          <button className={style.button} onClick={getFilter} disabled={!Turma || !etapa || !ano || !tipoprova}>Filtrar</button>




        </div>


        

        <div className={style.tableAll} >
          <div className={style.table} id='descricao'>
            {data.length > 0 && (
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>RM</th>
                    <th>Nome do Aluno</th>
                    <th>Nota</th>
                    <th>Ano</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.rm}>
                      <td>{item.rm !== null ? item.rm : "Não informado"}</td>
                      <td>{item.NomeAluno !== null ? item.NomeAluno : "Não informado"}</td>
                      <td>{item.notaExt !== null ? item.notaExt : "Não informado"}</td>
                      <td>{item.ano !== null ? item.ano : "Não informado"}</td>
                        <Link href={`avalia/${item.rm}/${item.ano}/edit`} className={style.editLink}>
                          Editar
                        </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <Link className={style.back} href='/avaliacaoExterna'>Voltar</Link>
      </div>
    </>
  );
};


export default Home;