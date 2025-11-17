# Programming Notes

> "Second brain" repository with comprehensive programming notes and best practices.

**🌐 Live Site:** https://michalak-bartosz.github.io/Programming-Note/

## 📖 About

This repository contains curated notes, best practices, and interview questions for various programming languages and technologies. Previously maintained in Obsidian, now powered by **MkDocs Material** for better web accessibility and sharing.

## 🚀 Quick Start

### For Readers
Visit the [live documentation site](https://michalak-bartosz.github.io/Programming-Note/) to browse all notes.

### For Contributors

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/Michalak-Bartosz/Programming-Note.git
   cd Programming-Note
   ```

2. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

3. **Run local server:**
   ```powershell
   mkdocs serve
   ```
   
4. **Open in browser:**
   Visit http://127.0.0.1:8000

## 📚 Content Structure

- **Java**: JDK versions (8, 11, 17, 21), best practices, frameworks, interview questions
- **Kotlin**: Modern JVM language fundamentals and advanced concepts
- **Design**: Design patterns, principles, and programming models
- **React.js**: Frontend development with React
- **Maven**: Build automation and dependency management

## 🔄 Migration from Obsidian

**New to MkDocs?** This repository includes tools for Obsidian-to-MkDocs migration:

- 📘 [MKDOCS_README.md](MKDOCS_README.md) - Quick start guide
- 📄 [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Detailed migration instructions
- 🔧 `migrate.ps1` - Automated migration script
- 🐍 `convert_obsidian_to_mkdocs.py` - Syntax converter

**Run automated migration:**
```powershell
.\migrate.ps1
```

## ✨ Features

- 🎨 **Material Design** - Beautiful, responsive theme
- 🌓 **Dark/Light mode** - Automatic theme switching
- 🔍 **Full-text search** - Find content instantly
- 📱 **Mobile-friendly** - Works on all devices
- 💻 **Code highlighting** - Syntax highlighting for 200+ languages
- 🏷️ **Tags** - Organize and discover content
- 📊 **Mermaid diagrams** - Visualize concepts
- 🧮 **Math equations** - LaTeX math support

## 🛠️ Development

### Prerequisites
- Python 3.8 or later
- pip (Python package manager)

### Commands

```powershell
# Install dependencies
pip install -r requirements.txt

# Development server with live reload
mkdocs serve

# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## 📝 Writing Guidelines

### File Organization
- Use lowercase filenames with hyphens: `my-topic.md`
- Each directory should have an `index.md`
- Group related content in subdirectories

### Markdown Syntax
- Use standard Markdown (not Obsidian wiki-links)
- Add frontmatter for metadata:
  ```yaml
  ---
  title: Page Title
  tags:
    - Java
    - Tutorial
  ---
  ```

### Code Blocks
Use fenced code blocks with language specification:
````markdown
```java
public class Example {
    // Your code here
}
```
````

## 🚢 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch. The workflow is defined in `.github/workflows/deploy.yml`.

### Manual Deployment
```powershell
mkdocs gh-deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Validate: `mkdocs build --strict`
5. Commit: `git commit -am 'Add feature'`
6. Push: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Documentation Site**: https://michalak-bartosz.github.io/Programming-Note/
- **MkDocs**: https://www.mkdocs.org/
- **Material for MkDocs**: https://squidfunk.github.io/mkdocs-material/
- **Original Obsidian App**: https://obsidian.md/

## 📞 Contact

- **GitHub**: [@Michalak-Bartosz](https://github.com/Michalak-Bartosz)
- **Repository**: [Programming-Note](https://github.com/Michalak-Bartosz/Programming-Note)

---

⭐ If you find this helpful, please consider giving it a star!
