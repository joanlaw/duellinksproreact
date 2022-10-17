import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from './Header'
import axios from 'axios'
import Footer from './Footer'
import { Link, NavLink } from 'react-router-dom'
import DataTable from 'react-data-table-component'


const columns= [
  { title: 'Arquetipo', selector: 'arquetipo'  },
  { title: 'Habilidad', selector: 'habilidad'  },
  { title: 'Top', selector: 'top'  },
  { title: 'createdAt', selector: 'createdAt' },
  { title: 'Link', selector: '_id'   }
]
const baseUrl="https://dlpro-backend.herokuapp.com/decks/"

export default function Listadecks() {

const [ listadecks, setListadecks ] = useState ([])





const peticionGet= async()=>{
  await axios.get(baseUrl)
  .then(response=>{
   console.log(response.data);
    setListadecks(response.data)
  })
}

useEffect (()=>{
  peticionGet()
}, [] ) 


  return (
    <div className='searchmargen'>
       <Header /> 
    
     <DataTable 
     columns={columns}
     data={listadecks}
     title="Lista de decks"
     pagination
     
     />
   
     <br />
     <Footer />
    </div>
  )
}
