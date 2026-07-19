export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}


export async function POST(req) {

  const dados = await req.json();

  return Response.json({
    sucesso: true,
    recebido: dados
  },
  {
    headers:{
      "Access-Control-Allow-Origin":"*"
    }
  });

}
