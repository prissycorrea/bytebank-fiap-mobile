# 📱 ByteBank Mobile

## 📁 Estrutura do Projeto

```
bytebank-mobile/
├── 📂 src/
│   ├── 📂 components/                     # Componentes reutilizáveis
│   │   ├── 📂 common/                     # Componentes genéricos
│   │   │   ├── 📂 Button/
│   │   │   │   ├── ⚛️ Button.tsx
│   │   │   │   ├── 📄 Button.styles.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📂 Input/
│   │   │   ├── 📂 Modal/
│   │   │   ├── 📂 Loading/
│   │   │   ├── 📂 Card/
 │   │   │   ├── 📂 FinancialCard/
│   │   │   └── 📄 index.ts
│   │   ├── 📂 forms/                      # Componentes de formulário
│   │   │   ├── 📂 LoginForm/
│   │   │   ├── 📂 RegisterForm/
│   │   │   ├── 📂 TransactionForm/
│   │   │   └── 📄 index.ts
│   │   ├── 📂 layout/                     # Componentes de layout
│   │   │   ├── 📂 Header/
│   │   │   ├── 📂 BottomTab/
│   │   │   ├── 📂 Drawer/
│   │   │   └── 📄 index.ts
│   │   └── 📂 business/                   # Componentes específicos do negócio
│   │       ├── 📂 TransactionCard/
│   │       ├── 📂 BalanceCard/
│   │       ├── 📂 StatementList/
│   │       ├── 📂 TransactionRow/
│   │       └── 📄 index.ts
│   ├── 📂 screens/                        # Telas da aplicação
│   │   ├── 📂 auth/                       # Telas de autenticação
│   │   │   ├── 📂 LoginScreen/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── 📄 LoginScreen.styles.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📂 RegisterScreen/
│   │   │   └── 📄 index.ts
│   │   ├── 📂 home/                       # Telas principais
│   │   │   ├── 📂 DashboardScreen/
│   │   │   ├── 📂 StatementScreen/
│   │   │   └── 📄 index.ts
│   │   ├── 📂 Transactions/               # Tela de Transações
│   │   │   ├── 📂 TransactionsCreate/
│   │   │   ├── 📂 TransactionsList/
│   │   │   ├── 📂 TransactionsWidget/
│   │   ├── 📂 profile/                    # Telas de perfil
│   │   │   ├── 📂 ProfileScreen/
│   │   │   └── 📄 index.ts
│   │   └── 📄 index.ts
│   ├── 📂 navigation/                     # Configuração de navegação
│   │   ├── ⚛️ AppNavigator.tsx
│   │   ├── ⚛️ AuthNavigator.tsx
│   │   ├── ⚛️ TabNavigator.tsx
│   │   ├── ⚛️ StackNavigator.tsx
│   │   └── 📄 types.ts
│   ├── 📂 services/                       # Serviços e integrações
│   │   ├── 📂 firebase/                   # Configuração Firebase
│   │   │   ├── 📄 config.ts
│   │   │   ├── 📄 auth.ts
│   │   │   ├── 📄 firestore.ts
│   │   │   └── 📄 storage.ts
│   │   ├── 📄 transactions.tsx
│   │   ├── 📄 users.ts
│   │   └── 📄 index.ts
│   ├── 📂 hooks/                          # Custom hooks
│   │   ├── 📄 useAuth.ts
│   │   ├── 📄 useTransactions.ts
│   │   ├── 📄 useFirebase.ts
│   │   ├── 📄 useNavigation.ts
│   │   └── 📄 index.ts
│   ├── 📂 utils/                          # Utilitários
│   │   ├── 📄 formatters.ts                  # Formatação de moeda, data, etc.
│   │   ├── 📄 validators.ts                  # Validações
│   │   ├── 📄 constants.ts                   # Constantes da aplicação
│   │   ├── 📄 helpers.ts                     # Funções auxiliares
│   │   └── 📄 index.ts
│   ├── 📂 types/                          # Definições de tipos TypeScript
│   │   ├── 📄 auth.ts
│   │   ├── 📄 transaction.ts
│   │   ├── 📄 user.ts
│   │   ├── 📄 navigation.ts
│   │   └── 📄 index.ts
│   ├── 📂 styles/                         # Estilos globais
│   │   ├── 📄 theme.ts
│   │   ├── 📄 colors.ts
│   │   ├── 📄 typography.ts
│   │   ├── 📄 spacing.ts
│   │   └── 📄 index.ts
│   └── 📂 config/                         # Configurações
│       ├── 📄 environment.ts
│       ├── 📄 firebase.config.ts
│       └── 📄 index.ts
├── 📂 assets/                             # Recursos estáticos
│   ├── 📂 images/
│   ├── 📂 fonts/
│   └── 📂 animations/
├── 📂 docs/                               # Documentação
├── .gitignore
├── 📋 app.json                               # Configuração do Expo, ícones, splash
├── ⚛️ App.tsx                                # Componente principal
├── 📄 index.ts                               # Ponto de entrada
├── 📋 package-lock.json
├── 📋 package.json                           # Dependências e scripts
├── 📋 tsconfig.json
└── README.md
```

## 📦 Dependências

### 🔥 Firebase
- **`@react-native-firebase/app`** - Core do Firebase para React Native
- **`@react-native-firebase/auth`** - Autenticação de usuários (login, registro, logout)
- **`@react-native-firebase/firestore`** - Banco de dados NoSQL para armazenar dados
- **`@react-native-firebase/storage`** - Armazenamento de arquivos e comprovantes

### 🧭 Navegação
- **`@react-navigation/native`** - Biblioteca principal de navegação
- **`@react-navigation/stack`** - Navegação em pilha (Stack Navigator)
- **`@react-navigation/bottom-tabs`** - Navegação por abas na parte inferior

### ⚛️ React Native & Expo
- **`expo`** - Framework para desenvolvimento React Native
- **`react`** - Biblioteca principal do React
- **`react-native`** - Framework para desenvolvimento mobile
- **`expo-status-bar`** - Componente para controlar a barra de status

### 🎨 UI & Animações
- **`react-native-paper`** - Biblioteca de componentes Material Design
- **`react-native-vector-icons`** - Ícones vetoriais para a aplicação
- **`react-native-gesture-handler`** - Gerenciamento de gestos touch
- **`react-native-reanimated`** - Animações performáticas
- **`react-native-gifted-charts`** - Biblioteca de gráficos para visualização de dados

### 🛠️ Desenvolvimento
- **`typescript`** - Superset do JavaScript com tipagem estática
- **`@types/react`** - Definições de tipos TypeScript para React