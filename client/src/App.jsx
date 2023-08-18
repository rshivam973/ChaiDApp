import { useState, useEffect } from 'react'
import './App.css'
import abi from './contractJson/chai.json';
import { ethers } from 'ethers';
import Buy from './components/Buy';
import Memos from './components/Memos';
import chai from '../chai.png';

function App() {
  const [state, setState] = useState({
    provider : null,
    signer : null,
    contract: null
  })

  const [account, setAccount] = useState('Not connected');


  useEffect(()=>{
    const template= async ()=>{
      const contractAddress="0x985B86658cAC5D6ac91c523F5AC9ceaCcDA73AE6";
      const contractABI=abi.abi;
      //Metamask part
      //1. In order to do transactions on goerli testnet
      //2. Metamask consists of infura api which actually help us in connecting to the blockchain
      try {
        const {ethereum} = window;
      const account = await ethereum.request({
        method: "eth_requestAccounts"
      })

      window.ethereum.on("accountsChanged",()=>{
        window.location.reload()
        
      })
      setAccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      console.log(contract);

      setState({provider,signer,contract});

      } catch (error) {
        alert(error);
      }
      

    }

    template();
  },[])

  return (
    <div style={{backgroundColor: '#EFEFEF', height: '100%'}}>
      <br/>
      <h1 style={{textAlign:'center'}}>Buy Chai</h1>
      {/* <img src={chai} className='img-fluid' alt='logo' width='100%' /> */}
      <p className='text-muted lead' style={{marginTop: '10px', marginLeft: '5px'}} >
        <small>Connected Account: {account}</small>
      </p>
      <div className='container'>
        <Buy state={state} />
        <Memos state={state} />
      </div>
      
      
    </div>
  )
}

export default App;
