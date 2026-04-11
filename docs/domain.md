# Domain Model

## Entities

- Company
- User
- Customer
- Channel
- BusinessHour
- Conversation
- Message
- Tag
- TransferRequest
- ExternalContactRequest
- AutomationRule
- Subscription

## Multi-tenant

`Company` é a raiz do tenant.

Todas as demais entidades do domínio possuem `company_id`.

Nunca acessar dados sem filtrar por `company_id`.
