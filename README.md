![Recitativos CCB Logo](src/images/readmelogo.webp)

*Recitativos CCB* is a mobile application designed to help users memorize Portuguese Bible verses through progressive learning techniques. / *Recitativos CCB* é um aplicativo móvel projetado para ajudar os usuários a memorizar versículos bíblicos em português através de técnicas de aprendizado progressivo.

The app features an intuitive interface for managing scripture passages and provides different difficulty levels to enhance memorization. / O aplicativo apresenta uma interface intuitiva para gerenciar passagens bíblicas e oferece diferentes níveis de dificuldade para aprimorar a memorização.

## ✨ Features | Recursos

- 📖 **Scripture Management**: Add, organize, and manage Bible verses for memorization / **Gerenciamento de Escrituras**: Adicione, organize e gerencie versículos bíblicos para memorização
- 📈 **Progressive Learning Levels**: Multiple difficulty levels to gradually increase memorization challenge / **Níveis de Aprendizado Progressivo**: Múltiplos níveis de dificuldade para aumentar gradualmente o desafio de memorização
- 🧠 **Mnemonic Techniques**: Interactive features to help with verse memorization / **Técnicas Mnemônicas**: Recursos interativos para ajudar na memorização de versículos
- 💾 **Offline Storage**: Verses are stored locally using AsyncStorage / **Armazenamento Offline**: Versículos são armazenados localmente usando AsyncStorage
- 🎨 **Customizable Interface**: Modern, clean UI with custom typography / **Interface Personalizável**: Interface moderna e limpa com tipografia customizada
- 📱 **Multi-Platform**: Runs on iOS and Android / **Multiplataforma**: Executa em iOS e Android

## 🛠️ Tech Stack | Pilha Tecnológica

- ⚛️ **Framework**: React Native with Expo / React Native com Expo
- 📝 **Language**: TypeScript / Linguagem: TypeScript
- 🧭 **Navigation**: React Navigation / Navegação: React Navigation
- 🔄 **State Management**: React Context API / Gerenciamento de Estado: React Context API
- 💅 **Styling**: Styled Components / Estilização: Styled Components
- 🎯 **Icons**: Phosphor React Native / Ícones: Phosphor React Native
- 📦 **Storage**: AsyncStorage / Armazenamento: AsyncStorage
- ✍️ **Typography**: Cormorant Garamond font family / Tipografia: Família de fontes Cormorant Garamond


## 🚀 Getting Started | Começando

### 📋 Prerequisites | Pré-requisitos

- [Node.js (v14+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 💾 Installation | Instalação

1. Clone the repository / Clone o repositório:
   ```bash
   git clone https://github.com/Vineyard-Technologies/Recitativos-CCB.git
   cd Recitativos-CCB
   ```

2. Install dependencies / Instale as dependências:
   ```bash
   npm install
   ```

3. Start the development server / Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

### ▶️ Running the App | Executando o Aplicativo

- **iOS**: `npm run ios`
- **Android**: `npm run android`

## 📁 Project Structure | Estrutura do Projeto

```
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── ListItem/
│   │   └── NavBar/
│   ├── contexts/
│   │   ├── RecitativosContext.tsx
│   │   └── tema.tsx
│   ├── screens/
│   │   ├── MainScreen.tsx
│   │   ├── DecorarScreen.tsx
│   │   ├── EscolhaLivroScreen.tsx
│   │   ├── EscolhaCapituloScreen.tsx
│   │   ├── EscolhaVersosScreen.tsx
│   │   └── ConfiguracoesScreen.tsx
│   ├── styles/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── images/
├── assets/
│   ├── ARC.json
│   ├── ARC-pretty.json 
│   └── fonts/
└── ...
```

## 🎯 Key Features | Recursos Principais

### 📚 Verse Management | Gerenciamento de Versículos
- Add new verses for memorization / Adicione novos versículos para memorização
- Organize verses in custom order / Organize versículos em ordem personalizada
- Delete verses when no longer needed / Exclua versículos quando não precisar mais
- Track memorization progress / Acompanhe o progresso de memorização

### 🎓 Learning Levels | Níveis de Aprendizado
The app includes different difficulty levels / O aplicativo inclui diferentes níveis de dificuldade:

- **Level 1**: Basic memorization mode / Modo de memorização básico
- **Level 2**: Advanced memorization with hidden text / Memorização avançada com texto oculto
- **Level 3**: Expert mode with additional challenges / Modo especialista com desafios adicionais

### 🖥️ Memorization Interface | Interface de Memorização
- Interactive text highlighting / Destaque de texto interativo
- Word-by-word progression / Progressão palavra por palavra
- Accent-insensitive matching option / Opção de correspondência insensível a acentos
- Progress tracking / Acompanhamento de progresso

## ⚙️ Configuration | Configuração

The app uses various configuration files: / O aplicativo usa vários arquivos de configuração:

- `app.json`: Expo configuration / Configuração do Expo
- `package.json`: Dependencies and scripts / Dependências e scripts
- `tsconfig.json`: TypeScript configuration / Configuração do TypeScript
- `babel.config.js`: Babel configuration / Configuração do Babel
- `metro.config.js`: Metro bundler configuration / Configuração do bundler Metro

## 🤝 Contributing | Contribuindo

1. Fork the repository / Faça um fork do repositório
2. Create a feature branch (`git checkout -b feature/amazing-feature`) / Crie uma branch de funcionalidade (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`) / Faça commit das suas alterações (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`) / Faça push para a branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request / Abra um Pull Request

## 📄 License | Licença

This project is licensed under the [AGPL 3.0 License](https://www.gnu.org/licenses/agpl-3.0.html.en) - see the [LICENSE](LICENSE) file for details. / Este projeto está licenciado sob a [Licença AGPL 3.0](https://www.gnu.org/licenses/agpl-3.0.pt-br.html) - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Support | Suporte

For support, please open an issue in the GitHub repository / Para suporte, por favor abra uma issue no repositório GitHub.