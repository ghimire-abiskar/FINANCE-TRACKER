import { useState } from "react";

import Ledgercontext from './Ledgercontext'

let Datacontext = (props) => {
    const host = "http://localhost:5001"

    const [ledgers, setledgers] = useState([]);

    const fetchLedgers = async () => {
        const url = `${host}/api/trans/all`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            // alert('Hey');
            console.log(json);
            setledgers(json);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    const addLedger = async (type, amount, category, description) => {

        const url = `${host}/api/trans/add`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({ type, amount, category, description })
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log("Hello")
            setledgers(ledgers.concat(json));
        } catch (error) {
            console.error(error.message);
        }
    };


    const updateLedger = async (type, amount, category, description, id) => {
        //API CALLS
        const url = `${host}/api/trans/update/${id}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({ type, amount, category, description })
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }

        //logic for frontend
        //newnotes are used here because React uses shallow comparison for state updates. If you directly mutate the array, React might not detect a change because the array reference remains the same, leading to missed re-renders in certain cases.
        const newledgers = JSON.parse(JSON.stringify(ledgers));
        for (let index = 0; index < ledgers.length; index++) {
            if (newledgers[index]._id === id) {
                newledgers[index].amount = amount;
                newledgers[index].type = type;
                newledgers[index].description = description;
                newledgers[index].category = category;
                break;
            }
        }
        setledgers(newledgers);
    }


    const deleteledger = async (id) => {
        const url = `${host}/api/trans/delete/${id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }

        //logic for frontend
        const newledgers = ledgers.filter((note) => { return note._id !== id });
        setledgers(newledgers);
    }
    return (

        <Ledgercontext.Provider value={{ ledgers, addLedger, updateLedger, deleteledger, fetchLedgers }}>
            {props.children}
        </Ledgercontext.Provider>

    );
}

export default Datacontext;