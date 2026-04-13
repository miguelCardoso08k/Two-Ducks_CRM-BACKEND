# Cronograma de Entregas

## Objetivo

Este documento organiza o plano de entrega do SaaS de CRM com base:

- nos arquivos já documentados em `./docs`
- na metodologia Scrum
- na capacidade de execução de `1 desenvolvedor + IA`

O foco é manter um ritmo realista, com entregas pequenas, cumulativas e verificáveis ao final de cada sprint.

## Premissas de Planejamento

- Time considerado: `1 dev full stack + IA`
- Cadência sugerida: `sprints de 1 semana`
- Cerimônias enxutas: planning, revisão, retrospectiva e refinamento leve
- A IA entra como apoio para acelerar implementação, documentação, testes, revisão técnica e refino de backlog
- O cronograma parte do entendimento de que a fundação do backend já foi iniciada

## Estado Atual Considerado

Com base na documentação e no repositório atual, já existe avanço em:

- fundação do projeto NestJS com Fastify
- configuração de TypeScript, Prisma e PostgreSQL
- modelagem principal do banco
- estrutura modular do backend
- módulos iniciais de `companies` e `users`
- parte da documentação técnica e de domínio

Por isso, consideramos a Sprint 0 como parcialmente concluída.

## Estrutura de Trabalho em Scrum

### Definição de Sprint

Cada sprint deve produzir uma entrega utilizável, testável ou integrável.

### Definição de Pronto

Um item só pode ser considerado concluído quando:

- a regra de negócio principal estiver implementada
- houver validação mínima do fluxo
- a API ou comportamento estiver coerente com a documentação
- o item não quebrar isolamento por `company_id`
- houver atualização da anotação de andamento da sprint

### Capacidade Recomendada

Para `1 dev + IA`, o ideal é trabalhar com:

- `3 a 5 itens principais` por sprint
- `1 item técnico` obrigatório por sprint
- `1 margem de 15% a 20%` para correções, refino e imprevistos

## Cronograma Proposto

## Sprint 0 - Base Técnica e Modelagem

**Objetivo**

Consolidar a fundação do projeto e garantir uma base segura para as próximas entregas.

**Status**

`Parcialmente concluída`

**Escopo**

- configurar NestJS com Fastify
- configurar TypeScript e convenções do projeto
- configurar Prisma com PostgreSQL
- estruturar módulos, services e repositories
- criar migrations e tabelas principais
- consolidar módulos iniciais de empresa e usuário

**Saída esperada**

- backend inicial funcional
- banco modelado para o MVP
- convenções técnicas mínimas definidas

## Sprint 1 - Multi-tenant e Autenticação

**Objetivo**

Garantir segurança básica de acesso e isolamento entre empresas.

**Escopo**

- resolver `company_id` no contexto da requisição
- aplicar filtro por `company_id` em queries de domínio
- validar ownership em updates e deletes
- implementar login
- implementar estratégia de autenticação para API
- diferenciar `ADMIN` e `AGENT`
- atualizar `lastSeenAt` quando fizer sentido

**Saída esperada**

- usuários autenticam com segurança
- dados ficam isolados por tenant
- backend pronto para crescer sem vazamento entre empresas

## Sprint 2 - Cadastros Operacionais do MVP

**Objetivo**

Fechar os cadastros mínimos para iniciar a operação.

**Escopo**

- implementar `Customer`
- implementar `Channel`
- implementar `BusinessHour`
- criar regras de criação com identificador útil para cliente
- impedir horários sobrepostos por empresa e dia
- permitir configuração inicial de canal WhatsApp

**Saída esperada**

- empresa consegue estruturar operação básica
- dados de clientes e canais ficam preparados para entrada de mensagens

## Sprint 3 - Inbox Core

**Objetivo**

Entregar o núcleo do atendimento.

**Escopo**

- listar conversas com filtros
- detalhar conversa
- atualizar conversa
- atribuir conversa manualmente
- implementar status `OPEN`, `PENDING` e `CLOSED`
- manter `lastMessagePreview`, `lastMessageAt` e `lastCustomerMessageAt`
- implementar `unreadCount`

**Saída esperada**

- inbox navegável
- operação já consegue visualizar e organizar atendimentos

## Sprint 4 - Entrada de Mensagens e Criação Automática

**Objetivo**

