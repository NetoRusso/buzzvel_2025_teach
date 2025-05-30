![Capa](https://github.com/user-attachments/assets/e75faf90-3222-48a5-a2a2-c297f489fa8d)
# Projeto de Avaliação Frontend Developer - Buzzvel (teach)

## Veja online: https://teach-drab.vercel.app/


Este projeto foi desenvolvido como parte do teste de avaliação para a vaga de Frontend Developer na Buzzvel, com o objetivo de replicar um design fornecido no Figma, implementando uma landing page responsiva, animada e otimizada para performance e SEO.

![Image](https://github.com/user-attachments/assets/a5b3200b-db51-4000-b1ad-2d7b759e7892)


## Design de Referência

O design da interface do usuário foi baseado nos protótipos web e mobile fornecidos no Figma.

## Tecnologias Utilizadas
![Next](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GSAP](https://img.shields.io/badge/GSAP-93CF2B?style=for-the-badge&logo=greensock&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)


*   **Framework:** Next.js (v14.2.28)
    *   Escolhido por seus recursos de renderização (SSR/SSG), otimização de imagens, otimização de fontes, code splitting e roteamento, que contribuem significativamente para a performance e SEO.
*   **Linguagem:** JavaScript (ES6+)
*   **Estilização:** CSS Modules
    *   Para garantir estilos escopados por componente, evitando conflitos de classes e promovendo a modularidade.
    *   Variáveis CSS globais foram usadas para o tema de cores.
*   **Animação:**
    *   **GSAP (GreenSock Animation Platform):** Utilizada para animações de paralaxe complexas na seção "Join a world of learning", aproveitando o plugin `ScrollTrigger`.
    *   **Framer Motion:** Empregada para animações de UI, como o morphing do `Blob` e transições de estado (ex: hover no `Blob`). O hook `useAnimationFrame` foi usado para o loop de animação do `Blob`.
    *   **Flubber:** Usada em conjunto com Framer Motion para a interpolação suave entre diferentes formas SVG no componente `Blob`.
    *   **Transições CSS:** Utilizadas para animações mais simples como hovers, abertura/fechamento de menus e dropdowns.
*   **Gerenciamento de Estado:**
    *   React Hooks (`useState`, `useEffect`, `useRef`, `useContext`).
    *   **`WindowWidthContext`:** Um contexto customizado para fornecer informações sobre a largura da janela e o estado `isMobile` para os componentes, permitindo uma renderização condicional e adaptações responsivas no lado do cliente.
*   **Testes:**
    *   **Jest:** Framework de teste.
    *   **React Testing Library:** Para testar componentes React de forma focada na experiência do usuário.
    *   Mocks para dependências (ex: `next/image`, `next/link`, `react-intersection-observer`, bibliotecas de animação) e APIs do browser (ex: `Date`, `performance.now`, `requestAnimationFrame`).
*   **Linting:** ESLint com a configuração `next/core-web-vitals`.
*   **Outras bibliotecas:**
    *   `react-intersection-observer`: Para detectar quando componentes entram na viewport, acionando animações ou carregamento tardio.
    *   `classnames`: Utilitário para aplicar classes CSS condicionalmente.

## Funcionalidades Implementadas

O projeto consiste em uma landing page single-page composta por várias seções (componentes):

1.  **Menu (`@/components/Menu`):**
    *   Navegação principal fixa no topo.
    *   Layout responsivo: menu horizontal em desktop, menu hambúrguer fullscreen em mobile.
    *   Dropdown "Resources" funcional em ambas as visualizações.
    *   Links para "Log In" e botão "Sign Up Now".
    *   Logo clicável que rola a página para o topo.

<img src="https://github.com/user-attachments/assets/c8bff71e-c1ad-4394-b008-c3db3cb56648" width="700" />
<img src="https://github.com/user-attachments/assets/46940a0a-9095-49a1-a553-19d3a864af88" width="200" />


2.  **Hero (`@/components/Hero`):**
    *   Seção principal de boas-vindas.
    *   Título principal (`<h1>`), parágrafo descritivo.
    *   Botões de Call-to-Action ("Sign Up Now", "View Demo").
    *   Imagem principal otimizada com `next/image` e `priority={true}`.
    *   Seção "Trusted by" com logos de empresas, adaptando a quebra de linha do texto para mobile.

<img src="https://github.com/user-attachments/assets/7f6e63db-32a0-4563-9940-4a99bea6acf2" width="700" />
<img src="https://github.com/user-attachments/assets/6c3348dd-df9e-4843-9d20-a2af2b0bf4e4" width="200" />

3.  **Features (`@/components/Features`):**
    *   Seção destacando funcionalidades do app "all-in-one".
    *   Layout de duas colunas (ou empilhado).
    *   Lista de tópicos, imagem de um desktop.
    *   Carrossel horizontal de cards de features com funcionalidade de "arrastar para rolar" (mouse).
    *   Elemento `Blob` animado no fundo, carregado dinamicamente.

<img src="https://github.com/user-attachments/assets/146f83ea-f76d-4046-8a43-18ec1f0e9c6a" width="700" />
<img src="https://github.com/user-attachments/assets/8cf24364-a563-4ca1-8e8f-69c41f074b5d" width="200" />

4.  **QuotoCard (`@/components/QuotoCard`):**
    *   Renderiza um card de citação/depoimento com design elaborado.
    *   Inclui texto, autor, imagem e elementos decorativos.
    *   Possui elementos visuais (setas, dots) que sugerem uma funcionalidade de slider, porém, a lógica de navegação do slider não foi implementada neste componente isolado. A seção "SocialProof" implementa o carrossel de depoimentos.

<img src="https://github.com/user-attachments/assets/5cd32cf8-89d4-4ab8-a1bf-1b641945be12" width="700" />
<img src="https://github.com/user-attachments/assets/1288ff94-db58-408a-9e1e-561d0fbbaf94" width="200" />


5.  **Meeting (`@/components/Meeting`):**
    *   Seção com um grid de 10 fotos e um bloco de texto.
    *   Implementa um efeito visual onde, a cada intervalo de tempo, uma foto aleatória no grid recebe "foco" (escala, opacidade e z-index aumentados) através de animação CSS controlada por JavaScript.

<img src="https://github.com/user-attachments/assets/a1747406-bdde-4e64-ad28-d0ff58ced7bb" width="700" />
<img src="https://github.com/user-attachments/assets/91d4eac2-119f-4760-9af7-5c82f24319e3" width="200" />

6.  **Count (`@/components/Count`):**
    *   Seção com estatísticas numéricas (países, professores, estudantes).
    *   Os números são animados utilizando o componente `AnimateCounter` quando a seção entra na viewport.
    *   Utiliza a função `formatNumber` para exibir números grandes com sufixo "M".

<img src="https://github.com/user-attachments/assets/b9f82a10-04a9-44fa-a304-37b09131677a" width="700" />
<img src="https://github.com/user-attachments/assets/c1a8376b-4d2b-4b41-8a20-a81f1d98eff8" width="200" />

7.  **SocialProof (`@/components/SocialProof`):**
    *   Carrossel de depoimentos ("What everyone says").
    *   Cards com texto, foto do usuário, nome e cargo.
    *   Navegação por botões "prev/next" em desktop.
    *   Funcionalidade de "arrastar para rolar" (mouse) em todas as visualizações.
    *   Layout responsivo, escondendo botões de navegação em mobile.

<img src="https://github.com/user-attachments/assets/078f0b74-d466-45c8-a86f-aeb8426afa5a" width="700" />
<img src="https://github.com/user-attachments/assets/7dcf7838-0254-4c77-9ad1-9a309df5cd1a" width="200" />

8.  **CallFeatures (`@/components/CallFeatures`):**
    *   Seção de call-to-action para mais funcionalidades.
    *   Layout com texto, link e um grid de cards e imagens.
    *   Elemento `Blob` animado no fundo, carregado dinamicamente quando a seção entra na view.

<img src="https://github.com/user-attachments/assets/c8546a75-f51d-4920-8caf-bb2cd45a3040" width="700" />
<img src="https://github.com/user-attachments/assets/8abc7501-7818-4b99-af4f-cfcbc78e7aa4" width="200" />


9.  **Join (`@/components/Join`):**
    *   Seção visualmente rica com um call-to-action central ("Join a world of learning").
    *   Múltiplas imagens (fotos de usuários e ícones) flutuam ao redor com efeito de paralaxe ao rolar a página, implementado com GSAP e ScrollTrigger.
    *   As animações e posições das imagens se adaptam entre desktop e mobile.
    *   GSAP é carregado dinamicamente quando a seção se torna visível.

<img src="https://github.com/user-attachments/assets/7f2a9359-e83f-4a4f-9c37-553139dcd631" width="700" />
<img src="https://github.com/user-attachments/assets/a58b5d3c-2608-4857-9ee8-6ffdb0cab19e" width="200" />


10. **Request (`@/components/Request`):**
    *   Formulário para "Request Demo".
    *   Campos para email e mensagem.
    *   Design estilizado, mas sem lógica de submissão no lado do cliente implementada.

11. **Footer (`@/components/Footer`):**
    *   Rodapé da página com logo, múltiplas colunas de links de navegação.
    *   Seção de copyright com ano dinâmico e links adicionais (termos, privacidade, idioma, moeda, acessibilidade).
    *   Logo clicável que rola a página para o topo.

## Decisões de Design e Arquitetura

*   **Componentização:** A interface foi dividida em componentes reutilizáveis e bem definidos, facilitando a manutenção e o desenvolvimento. Cada seção principal da página é um componente.
*   **Responsividade:**
    *   Utilização do `WindowWidthContext` para aplicar lógica de responsividade no JavaScript (ex: renderização condicional de elementos, adaptação de animações).
    *   Uso extensivo de CSS Flexbox e Grid para layouts flexíveis.
    *   Emprego de unidades `clamp()` e `calc()` no CSS para tipografia e dimensionamento fluidos.
    *   Media queries para ajustes mais específicos em breakpoints definidos.
*   **Estilização:** CSS Modules foram escolhidos para evitar conflitos de nome de classes e manter os estilos encapsulados por componente. Variáveis CSS globais (`:root` em `globals.css`) são usadas para o tema de cores, garantindo consistência.
*   **Animações:**
    *   Uma combinação de bibliotecas foi utilizada para diferentes propósitos: GSAP para paralaxe complexo baseado em scroll, Framer Motion e Flubber para morphing de SVGs e animações de UI, e transições CSS para interações mais simples.
    *   O carregamento dinâmico de bibliotecas de animação (GSAP no componente `Join`) foi implementado para melhorar o tempo de carregamento inicial.
    *   Animações são frequentemente acionadas pela visibilidade do componente usando `react-intersection-observer`.
*   **Performance:**
    *   **Lazy Loading:** Imagens são carregadas com `loading="lazy"` (via `next/image`) e componentes mais pesados ou com bibliotecas de animação são carregados dinamicamente com `next/dynamic` (`Blob`, GSAP).
    *   **Otimização de Fontes:** `next/font/google` é usado para carregar e otimizar a fonte Roboto.
    *   **Otimização de Imagens:** `next/image` é usado para otimizar automaticamente as imagens (redimensionamento, formatos modernos, etc.). A prop `priority` é usada para a imagem principal do Hero.
*   **SEO:**
    *   Estrutura HTML semântica.
    *   Meta tags básicas (title, description, viewport, author, keywords, Open Graph, Twitter Cards) na página principal.
    *   Uso de `next/link` para navegação interna.
    *   Atributos `alt` nas imagens.
    *   Conteúdo renderizado no servidor/estático pelo Next.js.
*   **Gerenciamento de Estado:** O estado local dos componentes é gerenciado com `useState` e `useRef`. O `WindowWidthContext` centraliza a lógica de detecção da largura da janela.

## Estrutura do Projeto

```
.
├── __mocks__/             # Mocks para Jest (arquivos, estilos)
├── components/            # Componentes React reutilizáveis
│   ├── AnimateCounter/
│   ├── Blob/
│   ├── CallFeatures/
│   ├── Count/
│   ├── Features/
│   ├── Footer/
│   ├── Hero/
│   ├── Join/
│   ├── Meeting/
│   ├── Menu/
│   ├── QuotoCard/
│   ├── Request/
│   └── SocialProof/
├── context/               # Context API do React
│   └── WindowWidthContext.jsx
├── pages/                 # Páginas e rotas (Pages Router do Next.js)
│   ├── _app.js            # Custom App
│   ├── _document.js       # Custom Document
│   └── index.js           # Página principal
├── public/                # Assets estáticos (favicon, imagens OG, etc.)
│   └── favicon.ico
│   └── og.png             # Exemplo de imagem para Open Graph
├── src/                   # Alias para diretórios internos (configurado no jsconfig.json)
├── styles/                # Estilos globais e CSS Modules específicos de páginas
│   ├── globals.css
│   └── Home.module.css
├── utils/                 # Funções utilitárias
│   └── formatNumber.js
├── .eslintrc.json         # Configuração do ESLint
├── .gitignore             # Arquivos ignorados pelo Git
├── jest.config.js         # Configuração do Jest
├── jest.setup.js          # Configuração adicional para Jest (ex: mocks globais do DOM)
├── jsconfig.json          # Configuração para o JavaScript Language Service (paths)
├── next.config.mjs        # Configuração do Next.js
├── package-lock.json
├── package.json
└── README.md
```

## Como Rodar o Projeto

### Pré-requisitos

*   Node.js (versão recomendada pelo Next.js 14, geralmente >= 18.17)
*   npm, yarn ou pnpm

### Setup

1.  Clone o repositório:
    ```bash
    git clone https://github.com/NetoRusso/buzzvel_2025_teach
    cd nome-do-repositorio
    ```

2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  (Opcional) Crie um arquivo `.env.local` na raiz do projeto para definir variáveis de ambiente, se necessário (ex: para a URL do site em desenvolvimento para `og:image`):
    ```
    NEXT_PUBLIC_SITE_URL=http://localhost:3000
    ```

### Scripts Disponíveis

*   **Desenvolvimento:** Inicia o servidor de desenvolvimento com hot-reloading.
    ```bash
    npm run dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

*   **Build:** Cria a build de produção otimizada.
    ```bash
    npm run build
    ```

*   **Start (Produção):** Inicia o servidor de produção (requer `npm run build` antes).
    ```bash
    npm run start
    ```

*   **Lint:** Executa o ESLint para verificar o código.
    ```bash
    npm run lint
    ```

*   **Testes:** Executa os testes unitários e de integração com Jest.
    ```bash
    npm run test
    ```

*   **Testes (Watch Mode):** Executa os testes em modo watch, re-executando ao salvar arquivos.
    ```bash
    npm run test:watch
    ```

## Testes

O projeto utiliza Jest e React Testing Library para testes unitários e de integração dos componentes. Os principais aspectos testados incluem:
*   Renderização correta do conteúdo estático e condicional.
*   Interações do usuário (cliques, hover, drag).
*   Funcionalidade de animações (quando possível mockar ou controlar o tempo).
*   Passagem correta de props para componentes filhos.
*   Comportamento responsivo baseado no `WindowWidthContext`.
*   Snapshots para detectar regressões na UI.

  ![Image](https://github.com/user-attachments/assets/da67571c-0742-44ca-a534-8acae0d95b72)

Mocks são utilizados para isolar componentes de suas dependências (ex: `next/image`, `next/link`, bibliotecas de animação) e para controlar APIs do browser (ex: `Date`, `performance.now`).

## Considerações e Possíveis Melhorias Futuras

*   **Funcionalidade do Slider em `QuotoCard`:** O componente `QuotoCard` possui elementos visuais de um slider, mas a lógica de navegação não está implementada. A funcionalidade de carrossel de depoimentos foi implementada no componente `SocialProof`. O `QuotoCard` poderia ser refatorado para ser um slider funcional ou ter seu propósito redefinido.
*   **Submissão do Formulário `Request`:** O formulário de "Request Demo" atualmente não possui lógica de submissão no lado do cliente. Seria necessário adicionar um handler `onSubmit` para coletar e enviar os dados.
*   **Acessibilidade Avançada:**
*   **Testes de Arraste:** Os testes para a funcionalidade de "arrastar para rolar" podem ser aprimorados para maior robustez, possivelmente com ferramentas de teste end-to-end ou mocks mais detalhados do comportamento do DOM.

## Autor

*   **Neto Russo** https://netorusso.onrender.com/

---

Este README visa fornecer uma visão geral completa do projeto, suas funcionalidades e as decisões técnicas tomadas durante o desenvolvimento, conforme os requisitos do teste de avaliação.
