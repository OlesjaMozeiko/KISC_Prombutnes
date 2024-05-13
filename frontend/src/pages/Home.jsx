import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(false);
  const [namedayToday, setNamedayToday] = useState({});


  useEffect(() => {
    setLoading(true);

    axios.get('https://nameday.abalin.net/api/V1/today', {}, {
      params: {
        country: "lv"
      },
      headers: {
        ContentType: "application/json",
        Accept: "application/json",
      }
    })
      .then((response) => {
        console.log(response);
        setNamedayToday(response.data);
      })
    console.log(namedayToday)

    loadScript();


    setLoading(false);
  }, []);

  
  function removeAllScripts(){
    const existingScripts = document.querySelectorAll('script[src^="https://weatherwidget.io"]');
    existingScripts.forEach(script => script.parentNode.removeChild(script));
  };

  async function loadScript(){     
    removeAllScripts();
    const script = document.createElement('script');
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  };



  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-1'></h1>
      </div>
      {
        loading ? (<Spinner />)
          : (
            <div className='my-6'>
              <p className='text-xl mb-6'><strong>Šodien:</strong> {new Date().toLocaleDateString()}</p>
              <a className="weatherwidget-io" href="https://forecast7.com/en/56d9524d11/riga/" data-label_1="RIGA" data-label_2="WEATHER" >RIGA WEATHER</a>
              <script>
                
              </script>
              <p className='text-xl mt-6'><strong>Vārda dienu svin:</strong> {namedayToday?.nameday?.lv}</p>
            </div>
          )
      }


      <div className=''>
        <h2 className='text-xl pb-2 bottom-25'> Tīmekļa vietne KISC Prombūtnes paredzēta Kultūras informācijas sistēmu centra darbiniekiem. </h2>


        Uzsākot darbu ar vietni, lūdzam  iepazīties ar lietotāja ceļvedi.

      </div>



    </div>
  )
}

export default Home