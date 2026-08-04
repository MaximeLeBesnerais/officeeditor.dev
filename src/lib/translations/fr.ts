// French dictionary. Every key mirrors the English source of truth in
// ./en.ts. Brand names, format names, tool names, commands and paths stay
// untranslated. No em dashes (project rule).

import type { Translations } from "./en";

export const fr: Translations = {
  meta: {
    title: "OfficeEditor · Un JSON en entrée. De vrais fichiers Office en sortie.",
  },
  nav: {
    howItWorks: "fonctionnement",
    features: "fonctionnalités",
    agents: "agents",
    benchmarks: "benchmarks",
    github: "GitHub ↗",
  },
  hero: {
    headlineLine1: "Un JSON en entrée.",
    headlineLine2: "De vrais fichiers Office en sortie.",
    sub: "OfficeEditor est une suite .NET 9 qui crée, modifie, génère et rend des DOCX, PPTX et XLSX : des vocabulaires JSON déclaratifs en entrée, de véritables documents Office en sortie. Ni Office, ni LibreOffice, ni aller-retour vers le cloud.",
    formats: ["DOCX", "PPTX", "XLSX"],
    ctaPrimary: "Commencer",
    ctaGithub: "GitHub ↗",
    cliHint: "$ dotnet tool install -g MaximeLB.OfficeEditor.Cli",
    codeFrameTitle: "deck.json",
    slideCaption: "rendu par TypstBridge · 20 ms/diapositive",
  },
  stats: {
    speed: { label: "plus rapide que LibreOffice", sub: "rendu PPTX, médiane à chaud" },
    tests: { label: "tests automatisés", sub: "seuil CI de 83 % de couverture" },
    formats: { label: "formats Office", sub: "un seul modèle de génération" },
    perSlide: { label: "par diapositive rendue", sub: "pont Typst natif" },
  },
  pipeline: {
    eyebrow: "fonctionnement",
    title: "Une mise en page. Deux émetteurs.",
    intro:
      "Une unique passe de mise en page en C# pur alimente deux émetteurs : OOXML pour la livraison, Typst pour l'aperçu. Aucun second moteur de mise en page, aucune dérive entre ce qui est livré et ce qui est affiché.",
    nodes: {
      json: { name: "Vocabulaire JSON" },
      validator: { name: "Validateur strict", sub: "erreurs avec chemin de champ + suggestions" },
      layout: { name: "Résolveur de mise en page", sub: "C# pur, une seule passe" },
      ooxml: { name: "Émetteur OOXML" },
      typst: { name: "Émetteur Typst" },
    },
    outputs: {
      office: ".pptx · .docx · .xlsx",
      preview: "PDF · PNG · SVG",
    },
    caption: "Chaque primitive est livrée avec les deux émetteurs + un jeu de tests de parité. Aucune fonctionnalité à moitié testée.",
  },
  features: {
    eyebrow: "capacités",
    title: "Tout ce qu'il faut entre un JSON et un document fini",
    intro: "Trois formats, un seul modèle. Création de zéro ou modification de fichiers existants avec préservation complète des styles.",
    items: {
      declarative: {
        title: "Génération déclarative",
        body: "Vocabulaires JSON strictement validés pour PPTX, DOCX et XLSX. Les archétypes de diapositives (cover, section, kpi_row, two_col, table_slide) se déploient en véritable OOXML, avec erreurs indiquant le chemin du champ et suggestions orthographiques quand l'entrée est incorrecte.",
      },
      variables: {
        title: "Variables & publipostage",
        body: "Détection et remplacement de {{variable}} dans les trois formats, plus fusion DOCX par lots. Les modèles restent des modèles ; les données restent des données.",
      },
      markdown: {
        title: "Markdown → DOCX",
        body: "Conversion riche et stylée via Markdig : titres, tableaux, notes de bas de page, listes de tâches, images, liens hypertexte sécurisés, correspondances de styles personnalisées.",
      },
      brand: {
        title: "Profils de marque",
        body: "Extraction des couleurs de thème et des polices de présentations existantes vers des jeux de design tokens réutilisables. La charte graphique, appliquée par le schéma.",
      },
      builders: {
        title: "Builders C# fluents",
        body: "DocumentBuilder, PresentationBuilder, WorkbookBuilder. Fichier, flux ou byte[] en mémoire pour les services et le serverless.",
      },
      instructions: {
        title: "Jeux d'instructions",
        body: "Opérations d'édition JSON/YAML qui modifient des documents existants sans jamais toucher à leurs définitions de style.",
      },
    },
  },
  agents: {
    eyebrow: "conçu pour les agents",
    title: "Votre agent IA peut livrer des présentations.",
    intro: "OfficeEditor parle MCP sur stdio. Pointez Claude, Codex ou tout client MCP vers l'hôte et il gagne quatre outils documentaires.",
    body: "L'hôte MCP expose deck_anatomize, deck_replace_element, deck_render_slide et deck_generate comme outils JSON-RPC. Un agent peut inspecter la structure d'une présentation, remplacer du contenu et rendre des diapositives, avec la même validation stricte que pour les humains.",
    tools: {
      anatomize: { sub: "inspecter la structure d'une présentation" },
      replaceElement: { sub: "remplacer du contenu chirurgicalement" },
      renderSlide: { sub: "diapositive → PNG/SVG" },
      generate: { sub: "JSON → présentation complète" },
    },
    cliHint: "$ dotnet run --project OfficeEditor.Mcp",
    terminalTitle: "mcp · stdio",
    terminalComment: "# validé, mis en page, émis. En un seul appel",
  },
  quickstart: {
    eyebrow: "démarrage rapide",
    title: "De zéro à un document rendu en une minute",
    frameTitles: {
      terminal: "terminal",
      program: "Program.cs",
      kpiSlide: "diapositive kpi-row",
    },
    nuget: "sur NuGet →",
  },
  benchmarks: {
    eyebrow: "benchmarks",
    title: "Rendu natif, mesuré",
    intro: "Le pipeline Typst d'OfficeEditor face à LibreOffice headless : mêmes présentations, mêmes artefacts, médianes à chaud sur Apple Silicon. LibreOffice ne sait pas rastériser le PPTX, son total inclut donc pdftoppm.",
    slidesUnit: "diapositives",
    footnote: "médiane de 5 exécutions à chaud · rendu complet de la présentation, rastérisation incluse · reproduction : dotnet run --project tools/pptx-benchmark",
  },
  footer: {
    tagline: "Un JSON en entrée. De vrais fichiers Office en sortie.",
    version: "v0.7.1 · MIT License",
    resourcesTitle: "Ressources",
    resources: {
      github: "GitHub",
      nuget: "Packages NuGet",
      schema: "Schéma de génération PPTX",
      security: "Signaler un problème de sécurité",
    },
    surfacesTitle: "Surfaces",
    surfaces: [
      "CLI officeeditor (dotnet tool)",
      "API ASP.NET Core",
      "Hôte MCP stdio",
      "Builders C# fluents",
    ],
    copyright: "© 2026 Maxime Le Besnerais",
    backToTop: "↑ haut",
    schemaTagline: "schémas résolus sur officeeditor.dev/schemas/. Lisibles par machine, pour toujours",
  },
  codeblock: {
    copy: "copier",
    copied: "copié ✓",
  },
};
