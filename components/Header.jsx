"use client"

import Image from 'next/image';
import '@/app/globals.css';
import Link from 'next/link';
import { FaHouse } from "react-icons/fa6";
import { IoMdChatboxes } from "react-icons/io";


function Header() {


    return (

        <>

            <div className="header">

                <div className="casa" >


                   <Link href="/menu"> <FaHouse size={45} className="icone"/> </Link> 
                    
                   <Link href="/suporte"> <IoMdChatboxes size={50} className="icone" /> </Link>  

                </div>



                <div className="logo">

                    <Image src="/imagelogo.png" alt="JSX Icon" width='150' height='40' />

                </div>







            </div>


        </>

    )

}

export default Header