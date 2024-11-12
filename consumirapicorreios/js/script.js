document.getElementById('buscar').addEventListener('click', async () => {

    const cep = document.getElementById('cep').value;
    const resultadoDiv = document.getElementById('resultado');

    if(cep.length === 8){
        try{
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            
            if(!response.ok){
                throw new Error('Falha na requisição' + response.status);
            }
            
            const data = await response.json();

            if(!data.erro){
                resultadoDiv.innerHTML = `
                <p>Endereço: ${data.logradouro}</p>
                <p>Bairro: ${data.bairro}</p>
                <p>Cidade: ${data.localidade}</p>
                <p>Estado: ${data.uf}</p>
                `;

            } else {
                resultadoDiv.innerHTML = `<p> CEP não encontrado </p>`;
            }

        } catch(error){
            resultadoDiv.innerHTML = `<p> Erro ao buscar o CEP: ${error.message}</p>`;
            console.error('Erro:', error);
        }

    } else {
        resultadoDiv.innerHTML = `<p> Por favor, digite um CEP válido.</p>`;
    }
});


