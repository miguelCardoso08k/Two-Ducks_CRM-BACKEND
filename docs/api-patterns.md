# API Patterns

## REST

GET /conversations
POST /messages
PATCH /conversations/:id

## Resposta padrão

{
  "data": {},
  "error": null
}

## Erros

- 400 → validação
- 401 → não autenticado
- 403 → sem permissão
- 404 → não encontrado