Permitir que contatos reais entrem no sistema automaticamente.

**Escopo**

- implementar recebimento de webhooks inbound
- criar ou localizar `Customer` automaticamente
- criar ou localizar `Conversation` automaticamente
- persistir `Message`
- salvar `externalMessageId`, `direction`, `senderType` e `messageType`
- suportar fluxo inicial da WhatsApp Business Platform

**Saída esperada**

- mensagens recebidas geram cliente e conversa
- sistema começa a operar com entradas reais

## Sprint 5 - Resposta Outbound e Tempo Real

**Objetivo**

Permitir resposta ativa ao cliente e atualização viva da operação.

**Escopo**

- criar `POST /messages`
- implementar envio outbound
- configurar Redis para fila, cache e eventos
- publicar eventos principais da inbox
- processar webhooks de forma resiliente

**Saída esperada**

- agente responde pelo sistema
- inbox recebe atualizações em tempo real

## Sprint 6 - Transferências e Organização da Operação

**Objetivo**

Melhorar fluxo de trabalho entre atendentes.

**Escopo**

- implementar solicitação de transferência
- implementar aceite, rejeição e expiração
- garantir apenas uma transferência `PENDING` por conversa
- implementar CRUD de tags
- permitir associação de tags nas conversas
- habilitar filtros por responsável, status, canal e tag

**Saída esperada**

- operação ganha controle de repasse e organização
- atendimento fica menos dependente de controle manual externo

## Sprint 7 - Automações do MVP e Canais Externos

**Objetivo**

Fechar o MVP descrito na visão de produto.

**Escopo**

- modelar gatilhos simples do MVP
- implementar primeira resposta automática
- implementar automação para canais externos
- registrar `ExternalContactRequest`
- gerar protocolo
- responder com redirecionamento para WhatsApp
- permitir ativar e desativar regras

**Saída esperada**

- canais externos passam a alimentar o funil do WhatsApp
- automações básicas reduzem trabalho manual

## Sprint 8 - Qualidade, Observabilidade e Go-Live

**Objetivo**

Preparar o sistema para uso inicial com mais segurança.

**Escopo**

- criar logs estruturados
- proteger dados sensíveis
- auditar falhas de integração
- aplicar rate limit em pontos sensíveis
- criar testes de integração críticos
- criar testes de multi-tenant
- criar testes de webhook e transferência
- revisar checklist final de MVP

**Saída esperada**

- backend mais confiável
- MVP pronto para operação assistida

## Janela de Entrega

### Estimativa Principal

- `8 sprints de execução`
- `1 sprint técnica opcional` para estabilização, caso necessário

### Prazo total sugerido

- cenário otimista: `8 semanas`
- cenário realista: `9 semanas`

## Backlog Priorizado

## P0 - Essencial para o MVP

- multi-tenant por `company_id`
- autenticação e autorização
- cadastros de empresa, usuário, cliente e canal
- configuração de horário de atendimento
- inbox de conversas
- criação automática de cliente e conversa
- recebimento de mensagens via WhatsApp
- envio de mensagens outbound
- atualização de status da conversa
- isolamento entre empresas

## P1 - Importante para operação

- transferências entre atendentes
- tags e filtros
- presença e disponibilidade operacional
- Redis para filas e eventos
- notificações em tempo real
- primeira resposta automática
- canais externos com redirecionamento para WhatsApp

## P2 - Evolução e robustez

- observabilidade mais completa
- rate limit
- auditoria de integrações
- testes mais amplos
- melhorias de performance
- regras mais avançadas de automação
- endurecimento de segurança e operação

## Backlog por Sprint

## Sprint 1

- multi-tenant request context
- filtros obrigatórios por tenant
- autenticação
- roles `ADMIN` e `AGENT`

## Sprint 2

- customer
- channel
- business hours
- validações de cadastro

## Sprint 3

- listagem de conversas
- detalhes de conversa
- atualização de conversa
- atribuição manual

## Sprint 4

- webhook inbound
- criação automática de customer
- criação automática de conversation
- persistência de messages

## Sprint 5

- envio outbound
- Redis
- eventos em tempo real
- robustez em processamento assíncrono

## Sprint 6

- transferências
- expiração de transferência
- tags
- filtros avançados de inbox

## Sprint 7

- automação de primeira resposta
- canais externos
- protocolo e redirecionamento
- ativação e desativação de automações

