// Simplified Chinese dictionary. Every key mirrors the English source of
// truth in ./en.ts. Brand names, format names, tool names, commands and
// paths stay untranslated. No em dashes, no "——" (project rule).
// zh-CN typography: full-width punctuation inside Chinese sentences.

import type { Translations } from "./en";

export const zh: Translations = {
  meta: {
    title: "OfficeEditor · 一份 JSON 输入，真正的 Office 文件输出。",
    repoUrl: "https://gitcode.com/xyj_maxime/OfficeEditor",
  },
  nav: {
    howItWorks: "工作原理",
    features: "功能特性",
    agents: "智能体",
    benchmarks: "性能基准",
    github: "GitCode ↗",
  },
  hero: {
    headlineLine1: "一份 JSON 输入。",
    headlineLine2: "真正的 Office 文件输出。",
    sub: "OfficeEditor 是一套 .NET 9 库，用于创建、编辑、生成和渲染 DOCX、PPTX 和 XLSX：输入声明式 JSON 词汇表，输出真正的 Office 文档。无需 Office，无需 LibreOffice，无需云端往返。",
    formats: ["DOCX", "PPTX", "XLSX"],
    ctaPrimary: "快速上手",
    ctaGithub: "GitCode ↗",
    codeFrameTitle: "deck.json",
    slideCaption: "由 TypstBridge 渲染 · 23 毫秒/页",
  },
  stats: {
    speed: { label: "快于 LibreOffice", sub: "PDF 转换，热中位数" },
    tests: { label: "自动化测试", sub: "CI 覆盖率门禁 83%" },
    formats: { label: "Office 格式", sub: "同一套生成模型" },
    perSlide: { label: "每页幻灯片，SVG 预览", sub: "原生 Typst 桥接" },
  },
  pipeline: {
    eyebrow: "工作原理",
    title: "一次布局，两路输出。",
    intro:
      "单次纯 C# 布局流程同时驱动两个输出器：OOXML 用于交付，Typst 用于预览。没有第二个布局引擎，交付内容与预览效果之间零偏差。",
    nodes: {
      json: { name: "JSON 词汇表" },
      validator: { name: "严格校验器", sub: "字段路径报错 + 建议" },
      layout: { name: "布局解析器", sub: "纯 C#，仅执行一次" },
      ooxml: { name: "OOXML 输出器" },
      typst: { name: "Typst 输出器" },
    },
    outputs: {
      office: ".pptx · .docx · .xlsx",
      preview: "PDF · PNG · SVG",
    },
    caption: "每个原语都同时附带两个输出器和对等性测试夹具，没有只测一半的功能。",
  },
  features: {
    eyebrow: "能力",
    title: "从 JSON 到成品文档之间的一切",
    intro: "三种格式，一个模型。从头创建，或在完整保留样式的前提下编辑现有文件。",
    items: {
      declarative: {
        title: "声明式生成",
        body: "经过严格校验的 JSON 词汇表，覆盖 PPTX、DOCX 和 XLSX。幻灯片原型（cover、section、kpi_row、two_col、table_slide）会展开为真正的 OOXML，输入有误时会给出字段路径错误和拼写建议。",
      },
      variables: {
        title: "变量与邮件合并",
        body: "在全部三种格式中检测并替换 {{variable}}，并支持 DOCX 批量合并。模板始终是模板，数据始终是数据。",
      },
      markdown: {
        title: "Markdown → DOCX",
        body: "经由 Markdig 的富样式转换：标题、表格、脚注、任务列表、图片、安全超链接、自定义样式映射。",
      },
      brand: {
        title: "品牌配置",
        body: "从现有演示文稿中提取主题色和字体，生成可复用的设计令牌集。品牌风格由 schema 强制统一。",
      },
      builders: {
        title: "流式 C# 构建器",
        body: "DocumentBuilder、PresentationBuilder、WorkbookBuilder。支持文件、流或内存 byte[]，适用于服务与无服务器场景。",
      },
      instructions: {
        title: "指令集",
        body: "JSON/YAML 编辑操作，可修改现有文档，全程不触碰其样式定义。",
      },
    },
  },
  agents: {
    eyebrow: "为智能体而生",
    title: "你的 AI 智能体也能交付演示文稿。",
    intro: "OfficeEditor 通过 stdio 提供 MCP 服务。将 Claude、Codex 或任何 MCP 客户端指向该宿主，即可获得四个文档工具。",
    body: "MCP 宿主以 JSON-RPC 工具的形式暴露 deck_anatomize、deck_replace_element、deck_render_slide 和 deck_generate。智能体可以检查演示文稿结构、替换内容、渲染幻灯片，并享有与人类相同的严格校验。",
    tools: {
      anatomize: { sub: "检查演示文稿结构" },
      replaceElement: { sub: "精准替换内容" },
      renderSlide: { sub: "幻灯片 → PNG/SVG" },
      generate: { sub: "JSON → 完整演示文稿" },
    },
    terminalTitle: "mcp · stdio",
    terminalComment: "# 校验、布局、输出，一次调用完成",
  },
  quickstart: {
    eyebrow: "快速上手",
    title: "一分钟从零到渲染完成的文档",
    frameTitles: {
      terminal: "终端",
      program: "Program.cs",
      kpiSlide: "kpi-row 幻灯片",
    },
    nuget: "前往 NuGet →",
  },
  benchmarks: {
    eyebrow: "性能基准",
    title: "原生渲染，用数据说话",
    intro: "OfficeEditor 对比无头 LibreOffice，逐项对等：PDF 对 PDF，PNG 对完整栅格化路径，均在 Apple Silicon 上取热数据实测。即便是 LibreOffice 最擅长的一环，也就是它专为设计的 PDF 转换，也要慢 22–102 倍。",
    slidesUnit: "页幻灯片",
    duelQualifiers: {
      lo: "soffice + pdftoppm",
      oe: "原生，一次编译",
    },
    svg: {
      label: "SVG 预览路径",
      body: "同一布局输出 SVG 每页仅需 1.6–2.4 毫秒，整份演示文稿仅需 21–65 毫秒：比 LibreOffice 的栅格化路径快 65–370 倍，而且还是 LibreOffice 无法原生生成的矢量格式。这才是 Web 预览和智能体循环真正需要的产物。",
    },
    fidelity: {
      label: "// 保真度",
      body: "每个生成原语都附带对等性测试夹具：同一布局分别输出为 OOXML 和 Typst，并以 PowerPoint 基准渲染为参照，按原语施加归一化 RMSE 阈值（4–12%）门禁。",
    },
    footnote: "热中位数，N=50（冷启动 N=10）· Apple Silicon · LibreOffice 26.2.5.2、poppler 26.07.0 · LO 各环节包含完整进程启动开销；OE 各环节为进程内热编译，即便冷启动 OE PDF 仍领先 22–43 倍 · 复现方式：dotnet run --project tools/pptx-benchmark",
  },
  footer: {
    tagline: "一份 JSON 输入，真正的 Office 文件输出。",
    version: "v0.7.1 · MIT License",
    resourcesTitle: "资源",
    resources: {
      github: "GitCode",
      nuget: "NuGet 包",
      schema: "PPTX 生成 schema",
      security: "报告安全问题",
    },
    surfacesTitle: "使用形态",
    surfaces: [
      "officeeditor CLI（dotnet tool）",
      "ASP.NET Core API",
      "MCP stdio 宿主",
      "流式 C# 构建器",
    ],
    copyright: "© 2026 Maxime Le Besnerais",
    backToTop: "↑ 回到顶部",
    schemaTagline: "schema 解析地址：officeeditor.dev/schemas/。机器可读，永久有效",
  },
  codeblock: {
    copy: "复制",
    copied: "已复制 ✓",
  },
};
