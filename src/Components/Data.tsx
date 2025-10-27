function DataAtual() {
  const hoje = new Date();

  const opcoes = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as const;

  let dataFormatada = new Intl.DateTimeFormat('pt-BR', opcoes).format(hoje);
  dataFormatada = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  dataFormatada = dataFormatada.replace(
    /\b(de \w)/g,
    (match) => `de ${match.charAt(3).toUpperCase()}${match.slice(4)}`
  );

  return (
    <h1 className="text-base md:text-xl ml-2 md:ml-3">
      {dataFormatada}
    </h1>
  );
}

export default DataAtual;