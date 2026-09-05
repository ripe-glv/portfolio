# portfolio-app

Portfólio de Filipe Galvão, desenvolvido com Vue 3 e Vite.

## Projetos e previews

Os projetos fixos, incluindo o CN Bahia, ficam em `src/data/projects.ts`. Os demais
vêm dos repositórios públicos do GitHub que não são forks (até sete, priorizando os
que têm uma URL em **Settings → General → Website**). Uma cópia local da lista
mantém os cards disponíveis quando a API está fora do ar.

Os cards dos sites publicados usam capturas reais da página inicial. Projetos sem
site publicado mantêm as ilustrações originais de jogos, dados ou código. As imagens ficam em `public/previews/`, com o
mapeamento por URL em `src/data/previews.json`. São imagens estáticas, servidas pelo
próprio portfólio e carregadas sob demanda.

Para gerar ou atualizar os previews, use Node.js 24 e execute:

```sh
npm ci
npx playwright install chromium
npm run previews:update
```

O comando acessa os sites públicos, captura a primeira tela em 1440 × 900 e atualiza
a lista salva do GitHub. Revise as imagens antes de publicá-las: páginas com login,
proteção contra robôs ou inicialização lenta podem exigir uma captura manual.
Se uma captura falhar, o comando preserva a imagem anterior e termina com erro.
Sem imagem disponível, o card mantém o título e o link para abrir o projeto.

Para usar uma captura manual, salve-a em `public/previews/` e associe a URL completa
do projeto ao caminho `previews/nome-do-arquivo.jpg` em `src/data/previews.json`.
Inclua as imagens e os arquivos JSON no commit. Repita a atualização quando mudar
o layout dos sites ou adicionar novos projetos; ela não roda durante o build.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
