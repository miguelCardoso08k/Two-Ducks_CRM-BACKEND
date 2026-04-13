# Backlog do Produto

## Objetivo

Este backlog organiza a entrega do MVP do CRM SaaS com base na documentação atual, no `backend-checklist` e no cronograma planejado.

A estrutura foi mantida leve para que `1 developer + AI` consiga atualizar o backlog com rapidez, sem transformar a manutenção em burocracia.

## Regras de Priorização

- `P0`: obrigatório para viabilizar o MVP
- `P1`: importante para a operação, mas não bloqueia o MVP técnico
- `P2`: robustez, visibilidade, escala ou evolução futura

## Regras de Status

- `Todo`: ainda não iniciado
- `Doing`: em andamento
- `Review`: implementado, aguardando validação
- `Done`: validado e concluído
- `Blocked`: aguardando dependência ou decisão

## P0 - Caminho Crítico do MVP

## ITEM-001 - Resolver o tenant context por request

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 1`
Owner: `Dev + AI`

### Contexto
O sistema precisa identificar a `company` ativa em cada request e propagar o `company_id` com segurança ao longo do fluxo de domínio.

### Critérios de aceite

- o request context resolve o tenant ativo
- os `application services` conseguem acessar as informações do tenant com segurança
- não existe acesso ao domínio sem tenant context

### Dependências

- definição da estratégia atual de autenticação

### Riscos

- uma resolução inconsistente de tenant pode vazar dados entre empresas

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-002 - Aplicar tenant filters nas domain queries

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 1`
Owner: `Dev + AI`

### Contexto
Todas as entidades multi-tenant precisam ser consultadas com filtro por `company_id`.

### Critérios de aceite

- `repository queries` de entidades multi-tenant filtram por `company_id`
- `updates` e `deletes` validam ownership
- os testes cobrem ao menos um cenário de isolamento

### Dependências

- ITEM-001

### Riscos

- caminhos ocultos de consulta podem ignorar o isolamento

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-003 - Implementar authentication

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 1`
Owner: `Dev + AI`

### Contexto
A plataforma precisa de login e de um fluxo seguro de autenticação da API para usuários internos.

### Critérios de aceite

- usuários conseguem fazer login
- `authenticated routes` validam a identidade
- o fluxo de auth funciona para `ADMIN` e `AGENT`

### Dependências

- `users` module

### Riscos

- escolher uma estrutura de auth inadequada no início pode gerar retrabalho

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-004 - Aplicar role-based access

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 1`
Owner: `Dev + AI`

### Contexto
`Admins` e `agents` têm responsabilidades diferentes, então as operações sensíveis precisam de validação de role.

### Critérios de aceite

- as roles `ADMIN` e `AGENT` são aplicadas onde necessário
- `protected routes` retornam erros corretos de autorização
- as regras de role não dependem do comportamento do frontend

### Dependências

- ITEM-003

### Riscos

- uma autorização fraca gera problemas operacionais e de segurança

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-005 - Implementar o `customer` module

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 2`
Owner: `Dev + AI`

### Contexto
`Customers` são necessários para receber mensagens inbound e persistir a relação com as conversas.

### Critérios de aceite

- a entidade `customer` está implementada
- existem `repository` e `use cases`
- a criação exige pelo menos um identificador útil

### Dependências

- ITEM-001
- ITEM-002

### Riscos

- regras fracas de identidade podem gerar duplicidade

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-006 - Implementar o `channel` module

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 2`
Owner: `Dev + AI`

### Contexto
`Channels` são necessários para configurar o WhatsApp e também os futuros canais de redirecionamento inbound.

### Critérios de aceite

- a entidade `channel` está implementada
- existe um `CRUD` básico
- os campos de configuração do WhatsApp são persistidos com segurança

### Dependências

- ITEM-001
- ITEM-002

### Riscos

- o tratamento de tokens pode introduzir preocupações de segurança

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-007 - Implementar `business hours`

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 2`
Owner: `Dev + AI`

### Contexto
`Business hours` apoiam a operação e futuros comportamentos de automação.

### Critérios de aceite

- horários recorrentes são persistidos em tabela própria
- intervalos sobrepostos são rejeitados
- ausência de registros significa dia fechado

### Dependências

- contexto de `company`

### Riscos

- a validação de horário pode ficar sujeita a erros

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-008 - Implementar o `conversation inbox core`

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 3`
Owner: `Dev + AI`

