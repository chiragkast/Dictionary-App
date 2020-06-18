let input = document.querySelector('#input');
let btn = document.querySelector('#search');
let apikey = '699ee18b-e59a-41d3-ad25-2ce83aae7767';
let notFound=document.querySelector('.not_found');
let defBox= document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let load = document.querySelector('.loading');

btn.addEventListener('click',function(e)
{
    e.preventDefault(); //stop page loading when we click the button
    
    //clear data
    audioBox.innerHTML = '';
    defBox.innerText='';
    notFound.innerText='';

    //get input data
    let word=input.value;

    //call API get data
    if(word === '')       // checking if input is empty or not
    {
        alert("Please type a word..")
        return;
    }
    
    getData(word);

});

  async function getData(word)
  {
      load.style.display = 'block';
    //Ajex call
    const response = await  fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);
    const data = await response.json();

    //if empty result
    if(!data.length)
    {
        notFound.innerText = 'No result found';
        return;
    }

    // if result is suggestion means result is the simmiler to the data

    if(typeof data[0] === 'string')
    {
        load.style.display = 'none';
        let heading=document.createElement('h3');
        heading.innerText = 'Did you mean?';
        notFound.appendChild(heading);
        
        data.forEach(element =>
            {
                let suggestion=document.createElement('span');
                suggestion.classList.add('suggested');
                suggestion.innerText = element;
                notFound.appendChild(suggestion);
            })
               return;
    }

     // Result found
     load.style.display = 'none';
     let defination=data[0].shortdef[0];
     defBox.innerText= defination;

     //sound

     const sound=data[0].hwi.prs[0].sound.audio;
       if(sound)
       {
           renderSound(sound);
       }

       
    console.log(data);

  }

  function renderSound(sound)
  {
      let subFolder = sound.charAt(0);
      let soundSrc = ` https://media.merriam-webster.com/soundc11/${subFolder}/${sound}.wav?key=${apikey}`;
      let aud=document.createElement('audio');
      aud.src= soundSrc;
      aud.controls = true;
      audioBox.appendChild(aud);

  }

 