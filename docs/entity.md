## Company

Representa a empresa cliente do SaaS.

**Responsabilidades**

- identificar o tenant
- armazenar dados principais da empresa
- servir como raiz de isolamento dos dados

**Atributos principais**

```
id
name
slug
status
createdAt
updatedAt
```

**Relacionamentos**

- possui muitos `User`
- possui muitos `Customer`
- possui muitos `Channel`
- possui muitas `Conversation`
- possui muitas `Message`
- possui muitas `Tag`
- possui muitas `TransferRequest`
- possui muitas `ExternalContactRequest`
- possui muitas `AutomationRule`
- possui muitos `BusinessHour`
- possui uma `Subscription`

**Observação**

- quase tudo do sistema terá `companyId`

## User

Representa um usuário interno da empresa, como admin ou atendente.

**Observação**

- Futuramente pode haver a necesside de criar roles&permissions dinamicas, onde o admin concede permissões aos employees individualmente. Por hora me parece overkill.

**Responsabilidades**

- autenticação
- autorização
- participação no atendimento
- receber/transferir conversas

**Atributos principais**

```
id
companyId
name
email
passwordHash
role
status
platformStatus
inboxStatus
availabilityStatus
maxActiveConversations
lastSeenAt
createdAt
updatedAt
```

**Enums possíveis**

```
role: ADMIN | AGENT
status: ACTIVE | INACTIVE
platformStatus: ONLINE | OFFLINE
inboxStatus: ONLINE | OFFLINE
availabilityStatus: AVAILABLE | BUSY | BREAK | OFF_SHIFT
```

**Observações**

- `status` representa o estado da conta do usuário
- `platformStatus` representa se o usuário está online na plataforma
- `inboxStatus` representa se o usuário está online na inbox
- `availabilityStatus` representa se o usuário pode receber novas conversas
- `maxActiveConversations` define o limite de conversas abertas que podem ser direcionadas ao usuário
- `email` deve ser único globalmente

**Relacionamentos**

- pertence a `Company`
- pode ser responsável por muitas `Conversation` via `assignedUserId`
- pode enviar muitas `Message` via `senderUserId`
- pode iniciar muitas `TransferRequest` via `fromUserId`
- pode receber muitas `TransferRequest` via `toUserId`

## Customer

Representa o cliente final da empresa.

**Responsabilidades**

- armazenar identidade do contato
- ligar o cliente às conversas
- consolidar o histórico

**Atributos principais**

```
id
companyId
name
phone
email
notes
createdAt
updatedAt
```

**Relacionamentos**

- pertence a `Company`
- possui muitas `Conversation`

**Observação**

- no MVP, `phone` é muito importante porque o WhatsApp será o canal principal
- `name`, `phone` e `email` podem ser opcionais no banco, mas o fluxo de criação deve exigir pelo menos um identificador útil

## Channel

Representa um canal configurado pela empresa.

Mesmo que o MVP tenha inbox só de WhatsApp, vale manter essa entidade desde já porque:

- o WhatsApp precisa de configuração própria
- Instagram/TikTok/email também entram como gatilhos de redirecionamento

**Responsabilidades**

- armazenar credenciais e configuração do canal
- indicar se o canal está ativo
- definir tipo do canal

**Atributos principais**

```
id
companyId
type
name
status
externalAccountId
accessToken
phoneNumber
webhookVerifyToken
metadata
createdAt
updatedAt
```

**Enums possíveis**

```
type: WHATSAPP | INSTAGRAM | TIKTOK | EMAIL
status: ACTIVE | INACTIVE | PENDING
```

**Observação**

- `metadata` pode guardar JSON com configs específicas

**Relacionamentos**

- pertence a `Company`
- possui muitas `Conversation`
- possui muitas `Message`
- possui muitas `ExternalContactRequest`

## BusinessHour

Representa um intervalo recorrente de funcionamento da empresa em um dia da semana.

**Responsabilidades**

- persistir a grade semanal de atendimento
- permitir múltiplos intervalos no mesmo dia
- servir de base para regras futuras do chatbot e automações

**Atributos principais**

```
id
companyId
dayOfWeek
opensAt
closesAt
createdAt
updatedAt
```

**Enums possíveis**

```
dayOfWeek: SUNDAY | MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY
```

**Observações**

- ausência de registro para um dia significa empresa fechada
- múltiplas linhas no mesmo dia permitem almoço ou janelas separadas
- `opensAt` e `closesAt` usam formato `HH:MM`
- a aplicação deve impedir intervalos sobrepostos para a mesma empresa e dia

**Relacionamentos**

- pertence a `Company`

## Conversation

Representa um atendimento.

Essa é uma das entidades centrais do sistema.

**Responsabilidades**

- agrupar mensagens
- indicar status do atendimento
- indicar responsável atual
- manter dados rápidos para inbox

**Atributos principais**

```
id
companyId
customerId
channelId
assignedUserId
status
subject
lastMessagePreview
lastMessageAt
lastCustomerMessageAt
unreadCount
createdAt
updatedAt
closedAt
```

**Enums possíveis**

```
status: OPEN | PENDING | CLOSED
```

**Observações**

- `lastMessagePreview` e `lastMessageAt` ajudam performance da inbox
- `lastCustomerMessageAt` ajuda a controlar janela de 24h do WhatsApp
- `assignedUserId` representa o responsável atual pela conversa
- histórico de transferência permanece em `TransferRequest`
- `subject` permanece opcional no MVP e futuramente deve evoluir para enum

**Relacionamentos**

- pertence a `Company`
- pertence a `Customer`
- pertence a `Channel`
- pode pertencer a `User` como atendente responsável
- possui muitas `Message`
- possui muitas `Tag` via `ConversationTag`
- possui muitas `TransferRequest`