### Contexto
A `shared inbox` é o coração operacional do CRM.

### Critérios de aceite

- conversas podem ser listadas com filtros centrais
- detalhes da conversa podem ser consultados
- o status da conversa pode ser atualizado
- a atribuição manual está disponível

### Dependências

- ITEM-005
- ITEM-006

### Riscos

- `inbox queries` podem ficar complexas cedo demais

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-009 - Manter os `conversation derived fields`

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 3`
Owner: `Dev + AI`

### Contexto
A performance da inbox depende de campos derivados no nível de `conversation`.

### Critérios de aceite

- `lastMessagePreview` é mantido corretamente
- `lastMessageAt` é mantido corretamente
- `lastCustomerMessageAt` é mantido corretamente
- `unreadCount` é atualizado corretamente

### Dependências

- ITEM-008

### Riscos

- campos derivados podem se desalinhar se nem todos os caminhos de escrita forem cobertos

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-010 - Receber `inbound webhooks`

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 4`
Owner: `Dev + AI`

### Contexto
O processamento de mensagens inbound é o ponto de entrada do uso real do CRM.

### Critérios de aceite

- o `webhook endpoint` recebe eventos inbound
- o payload é validado e persistido
- falhas ficam rastreáveis

### Dependências

- ITEM-006

### Riscos

- a variação de payload entre provedores pode quebrar o processamento

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-011 - Criar `customer` e `conversation` automaticamente a partir de mensagens inbound

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 4`
Owner: `Dev + AI`

### Contexto
O MVP exige criação ou localização automática de `customer` e `conversation`.

### Critérios de aceite

- o fluxo inbound localiza ou cria um `customer`
- o fluxo inbound localiza ou cria uma `conversation`
- a `message` fica associada à `conversation` correta

### Dependências

- ITEM-005
- ITEM-008
- ITEM-010

### Riscos

- duplicidade e `race conditions`

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-012 - Persistir `messages` com identificadores do provider

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 4`
Owner: `Dev + AI`

### Contexto
A persistência de `messages` precisa dar suporte a auditoria, rastreabilidade e `webhook idempotency`.

### Critérios de aceite

- a entidade `message` está implementada
- `externalMessageId` é salvo quando existir
- `direction`, `senderType`, `messageType` e `rawPayload` são persistidos

### Dependências

- ITEM-010

### Riscos

