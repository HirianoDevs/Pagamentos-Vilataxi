export async function POST(req){

const dados = await req.json();


const resposta = await fetch(
"https://paysuite.tech/api/v1/payments",
{

method:"POST",

headers:{

"Authorization":
`Bearer ${process.env.PAYSUITE_TOKEN}`,

"Content-Type":
"application/json",

"Accept":
"application/json"

},


body:JSON.stringify({

amount:dados.valor,

reference:dados.referencia,

description:dados.produto,

return_url:
"https://pagamentos-vilataxi.vercel.app/sucesso"

})

});


const resultado =
await resposta.json();



return Response.json(resultado,{
headers:{
"Access-Control-Allow-Origin":"*"
}
});


}