## Message

Representa uma mensagem individual dentro de uma conversa.

**Responsabilidades**

- armazenar o conteúdo trafegado
- registrar origem e tipo
- garantir rastreabilidade de webhook/API

**Atributos principais**

```
id
companyId
conversationId
channelId
externalMessageId
senderType
senderUserId
content
messageType
direction
sentAt
deliveredAt
readAt
createdAt
rawPayload
```

**Enums possíveis**

```
senderType: CUSTOMER | USER | BOT | SYSTEM
messageType: TEXT | IMAGE | AUDIO | VIDEO | FILE | TEMPLATE | SYSTEM
direction: INBOUND | OUTBOUND
```

**Observações**

- `externalMessageId` deve ser único quando existir
- `rawPayload` pode guardar JSON bruto do provedor para auditoria/debug

**Relacionamentos**

- pertence a `Company`
- pertence a `Conversation`
- pertence a `Channel`
- pode pertencer a `User` via `senderUserId`

## Tag

Representa uma etiqueta organizacional.

**Responsabilidades**

- categorizar conversas
- permitir filtros
- apoiar operação comercial/suporte

**Atributos principais**

```
id
companyId
name
color
createdAt
updatedAt
```

**Relacionamentos**

- pertence a `Company`
- possui muitas `Conversation` via `ConversationTag`

## ConversationTag

Entidade de relacionamento N:N entre conversa e tag.

**Responsabilidades**

- ligar várias tags a uma conversa

**Atributos principais**

```
companyId
conversationId
tagId
createdAt
```

**Relacionamentos**

- pertence a `Company`
- pertence a `Conversation`
- pertence a `Tag`

## TransferRequest

Representa uma solicitação de transferência entre atendentes.

**Responsabilidades**

- controlar fluxo de transferência
- registrar origem, destino e estado
- suportar expiração automática

**Atributos principais**

```
id
companyId
conversationId
fromUserId
toUserId
status
reason
createdAt
expiresAt
respondedAt
```

**Enums possíveis**

```
status: PENDING | ACCEPTED | REJECTED | EXPIRED
```

**Relacionamentos**

- pertence a `Company`
- pertence a `Conversation`
- pertence a `User` como origem via `fromUserId`
- pertence a `User` como destino via `toUserId`

**Regra de negócio**

- só pode existir uma `TransferRequest` com status `PENDING` por `Conversation` ao mesmo tempo

## ExternalContactRequest

Essa entidade é útil para o seu MVP porque Instagram, TikTok e email não entram na inbox, mas geram protocolo e redirecionamento.

**Responsabilidades**

- registrar o contato vindo de canal externo
- gerar protocolo
- manter rastreabilidade do redirecionamento para WhatsApp

**Atributos principais**

```
id
companyId
channelId
protocol
externalContactId
customerName
customerHandle
messageContent
status
redirectWhatsappNumber
createdAt
updatedAt
```

**Enums possíveis**

```
status: RECEIVED | REDIRECTED | CONVERTED | EXPIRED
```

**Observação**

- `protocol` deve ser único por empresa
- depois, quando o cliente chegar no WhatsApp com o protocolo, você pode relacionar isso a um `Customer` e a uma `Conversation`

**Relacionamentos**

- pertence a `Company`
- pertence a `Channel`
- futuramente pode se relacionar com `Customer`
- futuramente pode se relacionar com `Conversation`

## AutomationRule

Representa uma automação configurada pela empresa.

**Responsabilidades**

- definir gatilho
- definir ação
- permitir automação simples no MVP

**Atributos principais**

```
id
companyId
name
triggerType
triggerValue
actionType
actionValue
isActive
createdAt
updatedAt
```

**Exemplos**

```
triggerType: FIRST_MESSAGE | MESSAGE_CONTAINS | EXTERNAL_CHANNEL_MESSAGE
actionType: SEND_MESSAGE | ASSIGN_USER | ADD_TAG
```

**Relacionamentos**

- pertence a `Company`

## Subscription

Representa a assinatura SaaS da empresa.

**Responsabilidades**

- controlar plano
- status de cobrança
- integração com Stripe

**Atributos principais**

```
id
companyId
provider
providerCustomerId
providerSubscriptionId
plan
status
currentPeriodStart
currentPeriodEnd
createdAt
updatedAt
```

**Enums possíveis**

```
provider: STRIPE
status: ACTIVE | PAST_DUE | CANCELED | TRIALING
plan: STARTER | PRO | BUSINESS
```

**Relacionamentos**

- pertence a `Company`
- normalmente `Company` possui uma `Subscription`

## Visão Geral dos Relacionamentos

- `Company` 1:N `User`
- `Company` 1:N `Customer`
- `Company` 1:N `Channel`
- `Company` 1:N `BusinessHour`
- `Company` 1:N `Conversation`
- `Company` 1:N `Message`
- `Company` 1:N `Tag`
- `Company` 1:N `TransferRequest`
- `Company` 1:N `ExternalContactRequest`
- `Company` 1:N `AutomationRule`
- `Company` 1:1 `Subscription`
- `Customer` 1:N `Conversation`
- `Channel` 1:N `Conversation`
- `Channel` 1:N `Message`
- `Channel` 1:N `ExternalContactRequest`
- `User` 1:N `Conversation` como responsável
- `User` 1:N `Message` como remetente interno
- `User` 1:N `TransferRequest` como origem
- `User` 1:N `TransferRequest` como destino
- `Conversation` 1:N `Message`
- `Conversation` 1:N `TransferRequest`
- `Conversation` N:N `Tag` via `ConversationTag`
