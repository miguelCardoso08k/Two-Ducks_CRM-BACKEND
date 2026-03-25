# Code Conventions

## Naming

- camelCase → variáveis
- PascalCase → classes
- snake_case → banco

## Estrutura NestJS

modules/
  - controller
  - service
  - repository

## Regras

- Nunca acessar Prisma direto fora do repository
- Sempre usar services para lógica de negócio
- Nunca confiar no frontend para segurança