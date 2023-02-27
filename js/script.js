const getWord = (url)  =>  {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${url}`)
        .then(res => res.json())
        .then(word => showMeaning(word[0]))
        .catch(err => alert('please enter a valid data'))
}

const showMeaning = (datas) => {
    console.log(datas)
    // word
    document.getElementById('input').value = '';
    const wordDetailContainer = document.getElementById('word-details-container');
    wordDetailContainer.classList.add('my-6')
    wordDetailContainer.innerHTML = '';
    const word = document.createElement('h4');
    word.innerHTML =   `Word : ${datas.word}`;
    wordDetailContainer.appendChild(word);
    // audio
    let audioLink ;
    datas.phonetics.forEach( phonetic => {
        if (phonetic.audio !== '') {
            audioLink = phonetic.audio;
        }
    })
    const audiobtn = document.createElement('button');
    audiobtn.classList.add('bg-sky-500');
    audiobtn.classList.add('px-5');
    audiobtn.classList.add('py-3');
    audiobtn.classList.add('my-3');
    audiobtn.classList.add('rounded');
    audiobtn.classList.add('text-white');
    audiobtn.classList.add('font-semibold');
    audiobtn.innerText = `Play Audio`;
    audiobtn.addEventListener('click', function () {
        const audio = new Audio(`${audioLink}`)
        audio.play();
    })
    wordDetailContainer.appendChild(audiobtn)
    // sourceUrl
    const sourceUrl = document.createElement('h4');
    sourceUrl.innerHTML =   `SourceUrl : ${datas.sourceUrls[0]? datas.sourceUrls[0]: 'sourceURL not found'} <a href="${datas.sourceUrls[0]? datas.sourceUrls[0]: '#'}"  target="_blank">🔗</a>`;
    wordDetailContainer.appendChild(sourceUrl);

    
    // forEach
    datas.meanings.forEach(element => {
        // console.log(element);
        const parts = document.getElementById('parts');
        const definContainer = document.createElement('div');
        const title = document.createElement('h4');
        title.classList.add('mt-4')
        title.innerHTML = `${element.partOfSpeech.toUpperCase()}`
        // console.log(element.definitions)
        let i = 0;
        element.definitions.forEach(definition => {
            i++;
            const definText=document.createElement('p')
            definText.innerHTML = `${i}. ${definition.definition}`
            definContainer.appendChild(definText);
        })
        parts.appendChild(title);
        parts.appendChild(definContainer);
    });
    loading(false);
}

// input 
document.getElementById('input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const searchWord = document.getElementById('input').value;
        getWord(searchWord)
        loading(true)
    }
})
const search =()=>{
    const searchWord = document.getElementById('input').value;
    getWord(searchWord);
    loading(true);
}

// spinner 
function loading(isLoading) {
    const loading =document.getElementById('loading');
    if (isLoading === true) {
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}