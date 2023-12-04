import { createSlice } from '@reduxjs/toolkit'
import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage.external'

const initialState ={
    isloggin:true,
    userblock:false,
}

const Authsection=createSlice(
    {
        name:"auth",
        initialState:initialState,
        reducers:{ 
            isLoggin:(state,action)=>{
                state.isloggin=false


            },
            isLogout:(state,action)=>{
                return initialState


            }
       



        }

    }
)
export const  {isLoggin,isLogout }=Authsection.actions
export default Authsection.reducer