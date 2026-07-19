export async function POST(req) {

  const dados = await req.json();

  const resposta = await fetch(
    "https://paysuite.tech/api/v1/payments",
    {
      method: "POST",
      headers: {
        "Authorization":
        `Bearer ${process.env.PAYSUITE_TOKEN}`,

        "Content-Type":
        "application/json"
      },

      body: JSON.stringify({

        amount: dados.valor,

        description:
        dados.produto,

        reference:
        dados.referencia

      })
    }
  );


  const resultado =
  await resposta.json();


  return Response.json(resultado);
}
