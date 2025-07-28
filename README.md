# Testes de API e CI/CD - Helpdesk

Este repositório reúne os testes automatizados da API do sistema Helpdesk, desenvolvidos em **Cypress**, junto com a configuração de **Integração Contínua** via GitHub Actions.

O projeto segue o formato de ""monorepo"", contendo tanto o código da API quanto os testes no mesmo repositório.

## Objetivo

O propósito é manter a estabilidade e confiabilidade da API durante as entregas. Para isso, os testes automatizados validam:

- **Endpoints e regras de negócio**
- **Tratamento de erros**
- **Fluxos principais da aplicação**

Os testes utilizam o padrão **Service Layer**, com comandos customizados do Cypress, para garantir legibilidade e fácil manutenção.

## Tecnologias

- **Testes:** Cypress
- **CI/CD:** GitHub Actions
- **API:** Node.js + Express

## Pré-requisitos

- Node.js
- npm
- Git

## Como executar localmente

**1. Clone o repositório:**

```bash
git clone https://github.com/caiubra/testes-api-helpdesk.git
cd testes-api-helpdesk
```
