# Technical Decisions

## Multi-tenant

Usamos `company_id` em todas as tabelas de domínio.

`Company` é a raiz do tenant e, por isso, não possui `company_id`.

Motivo:

- simplicidade
- custo baixo
- escala suficiente para MVP

## Arquitetura

Monolith modular

Motivo:

- menor complexidade
- mais rápido para desenvolver

## Atendimento

Mantemos `assignedUserId` como responsável atual da conversa.

Motivo:

- simplifica inbox, filtros e distribuição
- facilita métricas por responsável atual
- histórico de transferência fica em `TransferRequest`

## Presença e disponibilidade

Separamos o estado do usuário em contexto de conta, plataforma, inbox e disponibilidade.

Motivo:

- diferenciar conta ativa de capacidade operacional
- diferenciar presença na plataforma de presença na inbox
- suportar distribuição automática de conversas sem persistir contadores complexos no MVP
