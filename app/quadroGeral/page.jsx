"use client";
import React, { useState, useEffect } from 'react';
import style from "./page.module.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home = () => {
  const [Turma, setEnsinoTurma] = useState('');
  const [etapa, setEtapa] = useState('');
  const [Ano, setAno] = useState('');
  const [Nota, setNota] = useState('');
  const [msgSucesso, setMsgSucesso] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [filtragemTentada, setFiltragemTentada] = useState(false);

  const [tabela1Data, setTabela1Data] = useState([]);
  const [tabela2Data, setTabela2Data] = useState([]);
  const [tabela3Data, setTabela3Data] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingRm, setEditingRm] = useState(null); // Para armazenar o RM da linha sendo editada

  useEffect(() => {
    const combinedData = [...tabela1Data, ...tabela2Data, ...tabela3Data];
  
    if (filtragemTentada) { // Verifique se a filtragem foi tentada
      if (combinedData.length === 0) {
        setMsgErro('Erro ao carregar tabela');
        setTimeout(() => setMsgErro(''), 3000);
      } else {
        setMsgSucesso('Tabela carregada com sucesso!');
        setTimeout(() => setMsgSucesso(''), 3000);
      }
    }
  }, [tabela1Data, tabela2Data, tabela3Data, filtragemTentada]);

  const getFilter = async () => {
    if (Turma && etapa && Ano) {
      setFiltragemTentada(true);
      try {
        const urls = [
          `http://localhost:3001/tabelageralef1/${etapa}/${Turma}/${Ano}/${Nota}`,
          `http://localhost:3001/tabelageralef2/${etapa}/${Turma}/${Ano}/${Nota}`,
          `http://localhost:3001/tabelageralem/${etapa}/${Turma}/${Ano}/${Nota}`
        ];

        
  
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
  
        setTabela1Data(data[0]);
        setTabela2Data(data[1]);
        setTabela3Data(data[2]);
  
        console.log('Dados carregados:', data[0]); // Verifique os dados carregados
      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log('Por favor, selecione todas as opções');
    }
  };

  const updateComDeficiencia = async (rowIndex, rm) => {
    console.log('tabela1Data antes da atualização:', tabela1Data); // Verifique o estado atual
    console.log('tabela2Data:', tabela2Data); // Verifique o estado atual
    console.log('tabela3Data:', tabela3Data); // Verifique o estado atual
    
    try {
      const response = await fetch(`http://localhost:3001/avaliasesi/${rm}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ComDeficiencia: editedValue }),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar os dados');
      }
      console.log('Atualização bem-sucedida');
  
      // Combine os dados das três tabelas
      const combinedData = [...tabela1Data, ...tabela2Data, ...tabela3Data];
  
      // Verifique se combinedData não está vazio
      if (combinedData.length === 0) {
        console.error('combinedData is empty, cannot update');
        return; // Saia da função se combinedData estiver vazio
      }
  
      // Encontre o índice do item que você deseja atualizar
      const itemIndex = combinedData.findIndex(item => item.RM === rm);
      if (itemIndex === -1) {
        console.error('Item não encontrado para RM:', rm);
        return; // Saia da função se o item não for encontrado
      }
  
      // Atualize o valor de ComDeficiencia
      combinedData[itemIndex].ComDeficiencia = editedValue;
  
      // Atualize o estado das tabelas
      // Aqui você pode decidir como atualizar cada tabela de acordo com sua lógica
      // Por exemplo, se você quiser atualizar tabela1Data, tabela2Data e tabela3Data com os dados combinados:
  
      // Reiniciar a edição
      setIsEditing(false);
      setEditedValue(''); // Limpar o valor do input
      setEditingRowIndex(null);
      setEditingRm(null); // Limpar RM após a edição
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  const startEditing = (rowIndex, value, rm) => {
    setIsEditing(true);
    setEditedValue(value);
    setEditingRowIndex(rowIndex);
    setEditingRm(rm); // Verifique se 'rm' está correto aqui
  };

  const saveEditedValue = () => {
    console.log('RM:', editingRm); // Adicione esta linha para depuração
    if (editingRm !== null && editingRowIndex !== null) {
      updateComDeficiencia(editingRowIndex, editingRm);
    }
  };

  const renderTable = (data) => {
    if (!data.length) return null;

    const notaHeaders = Object.keys(data[0]).filter(key => key.toLowerCase().includes('nota'));
    const avaliaHeaders = Object.keys(data[0]).filter(key => key.toLowerCase().includes('s'));
    const noToFixedHeaders = ['RM', 'Ano']; // Adicione aqui os cabeçalhos que não devem usar toFixed

    return (

      
      <div style={{ overflow: 'auto' }}>
        <table id='tabelas' className={style.table}>
          <thead>
            <tr>
              {Object.keys(data[0]).map((header, index) => (
                <th key={index}>
                  {header === "ComDeficiencia" ? "Inclusão" : header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {Object.keys(data[0]).map((header, cellIndex) => {
                  const value = item[header];
                  const isInclusaoColumn = header === 'ComDeficiencia';
                  // Aplicar toFixed se o valor for um número e o cabeçalho não estiver na lista de cabeçalhos que não devem usar toFixed
                  const displayValue = (typeof value === 'number' && !noToFixedHeaders.includes(header)) ? value.toFixed(2) : value;
                  const isNotaColumn = notaHeaders.includes(header);
                  const isAvaliaColumn = avaliaHeaders.includes(header);


                  const cellStyle = {};
                  if (isNotaColumn) {
                    // Para colunas "nota", aplica vermelho se o valor for menor que 7, senão verde
                    if (value === null || value === "Não informado") {
                      // Não aplica estilo se o valor for "Não informado"
                      cellStyle.backgroundColor = ''; // ou você pode omitir esta linha
                      cellStyle.color = ''; // ou você pode omitir esta linha
                    } else if (value < 7) {
                      cellStyle.backgroundColor = '#730d0d';
                      cellStyle.color = 'white';
                    } else if (value >= 7) {
                      cellStyle.backgroundColor = 'green';
                      cellStyle.color = 'white';
                    }

                  } else if (isAvaliaColumn) {
                    // Para colunas "avalia", aplica vermelho se o valor for "Nível 1" ou "Nível 2", senão verde
                    if (value === 'Nível 1' || value === 'Nível 2') {
                      cellStyle.backgroundColor = '#730d0d';
                      cellStyle.color = 'white';
                    } else if (value === 'Nível 3' || value === 'Nível 4') {
                      cellStyle.backgroundColor = 'green';
                      cellStyle.color = 'white';
                    }
                  }


                  return (
                    <td key={cellIndex} style={cellStyle}>
                      {isInclusaoColumn ? (
                        <>
                          {isEditing && editingRowIndex === rowIndex ? (
                            <>
                              <textarea
                                type="text"
                                value={editedValue}
                                onChange={(e) => setEditedValue(e.target.value)}
                              />
                              <button className={`${style.desa} desa`} onClick={saveEditedValue}>Salvar</button>
                            </>
                          ) : (
                            <>
                              <div onClick={() => startEditing(rowIndex, value, item.RM)}>{value || "Não informado"}</div>
                              <button className={`${style.desa} desa`}  onClick={() => startEditing(rowIndex, value, item.RM)}>Editar</button>
                            </>
                          )}
                        </>
                      ) : (
                        displayValue === null ? "Não informado" : displayValue

                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleEnsinoTurmaChange = (e) => {
    setEnsinoTurma(e.target.value);
  }

  const handleEtapaChange = (e) => {
    setEtapa(e.target.value);
  }

  const handleAnoChange = (e) => {
    setAno(e.target.value);
  }

  const handleNotaChange = (e) => {
    setNota(e.target.value);
  }

  const gerarPDF = () => {
    const tabela = document.getElementById('tabelas');
    const novaJanela = window.open('', '', 'width=800,height=600');

    novaJanela.document.write('<html><head><title>Quadro Geral PDF</title>');
    novaJanela.document.write(`<style>
        @page {
          size: landscape; 
        }
        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          font-size: x-small;
        }
        th, td {
           border: 1px solid black;
          padding: 8px;
          text-align: center;
          word-wrap: break-word; 
          overflow-wrap: break-word; 
          white-space: pre-wrap; 
        }
        th {
          background-color:#f4f4f4;
        }

        .desa {
        display: none !important;
        }
      </style>`);
    novaJanela.document.write('</head><body>');
    novaJanela.document.write(tabela.outerHTML);
    novaJanela.document.write('</body></html>');
    novaJanela.document.close();
    novaJanela.print();
  };

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
      <h1 className={style.text}>Quadro geral</h1>
      <div className={style.filtro}>
        <select className={style.button} name="ensino" value={Turma} onChange={handleEnsinoTurmaChange}>
          <option value="">EF I</option>
          <option value="3%25E.F">3º Ano</option>
          <option value="4%25E.F">4º Ano</option>
          <option value="5%25E.F">5º Ano</option>
        </select>

        <select className={style.button} name="ensino" value={Turma} onChange={handleEnsinoTurmaChange}>
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

        <select className={style.button} name="ensino" value={Turma} onChange={handleEnsinoTurmaChange}>
          <option value="">EM</option>
          <option value="1%25A%25">1º Ano A</option>
          <option value="1%25B%25">1º Ano B</option>
          <option value="2%25E.M">2º Ano</option>
          <option value="3%25E.M">3º Ano</option>
        </select>

        <label>
          <select className={style.button} name="etapa" onChange={handleEtapaChange} value={etapa}>
            <option value="">Etapa</option>
            <option value="1S">1</option>
            <option value="2S">2</option>
            <option value="3S">3</option>
          </select>
        </label>

        <div className={style.ano}>
          <input
            className={style.input}
            value={Ano}
            type='number'
            onChange={handleAnoChange}
            name="ano"
            placeholder='Ano' />
        </div>

        <div className={style.ano}>
          <input
            className={style.input}
            value={Nota}
            type='number'
            onChange={handleNotaChange}
            name="nota"
            placeholder='Nota' />
        </div>

      

        <button className={style.button} onClick={getFilter} disabled={!Turma || !etapa || !Ano}>
          Filtrar
        </button>
      </div>

      <div id='tabelas'>
        {renderTable(tabela1Data)}
        {renderTable(tabela2Data)}
        {renderTable(tabela3Data)}
      </div>

      <button className={style.pdf} onClick={gerarPDF}>Gerar PDF</button>
    </>
  );
};

export default Home;