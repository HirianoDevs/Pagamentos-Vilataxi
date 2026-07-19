export async function POST(req) {
  try {
    const dados = await req.json();

    // 1. Validação básica de segurança antes de gastar processamento
    if (!dados.valor || !dados.referencia) {
      return Response.json(
        { error: "Dados obrigatórios (valor ou referência) estão ausentes." }, 
        { status: 400 }
      );
    }

    const resposta = await fetch("https://paysuite.tech/api/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PAYSUITE_TOKEN}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        amount: dados.valor, // Dica: garanta que o formato (centavos ou decimal) está correto aqui
        reference: dados.referencia,
        description: dados.produto || "Pagamento VilaTáxi",
        return_url: "https://pagamentos-vilataxi.vercel.app/sucesso"
      })
    });

    const resultado = await resposta.json();

    // 2. CORREÇÃO CRUCIAL: Repassa o status HTTP real recebido da PaySuite
    return Response.json(resultado, {
      status: resposta.status, 
      headers: {
        // Só mantenha o CORS se essa API for chamada por um app mobile ou outro domínio externo.
        // Se o front-end estiver no mesmo projeto Next.js, você pode remover essa linha.
        "Access-Control-Allow-Origin": "*" 
      }
    });

  } catch (error) {
    console.error("Erro interno ao processar pagamento:", error);
    
    return Response.json(
      { error: "Não foi possível processar o pagamento no momento." }, 
      { status: 500 }
    );
  }
}
