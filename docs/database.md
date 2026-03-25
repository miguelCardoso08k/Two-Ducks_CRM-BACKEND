# Database

## Regras

- Usar PostgreSQL
- Todas as tabelas possuem `company_id`
- Indexar sempre `company_id`

## Padrões

- id: cuid()
- createdAt
- updatedAt

## Performance

- conversations:
  - last_message_at
  - last_message_preview

- messages:
  - external_message_id único
