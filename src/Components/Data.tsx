function DataAtual() {
  // 1. Pega a data atual
  const hoje = new Date();

  // 2. Formata a data para o formato desejado (Português do Brasil)
  // O TypeScript agora infere o tipo correto (ex: "long" em vez de string)
  const opcoes = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
  } as const;
  
  // Isso pode gerar "segunda-feira, 18 de setembro de 2025" (minúsculo)
  let dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoes).format(hoje);
  
  // Para capitalizar o dia da semana e o mês (como no seu exemplo):
  dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  
  // Capitaliza o mês (ex: "de setembro" para "de Setembro")
  // Esta é uma forma simples de fazer isso:
  dataFormatada = dataFormatada.replace(
    /\b(de \w)/g, 
    (match) => `de ${match.charAt(3).toUpperCase()}${match.slice(4)}`
  );

  // 3. Renderiza o h1 com a data formatada
  return (
    <h1 className="text-base md:text-xl ml-2 md:ml-3">
      {dataFormatada}
    </h1>
  );
}

export default DataAtual;