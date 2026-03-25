# Technical Decisions

## Multi-tenant

Usamos `company_id` em todas as tabelas.

Motivo:

- simplicidade
- custo baixo
- escala suficiente para MVP

## Arquitetura

Monolith modular

Motivo:

- menor complexidade
- mais rápido para desenvolver
