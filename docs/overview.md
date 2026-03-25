Este projeto consiste no desenvolvimento de um **SaaS (Software as a Service) de CRM de atendimento ao cliente**, focado inicialmente na centralização e gestão de conversas provenientes do **WhatsApp**, com integração complementar a outros canais digitais.

O sistema permitirá que empresas gerenciem suas comunicações com clientes de forma estruturada, distribuindo atendimentos entre membros da equipe, mantendo histórico de conversas e automatizando respostas iniciais. A principal proposta de valor do produto é **transformar o WhatsApp em uma central profissional de atendimento**, semelhante a um helpdesk, porém simples e acessível para pequenas e médias empresas.

No **MVP**, o WhatsApp será o principal canal de atendimento, utilizando a **WhatsApp Business Platform** para envio e recebimento de mensagens. Outros canais, como **Instagram, TikTok e e-mail**, serão integrados apenas para **recebimento de mensagens via webhooks**, respondendo automaticamente com instruções para que o cliente continue o atendimento via WhatsApp.

A plataforma contará com funcionalidades essenciais para gestão de atendimento, incluindo:

- **Inbox compartilhada de conversas**
- **Distribuição de atendimentos entre agentes**
- **Transferência manual de conversas entre atendentes com confirmação**
- **Criação automática de clientes e conversas**
- **Respostas automáticas iniciais**
- **Sistema de tags para organização de conversas**
- **Notificações em tempo real**
- **Modelo multi-tenant para múltiplas empresas**

A arquitetura do sistema será baseada em um **monólito modular**, utilizando **TypeScript em toda a stack**, com backend em **NestJS** e frontend em **Next.js**. A aplicação será hospedada em infraestrutura cloud moderna, com frontend na **Vercel** e backend na **Railway**, utilizando **PostgreSQL** como banco de dados e **Redis** para processamento assíncrono e comunicação em tempo real.

O sistema adotará um modelo **multi-tenant baseado em `company_id`**, permitindo que múltiplas empresas utilizem a plataforma de forma isolada dentro da mesma infraestrutura, garantindo escalabilidade e eficiência operacional.

A longo prazo, a plataforma poderá evoluir para um **CRM omnichannel completo**, com suporte a múltiplos canais de comunicação, automações mais avançadas e funcionalidades analíticas para gestão de relacionamento com clientes.

Em resumo, o projeto busca criar uma **plataforma de atendimento moderna, escalável e simples de usar**, capaz de profissionalizar o atendimento via WhatsApp e centralizar o relacionamento entre empresas e seus clientes em um único sistema.