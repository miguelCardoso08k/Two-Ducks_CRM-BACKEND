# Backend Implementation Checklist

## Fundacao do projeto

- [x] Configurar NestJS com Fastify
- [x] Configurar TypeScript com padrao do projeto
- [x] Configurar variaveis de ambiente
- [x] Configurar Prisma com PostgreSQL
- [ ] Configurar Redis para cache, fila e eventos em tempo real
- [x] Definir estrutura modular em `modules/application/domain/infrastructure`
- [x] Garantir que acesso ao banco aconteca apenas via repository

## Multi-tenant

- [x] Definir `Company` como raiz do tenant
- [x] Adicionar `company_id` em todas as tabelas de dominio, exceto `Company`
- [x] Indexar `company_id` em todas as tabelas multi-tenant
- [ ] Criar mecanismo para resolver `company_id` no contexto da requisicao
- [ ] Garantir filtro por `company_id` em toda consulta de dominio
- [ ] Garantir validacao de ownership por `company_id` em updates e deletes
- [ ] Criar testes cobrindo isolamento entre empresas

## Modelagem do banco

- [x] Implementar tabela `companies`
- [x] Implementar tabela `users`
- [x] Implementar tabela `customers`
- [x] Implementar tabela `channels`
- [x] Implementar tabela `conversations`
- [x] Implementar tabela `messages`
- [x] Implementar tabela `tags`
- [x] Implementar tabela `conversation_tags`
- [x] Implementar tabela `transfer_requests`
- [x] Implementar tabela `external_contact_requests`
- [x] Implementar tabela `automation_rules`
- [x] Implementar tabela `subscriptions`
- [x] Padronizar `id`, `createdAt` e `updatedAt`
- [x] Definir `users.email` como unico globalmente
- [x] Definir `messages.external_message_id` como unico quando existir
- [x] Criar indice para performance de inbox em `conversations`
- [x] Criar regra para impedir mais de uma `transfer_request` `PENDING` por conversa
- [x] Garantir unicidade de `protocol` por empresa em `external_contact_requests`

## Entidades e regras de dominio

- [x] Implementar entidade `Company`
- [x] Implementar entidade `User`
- [ ] Implementar entidade `Customer`
- [ ] Implementar entidade `Channel`
- [ ] Implementar entidade `Conversation`
- [ ] Implementar entidade `Message`
- [ ] Implementar entidade `Tag`
- [ ] Implementar entidade `ConversationTag`
- [ ] Implementar entidade `TransferRequest`
- [ ] Implementar entidade `ExternalContactRequest`
- [ ] Implementar entidade `AutomationRule`
- [ ] Implementar entidade `Subscription`
- [x] Definir enums de status e tipos conforme documentacao
- [ ] Validar que `Customer` tenha ao menos um identificador util no fluxo de criacao
- [ ] Manter `assignedUserId` como responsavel atual da conversa
- [ ] Registrar historico de transferencia em `TransferRequest`
- [ ] Armazenar `rawPayload` em `Message` para auditoria e debug

## Modulos principais

- [ ] Criar modulo de autenticacao
- [x] Criar modulo de empresas
- [x] Criar modulo de usuarios
- [ ] Criar modulo de clientes
- [ ] Criar modulo de canais
- [ ] Criar modulo de conversas
- [ ] Criar modulo de mensagens
- [ ] Criar modulo de tags
- [ ] Criar modulo de transferencias
- [ ] Criar modulo de contatos externos
- [ ] Criar modulo de automacoes
- [ ] Criar modulo de assinatura

## Autenticacao e autorizacao

- [ ] Implementar login
- [ ] Implementar estrategia de autenticacao para API
- [ ] Diferenciar pelo menos `ADMIN` e `AGENT`
- [ ] Restringir acesso por role quando necessario
- [ ] Nunca confiar no frontend para seguranca
- [ ] Atualizar `lastSeenAt` quando fizer sentido

## Inbox e atendimento

