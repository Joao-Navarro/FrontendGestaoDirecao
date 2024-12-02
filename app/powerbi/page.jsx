import React from 'react';
import './Page.css'; // Importando o arquivo CSS

const Page = () => {
    return (
        <div className="body">
            <img
                src="https://images.datacamp.com/image/upload/v1714478776/re388xshtgihucfiiavf.png"
                alt=""
                className="image" // Usando a classe CSS
            />
            <a
                href="https://app.powerbi.com/home?experience=power-bi&culture=pt-br&country=br&ScenarioId=Signup"
                className="button" // Usando a classe CSS
                target="_blank"
                rel="noopener noreferrer"
            >
                Ir para Power BI
            </a>
        </div>
    );
};

export default Page;