# Domain Model

## Entities

- Company
- User
- Customer
- Channel
- Conversation
- Message
- Tag
- TransferRequest
- ExternalContactRequest
- AutomationRule
- Subscription

## Multi-tenant

Todas as entidades possuem `company_id`.

Nunca acessar dados sem filtrar por `company_id`.