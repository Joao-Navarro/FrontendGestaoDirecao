"use client";
import React, { useState, useRef, useEffect } from 'react';
import style from "./page.module.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';




const Home = () => {
  const [ensinoTurma, setEnsinoTurma] = useState(''); // add state for each select
  const [etapa, setEtapa] = useState('');
  const [ano, setAno] = useState('');
  const descricaoRef = useRef(null);


  const [msgSucesso, setMsgSucesso] = useState('');
  const [msgErro, setMsgErro] = useState('');

  useEffect(() => {
    if (descricaoRef.current) {
      descricaoRef.current.innerHTML = '';
    }
  }, []);




  const getFilter = async () => {
    if (ensinoTurma && etapa && ano) {
      const url = `http://localhost:3001/cursotec/${etapa}/${ensinoTurma}/${ano}`;  //http://localhost:3001/cursotec/1S/3%25E.M/2024
      console.log(`Constructed URL: ${url}`);
      console.log('Current state:', etapa, ensinoTurma, ano);


      try {
        const response = await fetch(url);
        console.log(response);
        const resData = await response.json();
        console.log(resData);


        // Create a table element
        // Create a table element


        const table = document.createElement('table');
        table.className = style.table;

        if (Array.isArray(resData) && resData.length === 0) {
          setMsgErro('Erro ao carregar tabela')
        setTimeout(() => setMsgErro(''), 3000)
          document.getElementById("descricao").innerHTML = ''; // Limpa a tabela anterior
      } else {
        setMsgSucesso('Tabela carregada com sucesso!');
        setTimeout(() => setMsgSucesso(''), 3000)
        document.getElementById("descricao").innerHTML = ''; // Limpa a tabela anterior
      }
        // Verifique se a classe foi adicionada
        // add a border to the table


        // Create a header row
        const headerRow = table.insertRow(0);
        const headers = Object.keys(resData[0]);
        headers.forEach((header, index) => {
          const th = document.createElement('th');
          if (header === 'rm') {
            th.innerHTML = 'RM';
          } else if (header === 'Turma') {
            th.innerHTML = 'Turma';
          } else if (header === 'PorcentagemAcertoIngles') {
            th.innerHTML = 'Porcentagem Acerto Inglês';
          } else if (header === 'Ebep' || header === 'ComDeficiencia') {
            th.innerHTML = header.replace('Ebep', 'E.B.E.P').replace('ComDeficiencia', 'Com Deficiência');
          } else {
            th.innerHTML = header.replace('1S-', '1ª Etapa ').replace('2S-', '2ª Etapa ').replace('3S-', '3ª Etapa ').replace('CH', 'Ciências Humanas').replace('CN', 'Ciências Naturais').replace('LI', 'Língua Inglesa').replace('LP', 'Língua Portuguesa').replace('MAT', 'Matemática');
          }
          headerRow.appendChild(th);
        });


        // Create rows for each data item
        resData.forEach((item) => {
          const row = table.insertRow();
          headers.forEach((header) => {
            const cell = row.insertCell();
            if (item[header] === null) {
              cell.innerHTML = "Não informado";
            } else if (header === 'Ebep' || header === 'ComDeficiencia') {
              cell.innerHTML = item[header] === 'TRUE' ? 'Sim' : 'Não';
            } else {
              cell.innerHTML = item[header];
            }
          });
        });


        // Add the table to the #descricao div
        document.getElementById("descricao").innerHTML = '';
        document.getElementById("descricao").appendChild(table);
      } catch (error) {
        console.log('error', error)
      }
    } else {
      console.log('Please select all options');
    }
  }


  // add event handlers for each select
  const handleEnsinoTurmaChange = (e) => {
    console.log('etapa changed:', e.target.value);
    setEnsinoTurma(e.target.value);
  }


  const handleEtapaChange = (e) => {
    console.log('ensinoTurma changed:', e.target.value);
    setEtapa(e.target.value);
  }


  const handleAnoChange = (e) => {
    console.log('ano changed:', e.target.value);
    setAno(e.target.value);
  }




  return (
    <>
    { msgSucesso && (
        <div className={style.msgSucesso}>
          {msgSucesso}
          </div>)}
          { msgErro && (
        <div className={style.msgErro}>
          {msgErro}
          </div>)}
      <Header />  
      
        <h1 className={style.text}>Curso Técnico</h1>

      <div className={style.filtro}>
        


        <label>
          <select className={style.button} name="ensino" value={ensinoTurma} onChange={handleEnsinoTurmaChange}>
            <option value="">EM</option>
          
            <option value="2%25E.M">2º Ano</option>
            <option value="3%25E.M">3º Ano</option>
          </select>
        </label>




        <label>
          <select className={style.button} name="etapa" onChange={handleEtapaChange} value={etapa}>
            <option value="">Etapa</option>
            <option value="1S">1</option>
            <option value="2S">2</option>
      
          </select>
        </label>


        <div className={style.ano}>
          <input
            className={style.input}
            value={ano}
            type='number'
            onChange={handleAnoChange}
            name="ano"
            placeholder='Ano'/>
  </div>


        <button className={style.button} onClick={getFilter} disabled={!ensinoTurma || !etapa || !ano}>Filtrar</button>


      </div>


  

     
        <div style={{ overflow: 'auto' }}  className={style.table} id='descricao' ref={descricaoRef} />
       
              <div className={style.footer}>


      </div>


    </>
  );
};


export default Home;

