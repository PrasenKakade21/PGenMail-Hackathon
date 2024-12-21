import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [time, setTime] = useState('06:30'); 

  const handleSubmit = async () => {
    try {
      const response = await fetch('/your-api-endpoint', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, topic, time }),
      });

      if (response.ok) {
        console.log('Data submitted successfully!');
        
      } else {
        console.error('Error submitting data:', response.status);
        
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <div className='bg-white p-8 mt-3 rounded-lg'>
      <div className='text-black p-5 flex flex-col justify-center items-center'>
        <label className=' text-xl mb-2'>Enter your mail </label>
        <input 
          className='bg-cyan-50 rounded-lg' 
          placeholder='  E-mail' 
          type='email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className='text-black p-5 flex flex-col justify-center items-center '>
        <label className='text-xl mb-2'>Topic you are intrested in </label>
        <input 
          className='bg-cyan-50 text-black w-60 h-10 rounded-lg' 
          placeholder=' Topic' 
          type='text' 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
        />
      </div>
      <div className='p-5 text-black flex flex-col justify-center items-center'>
        <label className='text-xl mb-2'>Schedule your mail </label>
        <input 
          className='text-black bg-cyan-50 rounded-md p-1 ' 
          type='time' 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />
      </div>
      <div className='bg-black rounded-lg p-2 mt-2'>
        <button onClick={handleSubmit}>Subscribe</button> 
      </div>
    </div>
  );
}

export default App;