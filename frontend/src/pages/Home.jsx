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
        <h2 className='text-xl pb-4'>Interneta lietotāju skaits un internetā veikto darījumu apjoms pieaug ļoti strauji. Mainās arī pircēju paradumi, kas dažādas preces un pakalpojumus iegādājas ar interneta starpniecību. Moderno tehnoloģiju attīstība ražotājiem ir pavērusi milzīgas tirgus iespējas tieši globālajā tīmeklī. Ja Jūs ar interneta starpniecību vēlaties uzsākt vai attīstīt savu biznesu, taču Jūsu rīcībā nav lielu naudas līdzekļu, ko ieguldīt mājaslapas izveidē. Serveris.lv piedāvā Jums ideālu risinājumu – bezmaksas mājas lapas izveidi. Šāds risinājums pieejams visiem Serveris.lv hostinga klientiem un ir piemērots gan individuāliem lietotājiem, gan organizācijām un maziem uzņēmumiem, kas vēlas ar minimāliem līdzekļiem ievietot informāciju par sevi internetā.</h2>



        Piedāvājam mājaslapu izveides rīku "Serveris.lv gudrais mājas lapu veidošanas rīks", ar kuru palīdzību klients mājaslapu var izveidot pats.



        Piedāvātās iespējas:

        Izvēlēties sev piemērotāko no vairāk nekā 200 dizaina variantiem.
        Vairāku valodu atbalsts.
        Izveidot jaunumu sadaļu, attēlu galerijas vai parastu teksta lap!!!!.
      </div>



    </div>
  )
}

export default Home