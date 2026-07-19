const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};


export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}


export async function POST(req) {

  try {

    const dados = await req.json();


    const resposta = await fetch(
      "https://paysuite.tech/api/v1/payments",
      {
        method: "POST",

        headers: {
          "Authorization":
          `Bearer ${process.env.PAYSUITE_TOKEN}`,

          "Content-Type":
          "application/json",

          "Accept":
          "application/json"
        },

        body: JSON.stringify({

          amount: dados.valor,

          reference: dados.referencia,

          description: dados.produto,

          return_url:
          "https://pagamentos-vilataxi.vercel.app/sucesso"

        })
      }
    );


    const texto = await resposta.text();


    return new Response(texto, {
      status: resposta.status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });


  } catch(error) {

    return new Response(
      JSON.stringify({
        erro: error.message
      }),
      {
        status:500,
        headers:{
          ...corsHeaders,
          "Content-Type":"application/json"
        }
      }
    );

  }

}