- erros de `idempotency` podem duplicar mensagens

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-013 - Enviar `outbound messages`

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 5`
Owner: `Dev + AI`

### Contexto
Os agentes precisam responder direto pela plataforma.

### Critérios de aceite

- existe `POST /messages`
- a integração outbound com o provider funciona para os fluxos do MVP
- as mensagens outbound são persistidas e relacionadas corretamente

### Dependências

- ITEM-012

### Riscos

- restrições do provider podem impactar o comportamento de entrega

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-014 - Adicionar base de `async` e tempo real com Redis

Status: `Todo`
Priority: `P0`
Sprint: `Sprint 5`
Owner: `Dev + AI`

### Contexto
Redis é necessário para lidar melhor com fluxos assíncronos e com a atualização da inbox.

### Critérios de aceite

- Redis está configurado
- fluxos assíncronos principais podem ser enfileirados
- eventos principais da inbox podem ser publicados

### Dependências

- configuração de infraestrutura

### Riscos

- a complexidade operacional pode crescer cedo demais

### Atualizações

- 2026-04-13: item criado no backlog

## P1 - Operação e Usabilidade

## ITEM-015 - Implementar `transfer requests`

Status: `Todo`
Priority: `P1`
Sprint: `Sprint 6`
Owner: `Dev + AI`

### Contexto
Transferências apoiam o atendimento colaborativo entre os agentes.

### Critérios de aceite

- `transfer requests` podem ser criadas
- existem fluxos de aceite e rejeição
- só existe uma `PENDING transfer` por `conversation`

### Dependências

- `conversation` module

### Riscos

- transições de estado podem ficar inconsistentes

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-016 - Expirar `pending transfers` automaticamente

Status: `Todo`
Priority: `P1`
Sprint: `Sprint 6`
Owner: `Dev + AI`

### Contexto
`Transfer requests` não devem ficar pendentes por tempo indefinido.

### Critérios de aceite

- transferências pendentes expiram automaticamente
- o responsável da conversa só muda no aceite
- a expiração fica rastreável

### Dependências

- ITEM-014
- ITEM-015

### Riscos

- o comportamento de `background timing` pode ser frágil

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-017 - Implementar `tags` e `tag filters`

Status: `Todo`
Priority: `P1`
Sprint: `Sprint 6`
Owner: `Dev + AI`

### Contexto
`Tags` ajudam a organizar a `shared inbox` e a apoiar os fluxos operacionais.

### Critérios de aceite

- existe `CRUD` de `tags`
- conversas podem receber `tags`
- a inbox suporta filtro por `tag`

### Dependências

- `conversation` module

### Riscos

- filtros podem exigir ajuste de performance depois

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-018 - Implementar automação de primeira resposta

Status: `Todo`
Priority: `P1`
Sprint: `Sprint 7`
Owner: `Dev + AI`

### Contexto
Uma automação básica reduz trabalho manual e melhora o tempo de resposta.

### Critérios de aceite

- existe um `first-message trigger`
- existe uma `send-message action`
- a automação pode ser ativada e desativada

### Dependências

- ITEM-010
- ITEM-013

### Riscos

- o escopo de automação pode crescer rápido

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-019 - Tratar canais externos com redirecionamento para WhatsApp

Status: `Todo`
Priority: `P1`
Sprint: `Sprint 7`
Owner: `Dev + AI`

### Contexto
Instagram, TikTok e email entram no MVP como canais de entrada, mas redirecionam o usuário para o WhatsApp.

### Critérios de aceite

- `external contact request` é persistido
- um protocolo é gerado por empresa
- o fluxo de resposta redireciona o usuário para o WhatsApp

### Dependências

- ITEM-006
- ITEM-018

### Riscos

- o comportamento pode variar entre providers

### Atualizações

- 2026-04-13: item criado no backlog

## P2 - Qualidade e Prontidão

## ITEM-020 - Adicionar `structured logging`

Status: `Todo`
Priority: `P2`
Sprint: `Sprint 8`
Owner: `Dev + AI`

### Contexto
Visibilidade operacional é essencial para investigar integrações e incidentes.

### Critérios de aceite

- os logs são estruturados
- falhas de integração ficam rastreáveis
- campos sensíveis não são expostos

### Dependências

- fluxos de `message` e `webhook`

### Riscos

- excesso de logs pode expor dados sensíveis

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-021 - Adicionar testes críticos de integração

Status: `Todo`
Priority: `P2`
Sprint: `Sprint 8`
Owner: `Dev + AI`

### Contexto
O MVP precisa de mais confiança nos fluxos mais sensíveis antes do `go-live`.

### Critérios de aceite

- os testes cobrem authentication
- os testes cobrem tenant isolation
- os testes cobrem webhook ingestion
- os testes cobrem a regra de unicidade de transferência

### Dependências

- entregas das sprints anteriores

### Riscos

- a configuração de testes pode expor fraquezas da arquitetura

### Atualizações

- 2026-04-13: item criado no backlog

## ITEM-022 - Adicionar `rate limiting` e proteção de endpoints sensíveis

Status: `Todo`
Priority: `P2`
Sprint: `Sprint 8`
Owner: `Dev + AI`

### Contexto
Controles defensivos básicos precisam existir antes de expor o sistema ao uso em produção.

### Critérios de aceite

- endpoints sensíveis têm `rate limiting`
- `secrets` e credenciais são mascarados quando necessário
- caminhos inseguros de exposição são revisados

### Dependências

- fluxo de auth

### Riscos

- lacunas aqui podem gerar abuso ou problema de segurança

### Atualizações

- 2026-04-13: item criado no backlog
