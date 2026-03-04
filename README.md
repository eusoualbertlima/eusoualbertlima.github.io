# 🌐 Template Presença Digital — Guia de Customização Rápida

> **Objetivo:** Clonar esta pasta, trocar textos/cores/número e entregar para o cliente em 30 min.

---

## ⚡ Setup (1 minuto)

1. Copie a pasta `template-presenca-digital` inteira
2. Renomeie para o nome do cliente (ex: `site-clinica-saude`)
3. Abra `index.html` no navegador para ver o resultado

---

## 🎨 Trocar Cores (2 minutos)

Abra `style.css` e mude APENAS as variáveis no topo do arquivo:

```css
:root {
    /* Mude o HUE (0-360) para trocar a cor principal */
    --primary-h: 250;    /* 250 = Roxo  |  210 = Azul  |  150 = Verde  |  350 = Vermelho  |  30 = Laranja */
    --accent-h: 170;     /* Cor de destaque (checks, badges) */
}
```

### Paletas Prontas por Nicho

| Nicho | `--primary-h` | `--accent-h` | Resultado |
|-------|--------------|--------------|-----------|
| Clínica | `210` | `170` | Azul + Turquesa |
| Imobiliária | `35` | `45` | Dourado + Amber |
| Advocacia | `220` | `200` | Azul escuro + Cyan |
| Autopeças | `0` | `30` | Vermelho + Laranja |
| Tecnologia | `250` | `170` | Roxo + Verde (padrão) |
| Restaurante | `15` | `45` | Vermelho quente + Dourado |

---

## 📝 Trocar Textos (10 minutos)

No `index.html`, busque e substitua:

| Buscar | Substituir por |
|--------|---------------|
| `EMPRESA` | Nome do cliente |
| `Nome da Empresa` | Nome completo |
| `5562999999999` | WhatsApp do cliente (DDI+DDD+Número) |
| `contato@empresa.com.br` | Email do cliente |
| `Goiânia, GO` | Cidade do cliente |
| `(62) 99999-9999` | Telefone formatado |
| `Descrição da empresa` | Texto real sobre o negócio |

---

## 📱 Configurar WhatsApp (1 minuto)

O número do WhatsApp aparece em 3 lugares:

1. **Botão flutuante verde** — `index.html` linha do `whatsapp-float`
2. **Botão CTA** — `index.html` linha do `ctaWhatsApp`
3. **Formulário** — `script.js` variável `whatsappNumber`

Busque `5562999999999` e troque pelo número real do cliente.

---

## 🚀 Deploy (5 minutos)

### Opção 1: Netlify (Gratuito)

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Arraste a pasta inteira para o navegador
3. Pronto! URL gerada automaticamente

### Opção 2: Cloudflare Pages (Gratuito)

1. Suba para um repo GitHub
2. Conecte ao Cloudflare Pages
3. Deploy automático

### Opção 3: Domínio próprio do cliente

- Compre no Registro.br (~R$ 40/ano)
- Aponte DNS para Netlify/Cloudflare

---

## 💰 Precificação Sugerida

| Pacote | Inclui | Preço |
|--------|--------|-------|
| **Básico** | Só o site | R$ 497 |
| **Presença Digital** | Site + Robô WhatsApp + Automação n8n | R$ 997 |
| **Premium** | Tudo acima + Google Meu Negócio + Manutenção 3 meses | R$ 1.497 |

---

*Template criado por Albert Digital — Powered by Antigravity AIOS*