## Sprint 8

- testes críticos
- observabilidade
- proteção de dados sensíveis
- checklist de go-live

## Riscos e Gargalos Esperados

- integração com WhatsApp Business Platform pode consumir mais tempo que o previsto
- falhas de isolamento multi-tenant são risco alto e precisam de testes desde cedo
- tempo real e filas podem aumentar complexidade operacional
- automações podem parecer simples, mas tendem a expandir escopo rapidamente
- com apenas `1 dev`, excesso de WIP tende a atrasar entrega

## Regras de Acompanhamento

Para manter previsibilidade, usar as seguintes regras:

- nunca iniciar mais de `1 item grande` e `1 item pequeno` ao mesmo tempo
- sempre fechar primeiro o que destrava outra frente
- revisar backlog ao final de cada sprint
- registrar bloqueios no mesmo dia em que forem percebidos
- separar claramente `feito`, `em andamento`, `bloqueado` e `próximo`

## Padrão de Anotações do Projeto

Este padrão serve para sabermos:

- onde estamos
- o que já foi feito
- o que está em andamento
- o que está travado
- onde estão os gargalos
- o que entra na próxima sprint

### Modelo de Resumo da Sprint

```md
# Sprint X - Nome da Sprint

## Objetivo
Descrever em 1 ou 2 linhas o resultado esperado da sprint.

## Status
`Planejada` | `Em andamento` | `Concluída` | `Bloqueada`

## Período
Início: AAAA-MM-DD
Fim: AAAA-MM-DD

## Itens Planejados
- [ ] ITEM-001 Descrição curta
- [ ] ITEM-002 Descrição curta
- [ ] ITEM-003 Descrição curta

## Em andamento
- ITEM-001 O que está sendo feito agora

## Concluído
- ITEM-000 O que já foi entregue

## Bloqueios
- BLOQ-001 Descrição do bloqueio

## Gargalos
- ponto de atenção técnico ou de negócio

## Decisões tomadas
- decisão objetiva tomada durante a sprint

## Próximos passos
- próximo passo mais importante
- próximo passo secundário

## Observações
- notas rápidas de contexto
```

### Modelo de Item de Backlog

```md
## ITEM-000 - Título

Status: `Todo` | `Doing` | `Review` | `Done` | `Blocked`
Prioridade: `P0` | `P1` | `P2`
Sprint: `Sprint X`
Responsável: `Dev + IA`

### Contexto
Resumo do problema ou necessidade.

### Critérios de aceite
- critério 1
- critério 2
- critério 3

### Dependências
- item ou módulo do qual depende

### Riscos
- risco principal

### Atualizações
- AAAA-MM-DD: nota curta do progresso
- AAAA-MM-DD: decisão ou impedimento
```

### Convenção de Status

- `Todo`: ainda não iniciado
- `Doing`: em desenvolvimento
- `Review`: implementado, aguardando validação
- `Done`: concluído e validado
- `Blocked`: travado por dependência, bug ou decisão pendente

### Convenção de Prioridade

- `P0`: sem isso o MVP não fecha
- `P1`: importante para operação, mas não bloqueia MVP técnico
- `P2`: melhoria, robustez ou evolução

## Ritual Semanal Recomendado

### Segunda-feira

- revisar backlog da sprint
- escolher itens da semana
- validar dependências e riscos

### Quarta-feira

- revisar andamento
- replanejar escopo se houver bloqueios

### Sexta-feira

- fechar anotações
- registrar entregue vs planejado
- mover pendências para próxima sprint
- anotar gargalos reais

## Sugestão de Organização dos Arquivos de Acompanhamento

Se quiser padronizar a documentação operacional, a estrutura pode evoluir para:

- `docs/cronograma-entregas.md`
- `docs/sprints/sprint-1.md`
- `docs/sprints/sprint-2.md`
- `docs/backlog.md`
- `docs/decisions.md`

## Resumo Executivo

O plano mais realista para este SaaS, com `1 desenvolvedor + IA`, é entregar o MVP em ondas curtas:

- primeiro segurança e multi-tenant
- depois estrutura operacional
- depois inbox e mensagens
- depois resposta, tempo real e transferência
- por fim automações, qualidade e preparação para operação

Esse formato reduz risco, dá visibilidade do andamento e facilita perceber gargalos cedo, antes que virem atraso estrutural.
