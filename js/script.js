const getWord = (url)  =>  {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${url}`)
    .then(res => res.json())
    .then(word => showMeaning(word[0]))
    .catch(err => alert('please enter a valid data'))
}

const showMeaning = (datas) => {
    document.getElementById('input').value = '';
    // console.log(datas);
    const wordDetailContainer = document.getElementById('word-details-container');
    const word = document.createElement('p');
    word.innerHTML =   `${datas.word}`;
    wordDetailContainer.appendChild(word);

    // 
    
    // forEach
    datas.meanings.forEach(element => {
        // console.log(element);
        const parts = document.getElementById('parts');
        const definContainer = document.createElement('div');
        const title = document.createElement('h4');
        title.innerHTML = `${element.partOfSpeech}`
        // console.log(element.definitions)
        let i = 0;
        element.definitions.forEach(definition => {
            // console.log(definition)
            // console.log(definition.definition)
            
            i++;
            const definText=document.createElement('p')
            definText.innerHTML = `${i}. ${definition.definition}`
            definContainer.appendChild(definText);
        })
        parts.appendChild(title)
        parts.appendChild(definContainer)
        

    });
}























document.getElementById('input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const searchWord = document.getElementById('input').value;
        getWord(searchWord)
    }
})

getWord('how')
