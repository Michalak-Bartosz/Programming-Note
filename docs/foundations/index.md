---
tags:
  - foundations
  - documentation
---
# 1. Foundations

This section gathers the foundational notes, repository conventions, and starting points for the broader knowledge base.

!!! abstract "Curated knowledge base"
    Your curated project notebook—from programming fundamentals to release roadmaps and interview warm-ups.

!!! tip "Quick start hub"
    - 🚀 **Need quick shortcuts?** Use the navigation cards below to drop into the right hub.
    - 🏷️ **Hunting for a specific topic?** Browse [Tags](../tags.md) and filter by the curated labels.

    | Section | What you’ll find | Perfect when |
    | --- | --- | --- |
    | [Foundations](index.md) | Repo conventions, checklists, curated links | You are about to add a new entry |
    | [Useful Links](useful-links.md) | Glossaries, reference links, inspiration | You need reliable sources or quotes |
    | [Tooling](../tooling/index.md) | Maven + CI/CD helpers | You are configuring a project environment |

!!! info "Explore the main content domains"
    - **☕ JVM Languages**
        - [Java](../jvm-languages/java/index.md): best practices, frameworks, language trivia, and interview sets.
        - [Kotlin](../jvm-languages/kotlin/index.md): language basics, idioms, and project-ready snippets.
        - [Platform Roadmap](../jvm-languages/java/platform-roadmap/index.md): LTS release overviews (8/11/17/21) without the old "features" detour.
    - **⚙️ Tooling**
        - [Maven Commands](../tooling/maven/001_maven-commands.md) — the most useful commands and workflows.
        - Space reserved for future tools (Gradle, Docker, CI pipelines); follow the same structure when adding them.
    - **🎨 Frontend**
        - [React Libraries & Resources](../frontend/react/001_libraries-and-resources.md) — curated libraries and a growing reading list.
        - Designed to host additional frontend stacks while keeping navigation consistent.
    - **🎯 Interview Prep**
        - [Index](../interview/index.md) plus JVM-specific tracks (Core Java, Java 8/11/17, Spring Boot).
        - Ideal for last-minute refreshers before a technical interview.
    - **📚 Resources & Tags**
        - [Useful Links](useful-links.md) for loose notes, templates, and reference snippets.
        - [Tags Directory](../tags.md) with every approved label so searching stays predictable.

!!! important "Contribution workflow"
    1. Read [`documentation_conventions.md`](https://github.com/Michalak-Bartosz/Programming-Note/blob/main/.github/documentation_conventions.md) — it defines style, tags, and heading numbering.
    2. Follow the naming scheme (kebab-case folders, numeric prefixes, `index.md` for landings) and keep related files together.
    3. After editing, activate `.venv` and run `mkdocs build` to ensure there are no warnings before opening a PR.

!!! tip "Planning new sections?"
    Add an `index.md`, update the local `.pages`, and let `mkdocs-awesome-pages-plugin` wire the rest automatically.

