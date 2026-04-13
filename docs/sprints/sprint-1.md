# Sprint 1 - Multi-tenant e Authentication

## Objetivo

Estabelecer a base de segurança e isolamento do SaaS para que os próximos módulos possam ser construídos com segurança.

## Status

`Doing`

## Período

Início: 2026-04-13
Fim: 2026-04-19

## Objetivo da Sprint

Ao final desta sprint, o backend deve ser capaz de:

- identificar o tenant ativo em cada request
- impedir acesso a dados entre empresas
- autenticar usuários
- aplicar os primeiros limites de role entre `ADMIN` e `AGENT`

## Itens Planejados

- [ ] ITEM-001 Resolver tenant context por request
- [ ] ITEM-002 Aplicar tenant filters nas domain queries
- [ ] ITEM-003 Implementar authentication
- [ ] ITEM-004 Aplicar role-based access

## Tarefas Técnicas

- [ ] definir como a resolução de tenant acontecerá em `authenticated requests`
- [ ] escolher e implementar a estratégia inicial de auth
- [ ] criar `authorization guards` ou camada equivalente de proteção
- [ ] revisar os `repositories` já existentes sob a ótica de tenant safety
- [ ] adicionar pelo menos um caminho de teste focado em isolamento

## Definition of Done da Sprint

- usuário autenticado consegue acessar `protected routes`
- acessos não autorizados são rejeitados corretamente
- acesso ao domínio sensível a tenant está garantido nos módulos existentes
- pelo menos um teste demonstra o comportamento de tenant isolation
- as notas da sprint são atualizadas antes do fechamento

## Entregáveis Esperados

- fluxo de authentication pronto para usuários internos
- regras iniciais de autorização para `ADMIN` e `AGENT`
- padrão tenant-safe de acesso estabelecido para os próximos módulos

## Riscos

- a implementação de auth pode influenciar escolhas futuras de integração com frontend
- a estratégia de resolução de tenant pode exigir pequenos refactors em `repositories` e `controllers`
- caminhos ocultos de consulta ainda podem escapar dos tenant checks se a revisão for incompleta

## Dependências

- `users` module existente
- `companies` module existente
- padrão atual de `repository`

## Notas em Andamento

- nenhum trabalho iniciado ainda

## Bloqueios

- nenhum no momento do planejamento

## Decisões

- duração da sprint: 1 semana
- prioridade: proteger a fundação do backend antes de expandir a superfície de domínio

## Próximos Passos

- definir a abordagem de auth para o MVP
- implementar a resolução de tenant context
- auditar os `repositories` atuais para garantir enforcement de `company_id`

## Modelo de Atualização Diária

```md
### YYYY-MM-DD

Status: `On track` | `At risk` | `Blocked`

Feito hoje
- item concluído ou avançado

Fazendo agora
- foco atual

Bloqueios
- descrição do bloqueio

Próximo
- próximo passo concreto
```
