import { prisma } from "../src/config/database.js";

async function main() {
  const categoriesInfos = [
    { name: "Fantasia" },
    { name: "Romance" },
    { name: "Suspense" },
    { name: "Literatura nacional" },
    { name: "Ficção científica" },
    { name: "Literatura Infantil" },
    { name: "Terror" },
  ];
  for (let i = 0; i < categoriesInfos.length; i++) {
    await prisma.category.upsert({
      where: { name: categoriesInfos[i].name },
      update: {},
      create: {
        name: categoriesInfos[i].name,
      },
    });
  }
  const authorsInfos = [
    { name: "Sarah J. Maas" },
    { name: "Stephen King" },
    { name: "Carissa Broadbent" },
    { name: "Rebecca Yarros" },
  ];

  for (let i = 0; i < authorsInfos.length; i++) {
    await prisma.author.upsert({
      where: { name: authorsInfos[i].name },
      update: {},
      create: {
        name: authorsInfos[i].name,
      },
    });
  }
  const booksInfos = [
    {
      title: "O cemitério",
      synopsis:
        "Louis Creed, um jovem médico de Chicago, acredita que encontrou seu lugar em uma pequena cidade do Maine. A boa casa, o trabalho na universidade e a felicidade da esposa e dos filhos lhe trazem a certeza de que fez a melhor escolha. Num dos primeiros passeios pela região, conhecem um cemitério no bosque próximo à sua casa. Ali, gerações de crianças enterraram seus animais de estimação. Mas, para além dos pequenos túmulos, há um outro cemitério. Uma terra maligna que atrai pessoas com promessas sedutoras. Um universo dominado por forças estranhas capazes de tornar real o que sempre pareceu impossível. A princípio, Louis Creed se diverte com as histórias fantasmagóricas do vizinho Crandall. No entanto, quando o gato de sua filha Eillen morre atropelado e, subitamente, retorna à vida, ele percebe que há coisas que nem mesmo a sua ciência pode explicar. Que mistérios esconde o cemitério dos bichos? Terá o homem o direito de interferir no mundo dos mortos? Em busca das respostas, Louis Creed é levado por uma trama sobrenatural em que o limite entre a vida e a morte é inexistente. E, quando descobre a verdade, percebe que ela é muito pior que seus mais terríveis pesadelos. Pior que a própria morte - e infinitamente mais poderosa. A Capa Pode Variar.",
      authorId: 2,
      bookImage: "https://m.media-amazon.com/images/I/8151ymQnnuL._SY466_.jpg",
      categoryId: 7,
      totalPages: 424,
    },
    {
      title: "A dança da morte",
      synopsis:
        "Após um erro de computação no Departamento de Defesa, um vírus é liberado, dando origem à doença que ficará conhecida como Capitão Viajante, ou supergripe. Não demora muito para que um milhão de contatos casuais formem uma cadeia de morte, e é assim que o mundo como o conhecemos acaba. O que surge no lugar é um mundo árido, sem instituições e esvaziado de 99% da população. Um mundo onde sobreviventes em pânico escolhem seus lados — ou são escolhidos. Os bons se apoiam nos ombros frágeis de Mãe Abigail, com seus cento e oito anos de idade, enquanto todo o mal é incorporado por um indivíduo de poderes indizíveis: Randall Flagg, o homem escuro.",
      authorId: 2,
      categoryId: 7,
      bookImage:
        "https://m.media-amazon.com/images/I/61q4wMFjYbL._AC_UL320_.jpg",
      totalPages: 1268,
      preSale: false,
    },
    {
      title: "Trono de vidro (Vol. 1)",
      synopsis:
        "A magia há muito abandonou Adarlan.  Um perverso rei governa, punindo impiedosamente as minorias rebeldes. Mas tudo pode mudar quando uma assassina é chamada para o castelo. Em Trono de vidro, livro que da início a série bestseller com mais de um milhão de cópias vendidas e legiões de fãs no mundo todo, Celaena tem uma perigosa missão que pode lhe garantir sua tão sonhada liberdade ou ser a sua sentença de morte. /n Aos 18 anos uma prisioneira está cumprindo sua sentença. Ela é uma assassina, e a melhor de Adarlan. Aprisionada e fraca, ela está quase perdendo as esperanças, a sentença de morte é iminente, mas a jovem recebe uma proposta inesperada: representar o príncipe em uma competição com lutando contra os mais habilidosos assassinos e larápios do reino. Mas ela não diz sim apenas para matar, seu foco é obter sua liberdade de volta. /n Se derrotar os 23 assassinos, ladrões e soldados, será a campeã do rei e estará livre depois de servi-lo por alguns anos. /n Endovier é uma sentença de morte, e cada duelo em Adarlan será para viver ou morrer. Mas se o preço é ser livre, e ela está disposta a tudo. /n Seu nome é Celaena Sardothien. O príncipe herdeiro vai provocá-la, o capitão da guarda fará tudo para protegê-la. E uma princesa de terras distantes se tornará algo que Celaena jamais pensou ter novamente: uma amiga. /n Mas algo maligno habita o castelo - e está ali para matar. Quando os demais competidores começam a morrer, um a um e de maneira terrível, Celaena se vê mais uma vez envolvida em uma batalha pela sobrevivência e inicia uma jornada desesperada para desvendar a origem daquele mal antes que ele destrua o mundo dela. E sua única chance de ser livre.",
      authorId: 1,
      categoryId: 1,
      bookImage:
        "https://m.media-amazon.com/images/I/81f1oA6voPL._AC_UL320_.jpg",
      totalPages: 392,
      preSale: false,
    },
    {
      title: "Quarta asa",
      synopsis:
        "Um dragão sem seu cavaleiro é uma tragédia. /n Um cavaleiro sem seu dragão é um homem morto. /n Em Quarta Asa, best-seller #1 do The New York Times, uma jovem precisa sobreviver ao treinamento em uma escola de elite para poderosos cavaleiros de dragões, onde a única regra é se formar... ou morrer tentando. /n Violet Sorrengail, uma jovem de vinte anos, estava destinada a entrar na Divisão dos Escribas, levando uma vida relativamente tranquila entre os livros e as aulas de História. No entanto, a general comandante das forças de Navarre – também conhecida como sua mãe –, durona como as garras de um dragão, ordena que Violet se junte às centenas de candidatos que buscam se tornar a elite de seu país: cavaleiros de dragões.",
      authorId: 4,
      categoryId: 1,
      bookImage:
        "https://m.media-amazon.com/images/I/61q4wMFjYbL._AC_UL320_.jpg",
      totalPages: 544,
      preSale: false,
    },
    {
      title:
        "A serpente e as asas feitas de noite: Livro 1 da duologia Nascidos da Noite (Coroas de Nyaxia)",
      synopsis:
        "Para humanos e vampiros, as regras são as mesmas: nunca confie em ninguém, nunca ceda e sempre — sempre — proteja seu coração. A serpente e as asas feitas de noite é sucesso no TikTok e o primeiro volume da duologia Nascidos da noite, a saga inicial de Coroas de Nyaxia, uma romantasia repleta de magia das sombras, intrigas e romances perigosos.",
      authorId: 3,
      categoryId: 1,
      bookImage: "https://m.media-amazon.com/images/I/81npNlBT6zL._SY466_.jpg",
      totalPages: 645,
      preSale: false,
    },
  ];
  for (let i = 0; i < booksInfos.length; i++) {
    await prisma.book.upsert({
      where: {
        title_authorId: {
          title: booksInfos[i].title,
          authorId: booksInfos[i].authorId,
        },
      },
      update: {},
      create: booksInfos[i],
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
