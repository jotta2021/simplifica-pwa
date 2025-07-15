# Componente de Alerta de Plano Expirado

Este componente foi criado para informar aos usuários quando seu plano venceu e oferecer uma opção para renovar.

## Componentes Criados

### 1. `plan-expired-alert.tsx`
Componente principal que exibe o alerta de plano expirado.

**Props:**
- `isOpen: boolean` - Controla se o alerta está visível
- `onClose: () => void` - Função chamada quando o alerta é fechado

**Funcionalidades:**
- Exibe um alerta com ícone de aviso
- Mostra mensagem informando que o plano expirou
- Botão "Renovar Plano" que redireciona para `/profile`
- Botão "Fechar" para fechar o alerta

### 2. `plan-expired-provider.tsx`
Provider que verifica automaticamente se o plano expirou e mostra o alerta.

**Uso:**
```tsx
import { PlanExpiredProvider } from './_components/plan-expired-provider';

// Envolva suas páginas com o provider
<PlanExpiredProvider>
  {/* Suas páginas aqui */}
</PlanExpiredProvider>
```

### 3. `plan-expired-example.tsx`
Exemplo de como usar o componente em uma página específica.

## Hook `usePlanExpired`

Hook que verifica se o plano do usuário expirou baseado nos seguintes critérios:

1. **Trial expirado**: Usuário está em trial e a data de renovação já passou
2. **Assinatura inativa**: Usuário não tem `subscriptionId` ou `subscriptionStatus` não é 'authorized'
3. **Data de renovação passada**: `renewAt` já passou e não há assinatura ativa

**Uso:**
```tsx
import { usePlanExpired } from './_components/plan-expired-alert';

function MinhaPagina() {
  const isExpired = usePlanExpired();
  
  if (isExpired) {
    // Lógica para plano expirado
  }
  
  return <div>...</div>;
}
```

## Implementação Automática

O componente já está integrado ao layout protegido (`src/app/(protected)/layout.tsx`) e será mostrado automaticamente quando:

1. O usuário acessar qualquer página protegida
2. O plano estiver expirado (baseado nos critérios do hook `usePlanExpired`)

## Personalização

Para personalizar o alerta, você pode:

1. **Modificar o texto**: Edite as strings no componente `PlanExpiredAlert`
2. **Alterar o estilo**: Modifique as classes CSS no componente
3. **Mudar o comportamento**: Edite a função `handleRenewPlan` para redirecionar para outra página
4. **Adicionar lógica adicional**: Modifique o hook `usePlanExpired` para incluir outros critérios

## Estrutura de Dados do Usuário

O componente verifica os seguintes campos do usuário:

- `trial: boolean` - Se o usuário está em período de teste
- `renewAt: Date` - Data de renovação do plano
- `subscriptionId: string` - ID da assinatura no provedor de pagamento
- `subscriptionStatus: string` - Status da assinatura ('authorized', 'cancelled', etc.)

## Integração com MercadoPago

O componente está preparado para trabalhar com o sistema de pagamentos do MercadoPago já implementado no projeto. O botão "Renovar Plano" redireciona para a página `/profile` onde o usuário pode escolher e pagar por um novo plano. 