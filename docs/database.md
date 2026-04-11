# Database

## Regras

- Usar PostgreSQL
- `Company` é a tabela raiz do tenant
- Todas as demais tabelas possuem `company_id`
- Indexar sempre `company_id`
- `users.email` deve ser único globalmente
- ausência de linha em `business_hours` para um dia significa empresa fechada naquele dia

## Padrões

- id: cuid()
- createdAt
- updatedAt
- horários recorrentes devem ser modelados em tabela própria, nunca em JSON solto

## Performance

- conversations:
  - last_message_at
  - last_message_preview
  - assigned_user_id
  - status

- messages:
  - external_message_id único

- transfer_requests:
  - validar na regra de negócio apenas uma transferência `PENDING` por conversa