- [ ] Criar endpoint para listar conversas com filtros
- [ ] Criar endpoint para detalhes de uma conversa
- [ ] Criar endpoint para atualizar conversa
- [ ] Implementar atribuicao manual de conversa
- [ ] Implementar controle de status `OPEN`, `PENDING` e `CLOSED`
- [ ] Atualizar `lastMessagePreview` e `lastMessageAt` a cada nova mensagem
- [ ] Atualizar `lastCustomerMessageAt` em mensagens recebidas do cliente
- [ ] Implementar `unreadCount`
- [ ] Preparar filtros por responsavel, status, canal e tags

## Mensagens e canais

- [ ] Criar endpoint `POST /messages`
- [ ] Implementar envio de mensagem outbound
- [ ] Implementar recebimento de webhooks inbound
- [ ] Criar ou localizar `Customer` automaticamente ao receber contato
- [ ] Criar ou localizar `Conversation` automaticamente ao receber mensagem
- [ ] Persistir `externalMessageId` quando houver
- [ ] Persistir `direction`, `senderType` e `messageType`
- [ ] Implementar suporte inicial a WhatsApp Business Platform
- [ ] Implementar canais externos como entrada com redirecionamento para WhatsApp

## Transferencias

- [ ] Implementar solicitacao de transferencia entre usuarios
- [ ] Implementar aceite de transferencia
- [ ] Implementar rejeicao de transferencia
- [ ] Implementar expiracao de solicitacoes pendentes
- [ ] Atualizar `assignedUserId` somente quando a transferencia for aceita
- [ ] Validar que nao exista outra transferencia `PENDING` para a conversa

## Tags e organizacao

- [ ] Implementar CRUD de tags
- [ ] Implementar associacao entre conversa e tag
- [ ] Permitir filtros por tags na inbox

## Automacoes

- [ ] Modelar gatilhos simples do MVP
- [ ] Modelar acoes simples do MVP
- [ ] Implementar regra de primeira resposta automatica
- [ ] Implementar automacao para canais externos com redirecionamento
- [ ] Permitir ativar e desativar `AutomationRule`

## Tempo real e processamento assincrono

- [ ] Definir eventos de nova mensagem, atualizacao de conversa e transferencia
- [ ] Publicar eventos em tempo real para inbox
- [ ] Usar Redis para fila de jobs assincronos
- [ ] Processar webhooks de forma resiliente
- [ ] Processar expiracao de transferencias

## API e padroes

- [ ] Seguir padrao REST inicial
- [x] Padronizar resposta HTTP como `message + data` ou apenas `message`
- [ ] Mapear erros 400, 401, 403 e 404
- [x] Validar payloads de entrada
- [x] Padronizar nomes: camelCase no codigo, PascalCase em classes, snake_case no banco

## Observabilidade e seguranca

- [ ] Criar logs estruturados
- [ ] Mascarar ou proteger dados sensiveis de tokens e credenciais
- [ ] Auditar integracoes externas e falhas de webhook
- [ ] Preparar rate limit em endpoints sensiveis
- [ ] Definir estrategia de secrets por ambiente

## Testes

- [ ] Criar testes unitarios para services
- [ ] Criar testes de repository para queries criticas
- [ ] Criar testes de integracao para autenticacao
- [ ] Criar testes de integracao para fluxo de conversa
- [ ] Criar testes de integracao para recebimento de webhook
- [ ] Criar testes para regras de multi-tenant
- [ ] Criar testes para regra de transferencia pendente unica

## MVP pronto para operacao

- [ ] Empresa consegue cadastrar canais
- [ ] Agentes conseguem autenticar e acessar inbox
- [ ] Mensagens recebidas criam cliente e conversa automaticamente
- [ ] Conversas podem ser atribuidas, transferidas e encerradas
- [ ] Respostas podem ser enviadas pelo canal principal
- [ ] Canais externos geram protocolo e redirecionamento para WhatsApp
- [ ] Sistema respeita isolamento por empresa
- [ ] Eventos principais chegam em tempo real na operacao
