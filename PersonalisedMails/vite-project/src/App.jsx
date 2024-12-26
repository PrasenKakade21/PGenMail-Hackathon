import { useState } from 'react';
import R from './assets/images/R.jpg';
import './App.css';
import ScrollableTags from './ScrollableTags';

function App() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [time, setTime] = useState('06:30'); 
  const [subs, setSub] = useState('Subscribe');
  const [issub, setissub] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://pgen-mail-server.vercel.app/add-user', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          prompt: topic,
          send_time: time 
        }),
      });

      if (response.ok) {
        console.log('Data submitted successfully!');
        alert("Subscribed Successfully")
        setEmail("")
        setTopic("")  
        setSub("Subscribed")
        setissub(true)
      } else {
        alert("Oops! An Error occurred")
        console.error('Error submitting data:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="min-h-screen w-full px-4 py-8 flex flex-col lg:flex-row lg:items-start lg:justify-between lg:px-10 gap-8">
    
      <div className="w-full h-full lg:w-4/6  mt-32 lg:sticky lg:top-32">
        <img 
          src={R} 
          alt="Hero Image" 
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      
      <div className="w-full lg:w-2/5 mt-24 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          
          <div className="flex flex-col items-center">
            <label className="text-xl mb-2 text-black">Enter your mail</label>
            <input 
              className="bg-cyan-50 rounded-lg w-full max-w-xs h-10 px-3"
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-xl mb-2 text-black">Topic you are interested in</label>
            <input 
              className="bg-cyan-50 text-black w-full max-w-xs h-10 rounded-lg px-3"
              placeholder="Topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          
          <ScrollableTags />

          \
          <div className="flex flex-col items-center">
            <label className="text-xl mb-2 text-black">Schedule your mail (IST)</label>
            <input 
              className="text-black bg-cyan-50 rounded-md p-2"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className={`w-full max-w-xs mx-auto rounded-lg p-2 ${issub ? 'bg-green-400' : 'bg-blue-500'}`}>
            <button 
              onClick={handleSubmit}
              className="w-full text-white font-medium"
            >
              {subs}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;