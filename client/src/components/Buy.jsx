import React from 'react';
import { ethers } from 'ethers';
import convert from 'ethereum-unit-converter';
import "./Buy.css";

const Buy = ({state}) => {

    const buyChai = async (event)=>{
        event.preventDefault();
        const {contract}=state;
        const name= document.querySelector('#name').value;
        const message= document.querySelector('#message').value;
        var amount= document.querySelector('#amount').value;
        amount = {value:ethers.utils.parseEther(amount)};
        const transaction = await contract.buyChai(name,message,amount);
        await transaction.wait();
        alert("Transaction is Sucessful");
        window.location.reload();

    }

  return (
    <div className="center">
       <h1>Thanks</h1>
        <form onSubmit={buyChai}>
          <div className="inputbox">
            <input type="text" required="required" id="name" />
            <span>Name</span>
          </div>
          <div className="inputbox">
            <input type="text" required="required" id="message" />
            <span>Message</span>
          </div>
          <div className='inputbox'>
            <input id='amount' placeholder='amount'></input>
          </div>
          <div className="inputbox">
            <input type="submit" value="Pay"  disabled={!state.contract}/>
          </div>
        </form>
          
        </div>
  )
}

export default Buy