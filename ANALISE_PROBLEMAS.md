# Análise de Problemas - Login e Cadastro

## Problemas Identificados

### 1. **Problema Crítico no `App.jsx` - Linha 59**
**Localização:** `/ecommerce/frontend/src/components/App.jsx` linha 59

**Problema:** 
```jsx
<Login setAuth={setIsAuthenticated} />
```

O componente `Login` está recebendo `setAuth={setIsAuthenticated}`, mas `setIsAuthenticated` é uma função de estado. Quando o componente tenta usar `setAuth(true)`, ele está tentando chamar a função diretamente, mas a forma correta seria passar uma função que atualiza o estado.

**Causa Raiz:** 
Na linha 59 do `App.jsx`, o `setAuth` é passado como `setIsAuthenticated`, que é uma função setter. No componente `Login.jsx` linha 17, o código chama `setAuth(true)`, o que deveria funcionar, mas há um problema de escopo/referência.

**Impacto:** Após o login bem-sucedido, o estado `isAuthenticated` no `App` não é atualizado, então o usuário não é redirecionado para o dashboard.

---

### 2. **Problema no `Login.jsx` - Falta de Atualização de Estado no Componente Pai**
**Localização:** `/ecommerce/frontend/src/components/Login.jsx` linhas 14-18

**Problema:**
```jsx
const response = await api.post('/auth/login', { email, password });
const token = response.data.token;
localStorage.setItem('token', token);
setAuth(true);
navigate('/');
```

O componente chama `setAuth(true)`, mas isso não atualiza o estado `isAuthenticated` no componente `App`. A navegação para `/` ocorre, mas como `isAuthenticated` ainda é `false`, o usuário é redirecionado para `/login` novamente pela rota protegida.

**Solução:** O `App.jsx` precisa verificar o token no `localStorage` quando o componente monta ou quando há mudanças.

---

### 3. **Problema no `Register.jsx` - Tipo de Dado `contactNumber`**
**Localização:** `/ecommerce/frontend/src/components/Register.jsx` linha 15

**Problema:**
```jsx
contactNumber: ''
```

O campo `contactNumber` é enviado como string vazia inicialmente, mas o `CustomerRequestDTO` no back-end espera um `BigInteger`. Quando o usuário preenche o formulário, o valor permanece como string, causando erro de validação/conversão.

**Impacto:** O cadastro falha porque o back-end não consegue converter a string para `BigInteger` ou a validação falha.

---

### 4. **Problema no `application.yaml` - Typo na Configuração**
**Localização:** `/ecommerce/ecommerce-service/src/main/resources/application.yaml` linha 1

**Problema:**
```yaml
4server:
  port: 8080
```

A chave está digitada como `4server` em vez de `server`. Isso significa que a configuração de porta não está sendo aplicada corretamente.

**Impacto:** O servidor pode estar rodando em uma porta diferente da esperada (8080), causando erro de conexão recusada no front-end.

---

### 5. **Problema no `App.jsx` - Falta de Sincronização de Estado**
**Localização:** `/ecommerce/frontend/src/App.jsx` linhas 10-11

**Problema:**
```jsx
const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
```

O estado é inicializado uma única vez com base no `localStorage`, mas não há um mecanismo para sincronizar quando o token é adicionado ao `localStorage` após o login.

**Solução:** Adicionar um `useEffect` que monitore mudanças no `localStorage` ou usar um padrão de callback para atualizar o estado quando o login é bem-sucedido.

---

## Resumo das Correções Necessárias

1. ✅ Corrigir typo em `application.yaml`: `4server` → `server`
2. ✅ Adicionar `useEffect` no `App.jsx` para sincronizar token do `localStorage`
3. ✅ Melhorar o callback de autenticação no `Login.jsx` para garantir que o estado seja atualizado
4. ✅ Converter `contactNumber` para número no `Register.jsx`
5. ✅ Adicionar validação e feedback de erro melhorado

